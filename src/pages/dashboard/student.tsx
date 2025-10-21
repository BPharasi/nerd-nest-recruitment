import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import { useState } from "react";
import type { IconType } from 'react-icons';
import { 
  FaUser, 
  FaFileAlt, 
  FaSearch, 
  FaClipboardList, 
  FaVideo, 
  FaTrophy, 
  FaBell,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
  FaStar
} from 'react-icons/fa';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactElement;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const skillChallenges = [
  {
    id: 1,
    title: "Generative AI",
    description: "Power up your AI career with expert-led learning",
    students: "1M+",
    image: "/images/ai-course.jpg",
    level: "Beginner"
  },
  {
    id: 2,
    title: "IT Certifications",
    description: "Advance your career with in-demand certifications",
    students: "14.4M+",
    image: "/images/it-cert.webp",
    level: "Intermediate"
  },
  // Add more skill challenges as needed
];

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
  // New badges from skills challenges
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

const StudentDashboard: NextPage = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'interview_offer',
      title: 'Interview Opportunity! ',
      message: 'Congratulations! You\'ve been selected for an interview based on your excellent performance in the "Build a React E-commerce Component" challenge.',
      challengeTitle: 'Build a React E-commerce Component',
      companyName: 'TechNova Solutions',
      createdAt: '2024-01-25',
      read: false,
      actionRequired: true
    }
  ]);

  const navigationGroups: NavGroup[] = [
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
      ]
    }
  ];

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: 'linear-gradient(to right, #283593, #5C6BC0)' }}>
      <Head>
        <title>Nerd.Next Recruitment System - Student Dashboard</title>
      </Head>

      {/* Fixed Height Header */}
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

      {/* Left Navigation */}
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
        {/* Profile Avatar Section - Perfectly Centered */}
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
                    className="block group"
                  >
                    <div 
                      style={{
                        background: "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        borderLeft: "5px solid transparent",
                        transition: "all 0.2s",
                        position: "relative",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                        paddingLeft: "1.25rem"
                      }}
                      className="px-4 py-3 rounded-lg flex items-center gap-3 group-hover:bg-white/20 group-hover:border-l-teal-400"
                      onMouseOver={e => {
                        (e.currentTarget as HTMLElement).style.background = "linear-gradient(90deg, rgba(20,184,166,0.12) 0%, rgba(6,182,212,0.10) 100%)";
                        (e.currentTarget as HTMLElement).style.borderLeft = "5px solid #14b8a6";
                      }}
                      onMouseOut={e => {
                        (e.currentTarget as HTMLElement).style.background = "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)";
                        (e.currentTarget as HTMLElement).style.borderLeft = "5px solid transparent";
                      }}
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

      {/* Main Content Area */}
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
          {/* Hero Section */}
          <section className="mb-10">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-6 text-white">
              <h1 className="text-4xl font-bold mb-4 ">Master tomorrow's skills today</h1>
              <p className="text-lg mb-6 text-teal-50">Power up your AI, career, and life skills with the most up-to-date, expert-led learning.</p>
              <button
                style={{
                  background: "linear-gradient(90deg, #6b7280 0%, #d1d5db 100%)",
                  color: "#222",
                  padding: "12px 36px",
                  borderRadius: "999px",
                  fontWeight: 700,
                  fontSize: "1.15rem",
                  boxShadow: "0 4px 16px rgba(107,114,128,0.15)",
                  border: "none",
                  transition: "all 0.2s",
                  outline: "none",
                  cursor: "pointer"
                }}
                onMouseOver={e => (e.currentTarget.style.background = "linear-gradient(90deg, #d1d5db 0%, #6b7280 100%)")}
                onMouseOut={e => (e.currentTarget.style.background = "linear-gradient(90deg, #6b7280 0%, #d1d5db 100%)")}
              >
                Get started
              </button>
            </div>
          </section>

          {/* Skills Challenges Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div
                className="flex justify-between items-center mb-6 flex-wrap gap-2"
                style={{ rowGap: 12 }}
              >
                <h2 className="text-2xl font-bold text-white">Learn essential career and life skills</h2>
                <div
                  className="flex gap-2 flex-wrap"
                  style={{ minWidth: 0 }}
                >
                  
                  <button
                    style={{
                      background: "linear-gradient(135deg, #6b7280 0%, #d1d5db 100%)",
                      color: "#222",
                      borderRadius: "50%",
                      border: "none",
                      width: "40px",
                      height: "20px",
                      minWidth: "40px",
                      minHeight: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 8px rgba(107,114,128,0.15)",
                      transition: "all 0.2s",
                      cursor: "pointer"
                    }}
                    onMouseOver={e => (e.currentTarget.style.background = "linear-gradient(135deg, #d1d5db 0%, #6b7280 100%)")}
                    onMouseOut={e => (e.currentTarget.style.background = "linear-gradient(135deg, #6b7280 0%, #d1d5db 100%)")}
                  >
                    <FaChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    style={{
                      background: "linear-gradient(135deg, rgba(20, 184, 166, 0.5), rgba(6, 182, 212, 0.5))",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(20, 184, 166, 0.3)",
                    }}
                    className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Image section: full width, fixed aspect ratio, rounded top corners */}
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "16/9",
                        position: "relative",
                        overflow: "hidden",
                        borderTopLeftRadius: "0.75rem",
                        borderTopRightRadius: "0.75rem",
                        background: "#222"
                      }}
                    >
                      <img
                        src={challenge.image}
                        alt={challenge.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block"
                        }}
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold mb-2 text-white">{challenge.title}</h3>
                      <p className="text-teal-50 mb-4">{challenge.description}</p>
                      <div className="flex items-center justify-between text-sm mt-auto">
                        <span className="flex items-center text-teal-100">
                          <FaUsers className="mr-2" />
                          {challenge.students} students
                        </span>
                        <span className="text-cyan-100 font-medium">
                          {challenge.level}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Notifications Section - Add this before Achievement Badges */}
          {notifications.length > 0 && (
            <section className="mb-12">
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200/20">
                <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
                  <h2 className="text-2xl font-bold text-white">Recent Notifications</h2>
                  <Link
                    href="/dashboard/student/notifications"
                    className="text-green-100 hover:text-white font-medium transition-colors"
                    style={{ minWidth: 120, textAlign: "center" }}
                  >
                    View All
                  </Link>
                </div>

                <div className="space-y-4">
                  {notifications.filter(n => !n.read).slice(0, 2).map((notification) => (
                    <div
                      key={notification.id}
                      style={{
                        background: notification.type === 'interview_offer' 
                          ? "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2))"
                          : "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2))",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(34, 197, 94, 0.3)",
                      }}
                      className="rounded-xl p-6 shadow-lg"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-white text-lg">{notification.title}</h3>
                        <span className="text-xs text-green-100 bg-green-400/20 px-3 py-1 rounded-full">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-green-50 mb-4">{notification.message}</p>
                      {notification.challengeTitle && (
                        <div className="text-sm text-green-100 mb-4">
                          <span className="font-medium">Challenge:</span> {notification.challengeTitle}
                        </div>
                      )}
                      {notification.actionRequired && (
                        <div className="flex flex-wrap gap-3 justify-center">
                          <button
                            style={{
                              background: "linear-gradient(90deg, #6b7280 0%, #d1d5db 100%)",
                              color: "#222",
                              padding: "10px 28px",
                              borderRadius: "999px",
                              fontWeight: 600,
                                fontSize: "0.85rem",
                                boxShadow: "none",
                                transition: "all 0.2s",
                                cursor: "pointer",
                                minWidth: 60,
                            }}
                            onMouseOver={e => (e.currentTarget.style.background = "linear-gradient(90deg, #d1d5db 0%, #6b7280 100%)")}
                            onMouseOut={e => (e.currentTarget.style.background = "linear-gradient(90deg, #6b7280 0%, #d1d5db 100%)")}
                            className="font-medium"
                          >
                            Accept Interview
                          </button>
                            <Link
                              href="/dashboard/student/notifications"
                              className="font-medium"
                              style={{
                                background: "transparent",
                                color: "#6b7280",
                                border: "2px solid #6b7280",
                                padding: "4px 10px",
                                borderRadius: "999px",
                                fontWeight: 600,
                                fontSize: "0.85rem",
                                boxShadow: "none",
                                transition: "all 0.2s",
                                cursor: "pointer",
                                minWidth: 60,
                                display: "inline-block",
                                textAlign: "center",
                                textDecoration: "none"
                              }}
                              onMouseOver={e => {
                                (e.currentTarget as HTMLElement).style.background = "#e5e7eb";
                                (e.currentTarget as HTMLElement).style.color = "#222";
                              }}
                              onMouseOut={e => {
                                (e.currentTarget as HTMLElement).style.background = "transparent";
                                (e.currentTarget as HTMLElement).style.color = "#6b7280";
                              }}
                            >
                              View Details
                            </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Achievement Badges Section - Updated to show new badges */}
            <section className="mb-12">
            <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Your Achievement Badges</h2>
                <Link href="/dashboard/student/achievements" className="text-teal-100 hover:text-white font-medium transition-colors">
                  View All ({achievedBadges.length})
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {achievedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    style={{
                      background: "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2))",
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

export default StudentDashboard;