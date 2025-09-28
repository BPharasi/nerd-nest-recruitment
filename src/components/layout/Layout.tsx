import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-700 font-sans">
      <main className="flex flex-row">{children}</main>
    </div>
  )
}