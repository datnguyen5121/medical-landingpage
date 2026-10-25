import { defineField, defineType } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'
import { slugifyVi } from '../lib/slugify'
import { altTextField, hiddenField } from '../lib/fields'

export default defineType({
  name: 'product',
  title: 'Sản phẩm',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tên sản phẩm',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(200),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 200,
        slugify: slugifyVi,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoryRef',
      title: 'Danh mục',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Chọn danh mục sản phẩm. Quản lý danh sách danh mục ở mục "Danh mục sản phẩm".',
      validation: (Rule) => Rule.required(),
    }),
    // Trường cũ (chuỗi): giữ để website vẫn đọc được sản phẩm chưa chuyển sang `categoryRef`.
    // Xóa trường này sau khi mọi sản phẩm đã có `categoryRef`.
    defineField({
      name: 'category',
      title: 'Danh mục (cũ)',
      type: 'string',
      readOnly: true,
      hidden: ({ document }) => !!document?.categoryRef,
      description: 'Trường cũ, chỉ đọc. Hãy chọn danh mục ở trường "Danh mục" phía trên.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Hình ảnh chính',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [altTextField({ description: 'Quan trọng cho SEO – mô tả ngắn gọn nội dung ảnh' })],
    }),
    defineField({
      name: 'galleries',
      title: 'Thư viện ảnh (tối đa 5 ảnh)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [altTextField()],
        },
      ],
      description: 'Thêm tối đa 5 ảnh để khách hàng có thể xem chi tiết sản phẩm từ nhiều góc độ',
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: 'description',
      title: 'Mô tả sản phẩm',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Bình thường', value: 'normal' },
            { title: 'Tiêu đề H2', value: 'h2' },
            { title: 'Tiêu đề H3', value: 'h3' },
            { title: 'Tiêu đề H4', value: 'h4' },
          ],
          lists: [
            { title: 'Danh sách chấm', value: 'bullet' },
            { title: 'Danh sách số', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'In đậm', value: 'strong' },
              { title: 'In nghiêng', value: 'em' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            altTextField({ required: false }),
            {
              name: 'caption',
              type: 'string',
              title: 'Chú thích ảnh',
            },
          ],
        },
      ],
      description: 'Nội dung đầy đủ của sản phẩm – viết chi tiết để tốt SEO',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Mô tả ngắn (meta description)',
      type: 'text',
      rows: 3,
      description: 'Tối đa 160 ký tự – dùng cho thẻ meta description trên Google',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'features',
      title: 'Tính năng nổi bật',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Liệt kê các tính năng chính của sản phẩm',
    }),
    defineField({
      name: 'specs',
      title: 'Thông số kỹ thuật',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Thông số', type: 'string' },
            { name: 'value', title: 'Giá trị', type: 'string' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        },
      ],
    }),
    defineField({
      name: 'applications',
      title: 'Ứng dụng / Chỉ định',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'isBestSeller',
      title: 'Bán chạy',
      type: 'boolean',
      initialValue: false,
    }),
    hiddenField,
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Nếu bỏ trống sẽ dùng tên sản phẩm. Tối đa 60 ký tự',
      validation: (Rule) => Rule.max(60),
    }),
    // Thứ tự hiển thị: kéo-thả trong Studio (Sản phẩm → chọn danh mục). Không cần nhập tay.
    orderRankField({ type: 'product' }),
    // Trường cũ (số): chỉ giữ để tham khảo / quay lại, website đã chuyển sang `orderRank`.
    defineField({
      name: 'order',
      title: 'Thứ tự hiển thị (cũ)',
      type: 'number',
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
      categoryName: 'categoryRef.name',
      hidden: 'isHidden',
      media: 'mainImage',
    },
    prepare({ title, category, categoryName, hidden, media }) {
      return { title, subtitle: [hidden ? '[Ẩn]' : null, categoryName ?? category].filter(Boolean).join(' • '), media }
    },
  },
  orderings: [
    {
      title: 'Thứ tự hiển thị',
      name: 'orderAsc',
      by: [{ field: 'orderRank', direction: 'asc' }],
    },
    {
      title: 'Tên A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
