import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Link from "next/link";
import {
  FaUsers,
  FaUser,
  FaUserShield,
  FaUserTie,
  FaUserGraduate,
  FaPlus,
  FaSearch,
  FaHome,
  FaClipboardList,
  FaFileAlt,
  FaTrophy,
  FaVideo,
  FaBell,
  FaChartBar,
  FaCheckCircle,
} from "react-icons/fa";
import { useRef } from "react";

// Transcript data for each student
const transcriptData: Record<string, { name: string; year: string; program: string; courses: { name: string; percentage: number }[]; average: number }> = {
  "1": {
    name: "Thabo Mokoena",
    year: "2nd Year",
    program: "CS",
    courses: [
      { name: "Algorithms", percentage: 55 },
      { name: "Operating Systems", percentage: 81 },
      { name: "Software Engineering", percentage: 65 },
      { name: "Database Systems", percentage: 72 },
      { name: "Computer Networks", percentage: 59 }
    ],
    average: 66.4
  },
  "2": {
    name: "Lerato Ndlovu",
    year: "3rd Year",
    program: "BIS",
    courses: [
      { name: "Business Intelligence", percentage: 87 },
      { name: "IT Strategy", percentage: 61 },
      { name: "E-Commerce", percentage: 79 },
      { name: "Risk Management in IT", percentage: 70 },
      { name: "Advanced Data Warehousing", percentage: 81 }
    ],
    average: 75.6
  },
  "3": {
    name: "Sipho Mabaso",
    year: "1st Year",
    program: "CS",
    courses: [
      { name: "Introduction to Programming", percentage: 94 },
      { name: "Computer Architecture", percentage: 70 },
      { name: "Discrete Mathematics", percentage: 57 },
      { name: "Data Structures", percentage: 69 },
      { name: "Calculus I", percentage: 86 }
    ],
    average: 75.2
  },
  "4": {
    name: "Zanele Khumalo",
    year: "2nd Year",
    program: "BIS",
    courses: [
      { name: "Business Process Management", percentage: 92 },
      { name: "Data Analytics", percentage: 89 },
      { name: "Project Management", percentage: 93 },
      { name: "ERP Systems", percentage: 82 },
      { name: "MIS", percentage: 62 }
    ],
    average: 83.6
  },
  "5": {
    name: "Jabu Sithole",
    year: "3rd Year",
    program: "CS",
    courses: [
      { name: "Machine Learning", percentage: 73 },
      { name: "Web Development", percentage: 67 },
      { name: "Cybersecurity", percentage: 95 },
      { name: "Cloud Computing", percentage: 87 },
      { name: "Advanced Algorithms", percentage: 89 }
    ],
    average: 82.2
  },
  "6": {
    name: "Nadia Van Wyk",
    year: "1st Year",
    program: "BIS",
    courses: [
      { name: "Business Computing I", percentage: 63 },
      { name: "Information Systems", percentage: 58 },
      { name: "Accounting Principles", percentage: 78 },
      { name: "Statistics for Business", percentage: 88 },
      { name: "Intro to Databases", percentage: 72 }
    ],
    average: 71.8
  },
  "7": {
    name: "Kwame Zulu",
    year: "2nd Year",
    program: "CS",
    courses: [
      { name: "Algorithms", percentage: 87 },
      { name: "Operating Systems", percentage: 89 },
      { name: "Software Engineering", percentage: 90 },
      { name: "Database Systems", percentage: 82 },
      { name: "Computer Networks", percentage: 55 }
    ],
    average: 80.6
  },
  "8": {
    name: "Fatima Petersen",
    year: "3rd Year",
    program: "BIS",
    courses: [
      { name: "Business Intelligence", percentage: 86 },
      { name: "IT Strategy", percentage: 82 },
      { name: "E-Commerce", percentage: 92 },
      { name: "Risk Management in IT", percentage: 90 },
      { name: "Advanced Data Warehousing", percentage: 57 }
    ],
    average: 81.4
  },
  "9": {
    name: "Thando Botha",
    year: "2nd Year",
    program: "CS",
    courses: [
      { name: "Algorithms", percentage: 86 },
      { name: "Operating Systems", percentage: 70 },
      { name: "Software Engineering", percentage: 61 },
      { name: "Database Systems", percentage: 82 },
      { name: "Computer Networks", percentage: 63 }
    ],
    average: 72.4
  },
  "10": {
    name: "Lindiwe Naidoo",
    year: "1st Year",
    program: "BIS",
    courses: [
      { name: "Business Computing I", percentage: 56 },
      { name: "Information Systems", percentage: 66 },
      { name: "Accounting Principles", percentage: 74 },
      { name: "Statistics for Business", percentage: 69 },
      { name: "Intro to Databases", percentage: 56 }
    ],
    average: 64.2
  },
  "11": {
    name: "Bongani Roux",
    year: "3rd Year",
    program: "CS",
    courses: [
      { name: "Machine Learning", percentage: 91 },
      { name: "Web Development", percentage: 74 },
      { name: "Cybersecurity", percentage: 71 },
      { name: "Cloud Computing", percentage: 79 },
      { name: "Advanced Algorithms", percentage: 93 }
    ],
    average: 81.6
  },
  "12": {
    name: "Nomusa De Villiers",
    year: "2nd Year",
    program: "BIS",
    courses: [
      { name: "Business Process Management", percentage: 95 },
      { name: "Data Analytics", percentage: 69 },
      { name: "Project Management", percentage: 94 },
      { name: "ERP Systems", percentage: 67 },
      { name: "MIS", percentage: 61 }
    ],
    average: 77.2
  },
  "13": {
    name: "Mpho Smit",
    year: "1st Year",
    program: "CS",
    courses: [
      { name: "Introduction to Programming", percentage: 86 },
      { name: "Computer Architecture", percentage: 80 },
      { name: "Discrete Mathematics", percentage: 72 },
      { name: "Data Structures", percentage: 81 },
      { name: "Calculus I", percentage: 66 }
    ],
    average: 77.0
  },
  "14": {
    name: "Sarah Fourie",
    year: "3rd Year",
    program: "BIS",
    courses: [
      { name: "Business Intelligence", percentage: 79 },
      { name: "IT Strategy", percentage: 94 },
      { name: "E-Commerce", percentage: 57 },
      { name: "Risk Management in IT", percentage: 56 },
      { name: "Advanced Data Warehousing", percentage: 87 }
    ],
    average: 74.6
  },
  "15": {
    name: "Elias Vorster",
    year: "2nd Year",
    program: "CS",
    courses: [
      { name: "Algorithms", percentage: 83 },
      { name: "Operating Systems", percentage: 91 },
      { name: "Software Engineering", percentage: 78 },
      { name: "Database Systems", percentage: 90 },
      { name: "Computer Networks", percentage: 88 }
    ],
    average: 86.0
  },
  "16": {
    name: "Priya Du Toit",
    year: "1st Year",
    program: "BIS",
    courses: [
      { name: "Business Computing I", percentage: 65 },
      { name: "Information Systems", percentage: 55 },
      { name: "Accounting Principles", percentage: 78 },
      { name: "Statistics for Business", percentage: 87 },
      { name: "Intro to Databases", percentage: 80 }
    ],
    average: 73.0
  },
  "17": {
    name: "Tebogo Ngubane",
    year: "3rd Year",
    program: "CS",
    courses: [
      { name: "Machine Learning", percentage: 94 },
      { name: "Web Development", percentage: 84 },
      { name: "Cybersecurity", percentage: 59 },
      { name: "Cloud Computing", percentage: 92 },
      { name: "Advanced Algorithms", percentage: 65 }
    ],
    average: 78.8
  },
  "18": {
    name: "Naledi Govender",
    year: "2nd Year",
    program: "BIS",
    courses: [
      { name: "Business Process Management", percentage: 57 },
      { name: "Data Analytics", percentage: 75 },
      { name: "Project Management", percentage: 58 },
      { name: "ERP Systems", percentage: 80 },
      { name: "MIS", percentage: 79 }
    ],
    average: 69.8
  },
  "19": {
    name: "Zane Zuma",
    year: "1st Year",
    program: "CS",
    courses: [
      { name: "Introduction to Programming", percentage: 90 },
      { name: "Computer Architecture", percentage: 88 },
      { name: "Discrete Mathematics", percentage: 86 },
      { name: "Data Structures", percentage: 85 },
      { name: "Calculus I", percentage: 74 }
    ],
    average: 84.6
  },
  "20": {
    name: "Aisha Ismail",
    year: "3rd Year",
    program: "BIS",
    courses: [
      { name: "Business Intelligence", percentage: 81 },
      { name: "IT Strategy", percentage: 79 },
      { name: "E-Commerce", percentage: 67 },
      { name: "Risk Management in IT", percentage: 89 },
      { name: "Advanced Data Warehousing", percentage: 68 }
    ],
    average: 76.8
  }
};

