import { ReactNode } from 'react'

import { Header } from '@/components/Header'

export type LayoutProps = {
  children?: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-screen bg-gray-200">
      <Header />

      {children}
    </div>
  )
}
