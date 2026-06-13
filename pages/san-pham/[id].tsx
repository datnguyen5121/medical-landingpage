import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { PortableText } from "@portabletext/react"
import Layout from "../../components/Layout"
import { getAllProductSlugs, getProductBySlugWithGalleries, getRelatedProducts, SanityProduct } from "../../lib/sanity/queries"
import { urlFor } from "../../lib/sanity/image"

interface Props {
  product: SanityProduct
  related: SanityProduct[]
}

function ImageGallery({ product }: { product: SanityProduct }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const allImages = [
    ...(product.mainImage ? [product.mainImage] : []),
    ...(product.galleries || [])
  ]
  
  if (allImages.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl flex items-center justify-center h-96 relative overflow-hidden">
        <svg className="w-32 h-32 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8}
            d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
        </svg>
      </div>
    )
  }
  
  const currentImage = allImages[activeImageIndex]
  
  const handlePrevious = () => {
    setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }
  
  const handleNext = () => {
    setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }
  
  return (
    <div className="space-y-3">
      <div className="bg-white border border-slate-200 rounded-xl flex items-center justify-center h-96 relative overflow-hidden group">
        <Image
          src={urlFor(currentImage).width(800).height(800).url()}
          alt={currentImage.alt || "Sản phẩm"}
          fill
          className="object-contain p-6 drop-shadow-md"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        {product.isBestSeller && (
          <span className="absolute top-4 left-4 bg-blue-700 text-white text-sm font-bold px-4 py-1.5 rounded-full">Bán chạy</span>
        )}
        
        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 shadow-lg hover:shadow-xl z-10"
              aria-label="Ảnh trước"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 shadow-lg hover:shadow-xl z-10"
              aria-label="Ảnh tiếp theo"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
      
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${activeImageIndex === idx ? 'border-blue-700 ring-2 ring-blue-700/50' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <Image
                src={urlFor(img).width(100).height(100).url()}
                alt={`Ảnh ${idx + 1}`}
                width={100}
                height={100}
                className="w-full h-full object-contain bg-slate-50"
              />
            </button>
          ))}
        </div>
      )}
      
      {allImages.length > 1 && (
        <div className="text-center text-sm text-slate-500">Ảnh {activeImageIndex + 1} / {allImages.length}</div>
      )}
      
      <div className="flex gap-3 mt-4">
        {["CE", "ISO 13485", "GMP-WHO"].map((cert) => (
          <div key={cert} className="flex-1 bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-center">
            <p className="text-xs font-bold text-blue-800">{cert}</p>
            <p className="text-xs text-slate-400">Chứng nhận</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProductDetail({ product, related }: Props) {
  return (
    <Layout
      title={`${product.seoTitle || product.name} | Mediplus`}
      description={product.shortDescription || product.name}
    >
      {/* ── BREADCRUMB ───────────────────────────────────────────────────── */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-700 transition-colors">Trang chủ</Link>
            <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/san-pham" className="hover:text-blue-700 transition-colors">Sản phẩm</Link>
            <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link
              href={`/san-pham?category=${encodeURIComponent(product.category)}`}
              className="hover:text-blue-700 transition-colors"
            >
              {product.category}
            </Link>
            <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-800 font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── PRODUCT HERO ─────────────────────────────────────────────────── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left: Image Gallery */}
            <div>
              <ImageGallery product={product} />
            </div>

            {/* Right: Info */}
            <div>
              <span className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full border border-blue-200 mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-4">{product.name}</h1>
              {product.shortDescription && (
                <p className="text-base text-slate-600 leading-relaxed mb-6">{product.shortDescription}</p>
              )}

              {/* Features */}
              <div className="mb-8">
                {product.features && product.features?.length > 0 &&
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Tính năng nổi bật</h3>
                
                }
                <div className="space-y-3">
                  {product.features && product.features?.length > 0 &&product.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-base text-slate-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/lien-he?product=${encodeURIComponent(product.name)}`}
                  className="flex-1 text-center py-4 bg-blue-700 text-white rounded-lg text-base font-bold hover:bg-blue-800 transition-colors"
                >
                  Yêu Cầu Báo Giá
                </Link>
                <Link
                  href={`/lien-he?product=${encodeURIComponent(product.name)}`}
                  className="flex-1 text-center py-4 border-2 border-blue-700 text-blue-700 rounded-lg text-base font-bold hover:bg-blue-50 transition-colors"
                >
                  Liên Hệ Tư Vấn
                </Link>
              </div>
              <div className="mt-5 flex items-center gap-2 text-sm text-slate-500 bg-orange-50 rounded-lg px-4 py-3 border border-slate-200">
                <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Bạn cần tư vấn về sản phẩm hoặc cần tìm hiểu chính sách dành cho đại lý? Vui lòng gọi trực tiếp cho chúng tôi qua Hotline <a href="tel:0968348698" className="font-bold text-blue-700 hover:underline">0968348698</a> hoặc liên hệ qua Messenger</span>
              </div>
              {/* Support note */}
              <div className="mt-5 flex items-center gap-2 text-sm text-slate-500 bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
                <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Nhân viên sẽ gọi điện tư vấn cụ thể
                — Hotline: <a href="tel:0968348698" className="font-bold text-blue-700 ml-1 hover:underline">0968348698</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FULL DESCRIPTION ─────────────────────────────────────────────── */}
      {product.description && product.description.length > 0 && (
        <section className="py-12 bg-gradient-to-br from-slate-50 to-slate-100 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="mb-8">
                <p className="section-label mb-1">Thông Tin Sản Phẩm</p>
                <h2 className="text-3xl font-bold text-slate-900">Mô Tả Chi Tiết</h2>
              </div>
              <div className="bg-white border-2 border-slate-200 rounded-xl p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow">
                <div className="prose prose-slate prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-slate-900
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-li:text-slate-700 prose-strong:text-slate-900 prose-strong:font-semibold
                  prose-ul:space-y-2 prose-ul:mb-4 prose-ul:ml-4
                  prose-ol:space-y-2 prose-ol:mb-4 prose-ol:ml-4">
                  <PortableText value={product.description} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section className="py-14 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-3 text-white">Cần tư vấn thêm về {product.name}?</h2>
          <p className="text-blue-200 text-base mb-8 max-w-xl mx-auto">
            Đội ngũ chuyên gia kỹ thuật của Mediplus sẵn sàng hỗ trợ — demo thiết bị thực tế, báo giá cạnh tranh và bảo hành chính hãng.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/lien-he?product=${encodeURIComponent(product.name)}`}
              className="px-8 py-4 bg-yellow-400 text-blue-900 rounded-lg font-bold text-base hover:bg-yellow-300 transition-colors"
            >
              Yêu Cầu Báo Giá Ngay
            </Link>
            <a
              href="tel:0968348698"
              className="px-8 py-4 bg-white/10 border border-white/30 text-white rounded-lg font-bold text-base hover:bg-white/20 transition-colors"
            >
              Gọi Hotline: 0968348698
            </a>
          </div>
        </div>
      </section>

      {/* ── SPECS TABLE ──────────────────────────────────────────────────── */}
      {product.specs && product.specs.length > 0 && (
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="section-label mb-1">Chi Tiết Kỹ Thuật</p>
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Thông Số Kỹ Thuật</h2>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {product.specs.map((spec, i) => (
                      <tr key={spec.label} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-6 py-4 font-semibold text-slate-700 w-40 border-r border-slate-200">
                          {spec.label}
                        </td>
                        <td className="px-6 py-4 text-slate-900">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── APPLICATIONS ─────────────────────────────────────────────────── */}
      {product.applications && product.applications.length > 0 && (
        <section className="py-12 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label mb-1">Ứng Dụng</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Chỉ Định Điều Trị</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {product.applications.map((app) => (
                <div key={app} className="flex items-start gap-3 p-5 bg-blue-50 border border-blue-100 rounded-xl">
                  <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-base font-medium text-blue-900 leading-snug">{app}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED PRODUCTS ─────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="section-label mb-1">Cùng Danh Mục</p>
                <h2 className="text-2xl font-bold text-slate-900">Sản Phẩm Liên Quan</h2>
              </div>
              <Link
                href={`/san-pham?category=${encodeURIComponent(product.category)}`}
                className="text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
              >

                Xem tất cả
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rel) => (
                <Link
                  key={rel._id}
                  href={`/san-pham/${rel.slug.current}`}
                  className="card flex flex-col overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <div className="h-44 bg-slate-100 border-b border-slate-200 flex items-center justify-center relative overflow-hidden">
                    {rel.mainImage ? (
                      <Image
                        src={urlFor(rel.mainImage).width(400).height(300).url()}
                        alt={rel.mainImage.alt || rel.name}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <svg className="w-14 h-14 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                      </svg>
                    )}
                    {rel.isBestSeller && (
                      <span className="absolute top-3 left-3 bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded">
                        Bán chạy
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-700 transition-colors">
                      {rel.name}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1">{rel.shortDescription}</p>
                    <div className="mt-4 flex items-center text-sm font-semibold text-blue-700 group-hover:gap-2 gap-1 transition-all">
                      Xem chi tiết
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllProductSlugs()
  const paths = slugs.map((s) => ({ params: { id: s.slug } }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.id as string
  const product = await getProductBySlugWithGalleries(slug)

  if (!product) return { notFound: true }

  const related = await getRelatedProducts(product.category, slug, 3)

  return {
    props: { product, related },
    revalidate: 60,
  }
}
