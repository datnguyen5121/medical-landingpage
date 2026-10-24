import Image, { type ImageProps } from 'next/image'
import { urlFor } from '../lib/sanity/image'
import { sanityLoader } from '../lib/sanity/loader'
import type { SanityImage as SanityImageData } from '../lib/sanity/queries'

type Props = Omit<ImageProps, 'src' | 'loader' | 'alt'> & {
  image: SanityImageData
  /** Ghi đè alt (mặc định lấy alt đã nhập trong Studio) */
  alt?: string
}

/**
 * Ảnh từ Sanity: resize/định dạng qua Sanity CDN, tôn trọng crop và hotspot đã chỉnh trong Studio,
 * hiển thị bản mờ (LQIP) trong lúc ảnh đang tải để tránh khoảng trống.
 */
export default function SanityImage({ image, alt, style, ...rest }: Props) {
  const { hotspot, lqip } = image
  const objectPosition = hotspot && rest.fill ? `${hotspot.x * 100}% ${hotspot.y * 100}%` : undefined

  return (
    <Image
      {...rest}
      src={urlFor(image).url()}
      alt={alt ?? image.alt ?? ''}
      loader={sanityLoader}
      placeholder={lqip ? 'blur' : 'empty'}
      blurDataURL={lqip}
      style={objectPosition ? { objectPosition, ...style } : style}
    />
  )
}
