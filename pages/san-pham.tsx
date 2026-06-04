import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Link from "next/link"
import Image from "next/image"
import { getAllProducts, getCategories, SanityProduct } from "../lib/sanity/queries"
import { urlFor } from "../lib/sanity/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

interface Props {
  products: SanityProduct[]
  categories: string[]
}

export default function SanPhamPage({ products, categories }: Props) {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState<string>("Tất cả")

  useEffect(() => {
    const cat = router.query.category as string
    if (cat) setActiveCategory(cat)
  }, [router.query.category])

  const allCategories = ["Tất cả", ...categories]
  const filtered =
    activeCategory === "Tất cả"
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <Layout
      title="Sản Phẩm – Mediplus"
      description="Danh mục thiết bị y tế chất lượng cao của Mediplus"
    >
      {/* Hero */}
      <section className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label text-blue-300 mb-2">Danh Mục</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Thiết Bị Y Tế Chuyên Dụng
          </h1>
          <p className="text-blue-200 max-w-2xl">
            Hơn 300 thiết bị y tế đạt chuẩn quốc tế, phục vụ đa dạng nhu cầu điều trị và phục hồi chức năng
          </p>
        </div>
      </section>

      <section className="py-10 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar filters */}
            <aside className="lg:w-64 shrink-0">
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-slate-800 text-white">
                  <p className="text-sm font-semibold uppercase tracking-wider">Danh mục sản phẩm</p>
                </div>
                <div className="divide-y divide-slate-100">
                  {allCategories.map((cat) => {
                  const count = cat === "Tất cả"
                      ? products.length
                      : products.filter((p) => p.category === cat).length
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full text-left px-4 py-4 text-base transition-colors flex items-center justify-between gap-2 ${
                          activeCategory === cat
                            ? "bg-blue-50 text-blue-800 font-semibold border-l-2 border-blue-700"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={`text-sm rounded-full px-2 py-0.5 shrink-0 ${
                          activeCategory === cat ? "bg-blue-200 text-blue-800" : "bg-slate-100 text-slate-400"
                        }`}>
                          {count}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Contact sidebar */}
              <div className="mt-4 bg-blue-900 text-white rounded-lg p-6">
                <p className="text-base font-semibold mb-2">Cần tư vấn?</p>
                <p className="text-blue-200 text-sm mb-4 leading-relaxed">
                  Chuyên gia kỹ thuật hỗ trợ chọn thiết bị phù hợp với nhu cầu của bạn.
                </p>
                <a href="tel:19000000" className="flex items-center justify-center gap-2 w-full py-3 bg-yellow-400 text-blue-900 font-bold rounded text-sm hover:bg-yellow-300 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  0968348698
                </a>
              </div>
            </aside>

            {/* Products grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-800">{filtered.length}</span> sản phẩm
                  {activeCategory !== "Tất cả" && (
                    <span> trong <span className="text-blue-700 font-semibold">{activeCategory}</span></span>
                  )}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((product) => (
                    <div key={product._id} className="card flex flex-col overflow-hidden group">
                    <Link href={`/san-pham/${product.slug.current}`} className="block">
                    <div className="h-52 bg-white border-b border-slate-200 flex items-center justify-center relative overflow-hidden">
                      {product.mainImage ? (
                        <Image
                          src={urlFor(product.mainImage).width(600).height(500).url()}
                          alt={product.mainImage.alt || product.name}
                          fill
                          className="object-contain p-4 drop-shadow-sm"
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                      ) : (
                        <svg className="w-16 h-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                        </svg>
                      )}
                      {product.isBestSeller && (
                        <span className="absolute top-3 left-3 bg-blue-700 text-white text-sm font-semibold px-3 py-1 rounded">
                          Bán chạy
                        </span>
                      )}
                    </div>
                    </Link>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-2">{product.category}</p>
                      <Link href={`/san-pham/${product.slug.current}`}>
                      <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug hover:text-blue-700 transition-colors">{product.name}</h3>
                      </Link>
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-3 flex-1">{product.shortDescription}</p>
                      <div className="space-y-2 mb-4">
                        {(product.features || []).slice(0, 3).map((f) => (
                          <div key={f} className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm text-slate-500">{f}</span>
                          </div>
                        ))}
                      </div>
                      <Link
                        href={`/lien-he?product=${encodeURIComponent(product.name)}`}
                        className="block text-center px-4 py-3 bg-blue-700 text-white rounded text-sm font-semibold hover:bg-blue-800 transition-colors"
                      >
                        Liên Hệ &amp; Yêu Cầu Báo Giá
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ])
  return {
    props: { products, categories },
    revalidate: 60,
  }
}
