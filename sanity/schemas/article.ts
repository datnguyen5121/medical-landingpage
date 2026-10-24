import { defineField, defineType } from 'sanity'
import { slugifyVi } from '../lib/slugify'
import { altTextField, hiddenField } from '../lib/fields'

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
        slugify: slugifyVi,
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
          fields: [altTextField()],
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
      fields: [altTextField()],
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
    hiddenField,
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
      description: 'Tiêu đề để hiển thị trên search engines (nếu khác với tiêu đề chính). Nên không quá 60 ký tự',
      validation: (Rule) => Rule.max(60).warning('Nên không quá 60 ký tự để không bị cắt trên Google'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      description: 'Mô tả ngắn cho search engines (tối đa 160 ký tự)',
      validation: (Rule) => Rule.max(160).warning('Nên không quá 160 ký tự để không bị cắt trên Google'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      date: 'publishedAt',
      hidden: 'isHidden',
      media: 'mainImage',
    },
    prepare({ title, category, date, hidden, media }) {
      const parts = [
        hidden ? '[Ẩn]' : null,
        category,
        date ? new Date(date).toLocaleDateString('vi-VN') : null,
      ].filter(Boolean)
      return { title, subtitle: parts.join(' • '), media }
    },
  },
})
