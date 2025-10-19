import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import { FaUser, FaFileAlt, FaSearch, FaClipboardList, FaVideo, FaTrophy, FaBell, FaHome, FaStar } from "react-icons/fa";
import { useState } from "react";

const achievedBadges = [
  {
    id: 1,
    name: "Python Master",
    icon: "🐍",
    level: "Advanced",
    earnedDate: "2023-12-01",
    color: "bg-blue-500"
  },
  {
    id: 2,
    name: "Web Development",
    icon: "🌐",
    level: "Intermediate",
    earnedDate: "2023-11-15",
    color: "bg-green-500"
  },
  {
    id: 3,
    name: "Data Analysis",
    icon: "📊",
    level: "Beginner",
    earnedDate: "2023-10-30",
    color: "bg-purple-500"
  },
  {
    id: 4,
    name: "Excellence Award",
    icon: "🏆",
    level: "Advanced",
    earnedDate: "2024-01-25",
    color: "bg-yellow-500"
  },
  {
    id: 5,
    name: "React Master",
    icon: "⚛️",
    level: "Intermediate",
    earnedDate: "2024-01-20",
    color: "bg-cyan-500"
  }
];

const navigationGroups = [
  {
    title: "Profile",
    items: [
      { href: "/dashboard/student/Profile", label: "Profile Setup", icon: <FaUser /> },
      { href: "/dashboard/student/resume-builder", label: "Create CV", icon: <FaFileAlt /> },
    ]
  },
  {
    title: "Job Search",
    items: [
      { href: "/jobs", label: "Job Search & Matching", icon: <FaSearch /> },
      { href: "/dashboard/student/applications", label: "Applications", icon: <FaClipboardList /> },
      { href: "/dashboard/student/interview-practise", label: "Practise Interviews", icon: <FaVideo /> },
    ]
  },
  {
    title: "Activities",
    items: [
      { href: "/dashboard/student/skills-challenge", label: "Skills Challenges", icon: <FaTrophy /> },
      { href: "/dashboard/student/notifications", label: "Notifications", icon: <FaBell /> },
      { href: "/dashboard/student/achievements", label: "Achievements", icon: <FaStar /> },
    ]
  }
];

const AchievementsPage: NextPage = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: 'linear-gradient(to right, #283593, #5C6BC0)' }}>
      <Head>
        <title>Achievements - Nerd.Nest</title>
      </Head>

      {/* Header */}
      <header style={{ 
        height: '75px', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 10, 
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <Header />
      </header>

      {/* Sidebar Navigation */}
      <aside 
        style={{ 
          position: 'absolute',
          top: '75px',
          bottom: 0,
          left: 0,
          width: '256px',
          overflowY: 'auto',
          background: 'linear-gradient(to bottom, #26A69A, #00BCD4)',
          padding: '1rem'
        }}
        className={`${isSidebarOpen ? 'block' : 'hidden md:block'}`}
      >
        {/* Profile Avatar Section */}
        <div className="relative mb-8" style={{ height: '180px', width: '100%' }}>
          <div 
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: '20px',
              width: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div 
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '60px',
                border: '4px solid rgba(255, 255, 255, 0.9)',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginBottom: '12px'
              }}
            >
              <img 
                src={session?.user?.image || "https://www.gravatar.com/avatar/?d=mp"} 
                alt="Profile" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-white text-lg">{session?.user?.name || "Student"}</h3>
            </div>
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="space-y-4">
          {/* Home Link */}
          <div className="mb-6">
            <Link
              href="/dashboard/student"
              className="block"
            >
              <div 
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.1))",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
                className="px-4 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-3"
              >
                <span className="text-xl text-white"><FaHome /></span>
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
                  <Link
                    key={index}
                    href={item.href}
                    className="block"
                  >
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
          position: 'absolute',
          top: '75px',
          right: 0,
          bottom: 0,
          left: '256px',
          overflowY: 'auto',
          padding: '2rem',
          backgroundImage: "url('/images/skills_background(1).png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <section className="mb-10">
            <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h1 className="text-3xl font-bold text-white mb-6 flex items-center justify-between">
                🏆 Your Achievement Badges
                <Link
                  href="/dashboard/student"
                  className="ml-auto"
                  style={{
                    background: "linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%)",
                    color: "#fff",
                    padding: "8px 24px",
                    borderRadius: "999px",
                    fontWeight: 600,
                    fontSize: "1rem",
                    boxShadow: "0 2px 8px rgba(20,184,166,0.15)",
                    transition: "all 0.2s",
                    marginLeft: "auto",
                    marginRight: 0,
                    textDecoration: "none"
                  }}
                  onMouseOver={e => (e.currentTarget.style.background = "linear-gradient(90deg, #06b6d4 0%, #14b8a6 100%)")}
                  onMouseOut={e => (e.currentTarget.style.background = "linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%)")}
                >
                  Back to Dashboard
                </Link>
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {achievedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    style={{
                      background: "linear-gradient(135deg, rgba(167, 123, 202, 0.2), rgba(124, 58, 237, 0.2))",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(20, 184, 166, 0.3)",
                    }}
                    className="rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group hover:scale-105"
                  >
                    <div className={`${badge.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3 text-white group-hover:scale-110 transition-transform`}>
                      {badge.icon}
                    </div>
                    <h3 className="font-semibold text-white mb-1 text-sm">{badge.name}</h3>
                    <span className="text-xs text-teal-100 mb-2">{badge.level}</span>
                    <div className="flex items-center text-xs text-teal-100">
                      <FaStar className="text-yellow-400 mr-1" />
                      {new Date(badge.earnedDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AchievementsPage;
