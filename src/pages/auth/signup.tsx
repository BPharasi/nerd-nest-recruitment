import { useState, FormEvent } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link"; // For client-side navigation
import { useRouter } from "next/router";
import { Mail, Lock, User, Github, Facebook } from "lucide-react";
// Note: Install lucide-react via npm i lucide-react for icons

interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage: NextPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    try {
      // Handle signup logic here (e.g., API call)
      console.log('Signup attempt:', formData);
      router.push('/dashboard'); // Or redirect as needed
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const inputStyle = {
  width: '50%',
  padding: '0.875rem',
  background: 'linear-gradient(135deg, rgba(0, 128, 128, 0.2) 0%, rgba(0, 191, 255, 0.3) 100%)',
  border: '1px solid rgba(0, 191, 255, 0.3)',
  borderRadius: '0.5rem',
  color: 'black',
  fontSize: '1rem',
  textAlign: 'center' as const,
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
        <title>Sign Up - Nerd.Nerd Recruitment</title>
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

      <div className="w-[400px] bg-white/10 backdrop-blur-md rounded-xl p-8 flex flex-col items-center">
        <img
          src="/images/Logo.png"
          alt="Nerd.Nerd"
          className="w-32 mb-6"
        />
        
        {/* Title Section - Fixed Centering */}
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
            Sign Up
          </h1>
          <p style={{
            color: 'rgba(0, 0, 0, 0.8)',
            textAlign: 'center',
            width: '100%',
            margin: '0.5rem auto 0',
            display: 'block'
          }}>
            Create your account to get started!
          </p>
        </div>

        {/* Form with centered inputs */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4">
          {['username', 'email', 'password', 'confirmPassword'].map((field) => (
            <input
              key={field}
              type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              value={formData[field as keyof SignupFormData]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              style={{
                ...inputStyle,
                margin: '0 auto',  // Center the input
                display: 'block'   // Make it a block element
              }}
              className="w-full transition-all duration-200 hover:border-white/30 focus:border-white/40"
            />
          ))}

          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '24px 0 0'
          }}>
            <button
              type="submit"
              style={{
                width: '40%',  // equivalent to w-2/3
                padding: '0.75rem',
                backgroundColor: 'rgba(0, 128, 128, 0.5)',
                color: 'black',
                borderRadius: '0.5rem',
                fontWeight: '600',
                textAlign: 'center',
                border: 'none',
                cursor: 'pointer',
                margin: '0 auto',
                display: 'block'
              }}
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Login link - Fixed Centering */}
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
            Already have an account?{" "}
            <a 
              href="/auth/signin" 
              className="text-black hover:underline"
              style={{ display: 'inline-block' }}
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;