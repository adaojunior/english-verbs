import { VerbTensesTabs } from './VerbTensesTabs'

export function Header() {
  return (
    <div>
      <div className="h-16 bg-teal-700"></div>
      <div className="bg-teal-600 text-white">
        <div className="py-4 text-center text-4xl">To be</div>
        <VerbTensesTabs />
      </div>
    </div>
  )
}
