import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const navLinks = [
  { href: "/", label: "Trang Chủ" },
  { href: "/gioi-thieu", label: "Giới Thiệu" },
  { href: "/san-pham", label: "Sản Phẩm" },
  { href: "/doi-tac", label: "Đối Tác" },
  { href: "/tin-tuc", label: "Tin Tức" },
  { href: "/lien-he", label: "Liên Hệ" },
]

export default function Navbar() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top info bar */}
      <div className="bg-blue-900 text-blue-100 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center justify-between gap-4">
          <span className="hidden sm:flex items-center gap-1.5">
            <svg className="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Thứ 2 – Thứ 7: 08:00 – 17:30
          </span>
          <div className="flex items-center gap-5 ml-auto">
            <a href="mailto:info@mediplus.vn" className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@mediplus.vn
            </a>
            <a href="tel:19000000" className="flex items-center gap-1.5 font-semibold text-white hover:text-yellow-300 transition-colors">
              <svg className="w-3.5 h-3.5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Hotline: 0968348698
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 bg-blue-800 rounded flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold text-blue-900 tracking-tight leading-none block">MEDIPLUS</span>
              <span className="text-xs text-slate-500 leading-none tracking-wide">THIẾT BỊ Y TẾ</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 text-base font-medium transition-colors border-b-2 ${
                  router.pathname === link.href
                    ? "border-blue-700 text-blue-800"
                    : "border-transparent text-slate-600 hover:text-blue-800 hover:border-blue-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/lien-he"
              className="px-6 py-3 bg-blue-700 text-white rounded text-base font-semibold hover:bg-blue-800 transition-colors"
            >
              Yêu Cầu Báo Giá
            </Link>
          </div>

          {/* Mobile button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 text-base font-medium border-l-2 mt-1 transition-colors ${
                router.pathname === link.href
                  ? "border-blue-700 text-blue-800 bg-blue-50"
                  : "border-transparent text-slate-600 hover:text-blue-800 hover:bg-slate-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/lien-he"
            onClick={() => setOpen(false)}
            className="block mt-3 px-5 py-2.5 bg-blue-700 text-white rounded text-sm font-semibold text-center hover:bg-blue-800 transition-colors"
          >
            Yêu Cầu Báo Giá
          </Link>
        </div>
      )}
    </header>
  )
}
