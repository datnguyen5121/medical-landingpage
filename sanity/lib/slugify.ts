// Tạo slug không dấu từ tiêu đề tiếng Việt (dùng cho trường slug của mọi schema)
export function slugifyVi(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 200)
}
