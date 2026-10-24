import { Html, Head, Main, NextScript } from 'next/document'

const GTM_ID = 'GTM-5J6MWB23'

export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        <link rel="icon" href="/favicon/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon/favicon.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        {/* GTM snippet chuẩn của Google, đặt trong <head> */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </Head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
