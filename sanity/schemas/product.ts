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
          { title: 'Cabin thải độc sinh học', value: 'Cabin thải độc sinh học' },
          { title: 'Buồng oxy cao áp', value: 'Buồng oxy cao áp' },
          { title: 'Máy vỗ rung long đờm', value: 'Máy vỗ rung long đờm' },
          { title: 'Máy garo hơi tự động', value: 'Máy garo hơi tự động' },
          { title: 'Robot tập phục hồi chức năng', value: 'Robot tập phục hồi chức năng' },
          { title: 'Thiết bị tập phục hồi chức năng', value: 'Thiết bị tập phục hồi chức năng' },
          { title: 'Máy xông thuốc', value: 'Máy xông thuốc' },
          { title: 'Máy vi sóng trị liệu', value: 'Máy vi sóng trị liệu' },
          { title: 'Máy terahertz điều trị', value: 'Máy terahertz điều trị' },
          { title: 'Máy từ trường trị liệu', value: 'Máy từ trường trị liệu' },
          { title: 'Máy điện xung trị liệu', value: 'Máy điện xung trị liệu' },
          { title: 'Máy siêu âm trị liệu', value: 'Máy siêu âm trị liệu' },
          { title: 'Máy xung kích trị liệu', value: 'Máy xung kích trị liệu' },
          { title: 'Máy Laser trị liệu', value: 'Máy Laser trị liệu' },
          { title: 'Máy kéo giãn cột sống', value: 'Máy kéo giãn cột sống' },
          { title: 'Máy kích thích nuốt và phát âm', value: 'Máy kích thích nuốt và phát âm' },
          { title: 'Máy đo điện cơ đồ (EMG)', value: 'Máy đo điện cơ đồ (EMG)' },
          { title: 'Máy làm nóng túi chườm', value: 'Máy làm nóng túi chườm' },
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
