import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{
      margin: 0,
      padding: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      backgroundColor: '#f7fafc',
      color: '#374151'
    }}>
      <main>{children}</main>
    </div>
  )
}