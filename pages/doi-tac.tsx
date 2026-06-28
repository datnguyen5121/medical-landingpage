import Layout from '../components/Layout'
import Link from 'next/link'

const benefits = [
  {
    icon: '💰',
    title: 'Chiết khấu hấp dẫn',
    description: 'Chính sách chiết khấu cạnh tranh theo doanh số, đảm bảo lợi nhuận tối ưu cho đối tác.',
  },
  {
    icon: '📦',
    title: 'Hỗ trợ hàng tồn kho',
    description: 'Chính sách đổi trả hàng linh hoạt, hỗ trợ tối ưu hóa hàng tồn kho cho đại lý.',
  },
  {
    icon: '🎓',
    title: 'Đào tạo chuyên môn',
    description: 'Cung cấp tài liệu kỹ thuật, đào tạo sử dụng và bảo trì thiết bị miễn phí.',
  },
  {
    icon: '📣',
    title: 'Hỗ trợ Marketing',
    description: 'Tài liệu quảng cáo, brochure, hỗ trợ truyền thông và quảng bá sản phẩm.',
  },
  {
    icon: '🔧',
    title: 'Bảo hành & Bảo trì',
    description: 'Hỗ trợ kỹ thuật, bảo hành chính hãng và dịch vụ bảo trì chuyên nghiệp.',
  },
  {
    icon: '🤝',
    title: 'Quan hệ lâu dài',
    description: 'Xây dựng mối quan hệ đối tác bền vững, cùng phát triển lâu dài.',
  },
]

const partnerTypes = [
  {
    title: 'Đại lý cấp 1',
    description: 'Phân phối trực tiếp với chiết khấu cao nhất, có quyền phân phối độc quyền theo khu vực.',
    requirement: 'Doanh số tối thiểu 500 triệu/năm',
    color: 'border-yellow-400 bg-yellow-50',
  },
  {
    title: 'Đại lý cấp 2',
    description: 'Phân phối tại địa phương với chiết khấu hấp dẫn và hỗ trợ đầy đủ từ MediWellness.',
    requirement: 'Doanh số tối thiểu 200 triệu/năm',
    color: 'border-blue-400 bg-blue-50',
  },
  {
    title: 'Nhà phân phối',
    description: 'Phù hợp cho bệnh viện, phòng khám có nhu cầu mua trực tiếp với giá ưu đãi.',
    requirement: 'Đơn hàng tối thiểu theo thỏa thuận',
    color: 'border-teal-400 bg-teal-50',
  },
]

export default function DoiTacPage() {
  return (
    <Layout title="Trở Thành Đối Tác – MediWellness" description="Cơ hội hợp tác phân phối thiết bị y tế cùng MediWellness">
      {/* Hero */}
      <section className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label text-blue-300 mb-2">Hợp Tác</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Trở Thành Đối Tác MediWellness</h1>
          <p className="text-blue-200 max-w-2xl">Cùng MediWellness mở rộng mạng lưới thiết bị y tế trên toàn quốc, xây dựng mối quan hệ đối tác bền vững</p>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Lợi Ích Khi Hợp Tác Với MediWellness</h2>
            <p className="mt-2 text-gray-500">Chúng tôi cam kết đồng hành và hỗ trợ đối tác phát triển bền vững</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 bg-gray-50 rounded-2xl hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Các Cấp Đối Tác</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {partnerTypes.map((pt) => (
              <div key={pt.title} className={`rounded-2xl border-2 p-8 ${pt.color}`}>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{pt.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{pt.description}</p>
                <div className="text-sm font-semibold text-blue-700 bg-white/70 rounded-lg px-3 py-2">
                  📋 {pt.requirement}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Quy Trình Đăng Ký Đối Tác</h2>
          </div>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Gửi thông tin đăng ký', desc: 'Điền form liên hệ hoặc gọi hotline để chúng tôi tiếp nhận thông tin.' },
              { step: '02', title: 'Tư vấn & Khảo sát', desc: 'Đội ngũ kinh doanh sẽ liên hệ tư vấn và khảo sát nhu cầu hợp tác.' },
              { step: '03', title: 'Ký kết hợp đồng', desc: 'Thống nhất điều khoản hợp tác và ký kết hợp đồng đại lý chính thức.' },
              { step: '04', title: 'Bắt đầu hợp tác', desc: 'Nhận hỗ trợ đào tạo, tài liệu và bắt đầu phân phối sản phẩm.' },
            ].map((s) => (
              <div key={s.step} className="flex gap-5 items-start">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  {s.step}
                </div>
                <div className="pt-1">
                  <h4 className="font-bold text-gray-900">{s.title}</h4>
                  <p className="text-gray-500 text-sm mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Sẵn sàng trở thành đối tác?</h2>
            <p className="text-blue-200">Liên hệ ngay để được tư vấn chương trình hợp tác phù hợp</p>
          </div>
          <Link href="/lien-he" className="px-6 py-3 bg-white text-blue-900 font-semibold rounded text-sm hover:bg-blue-50 transition-colors shrink-0">
            Đăng Ký Ngay
          </Link>
        </div>
      </section>
    </Layout>
  )
}
