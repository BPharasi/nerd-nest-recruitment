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
  FaShieldAlt,
  FaDatabase,
  FaHistory,
  FaUserSecret,
} from "react-icons/fa";
import { useState } from "react";

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

// Mock audit logs
const mockAuditLogs = [
  { id: 1, action: "User created", user: "Admin", timestamp: "2024-02-01 10:00" },
  { id: 2, action: "Employer verified", user: "Admin", timestamp: "2024-02-02 09:30" },
  { id: 3, action: "Transcript sent", user: "Admin", timestamp: "2024-02-03 14:15" },
  { id: 4, action: "Student data updated", user: "Admin", timestamp: "2024-02-04 11:45" },
];

const policies = [
  {
    icon: <FaShieldAlt className="text-blue-600" />,
    title: "Data Privacy",
    description: "All user data is protected and handled according to POPIA and GDPR standards.",
  },
  {
    icon: <FaDatabase className="text-green-600" />,
    title: "Data Retention",
    description: "Academic and personal data is retained only as long as necessary for recruitment and compliance.",
  },
  {
    icon: <FaUserSecret className="text-purple-600" />,
    title: "Access Control",
    description: "Only authorized personnel can access sensitive data. All access is logged and monitored.",
  },
];

const DataGovernancePage: NextPage = () => {
  const { data: session } = useSession();
  const [showLogs, setShowLogs] = useState(false);

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
        <title>Data Governance - Admin | UFS Recruitment</title>
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
        <div className="max-w-5xl mx-auto px-4" style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Data Governance & Compliance</h1>
          <div
            className="bg-white rounded-xl shadow-lg p-8 mb-10"
            style={{
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(20, 184, 166, 0.3)",
            }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Policies & Controls</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {policies.map((policy, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-3">{policy.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{policy.title}</h3>
                  <p className="text-gray-700">{policy.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div
            className="bg-white rounded-xl shadow-lg p-8"
            style={{
              background: "linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(20, 184, 166, 0.08))",
              border: "1px solid rgba(124, 58, 237, 0.15)",
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Audit Logs</h2>
              <button
                className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-800 transition"
                onClick={() => setShowLogs((v) => !v)}
              >
                {showLogs ? "Hide Logs" : "Show Logs"}
              </button>
            </div>
            {showLogs && (
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
                      <th className="py-3 px-4 border border-gray-400">Action</th>
                      <th className="py-3 px-4 border border-gray-400">User</th>
                      <th className="py-3 px-4 border border-gray-400">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockAuditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50 transition" style={{ borderBottom: "1px solid #cbd5e1" }}>
                        <td className="py-3 px-4 border border-gray-400">{log.action}</td>
                        <td className="py-3 px-4 border border-gray-400">{log.user}</td>
                        <td className="py-3 px-4 border border-gray-400">{log.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {!showLogs && (
              <div className="text-gray-600 text-center py-8">
                Click "Show Logs" to view recent data actions and changes.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataGovernancePage;
