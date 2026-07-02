import Head from 'next/head'
import Script from 'next/script'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon/newlogo.png" type="image/png" />
      </Head>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18294272736"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18294272736');`}
      </Script>

      <Component {...pageProps} />
    </>
  )
}
