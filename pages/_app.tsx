import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { installImageProtection } from '../lib/protect-images'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => installImageProtection(), [])

  return <Component {...pageProps} />
}
