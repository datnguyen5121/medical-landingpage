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

// Lấy tất cả slug (dùng cho getStaticPaths)
export async function getAllProductSlugs(): Promise<{ slug: string }[]> {
  const data = await sanityClient.fetch(
    `*[_type == "product"] { "slug": slug.current }`
  )
  return data
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
