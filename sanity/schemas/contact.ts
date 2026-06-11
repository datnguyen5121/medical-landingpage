import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Yêu Cầu Liên Hệ',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Họ và tên',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Số điện thoại',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'position',
      title: 'Chức vụ',
      type: 'string',
    }),
    defineField({
      name: 'organization',
      title: 'Tên bệnh viện / Cơ sở y tế',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productInterest',
      title: 'Sản phẩm quan tâm',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Nội dung yêu cầu',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'submittedAt',
      title: 'Thời gian gửi',
      type: 'datetime',
    }),
    defineField({
      name: 'status',
      title: 'Trạng thái',
      type: 'string',
      options: {
        list: [
          { title: 'Chưa xử lý', value: 'pending' },
          { title: 'Đang xử lý', value: 'processing' },
          { title: 'Đã hoàn thành', value: 'completed' },
          { title: 'Từ chối', value: 'rejected' },
        ],
      },
      initialValue: 'pending',
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'organization',
      media: 'submittedAt',
    },
  },
})
