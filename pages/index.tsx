import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Link from "next/link"
import Image from "next/image"
import { trackQuoteConversion } from "../lib/gtag"
import { getBestSellerProducts, getAllProducts, SanityProduct } from "../lib/sanity/queries"
import { urlFor } from "../lib/sanity/image"
import { HOTLINE_TEL } from "../lib/config"

interface HomePageProps {
  bestSellers: SanityProduct[]
  allProducts: SanityProduct[]
}

const commitments = [
  {
    title: "Sản phẩm chất lượng",
    description: "Sản phẩm được nghiên cứu và sản xuất bởi các đối tác uy tín hàng đầu, đảm bảo chất lượng và độ tin cậy cao nhất.",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: "Mẫu mã đa dạng",
    description: "Hơn 300 sản phẩm liên tục được cập nhật, đáp ứng đầy đủ nhu cầu của cơ sở y tế từ tuyến cơ sở đến trung ương.",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: "Thương hiệu uy tín",
    description: "MediWellness được khẳng định vị thế trên thị trường trong nước và quốc tế, là đối tác tin cậy của 100+ cơ sở y tế.",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Đạt chuẩn GMP-WHO",
    description: "Máy móc hiện đại, công nghệ tiên tiến đạt chuẩn GMP-WHO đảm bảo mọi sản phẩm đều đáp ứng tiêu chuẩn nghiêm ngặt.",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
]

const clientLogos = [
  "Bệnh viện Bạch Mai",
  "BV Chợ Rẫy",
  "BV Việt Đức",
  "BV 108",
  "BV Hữu Nghị",
  "BV E Trung Ương",
  "BV Phục Hồi Chức Năng TW",
  "BV Đại Học Y Hà Nội",
]

export default function HomePage({ bestSellers, allProducts }: HomePageProps) {
  const heroProduct = bestSellers.find((p) => p.mainImage) || allProducts.find((p) => p.mainImage)

  // Danh mục kèm số lượng và ảnh đại diện (ảnh của sản phẩm đầu tiên có ảnh)
  const categories = Array.from(new Set(allProducts.map((p) => p.category)))
    .sort()
    .map((name) => {
      const items = allProducts.filter((p) => p.category === name)
      return { name, count: items.length, image: items.find((p) => p.mainImage)?.mainImage }
    })

  return (
    <Layout
      title="MediWellness – Thiết Bị Y Tế Chất Lượng Cao"
      description="Nhà nhập khẩu & phân phối thiết bị y tế hàng đầu Việt Nam"
    >
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-label text-blue-300 mb-3">Nhà phân phối thiết bị y tế uy tín</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5 text-balance">
              Giải Pháp Thiết Bị Y Tế <span className="text-yellow-400">Toàn Diện</span> Cho Cơ Sở Y Tế
            </h1>
            <p className="text-blue-200 text-lg leading-relaxed mb-8">
              MediWellness – Một trong những nhà nhập khẩu &amp; phân phối thiết bị y tế hàng đầu Việt Nam. Hơn 300 sản phẩm đạt tiêu chuẩn quốc tế, phục vụ 100+ cơ sở y tế trên toàn quốc.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/san-pham" className="px-6 py-3 bg-white text-blue-900 font-semibold rounded text-sm hover:bg-blue-50 transition-colors shadow">
                Xem Danh Mục Sản Phẩm
              </Link>
              <Link href="/lien-he" onClick={trackQuoteConversion} className="px-6 py-3 border border-blue-400 text-white font-semibold rounded text-sm hover:bg-blue-800 transition-colors">
                Yêu Cầu Báo Giá
              </Link>
            </div>
          </div>

          {/* Ảnh thiết bị chủ lực + chứng nhận */}
          <div className="space-y-4">
            {heroProduct?.mainImage && (
              <Link
                href={`/san-pham/${heroProduct.slug.current}`}
                className="block relative aspect-[4/3] bg-white rounded-lg overflow-hidden border border-blue-700"
              >
                <Image
                  src={urlFor(heroProduct.mainImage).width(800).height(600).url()}
                  alt={heroProduct.mainImage.alt || heroProduct.name}
                  fill
                  priority
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="absolute inset-x-0 bottom-0 bg-blue-950/85 px-4 py-2 text-sm font-semibold text-white truncate">
                  {heroProduct.name}
                </span>
              </Link>
            )}
            <ul className="grid grid-cols-2 gap-3" aria-label="Chứng nhận và tiêu chuẩn">
              {[
                { cert: "ISO 13485", desc: "Quản lý chất lượng" },
                { cert: "CE Marking", desc: "Tiêu chuẩn châu Âu" },
                { cert: "GMP-WHO", desc: "Sản xuất tốt" },
                { cert: "FDA Cleared", desc: "Chứng nhận Hoa Kỳ" },
              ].map((c) => (
                <li key={c.cert} className="flex items-center gap-3 p-3 bg-blue-800/60 rounded border border-blue-700">
                  <span className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center shrink-0" aria-hidden="true">
                    <svg className="w-4 h-4 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-white font-semibold text-sm">{c.cert}</span>
                    <span className="block text-blue-200 text-xs">{c.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200">
            {[
              { value: "300+", label: "Sản phẩm đa dạng", sub: "Thiết bị y tế chính hãng" },
              { value: "100+", label: "Cơ sở y tế", sub: "Đối tác tin cậy trên toàn quốc" },
              { value: "10+", label: "Năm kinh nghiệm", sub: "Trong lĩnh vực thiết bị y tế" },
              { value: "63", label: "Tỉnh thành", sub: "Phủ sóng toàn quốc" },
            ].map((s) => (
              <div key={s.label} className="py-8 px-6 text-center">
                <div className="text-5xl font-bold text-blue-800">{s.value}</div>
                <div className="text-base font-semibold text-slate-800 mt-2">{s.label}</div>
                <div className="text-sm text-slate-400 mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT CATEGORIES ───────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
            <div>
              <p className="section-label mb-1">Danh Mục</p>
              <h2 className="section-title">Thiết Bị Y Tế Theo Chuyên Khoa</h2>
            </div>
            <Link href="/san-pham" className="text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 shrink-0">
              Xem tất cả sản phẩm
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/san-pham?category=${encodeURIComponent(cat.name)}`}
                className="flex flex-col gap-3 p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all group focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
              >
                <div className="relative h-24 w-full rounded bg-slate-50 overflow-hidden flex items-center justify-center">
                  {cat.image ? (
                    <Image
                      src={urlFor(cat.image).width(300).height(200).url()}
                      alt=""
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  ) : (
                    <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-800 leading-snug">{cat.name}</p>
                  <p className="text-sm text-slate-500 mt-1">{cat.count} sản phẩm</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
            <div>
              <p className="section-label mb-1">Nổi Bật</p>
              <h2 className="section-title">Sản Phẩm Được Tin Dùng Nhiều Nhất</h2>
            </div>
            <Link href="/san-pham" className="text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 shrink-0">
              Xem tất cả
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {bestSellers.map((product) => (
              <div key={product._id} className="card flex flex-col overflow-hidden group">
                <Link href={`/san-pham/${product.slug.current}`} className="block">
                <div className="h-56 bg-slate-50 border-b border-slate-200 flex items-center justify-center relative overflow-hidden">
                  {product.mainImage ? (
                    <Image
                      src={urlFor(product.mainImage).width(400).height(300).url()}
                      alt={product.mainImage.alt || product.name}
                      fill
                      className="object-contain p-4 drop-shadow-sm"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <svg className="w-20 h-20 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                    </svg>
                  )}
                </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-2">{product.category}</p>
                  <Link href={`/san-pham/${product.slug.current}`}>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug hover:text-blue-700 transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-slate-500 flex-1 leading-relaxed line-clamp-3 mb-4">{product.shortDescription}</p>
                  <div className="border-t border-slate-100 pt-3 space-y-2 mb-4">
                    {product.features && product.features.slice(0, 2).map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-slate-600">{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/san-pham/${product.slug.current}`}
                      className="text-center px-3 py-3 border border-blue-700 text-blue-700 rounded text-sm font-semibold hover:bg-blue-50 transition-colors"
                    >
                      Chi tiết
                    </Link>
                    <Link
                      href={`/lien-he?product=${encodeURIComponent(product.name)}`}
                      onClick={trackQuoteConversion}
                      className="text-center px-3 py-3 bg-blue-700 text-white rounded text-sm font-semibold hover:bg-blue-800 transition-colors"
                    >
                      Báo giá
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMITMENTS ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="section-label mb-1">Cam Kết</p>
            <h2 className="section-title">Tại Sao Chọn MediWellness?</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Chúng tôi tự hào là một trong những nhà nhập khẩu &amp; phân phối thiết bị y tế tốt nhất Việt Nam, với cam kết mang đến giải pháp tốt nhất cho mọi cơ sở y tế.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {commitments.map((c) => (
              <div key={c.title} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                <div className="w-13 h-13 w-14 h-14 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center mb-5">
                  {c.icon}
                </div>
                <h3 className="font-semibold text-slate-900 text-base mb-2">{c.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT LOGOS ─────────────────────────────────────────────────── */}
      {/* <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-400 font-semibold uppercase tracking-widest mb-8">
            Đối tác tiêu biểu – Tin dùng bởi các cơ sở y tế hàng đầu
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {clientLogos.map((name) => (
              <div
                key={name}
                className="h-14 bg-slate-50 border border-slate-200 rounded flex items-center justify-center px-3"
                title={name}
              >
                <span className="text-sm text-slate-400 font-medium text-center leading-tight">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="bg-blue-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Cần tư vấn thiết bị y tế?</h2>
            <p className="text-blue-200">
              Đội ngũ chuyên gia kỹ thuật sẵn sàng hỗ trợ quý khách lựa chọn giải pháp phù hợp nhất.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={HOTLINE_TEL}
              className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-blue-900 font-bold rounded text-sm hover:bg-yellow-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Gọi Ngay: 0968348698
            </a>
            <Link
              href="/lien-he"
              onClick={trackQuoteConversion}
              className="px-6 py-3 border border-blue-500 text-white font-semibold rounded text-sm hover:bg-blue-800 transition-colors"
            >
              Gửi Yêu Cầu Báo Giá
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const [bestSellers, allProducts] = await Promise.all([
      getBestSellerProducts(8),
      getAllProducts()
    ])

    return {
      props: { bestSellers, allProducts },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching home page data:', error)
    return { props: { bestSellers: [], allProducts: [] }, revalidate: 10 }
  }
}
