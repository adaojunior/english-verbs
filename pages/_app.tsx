import '../styles/globals.css'
import Layout from '@/components/Layout'
import { useAmplitudeInit } from '@/libs/hooks/useAmplitudeInit'
import type { AppProps } from 'next/app'
import Head from 'next/head'

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
