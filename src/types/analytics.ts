export {}

type DataLayerEvent = {
  event?: string
  [key: string]: unknown
}

type DataLayerItem = DataLayerEvent | unknown[]

declare global {
  interface Window {
    dataLayer?: DataLayerItem[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    _fbq?: (...args: unknown[]) => void
    hj?: (...args: unknown[]) => void
    _hjSettings?: {
      hjid: number
      hjsv: number
    }
  }
}
