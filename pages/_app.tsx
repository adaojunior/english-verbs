import type { AppProps } from 'next/app'
import Head from 'next/head'

import Layout from '@/components/Layout'
import { useAmplitudeInit } from '@/libs/hooks/useAmplitudeInit'

import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  useAmplitudeInit()

  return (
    <Layout>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta name="theme-color" content="#0F766E" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
