import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion } from './env'

// Client ĐỌC: dataset ở chế độ public nên dùng CDN và không cần token (quyền tối thiểu).
// Nếu sau này chuyển dataset sang Private, thêm `token` cho client này và đặt `useCdn: false`.
// Dùng cho code chạy trên server (getStaticProps, sitemap); ghi dữ liệu dùng write-client.ts.
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})
