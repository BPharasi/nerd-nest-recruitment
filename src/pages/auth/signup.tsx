import { useState, FormEvent } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

interface SignupFormState {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
  address: string;
  dateAvailable: string;
  password: string;
  error: string | null;
  loading: boolean;
}

const SignupPage: NextPage = () => {
  const [formState, setFormState] = useState<SignupFormState>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    address: "",
    dateAvailable: "",
    password: "",
    error: null,
    loading: false,
  });
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, error: null, loading: true }));

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (response.ok) {
        router.push("/auth/signin");
      } else {
        const data = await response.json();
        setFormState((prev) => ({
          ...prev,
          error: data.error || "Signup failed. Try again.",
          loading: false,
        }));
      }
    } catch (err) {
      setFormState((prev) => ({
        ...prev,
        error: "An error occurred.",
        loading: false,
      }));
    }
  };

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Sign Up</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div
        className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/ufs-campus-animation.gif')",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/ufs-logo.png"
              alt="UFS Recruitment System Logo"
              width={150}
              height={50}
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
            UFS Recruitment System - Sign Up
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Create an account to explore job opportunities at UFS
          </p>
          {formState.error && (
            <p className="text-red-500 text-center mb-4">{formState.error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={formState.firstName}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, firstName: e.target.value }))
                  }
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  placeholder="First Name"
                  disabled={formState.loading}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={formState.lastName}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, lastName: e.target.value }))
                  }
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  placeholder="Last Name"
                  disabled={formState.loading}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formState.email}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, email: e.target.value }))
                }
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                placeholder="student@ufs.ac.za"
                disabled={formState.loading}
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <select
                id="country"
                value={formState.country}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, country: e.target.value }))
                }
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                disabled={formState.loading}
              >
                <option value="">Select Country</option>
                <option value="South Africa">South Africa</option>
                {/* Add more countries as needed */}
              </select>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                value={formState.phone}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                placeholder="+27 123 456 789"
                disabled={formState.loading}
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address (City, Province, Postal Code)
              </label>
              <input
                id="address"
                type="text"
                value={formState.address}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, address: e.target.value }))
                }
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                placeholder="Bloemfontein, Free State, 9301"
                disabled={formState.loading}
              />
            </div>
            <div>
              <label
                htmlFor="dateAvailable"
                className="block text-sm font-medium text-gray-700"
              >
                Date Available
              </label>
              <input
                id="dateAvailable"
                type="date"
                value={formState.dateAvailable}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, dateAvailable: e.target.value }))
                }
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                disabled={formState.loading}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formState.password}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, password: e.target.value }))
                }
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                placeholder="Enter your password"
                disabled={formState.loading}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700 transition duration-200 disabled:bg-purple-400"
              disabled={formState.loading}
            >
              {formState.loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/auth/signin" className="text-blue-800 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
