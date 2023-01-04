export enum Tense {
  Simple = 'simple',
  Progressive = 'progressive',
  Perfect = 'perfect',
  PerfectProgressive = 'perfect progressive',
}

export enum Time {
  Present = 'present',
  Past = 'past',
  Future = 'future',
  Conditional = 'conditional',
}

export enum Person {
  First,
  Second,
  Third,
}

export enum Plurality {
  Singular,
  Plural,
}

export type VerbData = {
  '1': string
  '2': string | null
  '3': string | null
  '4': string
  '5': string
  '6'?: string
  '7'?: string
  '8'?: string
}
