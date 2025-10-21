import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Link from "next/link";
import {
  FaHome,
  FaUsers,
  FaFileAlt,
  FaClipboardList,
  FaTrophy,
  FaVideo,
  FaBell,
  FaChartBar,
  FaBriefcase,
  FaCheckCircle,
  FaRocket,
  FaCalendarPlus,
  FaUserTie,
} from "react-icons/fa";
import { useState } from "react";

// Mock stats data
const stats = {
  totalJobs: 312,
  jobsToday: 7,
  jobsThisWeek: 52,
  jobsThisMonth: 210,
  interviewsFromApplications: 42,
  interviewsFromChallenges: 17,
  totalPlacements: 128,
  totalEmployers: 34,
  totalStudents: 1200,
  activeChallenges: 12,
};

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
    ],
  },
];

const AdminAnalyticsPage: NextPage = () => {
  const { data: session } = useSession();
  const [isSidebarOpen] = useState(false);

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
        <title>Analytics - Admin | UFS Recruitment</title>
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
        <div className="max-w-6xl mx-auto px-4" style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-10">Platform Analytics</h1>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/90 rounded-xl shadow-lg p-8 flex flex-col items-center">
              <FaBriefcase className="text-4xl text-blue-600 mb-3" />
              <div className="text-3xl font-bold text-blue-700">{stats.totalJobs}</div>
              <div className="text-lg text-gray-700 mt-2">Total Jobs Posted</div>
            </div>
            <div className="bg-white/90 rounded-xl shadow-lg p-8 flex flex-col items-center">
              <FaCalendarPlus className="text-4xl text-cyan-600 mb-3" />
              <div className="text-3xl font-bold text-cyan-700">{stats.jobsToday}</div>
              <div className="text-lg text-gray-700 mt-2">Jobs Created Today</div>
            </div>
            <div className="bg-white/90 rounded-xl shadow-lg p-8 flex flex-col items-center">
              <FaChartBar className="text-4xl text-indigo-600 mb-3" />
              <div className="text-3xl font-bold text-indigo-700">{stats.jobsThisWeek}</div>
              <div className="text-lg text-gray-700 mt-2">Jobs Created This Week</div>
            </div>
            <div className="bg-white/90 rounded-xl shadow-lg p-8 flex flex-col items-center">
              <FaChartBar className="text-4xl text-purple-600 mb-3" />
              <div className="text-3xl font-bold text-purple-700">{stats.jobsThisMonth}</div>
              <div className="text-lg text-gray-700 mt-2">Jobs Created This Month</div>
            </div>
            <div className="bg-white/90 rounded-xl shadow-lg p-8 flex flex-col items-center">
              <FaCheckCircle className="text-4xl text-green-600 mb-3" />
              <div className="text-3xl font-bold text-green-700">{stats.totalPlacements}</div>
              <div className="text-lg text-gray-700 mt-2">Total Job Placements</div>
            </div>
            <div className="bg-white/90 rounded-xl shadow-lg p-8 flex flex-col items-center">
              <FaVideo className="text-4xl text-yellow-600 mb-3" />
              <div className="text-3xl font-bold text-yellow-700">{stats.interviewsFromApplications}</div>
              <div className="text-lg text-gray-700 mt-2">Interviews from Applications</div>
            </div>
            <div className="bg-white/90 rounded-xl shadow-lg p-8 flex flex-col items-center">
              <FaRocket className="text-4xl text-pink-600 mb-3" />
              <div className="text-3xl font-bold text-pink-700">{stats.interviewsFromChallenges}</div>
              <div className="text-lg text-gray-700 mt-2">Interviews from Challenges</div>
            </div>
            <div className="bg-white/90 rounded-xl shadow-lg p-8 flex flex-col items-center">
              <FaUsers className="text-4xl text-teal-600 mb-3" />
              <div className="text-3xl font-bold text-teal-700">{stats.totalStudents}</div>
              <div className="text-lg text-gray-700 mt-2">Total Students</div>
            </div>
            <div className="bg-white/90 rounded-xl shadow-lg p-8 flex flex-col items-center">
              <FaUserTie className="text-4xl text-orange-600 mb-3" />
              <div className="text-3xl font-bold text-orange-700">{stats.totalEmployers}</div>
              <div className="text-lg text-gray-700 mt-2">Total Employers</div>
            </div>
            <div className="bg-white/90 rounded-xl shadow-lg p-8 flex flex-col items-center">
              <FaTrophy className="text-4xl text-cyan-600 mb-3" />
              <div className="text-3xl font-bold text-cyan-700">{stats.activeChallenges}</div>
              <div className="text-lg text-gray-700 mt-2">Active Skills Challenges</div>
            </div>
          </div>
          {/* Add more analytics or charts here as needed */}
        </div>
      </main>
    </div>
  );
};

export default AdminAnalyticsPage;
