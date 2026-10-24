import { describe, expect, it } from 'vitest'
import { buildCategoryOptions, categoryHref, categoryKey, resolveCategory } from '../lib/category'
import { slugifyVi } from '../sanity/lib/slugify'

describe('categoryKey / categoryHref', () => {
  it('ưu tiên slug, dùng tên cũ khi chưa có slug', () => {
    expect(categoryKey({ category: 'Buồng oxy cao áp', categorySlug: 'buong-oxy-cao-ap' })).toBe('buong-oxy-cao-ap')
    expect(categoryKey({ category: 'Buồng oxy cao áp', categorySlug: null })).toBe('Buồng oxy cao áp')
  })

  it('mã hóa URL cho tên có dấu', () => {
    expect(categoryHref('buong-oxy-cao-ap')).toBe('/san-pham?category=buong-oxy-cao-ap')
    expect(categoryHref('Buồng oxy')).toBe('/san-pham?category=Bu%E1%BB%93ng%20oxy')
  })
})

describe('buildCategoryOptions', () => {
  const docs = [
    { name: 'Cabin', slug: 'cabin' },
    { name: 'Robot', slug: 'robot' },
    { name: 'Laser', slug: 'laser' },
  ]

  it('giữ thứ tự trong Studio và chỉ lấy danh mục đang có sản phẩm', () => {
    const used = [{ name: 'Robot', slug: 'robot' }, { name: 'Cabin', slug: 'cabin' }]
    expect(buildCategoryOptions(docs, used)).toEqual([
      { key: 'cabin', name: 'Cabin' },
      { key: 'robot', name: 'Robot' },
    ])
  })

  it('thêm danh mục cũ (chưa chuyển sang type mới) vào cuối, không trùng', () => {
    const used = [{ name: 'Cabin', slug: 'cabin' }, { name: 'Máy cũ', slug: null }, { name: 'Máy cũ', slug: null }]
    expect(buildCategoryOptions(docs, used)).toEqual([
      { key: 'cabin', name: 'Cabin' },
      { key: 'Máy cũ', name: 'Máy cũ' },
    ])
  })

  it('không có danh mục nào => rỗng', () => {
    expect(buildCategoryOptions([], [])).toEqual([])
  })
})

describe('resolveCategory', () => {
  const options = [
    { key: 'buong-oxy-cao-ap', name: 'Buồng oxy cao áp' },
    { key: 'Máy cũ', name: 'Máy cũ' },
  ]

  it('nhận slug mới', () => {
    expect(resolveCategory(options, 'buong-oxy-cao-ap')?.name).toBe('Buồng oxy cao áp')
  })

  it('vẫn hiểu link cũ dùng tên có dấu', () => {
    expect(resolveCategory(options, 'Buồng oxy cao áp')?.key).toBe('buong-oxy-cao-ap')
  })

  it('nhận slug suy ra từ tên khi sản phẩm chưa chuyển sang danh mục mới', () => {
    expect(resolveCategory(options, 'may-cu')?.name).toBe('Máy cũ')
  })

  it('giá trị rỗng hoặc không tồn tại => không chọn danh mục nào', () => {
    expect(resolveCategory(options, undefined)).toBeUndefined()
    expect(resolveCategory(options, 'khong-co')).toBeUndefined()
  })
})

describe('slug danh mục dùng trong trang chủ (carousel)', () => {
  it('khớp slug sinh từ tên danh mục', () => {
    expect(slugifyVi('Buồng oxy cao áp')).toBe('buong-oxy-cao-ap')
    expect(slugifyVi('Robot tập phục hồi chức năng')).toBe('robot-tap-phuc-hoi-chuc-nang')
    expect(slugifyVi('Cabin thải độc sinh học')).toBe('cabin-thai-doc-sinh-hoc')
  })
})
