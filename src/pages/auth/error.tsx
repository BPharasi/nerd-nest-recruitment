import { useRouter } from 'next/router'
import Link from 'next/link'

export default function ErrorPage() {
  const router = useRouter()
  const { error } = router.query

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl font-semibold text-red-600 mb-4">
            Authentication Error
          </h1>
          <p className="text-gray-600 mb-4">
            {error === 'Configuration' 
              ? 'There was a problem with the authentication configuration. Please try again.'
              : 'An error occurred during authentication. Please try again.'}
          </p>
          <Link 
            href="/auth/signin"
            className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
