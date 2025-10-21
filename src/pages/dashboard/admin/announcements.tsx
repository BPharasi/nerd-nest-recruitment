import * as React from "react";
import { JSX, useState } from "react";
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
  FaBullhorn,
  FaLightbulb,
  FaRocket,
  FaGift,
  FaNewspaper,
} from "react-icons/fa";

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: "challenge" | "hackathon" | "bursary" | "tip" | "news";
  date: string;
}

const initialAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "React Hackathon 2024",
    content: "Join the upcoming React Hackathon! Build innovative apps and win prizes.",
    type: "hackathon",
    date: "2024-03-01",
  },
  {
    id: "2",
    title: "Bursary Applications Open",
    content: "Apply now for the 2024 IT Bursary. Deadline: 31 March 2024.",
    type: "bursary",
    date: "2024-02-15",
  },
  {
    id: "3",
    title: "Interview Tip: STAR Method",
    content: "Use the STAR method (Situation, Task, Action, Result) to answer behavioral interview questions.",
    type: "tip",
    date: "2024-02-10",
  },
  {
    id: "4",
    title: "New: Next.js 14 Released",
    content: "Explore the latest features in Next.js 14 for modern web development.",
    type: "news",
    date: "2024-02-05",
  },
  {
    id: "5",
    title: "Weekly Coding Challenge: Sorting Algorithms",
    content: "Participate in this week's challenge and earn a badge!",
    type: "challenge",
    date: "2024-02-12",
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
      { href: "/dashboard/admin/annocements", label: "Announcements", icon: <FaBell /> },
      { href: "/dashboard/admin/helpdesk", label: "Helpdesk", icon: <FaClipboardList /> },
      { href: "/dashboard/admin/data-governance", label: "Data Governance", icon: <FaCheckCircle /> },
    ],
  },
];

const typeIcons: Record<Announcement["type"], JSX.Element> = {
  challenge: <FaRocket className="text-blue-500" />,
  hackathon: <FaBullhorn className="text-pink-500" />,
  bursary: <FaGift className="text-green-500" />,
  tip: <FaLightbulb className="text-yellow-500" />,
  news: <FaNewspaper className="text-cyan-500" />,
};

const AdminAnnouncementsPage: NextPage = () => {
  const { data: session } = useSession();
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [formState, setFormState] = useState<{ title: string; content: string; type: Announcement["type"] }>(
    { title: "", content: "", type: "challenge" }
  );
  const [success, setSuccess] = useState<string | null>(null);

  const handlePublish = () => {
    if (!formState.title || !formState.content) return;
    setAnnouncements([
      {
        id: (announcements.length + 1).toString(),
        title: formState.title,
        content: formState.content,
        type: formState.type,
        date: new Date().toISOString().slice(0, 10),
      },
      ...announcements,
    ]);
    setFormState({ title: "", content: "", type: "challenge" });
    setSuccess("Announcement published and visible to students.");
    setTimeout(() => setSuccess(null), 3000);
    // In real app, POST to /api/admin/annocements
  };

  const handleRemove = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
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
        <title>Announcements Management - Admin | UFS Recruitment</title>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Announcements</h1>
          {/* Success Banner */}
          {success && (
            <div className="mb-6">
              <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow font-semibold text-center">
                {success}
              </div>
            </div>
          )}
          {/* Announcement Form */}
          <div
            className="bg-white rounded-xl shadow-lg p-8 mb-10"
            style={{
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(20, 184, 166, 0.3)",
            }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Create Announcement</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                value={formState.title}
                onChange={e => setFormState(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Title"
                className="w-full p-3 border rounded"
              />
              <select
                value={formState.type}
                onChange={e => setFormState(prev => ({ ...prev, type: e.target.value as Announcement["type"] }))}
                className="w-full p-3 border rounded"
              >
                <option value="challenge">Challenge</option>
                <option value="hackathon">Hackathon</option>
                <option value="bursary">Bursary</option>
                <option value="tip">Interview Tip</option>
                <option value="news">Tech News</option>
              </select>
              <button
                onClick={handlePublish}
                className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-800 transition"
              >
                Publish
              </button>
            </div>
            <textarea
              value={formState.content}
              onChange={e => setFormState(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Content"
              className="w-full p-3 border rounded mt-4"
              rows={3}
            />
          </div>
          {/* Announcements List */}
          <div className="space-y-6">
            {announcements.map(a => (
              <div
                key={a.id}
                className="bg-white rounded-xl shadow-lg p-6 flex items-start gap-6"
                style={{
                  background: "linear-gradient(135deg, rgba(167, 123, 202, 0.15), rgba(124, 58, 237, 0.15))",
                  border: "1px solid rgba(124, 58, 237, 0.2)",
                }}
              >
                <div className="flex-shrink-0 text-3xl mt-1">{typeIcons[a.type]}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{a.title}</h3>
                    <span className="text-xs text-gray-500">{new Date(a.date).toLocaleDateString()}</span>
                  </div>
                  <div className="mb-2 text-gray-700">{a.content}</div>
                  <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 capitalize">
                    {a.type}
                  </span>
                </div>
                <button
                  onClick={() => handleRemove(a.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 ml-4"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAnnouncementsPage;
