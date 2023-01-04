import { Person, Plurality, Tense, Time, VerbData } from './types'

const structure: [string, Person, Plurality][] = [
  ['I', Person.First, Plurality.Singular],
  ['You', Person.Second, Plurality.Singular],
  ['He', Person.Third, Plurality.Singular],
  ['She', Person.Third, Plurality.Singular],
  ['It', Person.Third, Plurality.Singular],
  ['We', Person.First, Plurality.Plural],
  ['They', Person.Third, Plurality.Plural],
]

export function getSimpleTenseOfBe(
  time: Time,
  person: Person,
  plurality: Plurality
) {
  const isFirst = person === Person.First
  const isSecond = person === Person.Second
  const isThird = person === Person.Third
  const isSingular = plurality === Plurality.Singular
  const isPlural = plurality === Plurality.Plural

  if (time == Time.Present)
    if (isFirst && isSingular) return 'am'
    else return isFirst || isSecond || (isThird && isPlural) ? 'are' : 'is'
  else if (time == Time.Past)
    return (isFirst && isSingular) || (isThird && isSingular) ? 'was' : 'were'
  else if (time == Time.Future) return 'will be'
  else return 'would be'
}

export function getSimpleTenseOfHave(
  time: Time,
  person: Person,
  plurality: Plurality
) {
  const isThird = person === Person.Third
  const isSingular = plurality === Plurality.Singular

  if (time == Time.Present) return isThird && isSingular ? 'has' : 'have'
  else if (time == Time.Past) return 'had'
  else if (time == Time.Future) return 'will have'
  else return 'would have'
}

export abstract class Conjugation {
  abstract readonly data: VerbData
  abstract get infinitive(): string
  public abstract get(
    tense: Tense,
    time: Time,
    person: Person,
    plurality: Plurality
  ): string

  private getRows(tense: Tense, time: Time) {
    return structure.map(
      ([subject, person, plurality]) =>
        `${subject} ${this.get(tense, time, person, plurality)}`
    )
  }

  getTable(tense: Tense) {
    return {
      [Time.Present]: this.getRows(tense, Time.Present),
      [Time.Past]: this.getRows(tense, Time.Past),
      [Time.Future]: this.getRows(tense, Time.Future),
      [Time.Conditional]: this.getRows(tense, Time.Conditional),
    }
  }
}

class DefaultConjugation extends Conjugation {
  constructor(readonly data: VerbData) {
    super()
  }

  get infinitive() {
    return this.data['1']
  }

  get progressive() {
    return this.data['3']
  }

  public get(tense: Tense, time: Time, person: Person, plurality: Plurality) {
    if (tense == Tense.Simple)
      return this.getSimpleTenseConjugation(time, person, plurality)
    else if (tense == Tense.Progressive)
      return `${getSimpleTenseOfBe(time, person, plurality)} ${
        this.progressive
      }`
    else if (tense == Tense.Perfect)
      return `${getSimpleTenseOfHave(time, person, plurality)} ${
        this.data['4']
      }`
    else
      return `${getSimpleTenseOfHave(time, person, plurality)} been ${
        this.progressive
      }`
  }

  private getSimpleTenseConjugation(
    time: Time,
    person: Person,
    plurality: Plurality
  ): string {
    const isThird = person === Person.Third
    const isSingular = plurality === Plurality.Singular

    if (time == Time.Present) {
      return isThird && isSingular ? this.data['5'] : this.infinitive
    } else if (time == Time.Past) return this.data['2'] as string
    else if (time == Time.Conditional) return `would ${this.infinitive}`
    else return `will ${this.infinitive}`
  }
}

class BeConjugation extends DefaultConjugation {
  public get(tense: Tense, time: Time, person: Person, plurality: Plurality) {
    if (tense === Tense.Simple) {
      return getSimpleTenseOfBe(time, person, plurality)
    } else if (tense === Tense.Progressive) {
      return `${getSimpleTenseOfBe(time, person, plurality)} ${
        this.progressive
      }`
    } else if (tense == Tense.Perfect)
      return `${getSimpleTenseOfHave(time, person, plurality)} ${
        this.data['2']
      }`
    else
      return `${getSimpleTenseOfHave(time, person, plurality)} been ${
        this.progressive
      }`
  }
}

export function getConjugation(data: VerbData): Conjugation {
  const isBe = data['1'] === 'be'
  return isBe ? new BeConjugation(data) : new DefaultConjugation(data)
}
