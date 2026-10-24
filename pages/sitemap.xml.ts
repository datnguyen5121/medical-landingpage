import type { GetServerSideProps } from 'next'
import { SITE_URL } from '../lib/config'
import { sanityClient } from '../lib/sanity/client'

const STATIC_PATHS = ['/', '/san-pham', '/tin-tuc', '/gioi-thieu', '/doi-tac', '/lien-he']

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Sitemap cần URL tuyệt đối; thiếu NEXT_PUBLIC_SITE_URL thì không phát hành
  if (!SITE_URL) return { notFound: true }

  let dynamic: { loc: string; lastmod?: string }[] = []
  try {
    const docs: { _type: string; slug: string; _updatedAt: string }[] = await sanityClient.fetch(
      `*[_type in ["product","article"] && isHidden != true && defined(slug.current)]{ _type, "slug": slug.current, _updatedAt }`
    )
    dynamic = docs.map((d) => ({
      loc: `${d._type === 'product' ? '/san-pham' : '/tin-tuc'}/${d.slug}`,
      lastmod: d._updatedAt,
    }))
  } catch (error) {
    console.error('Sitemap fetch error:', error)
  }

  const urls = [...STATIC_PATHS.map((loc) => ({ loc, lastmod: undefined as string | undefined })), ...dynamic]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${escape(SITE_URL + u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
  .join('\n')}
</urlset>`

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.write(xml)
  res.end()
  return { props: {} }
}

export default function Sitemap() {
  return null
}
