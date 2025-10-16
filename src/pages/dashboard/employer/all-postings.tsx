import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { 
  FaBuilding, 
  FaUsers, 
  FaClipboardList, 
  FaVideo, 
  FaBell,
  FaChartBar,
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaEye,
  FaTrophy,
  FaHome,
  FaArrowLeft,
  FaEdit,
  FaTrash
} from 'react-icons/fa';

// Complete job postings data including all statuses
const allJobPostings = [
  {
    id: 1,
    title: "Senior Software Developer",
    status: "approved",
    submittedDate: "2024-01-20",
    approvedDate: "2024-01-22",
    applications: 15,
    views: 128,
    description: "Looking for an experienced software developer to join our team",
    location: "Johannesburg",
    type: "Full-time",
    salary: "R450,000 - R650,000"
  },
  {
    id: 2,
    title: "Junior Web Developer",
    status: "pending",
    submittedDate: "2024-01-25",
    applications: 0,
    views: 0,
    description: "Entry-level position for recent graduates",
    location: "Cape Town",
    type: "Full-time",
    salary: "R280,000 - R350,000"
  },
  {
    id: 3,
    title: "Data Analyst Intern",
    status: "rejected",
    submittedDate: "2024-01-18",
    rejectedDate: "2024-01-19",
    rejectionReason: "Job description does not meet minimum requirements for student safety standards",
    applications: 0,
    views: 0,
    description: "Internship position for data analysis",
    location: "Durban",
    type: "Internship",
    salary: "R15,000 per month"
  },
  {
    id: 4,
    title: "Frontend Developer",
    status: "pending",
    submittedDate: "2024-01-26",
    applications: 0,
    views: 0,
    description: "React and TypeScript developer needed",
    location: "Remote",
    type: "Contract",
    salary: "R400,000 - R500,000"
  },
  {
    id: 5,
    title: "Mobile App Developer",
    status: "rejected",
    submittedDate: "2024-01-15",
    rejectedDate: "2024-01-16",
    rejectionReason: "Salary range below industry standards for the required experience level",
    applications: 0,
    views: 0,
    description: "iOS and Android developer",
    location: "Pretoria",
    type: "Full-time",
    salary: "R200,000 - R250,000"
  }
];

