// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
const environment = process.env.SENTRY_ENV || process.env.NEXT_PUBLIC_SENTRY_ENV

Sentry.init({
  dsn,
  environment,
  tracesSampleRate: 1.0,
})
