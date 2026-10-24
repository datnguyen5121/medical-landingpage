import Image from 'next/image'

interface Props {
  /** Cạnh hiển thị (px) */
  size?: number
  className?: string
}

/** Biểu tượng hoa sen MediWellness (bản đã cắt viền và tối ưu từ public/images/logo/iconMediwellness.png). */
export default function BrandMark({ size = 44, className }: Props) {
  return (
    <Image
      src="/images/logo/mediwellness-mark.png"
      alt=""
      width={size}
      height={size}
      // Logo xuất hiện ngay đầu trang nên tải ưu tiên; ảnh gốc 144px đủ nét cho màn Retina ở cỡ này
      priority
      className={`shrink-0 ${className ?? ''}`}
    />
  )
}
