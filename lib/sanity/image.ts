import { createImageUrlBuilder } from '@sanity/image-url'
import { projectId, dataset } from './env'

type SanityImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>['image']>[0]

// Chỉ cần projectId/dataset để dựng URL ảnh, không import client có token (file này chạy ở trình duyệt)
const builder = createImageUrlBuilder({ projectId, dataset })

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
