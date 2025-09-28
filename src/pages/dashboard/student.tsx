import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import { useState } from "react";

const StudentDashboard: NextPage = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Nerd.Next Recruitment System - Student Dashboard</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-row h-[calc(100vh-120px)]">
          {/* Sidebar Toggle Button for Mobile */}
          <button
            className="md:hidden p-4 text-blue-800 z-50 fixed top-20 left-0 bg-white shadow-md"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          {/* Sidebar Navigation */}
          <div
            className={`bg-red-500 p-4 w-64 h-full fixed top-20 ${
              isSidebarOpen ? "block" : "hidden"
            } md:static md:block z-40`}
          >
            <nav className="space-y-2">
              <Link href="/dashboard/student/Profile" className="block text-white p-3 rounded">
                Profile Setup
              </Link>
              <Link href="/dashboard/student/resume-builder" className="block text-white p-3 rounded">
                Create CV
              </Link>
              <Link href="/jobs" className="block text-white p-3 rounded">
                Job Search & Matching
              </Link>
              <Link href="/dashboard/student/applications" className="block text-white p-3 rounded">
                Apply & Track Applications
              </Link>
              <Link href="/dashboard/student/interviews" className="block text-white p-3 rounded">
                Interview Scheduling
              </Link>
              <Link href="/dashboard/student/skills-challenge" className="block text-white p-3 rounded">
                Live Skills Challenges
              </Link>
              <Link href="/dashboard/student/notifications" className="block text-white p-3 rounded">
                View Notifications
              </Link>
            </nav>
          </div>
          {/* Main Content Area */}
          <div className="flex-1 p-6 ml-0 md:ml-64 bg-green-100">
            <h1 className="text-3xl font-bold text-blue-800 mb-4">Student Dashboard</h1>
            <p className="text-gray-600 mb-6">Welcome, {session?.user?.name || "Student"}! Select an option from the sidebar to get started.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;