import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import { useState } from "react";

const StudentDashboard: NextPage = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigationItems = [
    { href: "/dashboard/student/profile", label: "Profile Setup" },
    { href: "/dashboard/student/resume-builder", label: "Create CV" },
    { href: "/jobs", label: "Job Search & Matching" },
    { href: "/dashboard/student/applications", label: "Applications" },
    { href: "/dashboard/student/interviews", label: "Interviews" },
    { href: "/dashboard/student/skills-challenge", label: "Skills Challenges" },
    { href: "/dashboard/student/notifications", label: "Notifications" },
  ];

  return (
    <div className="min-h-screen">
      <Head>
        <title>Nerd.Next Recruitment System - Student Dashboard</title>
      </Head>

      <Header />

      <div className="flex min-h-screen pt-16">
        <nav className={`
          w-64 bg-blue-800 text-white 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          transition-transform duration-200 ease-in-out
          fixed md:sticky top-16 h-[calc(100vh-4rem)]
          z-10
        `}>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Student Menu</h2>
            <ul className="space-y-2">
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.href}
                    className="block py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <main className="flex-1 bg-gray-50 w-full md:pl-64">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden fixed top-20 left-4 z-20 p-2 bg-blue-800 text-white rounded-md"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-blue-800 mb-6">
                Welcome Back, {session?.user?.name || "Student"}!
              </h1>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600">
                  Select an option from the sidebar to manage your recruitment journey.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;