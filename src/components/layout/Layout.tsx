import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(to right, #283593, #5C6BC0)' }}
    >
      {children}
    </div>
  )
}