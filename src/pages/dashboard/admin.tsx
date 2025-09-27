
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";

const AdminDashboard: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Admin Dashboard</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Admin Dashboard
        </h1>
        <p className="text-center mb-6">Welcome, {session?.user?.name || "Admin"}!</p>
        <div className="max-w-md mx-auto space-y-4">
          <Link href="/admin/user-management" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
            Manage User Accounts & Roles
          </Link>
          <Link href="/admin/employer-verification" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
            Verify Employer Organizations
          </Link>
          <Link href="/admin/academic-data" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
            Manage Academic Data Sync & Consent
          </Link>
          <Link href="/admin/skill-moderation" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
            Moderate Skill Challenges & Live Tests
          </Link>
          <Link href="/admin/job-approval" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
            Approve Job Postings
          </Link>
          <Link href="/admin/interview-oversight" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
            Oversee Interview Scheduling
          </Link>
          <Link href="/admin/analytics" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
            Produce Analytics & Records
          </Link>
          <Link href="/admin/announcements" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
            Publish Announcements
          </Link>
          <Link href="/admin/helpdesk" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
            Operate Helpdesk & Support
          </Link>
          <Link href="/admin/data-governance" className="block bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
            Data Governance & Auditing
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
