import { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { installImageProtection } from '../lib/protect-images'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const isStudio = pathname.startsWith('/studio')

  // Chặn lưu ảnh chỉ áp dụng cho trang công khai; biên tập viên trong Studio cần chuột phải/kéo-thả bình thường
  useEffect(() => {
    if (isStudio) return
    return installImageProtection()
  }, [isStudio])

  return <Component {...pageProps} />
}
