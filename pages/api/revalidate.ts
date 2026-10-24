import type { NextApiRequest, NextApiResponse } from 'next'

// Webhook Sanity -> làm mới ISR ngay khi nội dung thay đổi.
// Cấu hình webhook: POST https://<site>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
// Body (projection): { "_type": _type, "slug": slug.current }
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret || req.query.secret !== secret) {
    return res.status(401).json({ error: 'Invalid secret' })
  }

  const type = req.body?._type as string | undefined
  const slug = req.body?.slug as string | undefined
  const paths = new Set<string>(['/'])
  if (type === 'category') {
    paths.add('/san-pham')
  } else if (type === 'product') {
    paths.add('/san-pham')
    if (slug) paths.add(`/san-pham/${slug}`)
  } else if (type === 'article') {
    paths.add('/tin-tuc')
    if (slug) paths.add(`/tin-tuc/${slug}`)
  }

  try {
    await Promise.all([...paths].map((p) => res.revalidate(p)))
    return res.status(200).json({ revalidated: [...paths] })
  } catch (error) {
    console.error('Revalidate error:', error)
    return res.status(500).json({ error: 'Revalidate failed' })
  }
}
