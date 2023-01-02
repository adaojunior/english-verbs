import { twMerge } from 'tailwind-merge'
import { Tense } from '@/libs/conjugation'

const tabs = [
  [Tense.Simple, 'Simple'],
  [Tense.Progressive, 'Progressive'],
  [Tense.Perfect, 'Perfect'],
  [Tense.PerfectProgressive, 'Perfect-Progressive'],
]

type TabsProps = {
  selected: Tense
  onSelect: (selected: Tense) => void
}

type ConjugationTableHeaderProps = TabsProps & {
  verb: string
}

export function Tabs({ selected, onSelect }: TabsProps) {
  return (
    <div className="m-auto flex w-fit max-w-full overflow-x-scroll pl-4 text-xs font-medium uppercase text-white scrollbar-hide md:text-sm">
      {tabs.map(([key, label]) => (
        <div
          key={key}
          className={twMerge(
            'cursor-pointer whitespace-nowrap border-b-4 py-3.5 px-6',
            key === selected
              ? 'border-pink-500 opacity-100'
              : 'border-transparent opacity-60'
          )}
          onClick={() => onSelect(key as Tense)}
        >
          {label}
        </div>
      ))}
    </div>
  )
}

export function ConjugationTableHeader({
  verb,
  selected,
  onSelect,
}: ConjugationTableHeaderProps) {
  return (
    <div className="bg-teal-600 text-white">
      <div className="py-4 text-center text-4xl">To {verb}</div>
      <Tabs selected={selected} onSelect={onSelect} />
    </div>
  )
}
