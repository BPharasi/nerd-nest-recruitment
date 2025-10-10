// pages/index.tsx (Pages Router)
import { NextPage } from "next";
import Head from "next/head";

const HomePage: NextPage = () => {
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: "url('/images/background.gif')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden'
    }}>
      <Head>
        <title>Nerd.Nerd Recruitment System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        maxWidth: '1200px',
        padding: '0 20px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <img
          src="/images/Logo.png"
          alt="Nerd.Nerd"
          style={{ width: '600px', marginBottom: '64px' }}
        />
        
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: 'black',
          margin: '0 0 16px 0',
          padding: 0,
          width: '100%',
          textAlign: 'center'
        }}>
          Nerd.Nerd Recruitment System
        </h1>
        
        <p style={{ 
          fontSize: '1.5rem',
          color: 'black',
          marginBottom: '48px',
          width: '100%',
          textAlign: 'center'
        }}>
          Connect with job opportunities at UFS
        </p>

        <div style={{ 
          display: 'flex',
          gap: '32px',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => window.location.href = '/auth/signin'}
            style={{
              backgroundColor: 'rgba(0, 128, 128, 0.5)',
              color: '#193C64',
              padding: '10px 64px',
              fontSize: '1.25rem',
              fontWeight: '600',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Log In
          </button>
          <button
            onClick={() => window.location.href = '/auth/signup'}
            style={{
              backgroundColor: 'rgba(0, 128, 128, 0.5)',
              color: '#193C64',
              padding: '10px 64px',
              fontSize: '1.25rem',
              fontWeight: '600',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;