import Image from 'next/image'

// ...existing code...
<Image 
  src="/logo.png"  // Remove 'public' from the path
  width={384}
  height={75}
  alt="Logo"
  priority  // Add priority instead of fetchPriority
/>
// ...existing code...
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";

const StudentDashboard: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Student Dashboard</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
            Student Dashboard
          </h1>
          <p className="text-center mb-6">Welcome, {session?.user?.name || "Student"}!</p>
          <div className="max-w-md mx-auto space-y-4">
            <Link href="/dashboard/student/Profile" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
              Profile Setup
            </Link>
            <Link href="/dashboard/student/resume-builder" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
              Create CV
            </Link>
            <Link href="/jobs" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
              Job Search & Matching
            </Link>
            <Link href="/dashboard/student/applications" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
              Apply & Track Applications
            </Link>
            <Link href="/dashboard/student/interviews" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
              Interview Scheduling
            </Link>
            <Link href="/dashboard/student/skills-challenges" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
              Live Skills Challenges
            </Link>
            <Link href="/dashboard/student/notifications" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
              View Notifications
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
