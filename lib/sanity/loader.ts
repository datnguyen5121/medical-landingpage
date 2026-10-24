import type { ImageLoaderProps } from 'next/image'

// Loader cho next/image: để Sanity CDN tự resize và đổi định dạng (WebP/AVIF) theo trình duyệt,
// không đi qua bộ tối ưu của Next. Nhờ đó ảnh gốc 2560px không bị tải về server rồi xử lý lại,
// và mỗi kích thước được cache sẵn trên CDN.
export function sanityLoader({ src, width, quality }: ImageLoaderProps): string {
  const url = new URL(src)
  url.searchParams.set('w', String(width))
  url.searchParams.set('q', String(quality || 75))
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'max')
  return url.toString()
}
