import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityClient } from '../../lib/sanity/client'

interface ContactData {
  fullName: string
  phone: string
  email?: string
  position?: string
  organization: string
  productInterest?: string
  message?: string
}

interface ApiResponse {
  success?: boolean
  error?: string
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { fullName, phone, email, position, organization, productInterest, message }: ContactData = req.body

    // Validate required fields
    if (!fullName || !phone || !organization) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Create document in Sanity
    const doc = await sanityClient.create({
      _type: 'contact',
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email?.trim() || null,
      position: position?.trim() || null,
      organization: organization.trim(),
      productInterest: productInterest?.trim() || null,
      message: message?.trim() || null,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    })

    return res.status(200).json({
      success: true,
      message: 'Yêu cầu của bạn đã được gửi thành công!',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(500).json({
      error: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
    })
  }
}
