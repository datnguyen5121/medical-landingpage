import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'mediplus',
  title: 'RobotMediplus – Quản lý nội dung',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Nội dung')
          .items([
            S.listItem()
              .title('Tất cả sản phẩm')
              .child(
                S.documentList()
                  .title('Sản phẩm')
                  .filter('_type == "product"')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
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
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
