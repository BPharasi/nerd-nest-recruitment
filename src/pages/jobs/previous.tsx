import { NextPage } from "next";
import Head from "next/head";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaArrowLeft,
  FaUser,
  FaFileAlt,
  FaSearch,
  FaClipboardList,
  FaVideo,
  FaTrophy,
  FaBell 
} from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

// Mock data for previous searches
const previousSearches = [
  {
    id: 1,
    searchDate: "2024-01-15",
    query: "Software Developer",
    filters: {
      location: "Cape Town",
      type: "Full-time",
      experience: "Entry Level"
    },
    results: 12
  },
  {
    id: 2,
    searchDate: "2024-01-10",
    query: "Data Analyst Intern",
    filters: {
      location: "Johannesburg",
      type: "Internship",
      experience: "Student"
    },
    results: 8
  }
];

const PreviousSearches: NextPage = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: '#f9fafb' }}>
      <Head>
        <title>Previous Job Searches - UFS Recruitment</title>
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

      {/* Main Content Area */}
      <main style={{
        position: 'absolute',
        top: '75px',
        right: 0,
        bottom: 0,
        left: '256px',
        overflowY: 'auto',
        padding: '2rem',
        background: '#f9fafb'
      }}>
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            {/* Back Button and Title */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link 
                  href="/jobs" 
                  className="inline-flex items-center text-gray-600 hover:text-gray-900"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to Jobs
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Previous Job Searches</h1>
              </div>
            </div>

            {/* Search History Cards */}
            <div className="grid grid-cols-1 gap-4">
              {previousSearches.map((search) => (
                <div 
                  key={search.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{search.query}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-2" />
                            {new Date(search.searchDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="mr-2" />
                            {search.filters.location}
                          </div>
                        </div>
                      </div>
                      <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                        {search.results} results
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {Object.entries(search.filters).map(([key, value]) => (
                        <span 
                          key={key}
                          className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm"
                        >
                          {value}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-end">
                      <button 
                        className="bg-[#003B73] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#002855] transition-colors"
                      >
                        View Results
                      </button>
                    </div>
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

export default PreviousSearches;
