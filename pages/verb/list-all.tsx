import { datasource } from '@/libs/conjugation'

export async function getStaticProps() {
  return {
    props: {
      baseUrl: process.env.SITEMAP_BASE_URL || '',
      verbs: datasource.map((row) => row['1']),
    },
  }
}

export default function ListAll({
  verbs,
  baseUrl,
}: {
  verbs: string[]
  baseUrl: string
}) {
  return (
    <div>
      {verbs.map((verb) => (
        <div key={verb}>
          {`${baseUrl}/verb/${verb}`}
          <br />
        </div>
      ))}
    </div>
  )
}
