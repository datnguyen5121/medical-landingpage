// Gán `orderRank` (kéo-thả) cho sản phẩm dựa trên thứ tự cũ: danh mục (order) → số `order` cũ → tên.
//
//   node --env-file=.env.local scripts/migrate-order-rank.mjs           # chạy thử: chỉ in kế hoạch, KHÔNG ghi
//   node --env-file=.env.local scripts/migrate-order-rank.mjs --apply   # ghi lên dataset (cần SANITY_API_TOKEN quyền Editor)
//
// Chỉ đụng tới sản phẩm chưa có orderRank (an toàn khi chạy lại). Mỗi patch kèm ifRevisionID.
// Trường cũ `order` được giữ nguyên. Nên chạy `npx sanity dataset export` để backup trước khi --apply.
import { createClient } from '@sanity/client'
import { LexoRank } from 'lexorank'

const apply = process.argv.includes('--apply')
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
if (!projectId) {
  console.error('Thiếu NEXT_PUBLIC_SANITY_PROJECT_ID. Chạy với: node --env-file=.env.local scripts/migrate-order-rank.mjs')
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

// Lấy cả bản nháp (drafts.*) để rank của bản nháp và bản đã xuất bản luôn khớp nhau
const products = await client.fetch(`*[_type == "product"]{
  _id, _rev, name, order, orderRank,
  "catOrder": coalesce(categoryRef->order, 9999),
  "catName": coalesce(categoryRef->name, category, "")
}`)

const key = (p) => p._id.replace(/^drafts\./, '')
const sorted = [...products].sort(
  (a, b) =>
    a.catOrder - b.catOrder ||
    a.catName.localeCompare(b.catName, 'vi') ||
    (a.order ?? 999) - (b.order ?? 999) ||
    a.name.localeCompare(b.name, 'vi')
)

// Bản đã xuất bản và bản nháp của cùng một sản phẩm dùng chung một rank
const rankById = new Map()
let rank = LexoRank.min()
for (const p of sorted) {
  const id = key(p)
  if (rankById.has(id)) continue
  rank = rank.genNext().genNext()
  rankById.set(id, rank.toString())
}

const toPatch = products.filter((p) => !p.orderRank)
console.log(`Dataset: ${projectId}/${dataset}   Chế độ: ${apply ? 'GHI (--apply)' : 'CHẠY THỬ (không ghi)'}\n`)
console.log(`Sản phẩm (gồm bản nháp): ${products.length}, cần gán orderRank: ${toPatch.length}\n`)
let lastCat
for (const p of sorted) {
  if (p.catName !== lastCat) console.log(`\n[${p.catName || 'Chưa phân loại'}]`)
  lastCat = p.catName
  console.log(`  ${p.orderRank ? '=' : '+'} ${rankById.get(key(p))}  ${p.name}  (order cũ: ${p.order ?? '-'})`)
}

if (!apply) {
  console.log('\nChưa ghi gì. Kiểm tra kế hoạch rồi chạy lại với --apply.')
  process.exit(0)
}

const tx = client.transaction()
for (const p of toPatch) tx.patch(p._id, { ifRevisionID: p._rev, set: { orderRank: rankById.get(key(p)) } })
const result = await tx.commit()
console.log(`\nĐã ghi: ${result.results.length} thao tác.`)
console.log('Kiểm tra lại:', await client.fetch('count(*[_type == "product" && !defined(orderRank)])'), 'sản phẩm chưa có orderRank')
