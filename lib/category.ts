import { slugifyVi } from '../sanity/lib/slugify'

// Danh mục sản phẩm: khóa dùng trên URL là slug (vd. "buong-oxy-cao-ap").
// Trong thời gian chuyển đổi, sản phẩm chưa gán danh mục mới vẫn dùng tên cũ (có dấu) làm khóa.

export interface CategoryOption {
  /** Khóa dùng trong URL: slug, hoặc tên danh mục cũ nếu sản phẩm chưa chuyển sang danh mục mới */
  key: string
  name: string
}

interface HasCategory {
  category: string
  categorySlug?: string | null
}

export function categoryKey(product: HasCategory): string {
  return product.categorySlug || product.category
}

export function categoryHref(key: string): string {
  return `/san-pham?category=${encodeURIComponent(key)}`
}

/** Tìm danh mục theo giá trị trên URL: nhận slug mới, và cả tên cũ có dấu để link đã chia sẻ vẫn hoạt động. */
export function resolveCategory(options: CategoryOption[], value: string | undefined): CategoryOption | undefined {
  if (!value) return undefined
  return (
    options.find((c) => c.key === value) ??
    options.find((c) => c.name === value) ??
    // Sản phẩm chưa chuyển sang danh mục mới vẫn dùng tên làm khóa; slug suy ra từ tên khớp với slug sau khi chuyển
    options.find((c) => slugifyVi(c.name) === value)
  )
}

interface CategoryDoc {
  name: string
  slug?: string | null
}

interface UsedCategory {
  name: string
  slug?: string | null
}

/**
 * Ghép danh sách danh mục hiển thị trên bộ lọc: theo thứ tự trong Studio, chỉ gồm danh mục đang có
 * sản phẩm; danh mục cũ (chưa chuyển sang type mới) được thêm vào cuối.
 */
export function buildCategoryOptions(docs: CategoryDoc[], used: UsedCategory[]): CategoryOption[] {
  const usedNames = new Set(used.map((u) => u.name))
  const options: CategoryOption[] = []
  const seen = new Set<string>()

  for (const doc of docs) {
    if (!doc.slug || !usedNames.has(doc.name)) continue
    options.push({ key: doc.slug, name: doc.name })
    seen.add(doc.name)
  }
  for (const u of used) {
    if (seen.has(u.name)) continue
    seen.add(u.name)
    options.push({ key: u.slug || u.name, name: u.name })
  }
  return options
}
