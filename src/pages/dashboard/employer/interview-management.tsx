import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  FaBuilding,
  FaUsers,
  FaClipboardList,
  FaVideo,
  FaBell,
  FaChartBar,
  FaFileAlt,
  FaTrophy,
  FaCalendarAlt,
  FaCheckCircle,
  FaHome,
} from "react-icons/fa";

// Mock interviews data
const interviews = [
  {
    id: "1",
    candidateName: "John Smith",
    position: "Senior Software Developer",
    date: "2024-02-01",
    time: "10:00 AM",
    status: "scheduled"
  },
  {
    id: "2",
    candidateName: "Sarah Johnson",
    position: "Senior Software Developer",
    date: "2024-02-01",
    time: "2:00 PM",
    status: "scheduled"
  }
];

const navigationGroups = [
  {
    title: "Company",
    items: [
      { href: "/dashboard/employer/company-profile", label: "Company Profile", icon: <FaBuilding /> },
      { href: "/dashboard/employer/job-posting", label: "Post Jobs", icon: <FaFileAlt /> },
    ]
  },
  {
    title: "Recruitment",
    items: [
      { href: "/dashboard/employer/skills-challenges", label: "Skills Challenges", icon: <FaTrophy /> },
      { href: "/dashboard/employer/applications", label: "Applications", icon: <FaClipboardList /> },
      { href: "/dashboard/employer/interview-management", label: "Interviews", icon: <FaVideo /> },
    ]
  },
  {
    title: "Analytics",
    items: [
      { href: "/dashboard/employer/communications", label: "Notifications", icon: <FaBell /> },
    ]
  }
];

const InterviewManagementPage: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // For SSR/CSR date consistency
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", background: "linear-gradient(to right, #283593, #5C6BC0)" }}>
      <Head>
        <title>Interview Management - UFS Recruitment</title>
      </Head>
      {/* Header */}
      <header style={{
        height: "75px",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: "#FFFFFF",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
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
          padding: "1rem"
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
              <h3 className="font-semibold text-white text-lg">{session?.user?.name || "Employer"}</h3>
            </div>
          </div>
        </div>
        {/* Navigation */}
        <div className="space-y-4">
          {/* Home Link */}
          <div className="mb-6">
            <Link href="/dashboard/employer" className="block">
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.1))",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
                className="px-4 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-3"
              >
                <span className="text-xl text-white">
                  <FaHome />
                </span>
                <span className="text-white font-medium">Dashboard Home</span>
              </div>
            </Link>
          </div>
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
          backgroundImage: 'url("/images/skills_background(2).png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
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
        {/* Teal blurred card background */}
        <div
          style={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            right: '2rem',
            bottom: '2rem',
            zIndex: 1,
            background: "linear-gradient(135deg, rgba(20,184,166,0.5), rgba(6,182,212,0.5))",
            borderRadius: "1.5rem",
            boxShadow: "0 8px 32px rgba(20,184,166,0.10)",
            backdropFilter: "blur(12px)",
            pointerEvents: 'none'
          }}
        />
        <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-10">Scheduled Interviews</h1>
          <div className="grid grid-cols-1 gap-8">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.6), rgba(20,184,166,0.6))",
                  border: "1px solid rgba(124,58,237,0.12)",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 16px rgba(124,58,237,0.08)",
                  transition: "box-shadow 0.2s, transform 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "2rem 2.5rem",
                  gap: "2rem",
                  position: "relative",
                }}
                className="hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
              >
                {/* Left: Interview Info */}
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow">
                      <FaVideo />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-blue-900 mb-1">{interview.candidateName}</h2>
                      <div className="text-gray-600">{interview.position}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-500 text-base mb-1">
                    <FaCalendarAlt className="text-blue-400" />
                    <span>
                      {isClient
                        ? new Date(interview.date).toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })
                        : interview.date
                      }{" "}
                      {interview.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <FaCheckCircle className="text-green-500" />
                    <span className="text-green-700 font-medium">{interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}</span>
                  </div>
                </div>
                {/* Right: Join Button */}
                <div className="flex flex-col items-end gap-3">
                  <button
                    className="px-8 py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-blue-700 to-cyan-500 text-white shadow-lg hover:from-blue-800 hover:to-cyan-600 transition-all duration-300"
                    style={{
                      minWidth: "180px",
                      letterSpacing: "0.5px",
                      boxShadow: "0 8px 16px rgba(59,130,246,0.12)",
                      border: "none",
                    }}
                    onClick={() => router.push(`/dashboard/employer/interviews/${interview.id}`)}
                  >
                    <FaVideo className="inline mr-2" />
                    Join Interview
                  </button>
                  <span className="text-xs text-gray-400 mt-1">
                    Interview ID: {interview.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewManagementPage;
