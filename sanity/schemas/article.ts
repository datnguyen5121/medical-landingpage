import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Bài Viết',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tiêu đề',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(200),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
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
          { title: 'Sản phẩm mới', value: 'Sản phẩm mới' },
          { title: 'Tin tức ngành', value: 'Tin tức ngành' },
          { title: 'Khuyến mãi', value: 'Khuyến mãi' },
          { title: 'Kiến thức y tế', value: 'Kiến thức y tế' },
          { title: 'Đối tác', value: 'Đối tác' },
          { title: 'Sự kiện', value: 'Sự kiện' },
          { title: 'Hướng dẫn', value: 'Hướng dẫn' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Mô tả ngắn',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().min(10).max(500),
      description: 'Đoạn mô tả ngắn hiển thị trong danh sách bài viết',
    }),
    defineField({
      name: 'content',
      title: 'Nội dung chi tiết',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Mô tả ảnh (alt text)',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'mainImage',
      title: 'Hình ảnh đại diện',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Mô tả ảnh (alt text)',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Ngày đăng',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Thời gian đọc (phút)',
      type: 'number',
      description: 'Ước tính số phút để đọc bài viết',
      validation: (Rule) => Rule.required().min(1).max(60),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Bài viết nổi bật',
      type: 'boolean',
      description: 'Đánh dấu để hiển thị bài viết lớn ở đầu trang',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Thứ tự hiển thị',
      type: 'number',
      description: 'Số thứ tự để sắp xếp bài viết (1, 2, 3...)',
      initialValue: 0,
    }),
    defineField({
      name: 'author',
      title: 'Tác giả',
      type: 'string',
      description: 'Tên tác giả bài viết',
    }),
    defineField({
      name: 'tags',
      title: 'Thẻ',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Các thẻ để phân loại nội dung',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Tiêu đề để hiển thị trên search engines (nếu khác với tiêu đề chính)',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      description: 'Mô tả ngắn cho search engines (tối đa 160 ký tự)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      date: 'publishedAt',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, category, date, media } = selection
      return {
        title,
        subtitle: category ? `${category} • ${new Date(date).toLocaleDateString('vi-VN')}` : '',
        media,
      }
    },
  },
})
