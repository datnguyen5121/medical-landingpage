import dynamic from 'next/dynamic'

const SanityStudio = dynamic(() => import('../../components/SanityStudio'), {
  ssr: false,
  loading: () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <p>Đang tải Studio...</p>
    </div>
  ),
})

export default function StudioPage() {
  return <SanityStudio />
}
