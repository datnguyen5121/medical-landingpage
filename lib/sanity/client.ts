import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion, writeToken } from './env'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// Chỉ import từ API route (server). Không import trong code chạy ở trình duyệt.
export const sanityServerClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
  ignoreBrowserTokenWarning: true,
})
