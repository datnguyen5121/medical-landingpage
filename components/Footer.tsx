import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8 grid grid-cols-1 md:grid-cols-12 gap-10">

        {/* Brand */}
        <div className="md:col-span-4">
          <Link href="/" className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 bg-blue-600 rounded flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight leading-none block">MEDIPLUS</span>
              <span className="text-[10px] text-slate-400 leading-none tracking-wide">THIẾT BỊ Y TẾ</span>
            </div>
          </Link>
          <p className="text-sm leading-relaxed mb-5">
            Nhà nhập khẩu &amp; phân phối thiết bị y tế hàng đầu Việt Nam. Cam kết chất lượng – uy tín – tận tâm phục vụ.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2.5">
              <svg className="w-4 h-4 mt-0.5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Tầng 5, Tòa nhà ABC, 123 Đường XYZ, Hà Nội</span>
            </div>
            <a href="tel:19000000" className="flex items-center gap-2.5 hover:text-white transition-colors">
              <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Hotline: 0968348698
            </a>
            <a href="mailto:robotmediplus@gmail.com" className="flex items-center gap-2.5 hover:text-white transition-colors">
              <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              robotmediplus@gmail.com
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="md:col-span-2">
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Trang</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { href: "/", label: "Trang Chủ" },
              { href: "/gioi-thieu", label: "Giới Thiệu" },
              { href: "/san-pham", label: "Sản Phẩm" },
              { href: "/doi-tac", label: "Đối Tác" },
              { href: "/tin-tuc", label: "Tin Tức" },
              { href: "/lien-he", label: "Liên Hệ" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div className="md:col-span-3">
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Sản Phẩm Nổi Bật</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              "Robot tập phục hồi chức năng",
              "Buồng oxy cao áp",
              "Cabin thải độc sinh học",
              "Máy Laser trị liệu",
              "Máy kéo giãn cột sống",
              "Máy từ trường trị liệu",
              "Máy siêu âm trị liệu",
            ].map((p) => (
              <li key={p}>
                <Link href="/san-pham" className="hover:text-white transition-colors leading-snug">
                  {p}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Certifications */}
        <div className="md:col-span-3">
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Chứng Nhận</h4>
          <div className="grid grid-cols-2 gap-2">
            {["ISO 13485", "CE Marking", "GMP-WHO", "FDA Cleared"].map((cert) => (
              <div key={cert} className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-center text-xs font-semibold text-slate-300">
                {cert}
              </div>
            ))}
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-500 mb-3">Đăng ký nhận thông tin mới nhất</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button className="px-3 py-2 bg-blue-700 text-white rounded text-xs font-semibold hover:bg-blue-600 transition-colors shrink-0">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Mediplus Vietnam. Giấy phép kinh doanh số: XXXXXXXXXX</span>
          <span>Thiết kế bởi đội ngũ Mediplus</span>
        </div>
      </div>
    </footer>
  )
}
