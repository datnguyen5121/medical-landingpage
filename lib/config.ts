export const SITE_NAME = 'MediWellness'

// Số hotline hiển thị và dùng cho liên kết tel:/Zalo (định dạng quốc tế cho Zalo)
export const HOTLINE = '0968348698'
export const HOTLINE_TEL = `tel:${HOTLINE}`
export const ZALO_URL = `https://zalo.me/${HOTLINE}`

// Origin tuyệt đối của site, dùng cho canonical, og:url và sitemap (vd. https://example.com)
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/+$/, '')
