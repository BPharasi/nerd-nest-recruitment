import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nerd.Nerd Recruitment System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div
        className="min-h-screen flex flex-col bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background.gif')" }}
      >
        <Header />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
              Nerd.Nerd Recruitment System
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Connect with job opportunities at the University of the Free State
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/auth/signin" legacyBehavior>
                <a className="flex-1 bg-blue-800 text-white p-3 rounded-md hover:bg-blue-900 transition duration-200 text-center">
                  Log In
                </a>
              </Link>
              <Link href="/auth/signup" legacyBehavior>
                <a className="flex-1 bg-blue-800 text-white p-3 rounded-md hover:bg-blue-900 transition duration-200 text-center">
                  Sign Up
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;