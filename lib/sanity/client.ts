import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion, writeToken } from './env'

// Chỉ import từ code chạy trên server (getStaticProps, API route). Dataset để Private
// nên mọi truy vấn đều cần token. Không dùng CDN vì CDN không phục vụ dataset private.
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
  ignoreBrowserTokenWarning: true,
})

// Giữ tên cũ cho API route ghi dữ liệu
export const sanityServerClient = sanityClient
