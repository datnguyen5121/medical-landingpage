import type { GetServerSideProps } from 'next'
import { SITE_URL } from '../lib/config'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const lines = ['User-agent: *', 'Allow: /', 'Disallow: /studio', 'Disallow: /api/']
  if (SITE_URL) lines.push(`Sitemap: ${SITE_URL}/sitemap.xml`)
  res.setHeader('Content-Type', 'text/plain')
  res.write(lines.join('\n') + '\n')
  res.end()
  return { props: {} }
}

export default function Robots() {
  return null
}
