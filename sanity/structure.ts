import type { StructureBuilder, StructureResolver } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

type Context = Parameters<StructureResolver>[1]

// Mục "Sản phẩm": mỗi danh mục một danh sách riêng, kéo-thả để đổi thứ tự.
// Danh mục tạo mới tự xuất hiện; sản phẩm chưa chọn danh mục nằm ở "Chưa phân loại".
function productsByCategory(S: StructureBuilder, context: Context) {
  return S.listItem()
    .title('Sản phẩm')
    .child(
      S.documentTypeList('category')
        .title('Danh mục')
        .defaultOrdering([{ field: 'order', direction: 'asc' }])
        .child((categoryId: string) =>
          orderableDocumentListDeskItem({
            type: 'product',
            id: `product-${categoryId}`,
            title: 'Sản phẩm',
            filter: '_type == "product" && categoryRef._ref == $categoryId',
            params: { categoryId },
            S,
            context,
          }).child as unknown as ReturnType<StructureBuilder['documentList']>
        )
    )
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Nội dung')
    .items([
      productsByCategory(S, context),
      S.listItem()
        .title('Chưa phân loại')
        .child(
          S.documentList()
            .title('Sản phẩm chưa có danh mục')
            .filter('_type == "product" && !defined(categoryRef)')
        ),
      S.listItem()
        .title('Tất cả sản phẩm (chỉ xem)')
        .child(
          S.documentList()
            .title('Sản phẩm')
            .filter('_type == "product"')
            .defaultOrdering([{ field: 'orderRank', direction: 'asc' }])
        ),
      S.divider(),
      S.listItem()
        .title('Bài Viết & Tin Tức')
        .child(
          S.documentList()
            .title('Bài Viết')
            .filter('_type == "article"')
            .defaultOrdering([{ field: 'isFeatured', direction: 'desc' }, { field: 'publishedAt', direction: 'desc' }])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['product', 'article'].includes(listItem.getId() as string)
      ),
    ])
