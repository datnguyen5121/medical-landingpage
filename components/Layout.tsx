import Head from 'next/head'
import { useRouter } from 'next/router'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingButtons from './FloatingButtons'
import type { ReactNode } from 'react'
import { SITE_NAME, SITE_URL } from '../lib/config'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  /** URL tuyệt đối của ảnh chia sẻ (og:image) */
  image?: string
  ogType?: 'website' | 'article' | 'product'
  /** Dữ liệu có cấu trúc schema.org, được nhúng dưới dạng JSON-LD */
  jsonLd?: Record<string, unknown>
}

export default function Layout({
  children,
  title = 'MediWellness – Thiết Bị Y Tế',
  description = 'Nhà nhập khẩu & phân phối thiết bị y tế hàng đầu Việt Nam',
  image,
  ogType = 'website',
  jsonLd,
}: LayoutProps) {
  const { asPath } = useRouter()
  const canonical = SITE_URL ? `${SITE_URL}${asPath.split(/[?#]/)[0]}`.replace(/\/$/, '') || SITE_URL : undefined

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {canonical && <link rel="canonical" href={canonical} />}
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:type" content={ogType === 'product' ? 'website' : ogType} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {canonical && <meta property="og:url" content={canonical} />}
        {image && <meta property="og:image" content={image} />}
        <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
        {jsonLd && (
          <script
            type="application/ld+json"
            // Thay "<" để chuỗi JSON không thể đóng thẻ <script> sớm
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\u003c') }}
          />
        )}
      </Head>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
