import { sanityClient } from './client'

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
  mainImage?: {
    asset: { _ref: string }
    alt?: string
    hotspot?: { x: number; y: number }
  }
  galleries?: Array<{
    asset: { _ref: string }
    alt?: string
    hotspot?: { x: number; y: number }
  }>
  description?: any[]
  seoTitle?: string
  order?: number
}

// Lấy tất cả sản phẩm (dùng cho trang danh sách)
export async function getAllProducts(): Promise<SanityProduct[]> {
  return sanityClient.fetch(
    `*[_type == "product"] | order(order asc, name asc) {
      _id,
      name,
      slug,
      category,
      shortDescription,
      features,
      isBestSeller,
      order,
      mainImage {
        asset,
        alt,
        hotspot
      }
    }`
  )
}

// Lấy sản phẩm bán chạy (dùng cho trang chủ)
export async function getBestSellerProducts(limit: number = 8): Promise<SanityProduct[]> {
  return sanityClient.fetch(
    `*[_type == "product" && isBestSeller == true] | order(order asc, name asc) [0..${limit - 1}] {
      _id,
      name,
      slug,
      category,
      shortDescription,
      features,
      isBestSeller,
      order,
      mainImage {
        asset,
        alt,
        hotspot
      }
    }`
  )
}

// Lấy tất cả slug (dùng cho getStaticPaths)
export async function getAllProductSlugs(): Promise<{ slug: string }[]> {
  const data = await sanityClient.fetch(
    `*[_type == "product"] { "slug": slug.current }`
  )
  return data
}

// Lấy sản phẩm theo slug (include galleries)
export async function getProductBySlugWithGalleries(slug: string): Promise<SanityProduct | null> {
  return sanityClient.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      category,
      shortDescription,
      features,
      specs,
      applications,
      isBestSeller,
      mainImage {
        asset,
        alt,
        hotspot
      },
      galleries[] {
        asset,
        alt,
        hotspot
      },
      description,
      seoTitle,
      order
    }`,
    { slug }
  )
}

// Lấy chi tiết 1 sản phẩm theo slug
export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
  const data = await sanityClient.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      category,
      shortDescription,
      description,
      features,
      specs,
      applications,
      isBestSeller,
      seoTitle,
      mainImage {
        asset,
        alt,
        hotspot
      }
    }`,
    { slug }
  )
  return data || null
}

// Lấy sản phẩm liên quan (cùng danh mục, khác slug)
export async function getRelatedProducts(
  category: string,
  currentSlug: string,
  limit = 4
): Promise<SanityProduct[]> {
  return sanityClient.fetch(
    `*[_type == "product" && category == $category && slug.current != $currentSlug] | order(order asc) [0...$limit] {
      _id,
      name,
      slug,
      category,
      shortDescription,
      isBestSeller,
      mainImage {
        asset,
        alt,
        hotspot
      }
    }`,
    { category, currentSlug, limit }
  )
}

// Lấy danh sách category (dùng cho filter)
export async function getCategories(): Promise<string[]> {
  const data = await sanityClient.fetch(
    `array::unique(*[_type == "product"].category)`
  )
  return data || []
}

// ============ ARTICLES QUERIES ============

export interface SanityArticle {
  _id: string
  title: string
  slug: { current: string }
  category: string
  excerpt: string
  content?: any[]
  mainImage?: {
    asset: { _ref: string }
    alt?: string
    hotspot?: { x: number; y: number }
  }
  publishedAt: string
  readTime: number
  isFeatured?: boolean
  author?: string
  tags?: string[]
  seoTitle?: string
  seoDescription?: string
  order?: number
}

// Lấy tất cả bài viết (sắp xếp theo ngày và thứ tự nổi bật)
export async function getAllArticles(): Promise<SanityArticle[]> {
  return sanityClient.fetch(
    `*[_type == "article"] | order(isFeatured desc, order asc, publishedAt desc) {
      _id,
      title,
      slug,
      category,
      excerpt,
      publishedAt,
      readTime,
      isFeatured,
      order,
      mainImage {
        asset,
        alt,
        hotspot
      }
    }`
  )
}

// Lấy bài viết nổi bật (dùng làm featured article)
export async function getFeaturedArticle(): Promise<SanityArticle | null> {
  return sanityClient.fetch(
    `*[_type == "article" && isFeatured == true] | order(publishedAt desc) [0] {
      _id,
      title,
      slug,
      category,
      excerpt,
      content,
      publishedAt,
      readTime,
      isFeatured,
      mainImage {
        asset,
        alt,
        hotspot
      }
    }`
  )
}

// Lấy bài viết theo danh mục
export async function getArticlesByCategory(category: string): Promise<SanityArticle[]> {
  return sanityClient.fetch(
    `*[_type == "article" && category == $category] | order(publishedAt desc) {
      _id,
      title,
      slug,
      category,
      excerpt,
      publishedAt,
      readTime,
      mainImage {
        asset,
        alt,
        hotspot
      }
    }`,
    { category }
  )
}

// Lấy chi tiết bài viết theo slug
export async function getArticleBySlug(slug: string): Promise<SanityArticle | null> {
  return sanityClient.fetch(
    `*[_type == "article" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      category,
      excerpt,
      content,
      publishedAt,
      readTime,
      isFeatured,
      author,
      tags,
      mainImage {
        asset,
        alt,
        hotspot
      },
      seoTitle,
      seoDescription
    }`,
    { slug }
  )
}

// Lấy các bài viết liên quan (cùng danh mục, khác slug)
export async function getRelatedArticles(
  category: string,
  currentSlug: string,
  limit = 3
): Promise<SanityArticle[]> {
  return sanityClient.fetch(
    `*[_type == "article" && category == $category && slug.current != $currentSlug] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      slug,
      category,
      excerpt,
      publishedAt,
      readTime,
      mainImage {
        asset,
        alt,
        hotspot
      }
    }`,
    { category, currentSlug, limit }
  )
}

// Lấy tất cả slug bài viết (dùng cho getStaticPaths)
export async function getAllArticleSlugs(): Promise<{ slug: string }[]> {
  const data = await sanityClient.fetch(
    `*[_type == "article"] { "slug": slug.current }`
  )
  return data
}