const AllJobPostingsPage: NextPage = () => {
  const { data: session } = useSession();
  const [filter, setFilter] = useState<"all" | "approved" | "pending" | "rejected">("all");
  const [isClient, setIsClient] = useState(false);

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
        { href: "/dashboard/employer/analytics", label: "Analytics", icon: <FaChartBar /> },
        { href: "/dashboard/employer/notifications", label: "Notifications", icon: <FaBell /> },
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <FaCheckCircle className="text-green-500" />;
      case "pending":
        return <FaClock className="text-yellow-500" />;
      case "rejected":
        return <FaExclamationTriangle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const filteredPostings = allJobPostings.filter((posting) =>
    filter === "all" ? true : posting.status === filter
  );

  const formatDate = (dateString: string) => {
    if (!isClient) {
      return new Date(dateString).toISOString().split('T')[0];
    }
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  if (!isClient) {
    return null;
  }

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: 'linear-gradient(to right, #283593, #5C6BC0)' }}>
      <Head>
        <title>All Job Postings - UFS Recruitment</title>
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
        backgroundImage: 'url("/images/skills_background(2).png")',
      }}>
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <Link 
              href="/dashboard/employer" 
              className="inline-flex items-center text-gray-200 hover:text-white mb-4 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">All Job Postings</h1>
            <p className="text-gray-200">Manage all your job postings including pending and rejected ones</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-lg font-medium text-gray-900">Total</h3>
              <span className="text-3xl font-bold text-blue-600">{allJobPostings.length}</span>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-lg font-medium text-gray-900">Approved</h3>
              <span className="text-3xl font-bold text-green-600">
                {allJobPostings.filter(p => p.status === "approved").length}
              </span>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-lg font-medium text-gray-900">Pending</h3>
              <span className="text-3xl font-bold text-yellow-600">
                {allJobPostings.filter(p => p.status === "pending").length}
              </span>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-lg font-medium text-gray-900">Rejected</h3>
              <span className="text-3xl font-bold text-red-600">
                {allJobPostings.filter(p => p.status === "rejected").length}
              </span>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-4 mb-8">
            {(["all", "approved", "pending", "rejected"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                style={{
                  background: filter === status 
                    ? 'linear-gradient(135deg, #64748b, #475569)'
                    : 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'capitalize' as const
                }}
                className={`transition-colors ${
                  filter !== status ? 'hover:bg-white/20' : ''
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Job Postings List - Updated to individual cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPostings.map((posting) => (
              <div
                key={posting.id}
                style={{
                  background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(20, 184, 166, 0.3)",
                }}
                className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Status Banner */}
                <div
                  className={`w-full h-3 ${
                    posting.status === "approved"
                      ? "bg-green-500"
                      : posting.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                />

                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 pr-4">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {posting.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-sm text-teal-100">
                        <span className="bg-teal-400/20 px-3 py-1 rounded-full border border-teal-200/30">
                          📍 {posting.location}
                        </span>
                        <span className="bg-cyan-400/20 px-3 py-1 rounded-full border border-cyan-200/30">
                          💼 {posting.type}
                        </span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm ${
                      posting.status === "approved"
                        ? "bg-green-400/20 text-green-50 border-green-200/30"
                        : posting.status === "pending"
                        ? "bg-yellow-400/20 text-yellow-50 border-yellow-200/30"
                        : "bg-red-400/20 text-red-50 border-red-200/30"
                    }`}>
                      {getStatusIcon(posting.status)}
                      <span className="font-medium capitalize text-sm">
                        {posting.status}
                      </span>
                    </div>
                  </div>

                  {/* Salary */}
                  <div className="mb-4">
                    <span className="text-teal-200 text-lg font-semibold">
                      💰 {posting.salary}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-teal-50 mb-4 text-sm line-clamp-2">{posting.description}</p>

                  {/* Dates Section */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between text-teal-100">
                      <span>Submitted:</span>
                      <span>{formatDate(posting.submittedDate)}</span>
                    </div>
                    {posting.approvedDate && (
                      <div className="flex justify-between text-green-100">
                        <span>Approved:</span>
                        <span>{formatDate(posting.approvedDate)}</span>
                      </div>
                    )}
                    {posting.rejectedDate && (
                      <div className="flex justify-between text-red-100">
                        <span>Rejected:</span>
                        <span>{formatDate(posting.rejectedDate)}</span>
                      </div>
                    )}
                  </div>

                  {/* Rejection Reason */}
                  {posting.status === "rejected" && posting.rejectionReason && (
                    <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 mb-4">
                      <div className="flex items-start gap-2">
                        <FaExclamationTriangle className="text-red-300 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-red-100 mb-1 text-sm">Rejection Reason:</h4>
                          <p className="text-red-200 text-xs leading-relaxed">{posting.rejectionReason}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Statistics for Approved Posts */}
                  {posting.status === "approved" && (
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-white/10 rounded-lg p-3 text-center border border-white/20">
                        <div className="text-xl font-bold text-white">{posting.applications}</div>
                        <div className="text-teal-100 text-xs">Applications</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 text-center border border-white/20">
                        <div className="text-xl font-bold text-white">{posting.views}</div>
                        <div className="text-teal-100 text-xs">Views</div>
                      </div>
                      <div className="bg-blue-500/20 rounded-lg p-3 text-center border border-blue-400/30">
                        <div className="text-xl font-bold text-blue-100">
                          {posting.views > 0 ? Math.round((posting.applications / posting.views) * 100) : 0}%
                        </div>
                        <div className="text-blue-200 text-xs">Conversion</div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-teal-200/20">
                    <div className="flex gap-3">
                      <button 
                        style={{
                          background: 'linear-gradient(135deg, #64748b, #475569)',
                          color: 'white',
                          padding: '10px 16px',
                          borderRadius: '10px',
                          fontSize: '14px',
                          fontWeight: '600',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          flex: '1'
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
                        <FaEye />
                        <span>View Details</span>
                      </button>
                      
                      {(posting.status === "pending" || posting.status === "rejected") && (
                        <button 
                          style={{
                            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                            color: 'white',
                            padding: '10px 16px',
                            borderRadius: '10px',
                            fontSize: '14px',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            flex: '1'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb, #1d4ed8)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                          }}
                        >
                          <FaEdit />
                          <span>Edit & Resubmit</span>
                        </button>
                      )}
                    </div>

                    {posting.status === "approved" && (
                      <Link href="/dashboard/employer/applications" className="w-full">
                        <button
                          style={{
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: 'white',
                            padding: '12px 20px',
                            borderRadius: '10px',
                            fontSize: '14px',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #059669, #047857)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                          }}
                        >
                          📄 View Applications ({posting.applications})
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPostings.length === 0 && (
            <div className="text-center py-12">
              <FaFileAlt className="mx-auto text-6xl text-white/40 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No job postings found</h3>
              <p className="text-gray-200 mb-6">
                {filter === "all" 
                  ? "You haven't created any job postings yet." 
                  : `No ${filter} job postings found.`}
              </p>
              <Link href="/dashboard/employer/job-posting">
                <button
                  style={{
                    background: 'linear-gradient(135deg, #64748b, #475569)',
                    color: 'white',
                    padding: '14px 28px',
                    borderRadius: '14px',
                    fontSize: '16px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease'
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
                  Create Your First Job Posting
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllJobPostingsPage;
