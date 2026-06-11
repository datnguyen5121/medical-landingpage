import Layout from "../components/Layout"
import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/router"

export default function LienHePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    position: "",
    organization: "",
    productInterest: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (router.query.product) {
      setFormData((prev) => ({
        ...prev,
        productInterest: router.query.product as string,
      }))
    }
  }, [router.query.product])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Gửi yêu cầu thất bại")
      }

      setSubmitted(true)
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        position: "",
        organization: "",
        productInterest: router.query.product ? (router.query.product as string) : "",
        message: "",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Liên Hệ – Mediplus" description="Liên hệ với Mediplus để được tư vấn thiết bị y tế">
      {/* Hero */}
      <section className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label text-blue-300 mb-2">Hỗ Trợ Khách Hàng</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-blue-200">Đội ngũ chuyên gia kỹ thuật sẵn sàng hỗ trợ quý khách trong giờ hành chính</p>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-10">

          {/* Left: info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h2 className="text-base font-bold text-slate-900 mb-5 pb-3 border-b border-slate-100">
                Thông Tin Liên Hệ
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />,
                    label: "Trụ sở chính",
                    value: "Tầng 5, Tòa nhà ABC, 123 Đường XYZ, Hà Nội",
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                    label: "Hotline",
                    value: "0968348698",
                    href: "tel:19000000",
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                    label: "Email",
                    value: "info@mediplus.vn",
                    href: "mailto:info@mediplus.vn",
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
                    label: "Giờ làm việc",
                    value: "Thứ 2 – Thứ 7: 08:00 – 17:30",
                  },
                ].map((info) => (
                  <div key={info.label} className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {info.icon}
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 uppercase tracking-wide font-medium">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="text-base text-blue-700 font-semibold hover:text-blue-900 transition-colors">{info.value}</a>
                      ) : (
                        <p className="text-base text-slate-800 font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick call CTA */}
            <div className="bg-blue-900 text-white rounded-lg p-6">
              <p className="font-semibold mb-1">Cần báo giá ngay?</p>
              <p className="text-blue-200 text-sm mb-4">Gọi trực tiếp để được hỗ trợ nhanh nhất</p>
              <a href="tel:19000000" className="flex items-center justify-center gap-2 w-full py-3 bg-yellow-400 text-blue-900 font-bold rounded text-sm hover:bg-yellow-300 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Gọi Ngay: 0968348698
              </a>
            </div>

            {/* Map placeholder */}
            <div className="bg-white border border-slate-200 rounded-lg h-44 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <svg className="w-8 h-8 mx-auto mb-2 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span className="text-sm">Google Maps</span>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-slate-200 rounded-lg p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Gửi Yêu Cầu Tư Vấn / Báo Giá</h2>
              <p className="text-base text-slate-500 mb-6">Vui lòng điền đầy đủ thông tin. Chúng tôi sẽ phản hồi trong vòng 4 giờ làm việc.</p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-green-800 mb-1">Gửi yêu cầu thành công!</h3>
                  <p className="text-sm text-green-700 mb-4">Chúng tôi sẽ liên hệ lại trong vòng 4 giờ làm việc.</p>
                  <button onClick={() => setSubmitted(false)} className="text-sm text-blue-700 hover:underline font-medium">
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                      {error}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                          Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Họ và tên" className="w-full border border-slate-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                          Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="0901 234 567" className="w-full border border-slate-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" className="w-full border border-slate-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Chức vụ</label>
                        <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Giám đốc / Trưởng khoa..." className="w-full border border-slate-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600" />
                      </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                        Tên bệnh viện / Cơ sở y tế <span className="text-red-500">*</span>
                      </label>
                      <input type="text" name="organization" value={formData.organization} onChange={handleChange} required placeholder="Bệnh viện / Phòng khám / Trung tâm..." className="w-full border border-slate-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Sản phẩm quan tâm</label>
                      <input type="text" name="productInterest" value={formData.productInterest} onChange={handleChange} placeholder="Tên sản phẩm / danh mục thiết bị..." className="w-full border border-slate-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">Nội dung yêu cầu</label>
                      <textarea rows={5} name="message" value={formData.message} onChange={handleChange} placeholder="Mô tả nhu cầu, số lượng, thông số kỹ thuật yêu cầu (nếu có)..." className="w-full border border-slate-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 resize-none" />
                    </div>

                    <div className="pt-2">
                      <button type="submit" disabled={loading} className="w-full py-4 bg-blue-700 text-white font-semibold rounded text-base hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? "Đang gửi..." : "Gửi Yêu Cầu Tư Vấn"}
                      </button>
                      <p className="text-sm text-slate-400 text-center mt-3">
                        Thông tin của quý khách được bảo mật tuyệt đối. Phản hồi trong vòng 4 giờ làm việc.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
