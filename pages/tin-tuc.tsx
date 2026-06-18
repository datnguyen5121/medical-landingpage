import Layout from '../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles, SanityArticle } from '../lib/sanity/queries'
import { urlFor } from '../lib/sanity/image'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

interface TinTucPageProps {
  articles: SanityArticle[]
  featuredArticle: SanityArticle | null
}

const categoryColors: Record<string, string> = {
  'Sản phẩm mới': 'bg-blue-100 text-blue-700',
  'Tin tức ngành': 'bg-gray-100 text-gray-700',
  'Khuyến mãi': 'bg-orange-100 text-orange-700',
  'Kiến thức y tế': 'bg-green-100 text-green-700',
  'Đối tác': 'bg-purple-100 text-purple-700',
  'Sự kiện': 'bg-pink-100 text-pink-700',
  'Hướng dẫn': 'bg-indigo-100 text-indigo-700',
}

export default function TinTucPage({ articles, featuredArticle }: TinTucPageProps) {
  const otherArticles = featuredArticle
    ? articles.filter(a => a._id !== featuredArticle._id)
    : articles.slice(1)

  return (
    <Layout title="Tin Tức – RobotMediplus" description="Cập nhật tin tức mới nhất từ RobotMediplus về sản phẩm, ngành y tế và các chương trình ưu đãi">
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
          {featuredArticle && (
            <div className="mb-12">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                {featuredArticle.mainImage && (
                  <div className="h-56 relative bg-gray-200">
                    <Image
                      src={urlFor(featuredArticle.mainImage).url()}
                      alt={featuredArticle.mainImage.alt || featuredArticle.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {!featuredArticle.mainImage && (
                  <div className="h-56 bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                    <span className="text-6xl">📰</span>
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${categoryColors[featuredArticle.category] || 'bg-gray-100 text-gray-700'}`}>
                      {featuredArticle.category}
                    </span>
                    <span className="text-sm text-gray-400">
                      {format(new Date(featuredArticle.publishedAt), 'dd/MM/yyyy', { locale: vi })} · {featuredArticle.readTime} phút đọc
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{featuredArticle.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">{featuredArticle.excerpt}</p>
                  <Link href={`/tin-tuc/${featuredArticle.slug.current}`} className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    Đọc thêm →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Other articles */}
          {otherArticles.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherArticles.map((article) => (
                <div key={article._id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow flex flex-col">
                  {article.mainImage && (
                    <div className="h-40 relative bg-gray-200">
                      <Image
                        src={urlFor(article.mainImage).url()}
                        alt={article.mainImage.alt || article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {!article.mainImage && (
                    <div className="h-40 bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
                      <span className="text-4xl">📄</span>
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-sm font-semibold px-2.5 py-1 rounded-full ${categoryColors[article.category] ?? 'bg-gray-100 text-gray-700'}`}>
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-400">{article.readTime} phút</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-gray-500 flex-1 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-400">
                        {format(new Date(article.publishedAt), 'dd/MM/yyyy', { locale: vi })}
                      </span>
                      <Link href={`/tin-tuc/${article.slug.current}`} className="text-sm text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                        Đọc thêm →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {articles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Chưa có bài viết nào. Vui lòng quay lại sau.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  try {
    const articles = await getAllArticles()
    const featuredArticle = articles.find(a => a.isFeatured) || articles[0] || null

    return {
      props: {
        articles,
        featuredArticle,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching articles:', error)
    return {
      props: {
        articles: [],
        featuredArticle: null,
      },
      revalidate: 60,
    }
  }
}
