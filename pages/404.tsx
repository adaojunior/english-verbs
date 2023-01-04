import Head from 'next/head'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404: This page could not be found.</title>
      </Head>

      <div className="m-auto flex max-w-4xl justify-center pt-10">
        <h1>404 - This page could not be found.</h1>
      </div>
    </>
  )
}
