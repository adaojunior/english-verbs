import { GetStaticPropsContext } from 'next'
import Head from 'next/head'
import { useState } from 'react'

import { ConjugationTableHeader } from '@/components/ConjugationTableHeader'
import {
  Tense,
  Time,
  datasource,
  findVerb,
  getConjugation,
} from '@/libs/conjugation'

type VerbProps = {
  data: {
    infinitive: string
    tenses: {
      [key in Tense]: {
        [key in Time]: string[]
      }
    }
  }
}

export default function Verb({ data }: VerbProps) {
  const [selected, onSelect] = useState(Tense.Simple)
  const conjugation = data.tenses[selected]

  return (
    <div>
      <Head>
        <title>{`Verb - To ${data.infinitive}`}</title>
      </Head>

      <ConjugationTableHeader
        verb={data.infinitive}
        selected={selected}
        onSelect={onSelect}
      />

      <div className="m-auto max-w-4xl p-10 px-4">
        <div className="grid grid-cols-2 gap-4 border border-gray-300 bg-white p-10 md:grid-cols-4">
          {[Time.Present, Time.Past, Time.Future, Time.Conditional].map(
            (time) => (
              <div key={time}>
                <div className="mb-5 text-sm font-medium	uppercase text-slate-600">
                  {time}
                </div>

                {conjugation[time].map((value, index) => (
                  <div
                    key={`${time}${index}`}
                    className="mb-5 text-sm text-gray-600"
                  >
                    {value}
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const verb = findVerb(params?.['verb'] as string)

  const conjugation = verb ? getConjugation(verb) : null

  return {
    props: {
      data: conjugation && {
        infinitive: conjugation.infinitive,
        tenses: {
          [Tense.Simple]: conjugation.getTable(Tense.Simple),
          [Tense.Perfect]: conjugation.getTable(Tense.Perfect),
          [Tense.Progressive]: conjugation.getTable(Tense.Progressive),
          [Tense.PerfectProgressive]: conjugation.getTable(
            Tense.PerfectProgressive
          ),
        },
      },
    },
  }
}

export async function getStaticPaths() {
  const paths = datasource.map(({ '1': verb }) => ({
    params: { verb },
  }))

  return { paths, fallback: false }
}
