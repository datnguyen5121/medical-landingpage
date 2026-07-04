import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityServerClient } from '../../lib/sanity/client'

interface DeleteContactResponse {
  success?: boolean
  error?: string
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteContactResponse>
) {
  if (req.method !== 'DELETE' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const id = (req.body?.id || req.query.id || '').toString().trim()

    if (!id) {
      return res.status(400).json({ error: 'Missing document id' })
    }

    if (!process.env.SANITY_API_TOKEN && !process.env.SANITY_WRITE_TOKEN) {
      return res.status(500).json({
        error: 'Cấu hình Sanity chưa sẵn sàng để xóa dữ liệu.',
      })
    }

    await sanityServerClient.delete(id)

    return res.status(200).json({
      success: true,
      message: 'Đã xóa bản ghi khỏi Sanity.',
    })
  } catch (error: any) {
    console.error('Delete contact error:', error)

    const errorMessage = error?.body?.error?.description || error?.responseBody || error?.message || ''
    const isPermissionError = /insufficient permissions|permission "delete" required/i.test(errorMessage)

    if (isPermissionError) {
      return res.status(403).json({
        error: 'Token Sanity hiện không có quyền xóa dữ liệu trên dataset này.',
      })
    }

    return res.status(500).json({
      error: 'Không thể xóa bản ghi. Vui lòng thử lại sau.',
    })
  }
}
