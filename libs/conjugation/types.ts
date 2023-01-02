export enum Tense {
  Simple = 'Simple',
  Progressive = 'Progressive',
  Perfect = 'Perfect',
  PerfectProgressive = 'PerfectProgressive',
}

export enum Time {
  Present = 'Present',
  Past = 'Past',
  Future = 'Future',
  Conditional = 'Conditional',
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
