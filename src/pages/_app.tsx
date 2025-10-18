// src/pages/_app.tsx
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import '../styles/globals.css';  // Add this line
import Navbar from '../components/Navbar';
import ChatBot from '../components/ChatBot';

export default function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps } 
}: AppProps) {
  const isIndexPage = Component.name === 'HomePage';
  
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
      <ChatBot />
    </SessionProvider>
  );
}