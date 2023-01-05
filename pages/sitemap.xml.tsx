import { GetServerSidePropsContext } from 'next'

import { datasource } from '@/libs/conjugation'

function toUrls(values: { loc: string }[]) {
  return values
    .map(({ loc }) => {
      return `
       <url>
           <loc>${loc}</loc>
       </url>
     `
    })
    .join('')
}

function getXml() {
  const baseUrl = process.env.SITEMAP_BASE_URL || ''

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${toUrls(
       datasource.map(({ '1': verb }) => ({ loc: `${baseUrl}/verb/${verb}` }))
     )}
   </urlset>
 `
}

function SiteMap() {}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const sitemap = getXml()

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
