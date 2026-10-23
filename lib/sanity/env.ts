function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Thiếu biến môi trường ${name}. Xem .env.example.`)
  }
  return value
}

export const projectId = required(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID,
  'NEXT_PUBLIC_SANITY_PROJECT_ID'
)
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'
export const writeToken = process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN
