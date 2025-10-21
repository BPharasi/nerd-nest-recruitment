import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Link from "next/link";
import {
  FaUsers,
  FaUserTie,
  FaHome,
  FaClipboardList,
  FaFileAlt,
  FaTrophy,
  FaVideo,
  FaBell,
  FaChartBar,
  FaCheckCircle,
  FaUserCheck,
  FaUserTimes,
} from "react-icons/fa";

// Mock pending employers data
const mockPendingEmployers = [
  {
    id: "1",
    company: "TechNova Solutions",
    recruiter: "Thabo Mthembu",
    email: "thabo.mthembu@technova.co.za",
    industry: "Software Development",
    location: "Johannesburg",
    description: "Mid-sized firm specializing in web apps for education.",
    status: "pending"
  },
  {
    id: "2",
    company: "GlobalNet Corp",
    recruiter: "Aisha Patel",
    email: "aisha.patel@globalnet.co.za",
    industry: "IT Consulting",
    location: "Cape Town",
    description: "Provides cloud services to universities.",
    status: "pending"
  },
  // ...add more mock employers as needed
];

const navigationGroups = [
  {
    title: "Admin",
    items: [
      { href: "/dashboard/admin", label: "Dashboard Home", icon: <FaHome /> },
      { href: "/dashboard/admin/users", label: "User Management", icon: <FaUsers /> },
      { href: "/dashboard/admin/employer-verification", label: "Employer Verification", icon: <FaUserTie /> },
      { href: "/dashboard/admin/academic-data", label: "Academic Data", icon: <FaFileAlt /> },
      { href: "/dashboard/admin/skill-moderation", label: "Skill Moderation", icon: <FaTrophy /> },
      { href: "/dashboard/admin/job-approval", label: "Job Approval", icon: <FaFileAlt /> },
      { href: "/dashboard/admin/interview-oversight", label: "Interview Oversight", icon: <FaVideo /> },
      { href: "/dashboard/admin/analytics", label: "Analytics", icon: <FaChartBar /> },
      { href: "/dashboard/admin/announcements", label: "Announcements", icon: <FaBell /> },
      { href: "/dashboard/admin/helpdesk", label: "Helpdesk", icon: <FaClipboardList /> },
      { href: "/dashboard/admin/data-governance", label: "Data Governance", icon: <FaCheckCircle /> },
    ],
  },
];

const EmployerVerificationPage: NextPage = () => {
  const { data: session } = useSession();
  const [pendingEmployers, setPendingEmployers] = useState(mockPendingEmployers);

  const handleApprove = (id: string) => {
    setPendingEmployers(prev =>
      prev.map(emp => emp.id === id ? { ...emp, status: "approved" } : emp)
    );
  };

  const handleReject = (id: string) => {
    setPendingEmployers(prev =>
      prev.map(emp => emp.id === id ? { ...emp, status: "rejected" } : emp)
    );
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: "linear-gradient(to right, #283593, #5C6BC0)",
      }}
    >
      <Head>
        <title>Employer Verification - Admin | UFS Recruitment</title>
      </Head>
      {/* Header */}
      <header
        style={{
          height: "75px",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Header />
      </header>
      {/* Sidebar Navigation */}
      <aside
        style={{
          position: "absolute",
          top: "75px",
          bottom: 0,
          left: 0,
          width: "256px",
          overflowY: "auto",
          background: "linear-gradient(to bottom, #26A69A, #00BCD4)",
          padding: "1rem",
        }}
        className="hidden md:block"
      >
        {/* Profile Avatar Section */}
        <div className="relative mb-8" style={{ height: "180px", width: "100%" }}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: "20px",
              width: "120px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "60px",
                border: "4px solid rgba(255, 255, 255, 0.9)",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                marginBottom: "12px",
              }}
            >
              <img
                src={session?.user?.image || "https://www.gravatar.com/avatar/?d=mp"}
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-white text-lg">{session?.user?.name || "Admin"}</h3>
            </div>
          </div>
        </div>
        {/* Navigation */}
        <div className="space-y-4">
          {navigationGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              <div className="px-4 py-2 text-sm font-semibold text-white uppercase tracking-wider mb-3">
                {group.title}
              </div>
              <div className="space-y-2">
                {group.items.map((item, index) => (
                  <Link key={index} href={item.href} className="block">
                    <div
                      style={{
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                      className="px-4 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-3"
                    >
                      <span className="text-lg text-white">{item.icon}</span>
                      <span className="text-white font-medium">{item.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
      {/* Main Content */}
      <main
        style={{
          position: "absolute",
          top: "75px",
          right: 0,
          bottom: 0,
          left: "256px",
          overflowY: "auto",
          padding: "2rem",
          backgroundImage: "url('/images/skills_background(1).png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Blurred overlay for background image */}
        <div
          style={{
            position: 'fixed',
            top: '75px',
            left: '256px',
            right: 0,
            bottom: 0,
            zIndex: 0,
            backdropFilter: 'blur(8px)',
            pointerEvents: 'none'
          }}
        />
        <div className="max-w-7xl mx-auto px-4" style={{ position: 'relative', zIndex: 1 }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Employer Verification</h1>
              <p className="text-gray-600">Approve or reject new employer accounts after verification</p>
            </div>
          </div>
          <div
            className="bg-white rounded-xl shadow-lg p-8"
            style={{
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(20, 184, 166, 0.3)",
            }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Pending Employers</h2>
            <div className="overflow-x-auto w-full">
              <table
                className="min-w-full text-left border border-gray-300"
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr className="text-gray-700 font-semibold text-base">
                    <th className="py-3 px-4 border border-gray-400">Company</th>
                    <th className="py-3 px-4 border border-gray-400">Recruiter</th>
                    <th className="py-3 px-4 border border-gray-400">Email</th>
                    <th className="py-3 px-4 border border-gray-400">Industry</th>
                    <th className="py-3 px-4 border border-gray-400">Location</th>
                    <th className="py-3 px-4 border border-gray-400">Description</th>
                    <th className="py-3 px-4 border border-gray-400">Status</th>
                    <th className="py-3 px-4 border border-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingEmployers.map((emp) => (
                    <tr
                      key={emp.id}
                      className="hover:bg-gray-50 transition"
                      style={{ borderBottom: "1px solid #cbd5e1" }}
                    >
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">{emp.company}</td>
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">{emp.recruiter}</td>
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">{emp.email}</td>
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">{emp.industry}</td>
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">{emp.location}</td>
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">{emp.description}</td>
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">
                        {emp.status === "pending" && (
                          <span className="bg-yellow-400/20 text-yellow-700 px-4 py-1 rounded-full text-xs font-semibold">Pending</span>
                        )}
                        {emp.status === "approved" && (
                          <span className="bg-green-600 text-white px-4 py-1 rounded-full text-xs font-semibold">Approved</span>
                        )}
                        {emp.status === "rejected" && (
                          <span className="bg-red-600 text-white px-4 py-1 rounded-full text-xs font-semibold">Rejected</span>
                        )}
                      </td>
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">
                        {emp.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApprove(emp.id)}
                              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 flex items-center gap-1"
                            >
                              <FaUserCheck /> Approve
                            </button>
                            <button
                              onClick={() => handleReject(emp.id)}
                              className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 flex items-center gap-1"
                            >
                              <FaUserTimes /> Reject
                            </button>
                          </div>
                        )}
                        {(emp.status === "approved" || emp.status === "rejected") && (
                          <span className="text-gray-400 text-xs">No actions</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerVerificationPage;
