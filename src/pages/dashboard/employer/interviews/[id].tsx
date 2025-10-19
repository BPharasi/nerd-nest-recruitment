import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/worker-javascript";
import {
  FaBuilding,
  FaUsers,
  FaClipboardList,
  FaVideo,
  FaBell,
  FaChartBar,
  FaFileAlt,
  FaTrophy,
  FaHome,
  FaComments,
  FaCode,
  FaVideo as FaVideoIcon,
  FaClipboardList as FaClipboardIcon,
} from "react-icons/fa";

// Mock interviewee data (simulate real-time sync)
const intervieweeData = {
  name: "John Smith",
  videoStream: null, // In real app, use WebRTC stream
  answers: [
    { question: "Implement a function to reverse a string", answer: "function reverse(str) { return str.split('').reverse().join(''); }" },
    { question: "Explain how promises work in JavaScript", answer: "Promises represent async operations and can be resolved or rejected." }
  ],
  code: "// Interviewee's live code here\nfunction solution() {\n  // ...\n}"
};

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
      { href: "/dashboard/employer/analytics", label: "Analytics", icon: <FaChartBar /> },
      { href: "/dashboard/employer/notifications", label: "Notifications", icon: <FaBell /> },
    ]
  }
];

const EmployerInterviewRoom: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'video' | 'answers' | 'code'>('video');
  const [code, setCode] = useState(intervieweeData.code);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Simulate live code updates (polling)
  useEffect(() => {
    const interval = setInterval(() => {
      // In real app, fetch live code from backend or WebSocket
      setCode(intervieweeData.code);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", background: "#f9fafb" }}>
      <Head>
        <title>Employer Interview Room</title>
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
      <main style={{
        position: "absolute",
        top: "75px",
        right: 0,
        bottom: 0,
        left: "256px",
        overflowY: "auto",
        padding: "2rem",
        background: "#f9fafb"
      }}>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Live Interview: {intervieweeData.name}</h1>
          <div className="flex gap-6 mb-6">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${activeTab === 'video' ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              <FaVideoIcon /> Video
            </button>
            <button
              onClick={() => setActiveTab('answers')}
              className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${activeTab === 'answers' ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              <FaClipboardIcon /> Answers
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${activeTab === 'code' ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              <FaCode /> Live Code
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 min-h-[400px]">
            {activeTab === 'video' && (
              <div className="flex flex-col items-center justify-center h-full">
                {/* In real app, show live video stream from interviewee */}
                <div className="w-96 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  <FaVideo className="text-5xl" />
                  <span className="ml-4">Interviewee Video Stream</span>
                </div>
              </div>
            )}
            {activeTab === 'answers' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Interviewee Answers</h2>
                <ul className="space-y-4">
                  {intervieweeData.answers.map((ans, idx) => (
                    <li key={idx} className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-medium text-gray-800 mb-2">{ans.question}</div>
                      <div className="text-gray-700">{ans.answer}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === 'code' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Live Coding</h2>
                <AceEditor
                  mode="javascript"
                  theme="monokai"
                  value={code}
                  readOnly
                  name="live-code-view"
                  editorProps={{ $blockScrolling: true }}
                  setOptions={{
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                  style={{ width: "100%", height: "400px", borderRadius: "0.5rem" }}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerInterviewRoom;
