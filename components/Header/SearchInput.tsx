import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export function SearchInput() {
  const router = useRouter()
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)

  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)

  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value?.trimStart())

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const search = value.trim().toLowerCase()
      search && router.push(`/verb/${search}`)
    }
  }

  return (
    <div
      className={twMerge(
        'relative mx-auto flex h-10 w-full items-center rounded-sm md:w-[400px]',
        focused ? 'bg-white' : 'bg-white/[.1]'
      )}
    >
      <MagnifyingGlassIcon
        className={twMerge(
          'absolute left-3 z-0 h-5',
          focused ? 'fill-slate-800' : 'fill-white'
        )}
      />
      <input
        className={twMerge(
          'z-10 w-full bg-transparent pl-10 text-sm outline-0',
          focused
            ? 'text-slate-800 placeholder:text-slate-800'
            : 'text-white placeholder:text-white'
        )}
        type="text"
        placeholder="Search verb"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}
