import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { 
  FaBuilding, 
  FaUsers, 
  FaCalendarAlt, 
  FaClipboardList, 
  FaVideo, 
  FaBell,
  FaChartBar,
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaTrophy
} from 'react-icons/fa';

// Mock data for employer dashboard - filter to show only approved jobs
const jobPostingNotifications = [
  {
    id: 1,
    title: "Senior Software Developer",
    status: "approved",
    submittedDate: "2024-01-20",
    approvedDate: "2024-01-22",
    applications: 15,
    views: 128
  }
  // Removed pending and rejected jobs from main dashboard view
];

const upcomingInterviews = [
  {
    id: 1,
    candidateName: "John Smith",
    position: "Senior Software Developer", // Only from approved positions
    date: "2024-02-01",
    time: "10:00 AM",
    type: "Video Call",
    status: "confirmed"
  },
  {
    id: 2,
    candidateName: "Sarah Johnson",
    position: "Senior Software Developer", // Only from approved positions
    date: "2024-02-01",
    time: "2:00 PM",
    type: "Video Call",
    status: "pending"
  }
  // Removed interviews for non-approved positions
];

const applicationStats = [
  {
    position: "Senior Software Developer", // Only approved position
    totalApplications: 25,
    newApplications: 5,
    interviews: 8,
    offers: 2
  }
  // Removed stats for non-approved positions
];

