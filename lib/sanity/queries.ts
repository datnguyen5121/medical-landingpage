import type { PortableTextBlock } from '@portabletext/types'
import { sanityClient } from './client'

export interface SanityImage {
  asset: { _ref: string }
  alt?: string
  hotspot?: { x: number; y: number; width?: number; height?: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  /** Ảnh mờ siêu nhỏ (base64) dùng làm placeholder khi tải */
  lqip?: string
}

export interface SanityProduct {
  _id: string
  name: string
  slug: { current: string }
  category: string
  shortDescription?: string
  features?: string[]
  specs?: { label: string; value: string }[]
  applications?: string[]
  isBestSeller?: boolean
  mainImage?: SanityImage
  galleries?: SanityImage[]
  description?: PortableTextBlock[]
  seoTitle?: string
  order?: number
}

export interface SanityArticle {
  _id: string
  title: string
  slug: { current: string }
  category: string
  excerpt: string
  content?: PortableTextBlock[]
  mainImage?: SanityImage
  publishedAt: string
  readTime: number
  isFeatured?: boolean
  author?: string
  tags?: string[]
  seoTitle?: string
  seoDescription?: string
  order?: number
}

// ============ GROQ fragments dùng chung ============

const IMAGE = `{ asset, alt, hotspot, crop, "lqip": asset->metadata.lqip }`

const PRODUCT_CARD = `
  _id,
  name,
  slug,
  category,
  shortDescription,
  isBestSeller,
  order,
  mainImage ${IMAGE}
`

const ARTICLE_CARD = `
  _id,
  title,
  slug,
  category,
  excerpt,
  publishedAt,
  readTime,
  mainImage ${IMAGE}
`

// ============ PRODUCTS ============

// Danh sách sản phẩm (trang danh sách, trang chủ)
export async function getAllProducts(): Promise<SanityProduct[]> {
  return sanityClient.fetch(
    `*[_type == "product"] | order(order asc, name asc) { ${PRODUCT_CARD}, features }`
  )
}

// Sản phẩm bán chạy (trang chủ)
export async function getBestSellerProducts(limit: number = 8): Promise<SanityProduct[]> {
  return sanityClient.fetch(
    `*[_type == "product" && isBestSeller == true] | order(order asc, name asc) [0...$limit] { ${PRODUCT_CARD}, features }`,
    { limit }
  )
}

// Tất cả slug (getStaticPaths)
export async function getAllProductSlugs(): Promise<{ slug: string }[]> {
  return sanityClient.fetch(`*[_type == "product" && defined(slug.current)] { "slug": slug.current }`)
}

// Chi tiết sản phẩm theo slug (gồm thư viện ảnh)
export async function getProductBySlugWithGalleries(slug: string): Promise<SanityProduct | null> {
  const data = await sanityClient.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      ${PRODUCT_CARD},
      features,
      specs,
      applications,
      galleries[] ${IMAGE},
      description,
      seoTitle
    }`,
    { slug }
  )
  return data || null
}

// Sản phẩm liên quan (cùng danh mục, khác slug)
export async function getRelatedProducts(
  category: string,
  currentSlug: string,
  limit = 4
): Promise<SanityProduct[]> {
  return sanityClient.fetch(
    `*[_type == "product" && category == $category && slug.current != $currentSlug] | order(order asc) [0...$limit] { ${PRODUCT_CARD} }`,
    { category, currentSlug, limit }
  )
}

// Danh sách danh mục (bộ lọc)
export async function getCategories(): Promise<string[]> {
  const data = await sanityClient.fetch(`array::unique(*[_type == "product"].category)`)
  return data || []
}

// ============ ARTICLES ============

// Tất cả bài viết (nổi bật và thứ tự trước, rồi theo ngày)
export async function getAllArticles(): Promise<SanityArticle[]> {
  return sanityClient.fetch(
    `*[_type == "article"] | order(isFeatured desc, order asc, publishedAt desc) { ${ARTICLE_CARD}, isFeatured, order }`
  )
}

// Chi tiết bài viết theo slug
export async function getArticleBySlug(slug: string): Promise<SanityArticle | null> {
  const data = await sanityClient.fetch(
    `*[_type == "article" && slug.current == $slug][0] {
      ${ARTICLE_CARD},
      content,
      isFeatured,
      author,
      tags,
      seoTitle,
      seoDescription
    }`,
    { slug }
  )
  return data || null
}

// Bài viết liên quan (cùng danh mục, khác slug)
export async function getRelatedArticles(
  category: string,
  currentSlug: string,
  limit = 3
): Promise<SanityArticle[]> {
  return sanityClient.fetch(
    `*[_type == "article" && category == $category && slug.current != $currentSlug] | order(publishedAt desc) [0...$limit] { ${ARTICLE_CARD} }`,
    { category, currentSlug, limit }
  )
}

// Tất cả slug bài viết (getStaticPaths)
export async function getAllArticleSlugs(): Promise<{ slug: string }[]> {
  return sanityClient.fetch(`*[_type == "article" && defined(slug.current)] { "slug": slug.current }`)
}
