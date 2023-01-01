import { twMerge } from 'tailwind-merge'
import { useState } from 'react'

const tabs = ['Simple', 'Progressive', 'Perfect', 'Perfect-Progressive']

export function VerbTensesTabs() {
  const [active, setActive] = useState(0)

  return (
    <div className="m-auto flex w-fit max-w-full overflow-x-scroll pl-4 text-xs font-medium uppercase text-white scrollbar-hide md:text-sm">
      {tabs.map((tab, index) => (
        <div
          key={tab}
          className={twMerge(
            'cursor-pointer whitespace-nowrap border-b-4 py-3.5 px-6',
            index === active
              ? 'border-pink-500 opacity-100'
              : 'border-transparent opacity-60'
          )}
          onClick={() => setActive(index)}
        >
          {tab}
        </div>
      ))}
    </div>
  )
}
