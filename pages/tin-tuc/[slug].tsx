import Layout from '../../components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import { getArticleBySlug, getAllArticleSlugs, getRelatedArticles, SanityArticle } from '../../lib/sanity/queries'
import { urlFor } from '../../lib/sanity/image'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { PortableText } from '@portabletext/react'

interface ArticlePageProps {
  article: SanityArticle
  relatedArticles: SanityArticle[]
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

const components = {
  types: {
    image: ({ value }: any) => (
      <div className="relative w-full h-96 my-6 rounded-lg overflow-hidden">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || 'Article image'}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold my-4 text-gray-900">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold my-3 text-gray-900">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold my-3 text-gray-900">{children}</h3>,
    normal: ({ children }: any) => <p className="text-gray-700 my-3 leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside my-3 text-gray-700 space-y-1">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside my-3 text-gray-700 space-y-1">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="ml-2">{children}</li>,
    number: ({ children }: any) => <li className="ml-2">{children}</li>,
  },
}

export default function ArticlePage({ article, relatedArticles }: ArticlePageProps) {
  return (
    <Layout
      title={article.seoTitle || article.title}
      description={article.seoDescription || article.excerpt}
    >
      {/* Hero */}
      <section className="bg-blue-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/tin-tuc" className="text-blue-200 hover:text-blue-100 mb-4 inline-block">
            ← Quay lại
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${categoryColors[article.category] || 'bg-gray-100 text-gray-700'}`}>
              {article.category}
            </span>
            <span className="text-blue-200">
              {format(new Date(article.publishedAt), 'dd/MM/yyyy', { locale: vi })}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{article.title}</h1>
          <div className="flex items-center gap-4 text-blue-200">
            {article.author && <span>Tác giả: {article.author}</span>}
            <span>Thời gian đọc: {article.readTime} phút</span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured image */}
          {article.mainImage && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={urlFor(article.mainImage).url()}
                alt={article.mainImage.alt || article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article content */}
          <div className="prose prose-lg max-w-none mb-8">
            {article.content && <PortableText value={article.content} components={components} />}
            {!article.content && <p className="text-gray-700 leading-relaxed">{article.excerpt}</p>}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 py-6 border-t border-b border-gray-200">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Bài Viết Liên Quan</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link key={related._id} href={`/tin-tuc/${related.slug.current}`}>
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow flex flex-col h-full">
                    {related.mainImage && (
                      <div className="h-40 relative bg-gray-200">
                        <Image
                          src={urlFor(related.mainImage).url()}
                          alt={related.mainImage.alt || related.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    {!related.mainImage && (
                      <div className="h-40 bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
                        <span className="text-4xl">📄</span>
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-sm font-semibold px-2.5 py-1 rounded-full ${categoryColors[related.category] ?? 'bg-gray-100 text-gray-700'}`}>
                          {related.category}
                        </span>
                        <span className="text-sm text-gray-400">{related.readTime} phút</span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{related.title}</h3>
                      <p className="text-sm text-gray-500 flex-1 line-clamp-3">{related.excerpt}</p>
                      <div className="mt-auto pt-4">
                        <span className="text-sm text-blue-600 font-semibold">Đọc thêm →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Hỏi Về Sản Phẩm?</h2>
          <p className="text-blue-200 mb-6 text-lg">Liên hệ với đội ngũ của chúng tôi để tìm hiểu thêm về các giải pháp thiết bị y tế tiên tiến</p>
          <Link href="/lien-he" className="inline-block bg-white text-blue-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
            Gửi Yêu Cầu Liên Hệ
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticPaths() {
  try {
    const slugs = await getAllArticleSlugs()
    const paths = slugs.map((item) => ({
      params: { slug: item.slug },
    }))

    return {
      paths,
      fallback: 'blocking',
    }
  } catch (error) {
    console.error('Error fetching article slugs:', error)
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const article = await getArticleBySlug(params.slug)

    if (!article) {
      return {
        notFound: true,
      }
    }

    const relatedArticles = await getRelatedArticles(article.category, params.slug, 3)

    return {
      props: {
        article,
        relatedArticles,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    return {
      notFound: true,
    }
  }
}
