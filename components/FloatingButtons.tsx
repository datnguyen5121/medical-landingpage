'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function FloatingButtons() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const buttons = [
    {
      id: 'phone',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      bgColor: 'bg-red-500',
      href: 'tel:0968348698',
      label: 'Gọi ngay',
    },
    {
      id: 'zalo',
      icon: null,
      bgColor: 'bg-blue-500',
      href: 'https://zalo.me/0968348698',
      label: 'Zalo',
      target: '_blank',
      useImage: true,
    },
    {
      id: 'category',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
        </svg>
      ),
      bgColor: 'bg-green-500',
      href: '/san-pham',
      label: 'Danh Mục Sản Phẩm',
    },
    {
      id: 'messenger',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l6.29-.97C9.02 21.66 10.5 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.41 0-2.73-.36-3.88-.99l-.28-.15-2.89.44.44-2.89-.15-.28C4.36 14.73 4 13.41 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm3.5-9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-7 0c-.83 0-1.5-.67-1.5-1.5S7.67 8 8.5 8s1.5.67 1.5 1.5S9.33 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
        </svg>
      ),
      bgColor: 'bg-blue-600',
      href: 'https://m.me/mediplus.vn',
      label: 'Messenger',
      target: '_blank',
    },
  ]

  const handleClick = (href: string, target?: string) => {
    if (target === '_blank') {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else if (href.startsWith('tel:')) {
      window.location.href = href
    } else {
      window.location.href = href
    }
  }

  return (
    <div className="fixed left-4 bottom-8 flex flex-col gap-3 z-40">
      {buttons.map((btn) => (
        <div
          key={btn.id}
          className="flex items-center gap-3"
          onMouseEnter={() => setHoveredId(btn.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Button */}
          <button
            onClick={() => handleClick(btn.href, btn.target)}
            className={`${btn.bgColor} text-white ${btn.useImage ? '' : 'p-4'} rounded-full shadow-lg flex items-center justify-center cursor-pointer relative`}
            aria-label={btn.label}
            type="button"
          >
            {btn.useImage ? (
              <Image
                src="/images/logo-zalo-vector.png"
                alt="Zalo"
                width={60}
                height={60}
              />
            ) : (
              btn.icon
            )}
          </button>

          {/* Label */}
          {hoveredId === btn.id && (
            <div className="bg-slate-800 text-white text-sm px-3 py-2 rounded-md whitespace-nowrap">
              {btn.label}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
