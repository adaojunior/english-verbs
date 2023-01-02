import { datasource } from './datasource'

export * from './types'
export { getConjugation, Conjugation } from './conjugation'

export function findVerb(search: string) {
  search = search.trim().toLowerCase()

  if (search.startsWith('to ') && search.length > 3) {
    search = search.substring(3, search.length)
  }

  return datasource.find((row) => row['1'] === search)
}
