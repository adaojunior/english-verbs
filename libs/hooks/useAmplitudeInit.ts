import { useEffect } from 'react'
import { init, track } from '@amplitude/analytics-browser'
import { useRouter } from 'next/router'

const trackPageView = () =>
  track('Page View', {
    title: document.title,
    path: window.location.pathname,
    hash: window.location.hash,
    search: window.location.search,
    url: window.location.href,
    referrer: document.referrer,
    'viewport width': window.innerWidth,
    'viewport height': window.innerHeight,
  })

export function useAmplitudeInit() {
  const router = useRouter()

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_KEY

    if (apiKey) {
      init(apiKey, undefined)
      trackPageView()
    }

    router.events.on('routeChangeComplete', () => trackPageView())
  }, [])
}
