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
      title: 'Địa chỉ bệnh viện / Cơ sở y tế / Phòng khám / Spa',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quantity',
      title: 'Số lượng máy cần mua',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
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
      organization: 'organization',
      status: 'status',
      submittedAt: 'submittedAt',
    },
    prepare({ title, organization, status, submittedAt }) {
      const statusLabel: Record<string, string> = {
        pending: 'Chưa xử lý',
        processing: 'Đang xử lý',
        completed: 'Đã hoàn thành',
        rejected: 'Từ chối',
      }
      const parts = [
        statusLabel[status as string] ?? status,
        submittedAt ? new Date(submittedAt).toLocaleDateString('vi-VN') : null,
        organization,
      ].filter(Boolean)
      return { title, subtitle: parts.join(' • ') }
    },
  },
  // Mục đầu tiên là thứ tự mặc định: lead mới nhất lên đầu
  orderings: [
    {
      title: 'Mới nhất trước',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Trạng thái',
      name: 'statusAsc',
      by: [
        { field: 'status', direction: 'asc' },
        { field: 'submittedAt', direction: 'desc' },
      ],
    },
  ],
})