const EmployerDashboard: NextPage = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Add useEffect to handle client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-400/20 text-green-50 border-green-200/30";
      case "pending":
        return "bg-yellow-400/20 text-yellow-50 border-yellow-200/30";
      case "rejected":
        return "bg-red-400/20 text-red-50 border-red-200/30";
      default:
        return "bg-gray-400/20 text-gray-50 border-gray-200/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <FaCheckCircle className="text-green-400" />;
      case "pending":
        return <FaClock className="text-yellow-400" />;
      case "rejected":
        return <FaExclamationTriangle className="text-red-400" />;
      default:
        return <FaClock className="text-gray-400" />;
    }
  };

  // Helper function for consistent date formatting
  const formatDate = (dateString: string) => {
    if (!isClient) {
      // Return a consistent format for SSR
      return new Date(dateString).toISOString().split('T')[0];
    }
    // Client-side formatting
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return null;
  }

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: 'linear-gradient(to right, #283593, #5C6BC0)' }}>
      <Head>
        <title>Employer Dashboard - UFS Recruitment</title>
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
              <h3 className="font-semibold text-white text-lg">{session?.user?.name || "Employer"}</h3>
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
          {/* Hero Section */}
          <section className="mb-10">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-6 text-white">
              <h1 className="text-4xl font-bold mb-4">Welcome back, Employer!</h1>
              <p className="text-lg mb-6 text-teal-50">Manage your approved job postings, review applications, and schedule interviews with top talent.</p>
              <Link href="/dashboard/employer/job-posting">
                <button 
                  style={{
                    background: 'linear-gradient(135deg, #64748b, #475569)',
                    color: 'white',
                    padding: '14px 28px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #475569, #334155)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #64748b, #475569)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  Post New Job
                </button>
              </Link>
            </div>
          </section>

          {/* Approved Job Postings Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Active Job Postings</h2>
                <div className="flex gap-4">
                  <Link href="/dashboard/employer/job-posting">
                    <button
                      style={{
                        background: 'linear-gradient(135deg, #64748b, #475569)',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease',
                        letterSpacing: '0.3px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #475569, #334155)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #64748b, #475569)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                      }}
                    >
                      Post New Job
                    </button>
                  </Link>
                  <Link href="/dashboard/employer/all-postings">
                    <span
                      style={{
                        color: '#e2e8f0',
                        fontSize: '14px',
                        fontWeight: '500',
                        textDecoration: 'none',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        background: 'rgba(100, 116, 139, 0.2)',
                        border: '1px solid rgba(100, 116, 139, 0.3)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(100, 116, 139, 0.3)';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(100, 116, 139, 0.2)';
                        e.currentTarget.style.color = '#e2e8f0';
                      }}
                    >
                      View All (Including Pending)
                    </span>
                  </Link>
                </div>
              </div>

              {jobPostingNotifications.length > 0 ? (
                <div className="space-y-4">
                  {jobPostingNotifications.map((posting) => (
                    <div
                      key={posting.id}
                      style={{
                        background: "linear-gradient(135deg, rgba(20, 184, 166, 0.7), rgba(6, 182, 212, 0.7))",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(20, 184, 166, 0.3)",
                        borderRadius: "0.75rem"
                      }}
                      className="rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">{posting.title}</h3>
                          <p className="text-teal-100">Approved: {formatDate(posting.approvedDate!)}</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border bg-green-400/20 text-green-50 border-green-200/30">
                          <FaCheckCircle className="text-green-400" />
                          <span className="font-medium">Live & Active</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-white">{posting.applications}</div>
                          <div className="text-teal-100 text-sm">Applications</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-white">{posting.views}</div>
                          <div className="text-teal-100 text-sm">Views</div>
                        </div>
                        <div className="bg-green-400/20 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-green-100">
                            {Math.round((posting.applications / posting.views) * 100)}%
                          </div>
                          <div className="text-green-200 text-sm">Conversion Rate</div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3">
                        <button 
                          style={{
                            background: 'linear-gradient(135deg, #64748b, #475569)',
                            color: 'white',
                            padding: '12px 20px',
                            borderRadius: '10px',
                            fontSize: '14px',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #475569, #334155)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #64748b, #475569)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                          }}
                        >
                          <FaEye /> View Details
                        </button>
                        <Link href="/dashboard/employer/applications">
                          <button
                            style={{
                              background: 'linear-gradient(135deg, #64748b, #475569)',
                              color: 'white',
                              padding: '12px 20px',
                              borderRadius: '10px',
                              fontSize: '14px',
                              fontWeight: '600',
                              border: 'none',
                              cursor: 'pointer',
                              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'linear-gradient(135deg, #475569, #334155)';
                              e.currentTarget.style.transform = 'translateY(-1px)';
                              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'linear-gradient(135deg, #64748b, #475569)';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                            }}
                          >
                            View Applications ({posting.applications})
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-white/60 mb-4">
                    <FaFileAlt className="mx-auto text-6xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Active Job Postings</h3>
                    <p>Create your first job posting to start receiving applications</p>
                  </div>
                  <Link href="/dashboard/employer/job-posting">
                    <button
                      style={{
                        background: 'linear-gradient(135deg, #64748b, #475569)',
                        color: 'white',
                        padding: '16px 32px',
                        borderRadius: '16px',
                        fontSize: '16px',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease',
                        letterSpacing: '0.5px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #475569, #334155)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #64748b, #475569)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                      }}
                    >
                      Create Job Posting
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Application Statistics Section - Only for Approved Jobs */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Active Position Statistics</h2>
                <Link href="/dashboard/employer">
                  <span
                    style={{
                      color: '#e2e8f0',
                      fontSize: '14px',
                      fontWeight: '500',
                      textDecoration: 'none',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      background: 'rgba(100, 116, 139, 0.6)',
                      border: '1px solid rgba(100, 116, 139, 0.3)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(100, 116, 139, 0.3)';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(100, 116, 139, 0.2)';
                      e.currentTarget.style.color = '#e2e8f0';
                    }}
                  >
                    View Analytics
                  </span>
                </Link>
              </div>

              {applicationStats.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {applicationStats.map((stat, index) => (
                    <div
                      key={index}
                      style={{
                        background: "linear-gradient(135deg, rgba(20, 184, 166, 0.6), rgba(6, 182, 212, 0.6))",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(20, 184, 166, 0.3)",
                      }}
                      className="rounded-xl p-6 shadow-lg"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-white">{stat.position}</h3>
                        <span className="bg-green-400/20 text-green-100 px-3 py-1 rounded-full text-sm border border-green-200/30">
                          Active
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-cyan-200">{stat.totalApplications}</div>
                          <div className="text-teal-100 text-sm">Total Applications</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-200">{stat.newApplications}</div>
                          <div className="text-teal-100 text-sm">New This Week</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-200">{stat.interviews}</div>
                          <div className="text-teal-100 text-sm">Interviews</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-200">{stat.offers}</div>
                          <div className="text-teal-100 text-sm">Offers Made</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-white/60">No statistics available for active positions</p>
                </div>
              )}
            </div>
          </section>

          {/* Upcoming Interviews Calendar - Only for Approved Jobs */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Upcoming Interviews</h2>
                <div className="flex items-center gap-4">
                  <Link href="/dashboard/employer/interview-management">
                    <span
                      style={{
                        color: '#e2e8f0',
                        fontSize: '14px',
                        fontWeight: '500',
                        textDecoration: 'none',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        background: 'rgba(100, 116, 139, 0.5)',
                        border: '1px solid rgba(100, 116, 139, 0.3)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(100, 116, 139, 0.3)';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(100, 116, 139, 0.2)';
                        e.currentTarget.style.color = '#e2e8f0';
                      }}
                    >
                      Manage All
                    </span>
                  </Link>
                  <div className="flex gap-2">
                    <button 
                      style={{
                        background: 'rgba(100, 116, 139, 0.5)',
                        border: '1px solid rgba(100, 116, 139, 0.3)',
                        color: 'white',
                        padding: '8px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(100, 116, 139, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(100, 116, 139, 0.2)';
                      }}
                    >
                      <FaChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      style={{
                        background: 'rgba(100, 116, 139, 0.5)',
                        border: '1px solid rgba(100, 116, 139, 0.3)',
                        color: 'white',
                        padding: '8px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(100, 116, 139, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(100, 116, 139, 0.2)';
                      }}
                    >
                      <FaChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {upcomingInterviews.length > 0 ? (
                <div className="space-y-4">
                  {upcomingInterviews.map((interview) => (
                    <div
                      key={interview.id}
                      style={{
                        background: "linear-gradient(135deg, rgba(20, 184, 166, 0.6), rgba(6, 182, 212, 0.6))",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(20, 184, 166, 0.3)",
                      }}
                      className="rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="bg-teal-500/20 p-3 rounded-full">
                            <FaCalendarAlt className="text-teal-200" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{interview.candidateName}</h4>
                            <p className="text-teal-100 text-sm">{interview.position}</p>
                            <div className="flex items-center gap-4 text-sm text-teal-200 mt-1">
                              <span>{formatDate(interview.date)}</span>
                              <span>{interview.time}</span>
                              <span>{interview.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            interview.status === 'confirmed' 
                              ? 'bg-green-400/20 text-green-100 border border-green-200/30' 
                              : 'bg-yellow-400/20 text-yellow-100 border border-yellow-200/30'
                          }`}>
                            {interview.status}
                          </span>
                          <button
                            style={{
                              background: 'linear-gradient(135deg, #64748b, #475569)',
                              color: 'white',
                              padding: '10px 20px',
                              borderRadius: '10px',
                              fontSize: '14px',
                              fontWeight: '600',
                              border: 'none',
                              cursor: 'pointer',
                              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'linear-gradient(135deg, #475569, #334155)';
                              e.currentTarget.style.transform = 'translateY(-1px)';
                              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'linear-gradient(135deg, #64748b, #475569)';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                            }}
                          >
                            Join Call
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaCalendarAlt className="mx-auto text-4xl text-white/40 mb-4" />
                  <p className="text-white/60">No upcoming interviews scheduled</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboard;
