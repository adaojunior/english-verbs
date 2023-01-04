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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
