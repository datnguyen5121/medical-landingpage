import { defineField, defineType } from 'sanity'
import { slugifyVi } from '../lib/slugify'
import { altTextField } from '../lib/fields'

export default defineType({
  name: 'category',
  title: 'Danh mục sản phẩm',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tên danh mục',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Dùng trong liên kết lọc /san-pham?category=<slug>. Đổi slug sẽ làm các liên kết đã chia sẻ không còn lọc được.',
      options: {
        source: 'name',
        maxLength: 100,
        slugify: slugifyVi,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Mô tả ngắn',
      type: 'text',
      rows: 3,
      description: 'Giới thiệu danh mục (không bắt buộc).',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'image',
      title: 'Ảnh đại diện',
      type: 'image',
      description: 'Không bắt buộc. Nếu bỏ trống, website dùng ảnh của sản phẩm đầu tiên trong danh mục.',
      options: { hotspot: true },
      fields: [altTextField()],
    }),
    defineField({
      name: 'order',
      title: 'Thứ tự hiển thị',
      type: 'number',
      description: 'Số nhỏ hơn hiển thị trước trong bộ lọc.',
      initialValue: 999,
    }),
  ],
  preview: {
    select: { title: 'name', slug: 'slug.current', media: 'image' },
    prepare({ title, slug, media }) {
      return { title, subtitle: slug ? `/${slug}` : undefined, media }
    },
  },
  orderings: [
    { title: 'Thứ tự hiển thị', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Tên A-Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
  ],
})
