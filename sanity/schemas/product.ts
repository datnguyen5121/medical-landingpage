import { defineField, defineType } from 'sanity'

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
        slugify: (input: string) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Danh mục',
      type: 'string',
      options: {
        list: [
          { title: 'Robot Phục Hồi', value: 'Robot Phục Hồi' },
          { title: 'Vật Lý Trị Liệu', value: 'Vật Lý Trị Liệu' },
          { title: 'Thải Độc & Oxy', value: 'Thải Độc & Oxy' },
          { title: 'Hô Hấp', value: 'Hô Hấp' },
          { title: 'Cột Sống', value: 'Cột Sống' },
          { title: 'Chẩn Đoán', value: 'Chẩn Đoán' },
          { title: 'Phục Hồi Ngôn Ngữ', value: 'Phục Hồi Ngôn Ngữ' },
          { title: 'Nhiệt Trị Liệu', value: 'Nhiệt Trị Liệu' },
          { title: 'Phẫu Thuật & Can Thiệp', value: 'Phẫu Thuật & Can Thiệp' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Hình ảnh chính',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Mô tả ảnh (alt text)',
          description: 'Quan trọng cho SEO – mô tả ngắn gọn nội dung ảnh',
          validation: (Rule) => Rule.required(),
        },
      ],
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
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
            },
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
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Nếu bỏ trống sẽ dùng tên sản phẩm. Tối đa 60 ký tự',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'order',
      title: 'Thứ tự hiển thị',
      type: 'number',
      description: 'Số nhỏ hơn hiển thị trước',
      initialValue: 999,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
  orderings: [
    {
      title: 'Thứ tự hiển thị',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Tên A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
