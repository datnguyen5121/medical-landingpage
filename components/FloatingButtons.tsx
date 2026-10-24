import Image from 'next/image'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { trackQuoteConversion } from '../lib/gtag'
import { HOTLINE_TEL, ZALO_URL, MESSENGER_URL } from '../lib/config'

interface FloatingButton {
  id: string
  label: string
  href: string
  bgColor: string
  external?: boolean
  /** Chỉ hiện từ màn hình md trở lên (mobile đã có thanh điều hướng) */
  desktopOnly?: boolean
  icon: ReactNode
}

const PhoneIcon = (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const GridIcon = (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
  </svg>
)

const MessengerIcon = (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l6.29-.97C9.02 21.66 10.5 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 13.5l-2.5-2.67-4.88 2.67 5.37-5.7 2.56 2.67 4.82-2.67L13 15.5z" />
  </svg>
)

const buttons: FloatingButton[] = [
  { id: 'phone', label: 'Gọi ngay', href: HOTLINE_TEL, bgColor: 'bg-red-500', icon: PhoneIcon },
  {
    id: 'zalo',
    label: 'Chat Zalo',
    href: ZALO_URL,
    bgColor: 'bg-blue-500',
    external: true,
    icon: <Image src="/images/icons/zalo.png" alt="" width={48} height={48} />,
  },
  ...(MESSENGER_URL
    ? [{ id: 'messenger', label: 'Messenger', href: MESSENGER_URL, bgColor: 'bg-blue-600', external: true, icon: MessengerIcon }]
    : []),
  { id: 'category', label: 'Danh mục sản phẩm', href: '/san-pham', bgColor: 'bg-green-500', desktopOnly: true, icon: GridIcon },
]

export default function FloatingButtons() {
  const { pathname } = useRouter()
  // Trang chi tiết sản phẩm có thanh CTA dính ở đáy trên mobile, nâng cụm nút lên để không đè
  const raise = pathname === '/san-pham/[id]' ? 'bottom-24 md:bottom-6' : 'bottom-5 md:bottom-6'

  return (
    <nav aria-label="Liên hệ nhanh" className={`fixed right-3 md:right-5 ${raise} flex flex-col gap-3 z-40`}>
      {buttons.map((btn) => (
        <a
          key={btn.id}
          href={btn.href}
          {...(btn.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          onClick={btn.id === 'category' ? undefined : trackQuoteConversion}
          aria-label={btn.label}
          className={`group relative ${btn.desktopOnly ? 'hidden md:flex' : 'flex'} ${btn.bgColor} text-white w-12 h-12 rounded-full shadow-lg items-center justify-center overflow-visible focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900`}
        >
          {btn.icon}
          <span className="pointer-events-none absolute right-14 hidden md:block whitespace-nowrap rounded-md bg-slate-800 px-3 py-2 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            {btn.label}
          </span>
        </a>
      ))}
    </nav>
  )
}
