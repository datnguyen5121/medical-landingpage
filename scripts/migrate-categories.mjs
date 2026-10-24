// Tạo 17 danh mục sản phẩm và gán lại cho các sản phẩm hiện có (từ trường chuỗi `category` sang `categoryRef`).
//
//   node --env-file=.env.local scripts/migrate-categories.mjs           # chạy thử: chỉ in kế hoạch, KHÔNG ghi
//   node --env-file=.env.local scripts/migrate-categories.mjs --apply   # ghi lên dataset (cần SANITY_API_TOKEN quyền Editor)
//
// An toàn khi chạy lại: danh mục dùng _id cố định (createIfNotExists), chỉ sản phẩm chưa có `categoryRef`
// mới bị đụng tới, và mỗi patch kèm ifRevisionID để không ghi đè thay đổi xảy ra giữa chừng.
// Trường cũ `category` được giữ nguyên để có thể quay lại.
import { createClient } from '@sanity/client'
import { slugifyVi } from '../sanity/lib/slugify.ts'

const apply = process.argv.includes('--apply')

// Thứ tự dưới đây trở thành thứ tự hiển thị (order) trong bộ lọc
const CATEGORY_NAMES = [
  'Cabin thải độc sinh học',
  'Buồng oxy cao áp',
  'Máy vỗ rung long đờm',
  'Máy garo hơi tự động',
  'Robot tập phục hồi chức năng',
  'Thiết bị tập phục hồi chức năng',
  'Máy xông thuốc',
  'Máy vi sóng trị liệu',
  'Máy terahertz điều trị',
  'Máy từ trường trị liệu',
  'Máy điện xung trị liệu',
  'Máy siêu âm trị liệu',
  'Máy xung kích trị liệu',
  'Máy Laser trị liệu',
  'Máy kéo giãn cột sống',
  'Máy kích thích nuốt và phát âm',
  'Máy đo điện cơ đồ (EMG)',
  'Máy làm nóng túi chườm',
]

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
if (!projectId) {
  console.error('Thiếu NEXT_PUBLIC_SANITY_PROJECT_ID. Chạy với: node --env-file=.env.local scripts/migrate-categories.mjs')
  process.exit(1)
}
if (apply && !process.env.SANITY_API_TOKEN) {
  console.error('--apply cần SANITY_API_TOKEN (quyền Editor) trong .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: apply ? process.env.SANITY_API_TOKEN : undefined,
})

const categories = CATEGORY_NAMES.map((name, index) => {
  const slug = slugifyVi(name)
  return { _id: `category-${slug}`, _type: 'category', name, slug: { _type: 'slug', current: slug }, order: index + 1 }
})
const idByName = new Map(categories.map((c) => [c.name, c._id]))

const [existingIds, products] = await Promise.all([
  client.fetch('*[_type == "category"]._id'),
  client.fetch('*[_type == "product"]{ _id, _rev, name, category, "hasRef": defined(categoryRef) }'),
])

const toCreate = categories.filter((c) => !existingIds.includes(c._id))
const toPatch = []
const skipped = []
const unmatched = []
for (const p of products) {
  if (p.hasRef) skipped.push(p)
  else if (!idByName.has(p.category)) unmatched.push(p)
  else toPatch.push(p)
}

console.log(`Dataset: ${projectId}/${dataset}   Chế độ: ${apply ? 'GHI (--apply)' : 'CHẠY THỬ (không ghi)'}\n`)
console.log(`Danh mục sẽ tạo: ${toCreate.length}/${categories.length} (đã tồn tại: ${categories.length - toCreate.length})`)
for (const c of toCreate) console.log(`  + ${String(c.order).padStart(2)}. ${c.name}  ->  /${c.slug.current}  (_id ${c._id})`)

const byCategory = new Map()
for (const p of toPatch) byCategory.set(p.category, (byCategory.get(p.category) ?? 0) + 1)
console.log(`\nSản phẩm sẽ gán danh mục: ${toPatch.length}/${products.length} (đã có categoryRef: ${skipped.length})`)
for (const [name, n] of byCategory) console.log(`  ${String(n).padStart(2)} sản phẩm  ->  ${name}`)

if (unmatched.length) {
  console.log(`\nKHÔNG KHỚP danh mục nào (${unmatched.length}), sẽ KHÔNG được xử lý:`)
  for (const p of unmatched) console.log(`  - ${p.name}  [category = ${JSON.stringify(p.category)}]`)
}

if (!apply) {
  console.log('\nChưa ghi gì. Kiểm tra kế hoạch ở trên rồi chạy lại với --apply để thực hiện.')
  process.exit(unmatched.length ? 2 : 0)
}
if (unmatched.length) {
  console.error('\nDừng: còn sản phẩm không khớp danh mục. Sửa dữ liệu rồi chạy lại.')
  process.exit(2)
}

const tx = client.transaction()
for (const c of toCreate) tx.createIfNotExists(c)
for (const p of toPatch) {
  tx.patch(p._id, { ifRevisionID: p._rev, set: { categoryRef: { _type: 'reference', _ref: idByName.get(p.category) } } })
}
const result = await tx.commit()
console.log(`\nĐã ghi: ${result.results.length} thao tác.`)

const after = await client.fetch('{ "categories": count(*[_type == "category"]), "withoutRef": count(*[_type == "product" && !defined(categoryRef)]) }')
console.log('Kiểm tra lại:', after)
