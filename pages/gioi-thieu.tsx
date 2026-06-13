import Layout from '../components/Layout'
import Link from 'next/link'

export default function GioiThieuPage() {
  return (
    <Layout title="Giới Thiệu – RobotMediplus" description="Tìm hiểu về RobotMediplus – nhà nhập khẩu và phân phối thiết bị y tế hàng đầu Việt Nam">
      {/* Hero */}
      <section className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label text-blue-300 mb-2">Về Chúng Tôi</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">RobotMediplus – Đối Tác Tin Cậy Của Ngành Y Tế</h1>
          <p className="text-blue-200 max-w-2xl">Hơn 10 năm đồng hành cùng 100+ cơ sở y tế trên toàn quốc</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-600 font-semibold uppercase tracking-wide text-sm">Câu chuyện của chúng tôi</span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 mb-4">Hơn 10 Năm Phục Vụ Ngành Y Tế</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              RobotMediplus được thành lập với sứ mệnh mang những thiết bị y tế chất lượng cao, tiên tiến nhất từ các nước có nền y tế phát triển về Việt Nam, góp phần nâng cao chất lượng chăm sóc sức khỏe cho người dân.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Trải qua hơn 10 năm phát triển, chúng tôi đã xây dựng được mạng lưới đối tác rộng khắp cả nước với hơn 500 bệnh viện, phòng khám và trung tâm phục hồi chức năng tin tưởng sử dụng sản phẩm.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Danh mục sản phẩm của RobotMediplus liên tục được mở rộng với hơn 300 sản phẩm từ các thương hiệu hàng đầu thế giới, đáp ứng đầy đủ nhu cầu của các cơ sở y tế từ tuyến cơ sở đến trung ương.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '10+', label: 'Năm kinh nghiệm', color: 'bg-blue-50' },
              { value: '300+', label: 'Sản phẩm', color: 'bg-teal-50' },
              { value: '100+', label: 'Đối tác y tế', color: 'bg-indigo-50' },
              { value: '63', label: 'Tỉnh thành phủ sóng', color: 'bg-purple-50' },
            ].map((s) => (
              <div key={s.label} className={`${s.color} rounded-2xl p-6 text-center`}>
                <div className="text-4xl font-bold text-blue-700">{s.value}</div>
                <div className="text-sm text-gray-600 mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Value */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Tầm Nhìn – Sứ Mệnh – Giá Trị Cốt Lõi</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Sứ Mệnh',
                content: 'Mang đến những giải pháp thiết bị y tế tiên tiến, giúp các cơ sở y tế nâng cao chất lượng điều trị và cải thiện sức khỏe cộng đồng Việt Nam.',
              },
              {
                icon: '🔭',
                title: 'Tầm Nhìn',
                content: 'Trở thành nhà phân phối thiết bị y tế số 1 Việt Nam, được tin tưởng bởi tất cả các cơ sở y tế trên toàn quốc vào năm 2030.',
              },
              {
                icon: '💎',
                title: 'Giá Trị Cốt Lõi',
                content: 'Chất lượng – Uy tín – Tận tâm – Đổi mới. Chúng tôi đặt lợi ích khách hàng lên hàng đầu trong mọi quyết định kinh doanh.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Chứng Nhận & Tiêu Chuẩn</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['ISO 13485', 'CE Marking', 'GMP-WHO', 'FDA Cleared'].map((cert) => (
              <div key={cert} className="border-2 border-blue-200 rounded-2xl p-6 text-center hover:border-blue-500 transition-colors">
                <div className="text-3xl mb-2">🏆</div>
                <div className="font-bold text-blue-700 text-lg">{cert}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Hợp tác cùng RobotMediplus</h2>
            <p className="text-blue-200">Trở thành đối tác phân phối hoặc liên hệ để được tư vấn sản phẩm</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/doi-tac" className="px-6 py-3 bg-white text-blue-900 font-semibold rounded text-sm hover:bg-blue-50 transition-colors">
              Trở Thành Đối Tác
            </Link>
            <Link href="/lien-he" className="px-6 py-3 border border-blue-500 text-white font-semibold rounded text-sm hover:bg-blue-800 transition-colors">
              Yêu Cầu Báo Giá
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
