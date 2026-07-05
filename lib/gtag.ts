export const trackQuoteConversion = () => {
  if (typeof window === 'undefined') return

  const dataLayer = (window as Window & typeof globalThis & { dataLayer?: unknown[] }).dataLayer

  if (Array.isArray(dataLayer)) {
    dataLayer.push({
      event: 'quote_conversion',
      conversion_type: 'quote_request',
    })
  }
}
