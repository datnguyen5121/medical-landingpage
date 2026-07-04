export const trackQuoteConversion = () => {
  if (typeof window === 'undefined') return

  const gtag = (window as Window & typeof globalThis & { gtag?: (...args: unknown[]) => void }).gtag

  if (typeof gtag === 'function') {
    gtag('event', 'conversion', {
      send_to: 'AW-18294272736/6Qc0CJSxmsocEODlsZNE',
    })
  }
}
