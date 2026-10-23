import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityServerClient } from '../../lib/sanity/client'
import { writeToken } from '../../lib/sanity/env'
import { validateContact } from '../../lib/contact-validation'
import { isRateLimited } from '../../lib/rate-limit'

interface ApiResponse {
  success?: boolean
  error?: string
  message?: string
}

export const config = { api: { bodyParser: { sizeLimit: '20kb' } } }

function clientIp(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for']
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]
  return (first || req.socket.remoteAddress || 'unknown').trim()
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Honeypot: bot điền trường ẩn "website" -> giả vờ thành công, không lưu
  if (req.body && typeof req.body === 'object' && req.body.website) {
    return res.status(200).json({ success: true, message: 'Yêu cầu của bạn đã được gửi thành công!' })
  }

  if (isRateLimited(clientIp(req))) {
    return res.status(429).json({ error: 'Bạn gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút.' })
  }

  const result = validateContact(req.body)
  if (!result.ok) {
    return res.status(400).json({ error: result.error })
  }

  if (!writeToken) {
    console.error('Missing Sanity write token for contact submission')
    return res.status(500).json({
      error: 'Cấu hình Sanity chưa sẵn sàng để lưu yêu cầu. Vui lòng liên hệ quản trị viên.',
    })
  }

  try {
    await sanityServerClient.create({
      _type: 'contact',
      ...result.data,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    })

    return res.status(200).json({
      success: true,
      message: 'Yêu cầu của bạn đã được gửi thành công!',
    })
  } catch (error: unknown) {
    console.error('Contact form error:', error)

    const e = error as { body?: { error?: { description?: string } }; responseBody?: string; message?: string }
    const errorMessage = e?.body?.error?.description || e?.responseBody || e?.message || ''
    if (/insufficient permissions|permission "create" required/i.test(errorMessage)) {
      return res.status(403).json({
        error: 'Token Sanity hiện không có quyền tạo dữ liệu trên dataset này. Vui lòng cấp quyền Editor hoặc Administrator cho token.',
      })
    }

    return res.status(500).json({ error: 'Có lỗi xảy ra. Vui lòng thử lại sau.' })
  }
}
