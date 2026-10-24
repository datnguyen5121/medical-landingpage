import dynamic from 'next/dynamic'
import Head from 'next/head'

const SanityStudio = dynamic(() => import('../../components/SanityStudio'), {
  ssr: false,
  loading: () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <p>Đang tải Studio...</p>
    </div>
  ),
})

export default function StudioPage() {
  return (
    <>
      <Head>
        <title>MediWellness – Quản lý nội dung</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <SanityStudio />
    </>
  )
}
