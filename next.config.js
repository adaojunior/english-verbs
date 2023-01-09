const { withSentryConfig } = require('@sentry/nextjs')
const { version } = require('./package.json')

const withPWA = require('next-pwa')({
  dest: 'public',
})

const enableSentryWebpackPlugin =
  process.env.SENTRY_ENABLE_WEBPACK_PLUGIN === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sentry: {
    hideSourceMaps: true,
    disableServerWebpackPlugin: !enableSentryWebpackPlugin,
    disableClientWebpackPlugin: !enableSentryWebpackPlugin,
  },
  publicRuntimeConfig: {
    version,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/verb/be',
        permanent: false,
      },
    ]
  },
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(withPWA(nextConfig), {
  silent: true,
})
