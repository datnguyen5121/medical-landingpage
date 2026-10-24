import { defineField } from 'sanity'

/** Trường "Mô tả ảnh (alt text)" dùng cho mọi ảnh; mặc định bắt buộc để tốt cho SEO và trợ năng. */
export const altTextField = (options: { required?: boolean; description?: string } = {}) => {
  const { required = true, description } = options
  return defineField({
    name: 'alt',
    type: 'string',
    title: 'Mô tả ảnh (alt text)',
    description,
    validation: required ? (Rule) => Rule.required() : undefined,
  })
}

/** Trường "Ẩn khỏi website": giữ bản ghi trong CMS nhưng không hiển thị công khai. */
export const hiddenField = defineField({
  name: 'isHidden',
  title: 'Ẩn khỏi website',
  type: 'boolean',
  description: 'Bật để ẩn khỏi website (vẫn giữ trong CMS, không cần xóa).',
  initialValue: false,
})
