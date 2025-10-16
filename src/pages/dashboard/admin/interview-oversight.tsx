import { useState } from "react";
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
  FaCheck,
  FaTimes,
  FaHourglass,
  FaUserGraduate,
  FaBriefcase,
} from "react-icons/fa";

// Mock data for interviews and jobs
const mockInterviews = [
  {
    id: "1",
    jobTitle: "Junior Software Developer",
    company: "TechNova Solutions",
    student: "Thabo Mokoena",
    status: "scheduled",
    date: "2024-02-01",
    passed: null,
  },
  {
    id: "2",
    jobTitle: "Data Analyst Intern",
    company: "InfoFlow Analytics",
    student: "Lerato Ndlovu",
    status: "completed",
    date: "2024-01-20",
    passed: true,
  },
  {
    id: "3",
    jobTitle: "Cloud Engineer",
    company: "CloudSolutions",
    student: "Sipho Mabaso",
    status: "completed",
    date: "2024-01-18",
    passed: false,
  },
  {
    id: "4",
    jobTitle: "Frontend Developer",
    company: "PixelCraft Studios",
    student: "Jabu Sithole",
    status: "scheduled",
    date: "2024-02-10",
    passed: null,
  },
];

const mockJobs = [
  {
    id: "1",
    title: "Junior Software Developer",
    company: "TechNova Solutions",
    hasInterview: true,
  },
  {
    id: "2",
    title: "Data Analyst Intern",
    company: "InfoFlow Analytics",
    hasInterview: true,
  },
  {
    id: "3",
    title: "Cloud Engineer",
    company: "CloudSolutions",
    hasInterview: true,
  },
  {
    id: "4",
    title: "Frontend Developer",
    company: "PixelCraft Studios",
    hasInterview: true,
  },
  {
    id: "5",
    title: "QA Tester",
    company: "BugHunt Labs",
    hasInterview: false,
  },
  {
    id: "6",
    title: "Network Support",
    company: "Connectix Networks",
    hasInterview: false,
  },
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

const InterviewOversightPage: NextPage = () => {
  const { data: session } = useSession();
  const [tab, setTab] = useState<"scheduled" | "completed" | "no-interview" | "students-offered" | "students-passed">("scheduled");

  // Derived data
  const scheduledInterviews = mockInterviews.filter(i => i.status === "scheduled");
  const completedInterviews = mockInterviews.filter(i => i.status === "completed");
  const jobsNoInterview = mockJobs.filter(j => !j.hasInterview);
  const studentsOffered = mockInterviews.map(i => i.student);
  const studentsPassed = mockInterviews.filter(i => i.passed === true).map(i => i.student);

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
        <title>Interview Oversight - Admin | UFS Recruitment</title>
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
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Interview Oversight</h1>
          {/* Tabs */}
          <div className="flex flex-wrap gap-6 mb-10 justify-start">
            {[
              { key: "scheduled", label: "Scheduled Interviews", icon: <FaHourglass /> },
              { key: "completed", label: "Completed Interviews", icon: <FaCheckCircle /> },
              { key: "no-interview", label: "Jobs w/o Interviews", icon: <FaBriefcase /> },
              { key: "students-offered", label: "Students Offered", icon: <FaUserGraduate /> },
              { key: "students-passed", label: "Students Passed", icon: <FaTrophy /> },
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                className={`flex items-center gap-3 px-7 py-4 rounded-full font-bold shadow-xl transition-all duration-200 border-0 focus:outline-none relative overflow-hidden
                  ${tab === key
                    ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white scale-105"
                    : "bg-white/30 text-gray-900 hover:bg-cyan-100/40"
                  }`}
                style={{
                  minWidth: "220px",
                  marginRight: "0.5rem",
                  marginBottom: "0.5rem",
                  boxShadow: tab === key
                    ? "0 8px 24px rgba(33, 150, 243, 0.22)"
                    : "0 2px 10px rgba(0,0,0,0.08)",
                  letterSpacing: "0.03em",
                  border: tab === key ? "2px solid #1976d2" : "2px solid rgba(33,150,243,0.08)",
                  transition: "transform 0.18s cubic-bezier(.4,0,.2,1)",
                  backdropFilter: tab === key ? undefined : "blur(4px)",
                }}
                onClick={() => setTab(key as typeof tab)}
              >
                <span className={`text-2xl drop-shadow ${tab === key ? "text-white" : "text-cyan-700"}`}>{icon}</span>
                <span className="flex-1">{label}</span>
                {tab === key && (
                  <span
                    className="absolute top-0 left-0 w-full h-full rounded-full pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                      zIndex: 0,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-lg p-8"
            style={{
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(20, 184, 166, 0.3)",
            }}
          >
            {tab === "scheduled" && (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Scheduled Interviews</h2>
                <table className="min-w-full text-left border border-gray-300" style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr className="text-gray-700 font-semibold text-base">
                      <th className="py-3 px-4 border border-gray-400">Student</th>
                      <th className="py-3 px-4 border border-gray-400">Job Title</th>
                      <th className="py-3 px-4 border border-gray-400">Company</th>
                      <th className="py-3 px-4 border border-gray-400">Date</th>
                      <th className="py-3 px-4 border border-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduledInterviews.map((i) => (
                      <tr key={i.id} style={{ borderBottom: "1px solid #cbd5e1" }}>
                        <td className="py-3 px-4 border border-gray-400">{i.student}</td>
                        <td className="py-3 px-4 border border-gray-400">{i.jobTitle}</td>
                        <td className="py-3 px-4 border border-gray-400">{i.company}</td>
                        <td className="py-3 px-4 border border-gray-400">{i.date}</td>
                        <td className="py-3 px-4 border border-gray-400">
                          <span className="bg-yellow-400/20 text-yellow-700 px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
                            <FaHourglass /> Scheduled
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
            {tab === "completed" && (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Completed Interviews</h2>
                <table className="min-w-full text-left border border-gray-300" style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr className="text-gray-700 font-semibold text-base">
                      <th className="py-3 px-4 border border-gray-400">Student</th>
                      <th className="py-3 px-4 border border-gray-400">Job Title</th>
                      <th className="py-3 px-4 border border-gray-400">Company</th>
                      <th className="py-3 px-4 border border-gray-400">Date</th>
                      <th className="py-3 px-4 border border-gray-400">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedInterviews.map((i) => (
                      <tr key={i.id} style={{ borderBottom: "1px solid #cbd5e1" }}>
                        <td className="py-3 px-4 border border-gray-400">{i.student}</td>
                        <td className="py-3 px-4 border border-gray-400">{i.jobTitle}</td>
                        <td className="py-3 px-4 border border-gray-400">{i.company}</td>
                        <td className="py-3 px-4 border border-gray-400">{i.date}</td>
                        <td className="py-3 px-4 border border-gray-400">
                          {i.passed === true ? (
                            <span className="bg-green-600 text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
                              <FaCheck /> Passed
                            </span>
                          ) : (
                            <span className="bg-red-600 text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
                              <FaTimes /> Not Passed
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
            {tab === "no-interview" && (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Jobs Without Interviews</h2>
                <table className="min-w-full text-left border border-gray-300" style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr className="text-gray-700 font-semibold text-base">
                      <th className="py-3 px-4 border border-gray-400">Job Title</th>
                      <th className="py-3 px-4 border border-gray-400">Company</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobsNoInterview.map((j) => (
                      <tr key={j.id} style={{ borderBottom: "1px solid #cbd5e1" }}>
                        <td className="py-3 px-4 border border-gray-400">{j.title}</td>
                        <td className="py-3 px-4 border border-gray-400">{j.company}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
            {tab === "students-offered" && (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Students Offered Interviews</h2>
                <ul className="list-disc pl-8 text-gray-900">
                  {studentsOffered.map((student, idx) => (
                    <li key={idx} className="mb-2 flex items-center gap-2">
                      <FaUserGraduate className="text-blue-600" /> {student}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {tab === "students-passed" && (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Students Who Passed Interviews</h2>
                <ul className="list-disc pl-8 text-gray-900">
                  {studentsPassed.map((student, idx) => (
                    <li key={idx} className="mb-2 flex items-center gap-2">
                      <FaUserGraduate className="text-green-600" /> {student}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewOversightPage;
