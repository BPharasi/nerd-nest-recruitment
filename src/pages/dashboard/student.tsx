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
  FaBell 
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

const StudentDashboard: NextPage = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigationGroups: NavGroup[] = [
    {
      title: "Profile",
      items: [
        { href: "/dashboard/student/profile", label: "Profile Setup", icon: <FaUser /> },
        { href: "/dashboard/student/resume-builder", label: "Create CV", icon: <FaFileAlt /> },
      ]
    },
    {
      title: "Job Search",
      items: [
        { href: "/jobs", label: "Job Search & Matching", icon: <FaSearch /> },
        { href: "/dashboard/student/applications", label: "Applications", icon: <FaClipboardList /> },
        { href: "/dashboard/student/interviews", label: "Interviews", icon: <FaVideo /> },
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

      {/* Left Navigation - Fixed Width Like VS Code Explorer */}
      <aside 
        style={{ 
          position: 'absolute',
          top: '64px',
          bottom: 0,
          left: 0,
          width: '256px',
          overflowY: 'auto',
          background: 'linear-gradient(to bottom, #26A69A, #00BCD4)'
        }}
        className={`${isSidebarOpen ? 'block' : 'hidden md:block'}`}
      >
        {/* Profile Avatar Section - Perfectly Centered */}
        <div className="relative" style={{ height: '180px', width: '256px' }}>
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
        <div className="mt-2 px-2">
          {navigationGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-4">
              <div className="px-4 py-2 text-sm font-semibold text-white uppercase tracking-wider">
                {group.title}
              </div>
              <ul>
                {group.items.map((item, index) => (
                  <li key={index}>
                    <Link 
                      href={item.href}
                      className="flex items-center px-4 py-2 text-white hover:bg-[#283593] hover:text-white transition-all duration-150 gap-3"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area - Like VS Code Editor */}
      <main 
        style={{
          position: 'absolute',
          top: '64px',
          right: 0,
          bottom: 0,
          left: '256px',
          overflowY: 'auto',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #4DB6AC 100%)', // Lighter teal (#4DB6AC)
          padding: '2rem'
        }}
      >
        <div className="h-full p-6 rounded-lg bg-white/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-[#26A69A] mb-6">
              Welcome Back, {session?.user?.name || "Student"}!
            </h1>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-[#4DB6AC]/20">
              <p className="text-[#424242]">
                Select an option from the sidebar to manage your recruitment journey.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;