// Mock employer requests for transcripts
const mockRequests = [
  { id: "1", candidateId: "1", employer: "TechNova Solutions", consent: false },
  { id: "2", candidateId: "2", employer: "GlobalNet Corp", consent: false },
  { id: "3", candidateId: "3", employer: "InfoFlow Analytics", consent: false },
  { id: "4", candidateId: "4", employer: "PixelCraft Studios", consent: true },
  { id: "5", candidateId: "5", employer: "Connectix Networks", consent: false },
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

const AdminAcademicDataPage: NextPage = () => {
  const { data: session } = useSession();
  const [requests, setRequests] = useState(mockRequests);
  const [notification, setNotification] = useState<{ message: string } | null>(null);

  // Simulate sending transcript and notifying employer/admin
  const handleApprove = (id: string) => {
    setRequests(reqs =>
      reqs.map(r => r.id === id ? { ...r, consent: true } : r)
    );
    // Show notification to admin
    setNotification({ message: "Transcript sent to employer and notification created." });
    // Simulate API call to create notification for employer and admin
    // In real app, POST to /api/notifications
    // fetch("/api/notifications", { method: "POST", body: JSON.stringify({ ... }) });
    setTimeout(() => setNotification(null), 4000);
  };

  // Helper to generate a transcript file (as a Blob URL)
  function generateTranscriptFile(transcript: typeof transcriptData[string]) {
    let content = `Transcript for ${transcript.name}\n${transcript.year}, ${transcript.program}\n\n`;
    content += "Course\t\tPercentage\n";
    transcript.courses.forEach(c => {
      content += `${c.name}\t\t${c.percentage}%\n`;
    });
    content += `\nOverall Average: ${transcript.average}%\n`;
    return new Blob([content], { type: "text/plain" });
  }

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
        <title>Academic Transcript Requests - Admin | UFS Recruitment</title>
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
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Academic Transcript Requests</h1>
          {/* Notification Banner */}
          {notification && (
            <div className="mb-6">
              <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow font-semibold text-center">
                {notification.message}
              </div>
            </div>
          )}
          <div
            className="bg-white rounded-xl shadow-lg p-8"
            style={{
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(20, 184, 166, 0.3)",
            }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Pending Requests</h2>
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
                    <th className="py-3 px-4 border border-gray-400">Student</th>
                    <th className="py-3 px-4 border border-gray-400">Year</th>
                    <th className="py-3 px-4 border border-gray-400">Program</th>
                    <th className="py-3 px-4 border border-gray-400">Employer</th>
                    <th className="py-3 px-4 border border-gray-400">Status</th>
                    <th className="py-3 px-4 border border-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => {
                    const transcript = transcriptData[req.candidateId];
                    return (
                      <tr
                        key={req.id}
                        className="hover:bg-gray-50 transition"
                        style={{ borderBottom: "1px solid #cbd5e1" }}
                      >
                        <td className="py-3 px-4 border border-gray-400 whitespace-nowrap font-semibold text-gray-900">
                          {transcript?.name}
                        </td>
                        <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">{transcript?.year}</td>
                        <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">{transcript?.program}</td>
                        <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">{req.employer}</td>
                        <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">
                          {req.consent ? (
                            <span className="bg-green-600 text-white px-4 py-1 rounded-full text-xs font-semibold">Approved</span>
                          ) : (
                            <span className="bg-yellow-400/20 text-yellow-700 px-4 py-1 rounded-full text-xs font-semibold">Pending</span>
                          )}
                        </td>
                        <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">
                          {!req.consent && (
                            <button
                              onClick={() => handleApprove(req.id)}
                              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                            >
                              Approve
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* Transcript Details Section */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Student Transcripts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(transcriptData).map(([id, transcript]) => (
                <div
                  key={id}
                  className="bg-white rounded-xl shadow-lg p-6"
                  style={{
                    background: "linear-gradient(135deg, rgba(167, 123, 202, 0.15), rgba(124, 58, 237, 0.15))",
                    border: "1px solid rgba(124, 58, 237, 0.2)",
                  }}
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{transcript.name}</h3>
                    <div className="text-gray-600 text-sm">{transcript.year} • {transcript.program}</div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <a
                      href={URL.createObjectURL(generateTranscriptFile(transcript))}
                      download={`${transcript.name.replace(/\s+/g, "_")}_Transcript.txt`}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm font-medium"
                    >
                      Download Transcript
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAcademicDataPage;
