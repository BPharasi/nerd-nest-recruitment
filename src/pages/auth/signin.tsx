import { signIn, useSession } from 'next-auth/react';
import { FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid username or password')
      } else if (result?.ok) {
        // Redirect to dashboard on successful login
        router.push('/dashboard')
      }
    } catch (error) {
      setError('An error occurred during sign in')
    } finally {
      setIsLoading(false)
    }
  }

  const inputStyle = {
    width: '50%',
    padding: '0.875rem',
    background: 'linear-gradient(135deg, rgba(0, 128, 128, 0.2) 0%, rgba(0, 191, 255, 0.3) 100%)',
    border: '1px solid rgba(0, 191, 255, 0.3)',
    borderRadius: '0.5rem',
    color: 'black',
    fontSize: '1rem',
    textAlign: 'center' as const,
    marginBottom: '1rem',
    display: 'block',
    margin: '0 auto 1rem auto'
  };

  return (
    <div 
      className="fixed inset-0 m-0 p-0"
      style={{
        backgroundImage: "url('/images/background.gif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
        overflow: 'hidden',
      }}>
      <Head>
        <title>Sign In - Nerd.Nerd Recruitment</title>
        <style>{`
          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
          #__next {
            height: 100vh;
            width: 100vw;
          }
        `}</style>
      </Head>

      <div className="w-[25rem] bg-white/10 backdrop-blur-md rounded-xl p-8 flex flex-col items-center">
        <img
          src="/images/Logo.png"
          alt="Nerd.Nerd"
          className="w-[20%] min-w-[5rem] max-w-[9.375rem] mb-6"
        />
        
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          marginBottom: '2rem',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: 'black',
            width: '100%',
            textAlign: 'center',
            margin: '0 auto',
            display: 'block'
          }}>
            Sign In
          </h1>
          <p style={{
            color: 'rgba(0, 0, 0, 0.8)',
            textAlign: 'center',
            width: '100%',
            margin: '0.5rem auto 0',
            display: 'block'
          }}>
            Welcome back!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <div style={{ 
            width: '100%', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              className="w-full max-w-[18.75rem]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              className="w-full max-w-[18.75rem]"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}

          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1.5rem 0 0'
          }}>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '30%',
                padding: '0.75rem',
                backgroundColor: 'rgba(0, 128, 128, 0.5)',
                color: '#193C64',
                borderRadius: '0.5rem',
                fontWeight: '600',
                textAlign: 'center',
                border: 'none',
                cursor: 'pointer',
                margin: '0 auto',
                display: 'block'
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '1.5rem',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          <p style={{
            color: 'rgba(0, 0, 0, 0.6)',
            margin: 0,
            padding: 0,
            textAlign: 'center',
            width: '100%',
            display: 'block'
          }}>
            Don't have an account?{" "}
            <a 
              href="/auth/signup" 
              className="text-black hover:underline"
              style={{ display: 'inline-block' }}
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}