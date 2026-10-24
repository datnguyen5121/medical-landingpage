import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion, writeToken } from './env'

// Client GHI (có token): chỉ import trong API route. Tách file riêng để các trang không bao giờ
// kéo module chứa token vào bundle.
export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
  ignoreBrowserTokenWarning: true,
})
