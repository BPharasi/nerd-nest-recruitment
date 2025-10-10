import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaFileAlt,
  FaSearch,
  FaClipboardList,
  FaVideo,
  FaTrophy,
  FaBell,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaHourglass,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useRouter } from 'next/router';

// Mock data for applications
const applications = [
  {
    id: 1,
    jobTitle: "Junior Software Developer",
    company: "TechNova Solutions",
    appliedDate: "2024-01-15",
    status: "interview",
    interviewDate: "2024-02-01",
    location: "Johannesburg",
    type: "Full-time",
  },
  {
    id: 2,
    jobTitle: "Data Analyst Intern",
    company: "InfoFlow Analytics",
    appliedDate: "2024-01-10",
    status: "pending",
    location: "Remote",
    type: "Internship",
  },
  {
    id: 3,
    jobTitle: "Cloud Engineer",
    company: "CloudSolutions",
    appliedDate: "2024-01-05",
    status: "rejected",
    location: "Cape Town",
    type: "Full-time",
  },
];

const ApplicationsPage: NextPage = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<
    "all" | "pending" | "interview" | "rejected"
  >("all");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "interview":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "interview":
        return <FaCheckCircle className="w-5 h-5" />;
      case "pending":
        return <FaHourglass className="w-5 h-5" />;
      case "rejected":
        return <FaTimesCircle className="w-5 h-5" />;
      default:
        return <FaClock className="w-5 h-5" />;
    }
  };

  const filteredApplications = applications.filter((app) =>
    filter === "all" ? true : app.status === filter
  );

  const handleViewDetails = (applicationId: number) => {
    router.push(`/dashboard/student/applications/details/${applicationId}`);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: "#f9fafb",
      }}
    >
      <Head>
        <title>Applications Tracking - UFS Recruitment</title>
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
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Applications Tracking</h1>

          
          {/* Filter/Status Buttons - Fixed horizontal layout */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            gap: '16px',
            width: '100%',
            marginBottom: '24px',
          }}>
            <div style={{
              display: 'flex',
              flex: '1',
              minWidth: '100px',
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
              <h3 className="text-lg font-medium text-gray-900">Total</h3>
              <span className="text-2xl font-bold text-[#003B73]">{applications.length}</span>
            </div>

            <div style={{
              display: 'flex',
              flex: '1',
              minWidth: '100px',
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
              <h3 className="text-lg font-medium text-gray-900">Pending</h3>
              <span className="text-2xl font-bold text-yellow-600">
                {applications.filter((app) => app.status === "pending").length}
              </span>
            </div>

            <div style={{
              display: 'flex',
              flex: '1',
              minWidth: '100px',
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
              <h3 className="text-lg font-medium text-gray-900">Interviews</h3>
              <span className="text-2xl font-bold text-green-600">
                {applications.filter((app) => app.status === "interview").length}
              </span>
            </div>

            <div style={{
              display: 'flex',
              flex: '1',
              minWidth: '100px',
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
              <h3 className="text-lg font-medium text-gray-900">Rejected</h3>
              <span className="text-2xl font-bold text-red-600">
                {applications.filter((app) => app.status === "rejected").length}
              </span>
            </div>
          </div>

          {/* Keep existing filter buttons */}
          <div className="flex gap-4 mb-6">
            {(["all", "pending", "interview", "rejected"] as const).map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  style={{
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    padding: '0.625rem 1.5rem',
                  }}
                  className={`rounded-lg font-medium transition-colors ${
                    filter === status
                      ? "bg-[#003B73] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              )
            )}
          </div>

          {/* Applications List */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr', 
            gap: '1rem',
            padding: '1rem' 
          }}>
            {filteredApplications.map((application) => (
              <div
                key={application.id}
                style={{
                  background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(20, 184, 166, 0.3)",
                  margin: '0.5rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                className="hover:shadow-xl transition-all duration-300"
              >
                {/* Status Banner */}
                <div
                  className={`w-full h-2 rounded-t-xl ${
                    application.status === "interview"
                      ? "bg-green-500"
                      : application.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                />

                <div className="p-6">
                  {/* Header with Company and Status */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        {application.jobTitle}
                      </h3>
                      <p className="text-lg text-teal-50">{application.company}</p>
                    </div>
                    <div
                      className={`flex items-center gap-2 px-6 py-2 rounded-full backdrop-blur-sm ${
                        application.status === "interview"
                          ? "bg-green-400/20 text-green-50 border border-green-200/30"
                          : application.status === "pending"
                          ? "bg-yellow-400/20 text-yellow-50 border border-yellow-200/30"
                          : "bg-red-400/20 text-red-50 border border-red-200/30"
                      }`}
                    >
                      {getStatusIcon(application.status)}
                      <span className="font-medium">
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Application Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-4 text-teal-50">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-teal-200" />
                        <span>{application.location}</span>
                      </div>
                      <div className="bg-teal-400/20 text-teal-50 px-3 py-1 rounded-full text-sm border border-teal-200/30">
                        {application.type}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-teal-50">
                      <FaClock className="text-teal-200" />
                      <div>
                        <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Interview Section - if scheduled */}
                  {application.interviewDate && (
                    <div className="mb-6 p-4 bg-green-400/20 rounded-xl border border-green-200/30">
                      <div className="flex items-center gap-4">
                        <div className="bg-green-500 p-3 rounded-full">
                          <FaVideo className="text-xl text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-green-50 text-lg">
                            Interview Scheduled
                          </div>
                          <div className="text-green-100">
                            {new Date(application.interviewDate).toLocaleDateString()} at{' '}
                            {new Date(application.interviewDate).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                        {/* Action Buttons */}
                        <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginTop: '24px',
                          paddingTop: '24px',
                          borderTop: '1px solid rgba(20, 184, 166, 0.2)',
                          gap: '24px'
                        }}
                        >
                        <button
                          type="button"
                          style={{
                          background: 'linear-gradient(to right, #2563eb, #60a5fa)',
                          color: 'white',
                          padding: '12px 24px',
                          borderRadius: '12px',
                          border: 'none',
                          fontWeight: '500',
                          textAlign: 'center',
                          minWidth: '140px',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(to right, #1d4ed8, #3b82f6)';
                          e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)';
                          }}
                          onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(to right, #2563eb, #60a5fa)';
                          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                          }}
                          onClick={() => handleViewDetails(application.id)}
                        >
                          View Details
                        </button>
                        {application.status === "interview" && (
                          <button
                          type="button"
                          style={{
                            background: 'linear-gradient(to right, #10b981, #14b8a6)',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            border: 'none',
                            fontWeight: '500',
                            textAlign: 'center',
                            minWidth: '140px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(to right, #059669, #0d9488)';
                            e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(to right, #10b981, #14b8a6)';
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                          }}
                          onClick={() => window.location.href = `/dashboard/student/interviews/${application.id}`}
                          >
                          Join Interview
                          </button>
                        )}
                        </div>
                    </div>
                  </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationsPage;
