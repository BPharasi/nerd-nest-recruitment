import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      {/* ...existing code... */}
      <Link href="/signin">
        Sign In
      </Link>
      {/* ...existing code... */}
    </nav>
  )
}