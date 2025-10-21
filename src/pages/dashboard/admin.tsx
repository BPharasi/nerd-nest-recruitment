import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import { useState } from "react";
import {
  FaBuilding,
  FaUsers,
  FaCalendarAlt,
  FaClipboardList,
  FaVideo,
  FaEye,
  FaBell,
  FaChartBar,
  FaFileAlt,
  FaCheckCircle,
  FaTrophy,
  FaUserTie,
  FaUserGraduate,
  FaBriefcase,
  FaUser,
  FaHome,
} from "react-icons/fa";

// Mock stats data
const stats = [
  {
    id: "jobs",
    label: "Jobs Posted",
    value: 42,
    icon: <FaBriefcase />,
    color: "#2563eb",
    bg: "linear-gradient(135deg, #2563eb22, #60a5fa22)",
  },
  {
    id: "interviews",
    label: "Interviews Scheduled",
    value: 18,
    icon: <FaVideo />,
    color: "#14b8a6",
    bg: "linear-gradient(135deg, #14b8a622, #06b6d422)",
  },
  {
    id: "challenges",
    label: "Challenges Created",
    value: 7,
    icon: <FaTrophy />,
    color: "#f59e42",
    bg: "linear-gradient(135deg, #f59e4222, #fbbf2422)",
  },
  {
    id: "students",
    label: "Students Registered",
    value: 1200,
    icon: <FaUserGraduate />,
    color: "#a21caf",
    bg: "linear-gradient(135deg, #a21caf22, #c084fc22)",
  },
  {
    id: "companies",
    label: "Companies Registered",
    value: 35,
    icon: <FaBuilding />,
    color: "#22c55e",
    bg: "linear-gradient(135deg, #22c55e22, #bbf7d022)",
  },
];

const navigationGroups = [
  {
    title: "Admin",
    items: [
      
      { href: "/dashboard/admin/users", label: "User Management", icon: <FaUsers /> },
      { href: "/dashboard/admin/employer-verification", label: "Employer Verification", icon: <FaUserTie /> },
      { href: "/dashboard/admin/academic-data", label: "Academic Data", icon: <FaFileAlt /> },
      { href: "/dashboard/admin/skill-moderation", label: "Skill Moderation", icon: <FaTrophy /> },
      { href: "/dashboard/admin/job-approval", label: "Job Approval", icon: <FaBriefcase /> },
      { href: "/dashboard/admin/interview-oversight", label: "Interview Oversight", icon: <FaVideo /> },
      { href: "/dashboard/admin/analytics", label: "Analytics", icon: <FaChartBar /> },
      { href: "/dashboard/admin/announcements", label: "Announcements", icon: <FaBell /> },
      { href: "/dashboard/admin/helpdesk", label: "Helpdesk", icon: <FaClipboardList /> },
      { href: "/dashboard/admin/data-governance", label: "Data Governance", icon: <FaCheckCircle /> },
    ],
  },
];

const AdminDashboard: NextPage = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <title>UFS Recruitment System - Admin Dashboard</title>
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
        className={`${isSidebarOpen ? "block" : "hidden md:block"}`}
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
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Total Jobs */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(20, 184, 166, 0.4), rgba(6, 182, 212, 0.4))",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(20, 184, 166, 0.3)",
                color: "grey-800",
                borderRadius: "1rem",
                boxShadow: "0 2px 8px rgba(59,130,246,0.08)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                minHeight: "120px",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <FaFileAlt className="text-blue-500 text-2xl" />
                <span className="font-semibold text-gray-700 text-lg">Total Jobs</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">2,847</div>
              <div className="text-sm text-green-600">+12% from last month</div>
            </div>
            {/* Total Users */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(20, 184, 166, 0.4), rgba(6, 182, 212, 0.4))",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(20, 184, 166, 0.3)",
                color: "grey-800",
                borderRadius: "1rem",
                boxShadow: "0 2px 8px rgba(59,130,246,0.08)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                minHeight: "120px",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <FaUsers className="text-green-500 text-2xl" />
                <span className="font-semibold text-gray-700 text-lg">Total Users</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">18,293</div>
              <div className="text-sm text-gray-500">2,456 active users</div>
            </div>
            {/* Traffic Overview */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(20, 184, 166, 0.4), rgba(6, 182, 212, 0.4))",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(20, 184, 166, 0.3)",
                color: "grey-800",
                borderRadius: "1rem",
                boxShadow: "0 2px 8px rgba(59,130,246,0.08)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                minHeight: "120px",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <FaEye className="text-yellow-500 text-2xl" />
                <span className="font-semibold text-gray-700 text-lg">Traffic Overview</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">45,678</div>
              <div className="text-sm text-green-600">+8% from last week</div>
            </div>
          
          </div>

          {/* Recent Activity - Each activity on its own card */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Recent Activity</h2>
            <p className="text-gray-500 mb-6">Latest activities across your job portal</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-3"
                style={{
                  border: "1px solid #e5e7eb",
                  background: "linear-gradient(135deg, rgba(20, 184, 166, 0.5), rgba(6, 182, 212, 0.5))",
                }}
              >
                <span className="text-green-600 text-2xl">🧑‍💼</span>
                <div className="flex-1">
                  <div className="text-gray-800">New user registered: john.doe@email.com</div>
                  <div className="text-gray-400 text-xs mt-1">2 minutes ago</div>
                </div>
              </div>
              <div
                className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-3"
                style={{
                  border: "1px solid #e5e7eb",
                  background: "linear-gradient(135deg, rgba(59,130,246,0.5), rgba(96,165,250,0.5))",
                }}
              >
                <span className="text-blue-600 text-2xl">📄</span>
                <div className="flex-1">
                  <div className="text-gray-800">New job posted: Senior React Developer at TechCorp</div>
                  <div className="text-gray-400 text-xs mt-1">15 minutes ago</div>
                </div>
              </div>
              <div
                className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-3"
                style={{
                  border: "1px solid #e5e7eb",
                  background: "linear-gradient(135deg, rgba(234,179,8,0.5), rgba(253,224,71,0.5))",
                }}
              >
                <span className="text-yellow-500 text-2xl">📈</span>
                <div className="flex-1">
                  <div className="text-gray-800">Course "Advanced JavaScript" purchased by 3 users</div>
                  <div className="text-gray-400 text-xs mt-1">1 hour ago</div>
                </div>
              </div>
              <div
                className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-3"
                style={{
                  border: "1px solid #e5e7eb",
                  background: "linear-gradient(135deg, rgba(239,68,68,0.5), rgba(251,113,133,0.5))",
                }}
              >
                <span className="text-red-500 text-2xl">💳</span>
                <div className="flex-1">
                  <div className="text-gray-800">Premium subscription activated: sarah.smith@email.com</div>
                  <div className="text-gray-400 text-xs mt-1">2 hours ago</div>
                </div>
              </div>
              <div
                className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-3"
                style={{
                  border: "1px solid #e5e7eb",
                  background: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(37,99,235,0.08))",
                }}
              >
                <span className="text-blue-600 text-2xl">📄</span>
                <div className="flex-1">
                  <div className="text-gray-800">Job application: UX Designer position received 12 new applications</div>
                  <div className="text-gray-400 text-xs mt-1">3 hours ago</div>
                </div>
              </div>
            </div>
          </div>
          {/* ...existing admin links/cards section if needed... */}
        </div>
      </main>
      {/* ...existing code... */}
    </div>
  );
};

export default AdminDashboard;
