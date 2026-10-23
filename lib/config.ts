export const SITE_NAME = 'MediWellness'

// Số hotline hiển thị và dùng cho liên kết tel:/Zalo (định dạng quốc tế cho Zalo)
export const HOTLINE = '0968348698'
export const HOTLINE_TEL = `tel:${HOTLINE}`
export const ZALO_URL = `https://zalo.me/${HOTLINE}`

// Origin tuyệt đối của site, dùng cho canonical, og:url và sitemap (vd. https://example.com)
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/+$/, '')

// Link Messenger (vd. https://m.me/<tên-trang>). Để trống thì ẩn nút Messenger.
export const MESSENGER_URL = process.env.NEXT_PUBLIC_MESSENGER_URL || ''

// Địa chỉ trụ sở hiển thị ở trang liên hệ. Để trống thì ẩn dòng địa chỉ.
export const ADDRESS = process.env.NEXT_PUBLIC_ADDRESS || ''
