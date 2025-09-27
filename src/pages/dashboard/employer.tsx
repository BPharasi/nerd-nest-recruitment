
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";

const EmployerDashboard: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Employer Dashboard</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Employer Dashboard
        </h1>
        <p className="text-center mb-6">Welcome, {session?.user?.name || "Employer"}!</p>
        <div className="max-w-md mx-auto space-y-4">
          <Link href="/dashboard/employer/company-profile" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
            Manage Company Profile & Job Postings
          </Link>
          <Link href="/dashboard/employer/candidate-search" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
            Search & Filter Candidates
          </Link>
          <Link href="/dashboard/employer/interview-management" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
            Manage Interview Scheduling
          </Link>
          <Link href="/dashboard/employer/applications" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
            Review Applications
          </Link>
          <Link href="/dashboard/employer/communication" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
            Communicate with Candidates
          </Link>
          <Link href="/dashboard/employer/academic-requests" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
            Request Academic Data
          </Link>
        </div>
      </div>
    </>
  );
};

export default EmployerDashboard;
