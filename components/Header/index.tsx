import { SearchInput } from '@/components/Header/SearchInput'

export function Header() {
  return (
    <div>
      <div className="flex h-16 items-center bg-teal-700 px-2.5">
        <SearchInput />
      </div>
    </div>
  )
}
