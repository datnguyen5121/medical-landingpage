import Layout from '../components/Layout'
import Link from 'next/link'

const news = [
  {
    id: 1,
    category: 'Sản phẩm mới',
    title: 'Mediplus ra mắt dòng Robot phục hồi chức năng thế hệ mới tích hợp AI',
    excerpt: 'Với công nghệ trí tuệ nhân tạo tiên tiến, dòng robot mới của Mediplus mang đến hiệu quả điều trị vượt trội cho bệnh nhân phục hồi sau đột quỵ và chấn thương tủy sống.',
    date: '15/05/2026',
    readTime: '3 phút đọc',
  },
  {
    id: 2,
    category: 'Tin tức ngành',
    title: 'Hội nghị thiết bị y tế Việt Nam 2026 – Mediplus tham dự và trình bày giải pháp mới',
    excerpt: 'Tại hội nghị thường niên về thiết bị y tế Việt Nam 2026, Mediplus đã trình bày loạt giải pháp thiết bị y tế hiện đại và ký kết hợp tác với nhiều bệnh viện lớn.',
    date: '10/05/2026',
    readTime: '5 phút đọc',
  },
  {
    id: 3,
    category: 'Khuyến mãi',
    title: 'Chương trình ưu đãi đặc biệt tháng 6/2026 cho các cơ sở y tế',
    excerpt: 'Nhân dịp kỷ niệm thành lập, Mediplus triển khai chương trình ưu đãi đặc biệt với chiết khấu lên đến 20% cho các đơn hàng thiết bị vật lý trị liệu trong tháng 6.',
    date: '05/05/2026',
    readTime: '2 phút đọc',
  },
  {
    id: 4,
    category: 'Kiến thức y tế',
    title: 'Vai trò của thiết bị vật lý trị liệu trong phục hồi sau đột quỵ',
    excerpt: 'Phục hồi chức năng sau đột quỵ đòi hỏi sự kết hợp giữa liệu pháp vật lý và thiết bị hỗ trợ hiện đại. Bài viết phân tích các thiết bị quan trọng nhất trong quá trình này.',
    date: '01/05/2026',
    readTime: '7 phút đọc',
  },
  {
    id: 5,
    category: 'Đối tác',
    title: 'Mediplus ký kết hợp tác chiến lược với Tập đoàn thiết bị y tế Hàn Quốc',
    excerpt: 'Thỏa thuận hợp tác mới mở ra cơ hội đưa thêm 50 sản phẩm thiết bị y tế tiên tiến của Hàn Quốc vào thị trường Việt Nam trong năm 2026.',
    date: '25/04/2026',
    readTime: '4 phút đọc',
  },
  {
    id: 6,
    category: 'Kiến thức y tế',
    title: 'Liệu pháp oxy cao áp – Giải pháp điều trị hiệu quả cho nhiều bệnh lý',
    excerpt: 'Buồng oxy cao áp (HBO) đang ngày càng được ứng dụng rộng rãi trong điều trị các bệnh lý từ vết thương khó lành đến chấn thương thần kinh. Tìm hiểu cơ chế và lợi ích.',
    date: '20/04/2026',
    readTime: '6 phút đọc',
  },
]

const categoryColors: Record<string, string> = {
  'Sản phẩm mới': 'bg-blue-100 text-blue-700',
  'Tin tức ngành': 'bg-gray-100 text-gray-700',
  'Khuyến mãi': 'bg-orange-100 text-orange-700',
  'Kiến thức y tế': 'bg-green-100 text-green-700',
  'Đối tác': 'bg-purple-100 text-purple-700',
}

export default function TinTucPage() {
  return (
    <Layout title="Tin Tức – Mediplus" description="Cập nhật tin tức mới nhất từ Mediplus về sản phẩm, ngành y tế và các chương trình ưu đãi">
      {/* Hero */}
      <section className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label text-blue-300 mb-2">Tin Tức</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Tin Tức &amp; Sự Kiện</h1>
          <p className="text-blue-200">Cập nhật thông tin mới nhất về sản phẩm, ngành y tế và các chương trình hợp tác</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured article */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200">
              <div className="h-56 bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                <span className="text-6xl">📰</span>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${categoryColors[news[0].category]}`}>
                    {news[0].category}
                  </span>
                  <span className="text-sm text-gray-400">{news[0].date} · {news[0].readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{news[0].title}</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{news[0].excerpt}</p>
                <Link href="/lien-he" className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                  Đọc thêm →
                </Link>
              </div>
            </div>
          </div>

          {/* Other articles */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(1).map((article) => (
              <div key={article.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow flex flex-col">
                <div className="h-40 bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
                  <span className="text-4xl">📄</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-sm font-semibold px-2.5 py-1 rounded-full ${categoryColors[article.category] ?? 'bg-gray-100 text-gray-700'}`}>
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-400">{article.readTime}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-gray-500 flex-1 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-400">{article.date}</span>
                    <Link href="/lien-he" className="text-sm text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                      Đọc thêm →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
