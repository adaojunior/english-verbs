const { withSentryConfig } = require('@sentry/nextjs')

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
  async redirects() {
    return [
      {
        source: '/',
        destination: '/verb/be',
        permanent: true,
      },
    ]
  },
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(nextConfig, {
  silent: true,
})
