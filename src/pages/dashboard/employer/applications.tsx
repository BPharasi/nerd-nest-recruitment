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
  FaHome,
  FaTrophy,
  FaEye,
  FaDownload,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaStar,
  FaAward,
  FaGraduationCap,
  FaBriefcase,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFilter,
  FaSort,
} from "react-icons/fa";

interface Badge {
  id: string;
  name: string;
  icon: string;
  level: string;
  earnedDate: string;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "certification" | "award" | "project" | "competition";
}

interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  appliedDate: string;
  status:
    | "pending"
    | "reviewed"
    | "interview_scheduled"
    | "offer_made"
    | "rejected"
    | "hired";
  cvUrl: string;
  coverLetterUrl?: string;
  portfolioLinks: {
    github?: string;
    linkedin?: string;
    personal?: string;
  };
  badges: Badge[];
  achievements: Achievement[];
  education: {
    institution: string;
    degree: string;
    year: string;
    gpa?: string;
  }[];
  experience: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  skills: string[];
  interviewDate?: string;
  notes?: string;
  rating?: number;
}

interface JobPosting {
  id: string;
  title: string;
  status: "active" | "closed" | "filled";
  applicants: Applicant[];
  postedDate: string;
}

interface AcademicTranscriptRequest {
  applicantId: string;
  status: "none" | "pending" | "approved" | "rejected";
  transcriptUrl?: string;
}

// Mock data
const mockJobPostings: JobPosting[] = [
  {
    id: "1",
    title: "Senior Software Developer",
    status: "active",
    postedDate: "2024-01-15",
    applicants: [
      {
        id: "1",
        name: "John Smith",
        email: "john.smith@student.ufs.ac.za",
        phone: "+27 12 345 6789",
        location: "Johannesburg",
        appliedDate: "2024-01-20",
        status: "pending",
        cvUrl: "/documents/john-smith-cv.pdf",
        coverLetterUrl: "/documents/john-smith-cover.pdf",
        portfolioLinks: {
          github: "https://github.com/johnsmith",
          linkedin: "https://linkedin.com/in/johnsmith",
        },
        badges: [
          {
            id: "1",
            name: "React Master",
            icon: "⚛️",
            level: "Advanced",
            earnedDate: "2024-01-15",
            color: "bg-blue-500",
          },
          {
            id: "2",
            name: "JavaScript Expert",
            icon: "🟨",
            level: "Advanced",
            earnedDate: "2024-01-10",
            color: "bg-yellow-500",
          },
        ],
        achievements: [
          {
            id: "1",
            title: "Hackathon Winner",
            description: "First place in UFS Coding Challenge 2023",
            date: "2023-11-15",
            type: "competition",
          },
          {
            id: "2",
            title: "AWS Certified Developer",
            description: "AWS Certified Developer - Associate",
            date: "2023-10-20",
            type: "certification",
          },
        ],
        education: [
          {
            institution: "University of the Free State",
            degree: "BSc Computer Science",
            year: "2024",
            gpa: "3.8",
          },
        ],
        experience: [
          {
            company: "TechStart Internship",
            role: "Junior Developer",
            duration: "6 months",
            description: "Developed web applications using React and Node.js",
          },
        ],
        skills: ["React", "JavaScript", "Node.js", "Python", "SQL", "Git"],
        rating: 4,
      },
      {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah.johnson@student.ufs.ac.za",
        phone: "+27 11 987 6543",
        location: "Cape Town",
        appliedDate: "2024-01-22",
        status: "interview_scheduled",
        interviewDate: "2024-02-01 10:00",
        cvUrl: "/documents/sarah-johnson-cv.pdf",
        portfolioLinks: {
          github: "https://github.com/sarahjohnson",
          personal: "https://sarahjohnson.dev",
        },
        badges: [
          {
            id: "3",
            name: "Python Master",
            icon: "🐍",
            level: "Advanced",
            earnedDate: "2024-01-12",
            color: "bg-green-500",
          },
        ],
        achievements: [
          {
            id: "3",
            title: "Dean's List",
            description: "Academic excellence for 3 consecutive semesters",
            date: "2023-12-01",
            type: "award",
          },
        ],
        education: [
          {
            institution: "University of the Free State",
            degree: "BSc Information Technology",
            year: "2024",
            gpa: "3.9",
          },
        ],
        experience: [],
        skills: ["Python", "Django", "PostgreSQL", "Docker", "AWS"],
        rating: 5,
      },
    ],
  },
];

const mockTranscriptRequests: AcademicTranscriptRequest[] = [
  { applicantId: "1", status: "approved", transcriptUrl: "/transcripts/john-smith-transcript.txt" },
  { applicantId: "2", status: "pending" }
];

const EmployerApplicationsPage: NextPage = () => {
  const { data: session } = useSession();
  const [selectedJob, setSelectedJob] = useState<JobPosting>(mockJobPostings[0]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "rating" | "name">("date");
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewDateTime, setInterviewDateTime] = useState("");
  const [transcriptRequests, setTranscriptRequests] = useState<AcademicTranscriptRequest[]>(mockTranscriptRequests);

  const navigationGroups = [
    {
      title: "Company",
      items: [
        {
          href: "/dashboard/employer/company-profile",
          label: "Company Profile",
          icon: <FaBuilding />,
        },
        { href: "/dashboard/employer/job-posting", label: "Post Jobs", icon: <FaFileAlt /> },
      ],
    },
    {
      title: "Recruitment",
      items: [
        { href: "/dashboard/employer/skills-challenges", label: "Skills Challenges", icon: <FaTrophy /> },
        { href: "/dashboard/employer/applications", label: "Applications", icon: <FaClipboardList /> },
        { href: "/dashboard/employer/interview-management", label: "Interviews", icon: <FaVideo /> },
      ],
    },
    {
      title: "Analytics",
      items: [
        { href: "/dashboard/employer/notifications", label: "Notifications", icon: <FaBell /> },
      ],
    },
  ];

  const handleStatusUpdate = async (applicantId: string, newStatus: Applicant["status"]) => {
    // Update applicant status
    setSelectedJob((prev) => ({
      ...prev,
      applicants: prev.applicants.map((app) => (app.id === applicantId ? { ...app, status: newStatus } : app)),
    }));

    // API call would go here
    try {
      await fetch("/api/employer/applications/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicantId, status: newStatus }),
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleScheduleInterview = async (applicantId: string) => {
    if (!interviewDateTime) return;

    await handleStatusUpdate(applicantId, "interview_scheduled");

    // Update interview date
    setSelectedJob((prev) => ({
      ...prev,
      applicants: prev.applicants.map((app) => (app.id === applicantId ? { ...app, interviewDate: interviewDateTime } : app)),
    }));

    setShowInterviewModal(false);
    setInterviewDateTime("");
  };

  const handleCloseJobPosting = async () => {
    setSelectedJob((prev) => ({ ...prev, status: "filled" }));

    try {
      await fetch("/api/employer/jobs/close", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: selectedJob.id }),
      });
    } catch (error) {
      console.error("Failed to close job posting:", error);
    }
  };

  const handleRequestTranscript = async (applicantId: string) => {
    setTranscriptRequests((prev) => {
      // If already requested, do nothing
      if (prev.some(r => r.applicantId === applicantId && r.status !== "none")) return prev;
      return [...prev, { applicantId, status: "pending" }];
    });
    // In real app, POST to /api/employer/academic-requests
    // await fetch("/api/employer/academic-requests", { method: "POST", body: JSON.stringify({ applicantId }) });
    alert("Transcript request sent to admin for approval.");
  };

  // Get transcript request status for an applicant
  const getTranscriptRequest = (applicantId: string) =>
    transcriptRequests.find(r => r.applicantId === applicantId) || { status: "none" };

  const filteredApplicants = selectedJob.applicants
    .filter((app) => filterStatus === "all" || app.status === filterStatus)
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "name":
          return a.name.localeCompare(b.name);
        case "date":
        default:
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
      }
    });

  const getStatusColor = (status: Applicant["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "reviewed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "interview_scheduled":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "offer_made":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "hired":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}/${month}/${day}`;
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
        <title>Applications Management - UFS Recruitment</title>
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
      <main
        style={{
          position: "absolute",
          top: "75px",
          right: 0,
          bottom: 0,
          left: "256px",
          overflowY: "auto",
          padding: "2rem",
          backgroundImage: 'url("/images/skills_background(2).png")',
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
        {/* Teal blurred card background */}
        <div
          style={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            right: '2rem',
            bottom: '2rem',
            zIndex: 1,
            background: "linear-gradient(135deg, rgba(20,184,166,0.6), rgba(6,182,212,0.6))",
            borderRadius: "1.5rem",
            boxShadow: "0 8px 32px rgba(20,184,166,0.10)",
            backdropFilter: "blur(12px)",
            pointerEvents: 'none'
          }}
        />
        <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 2 }}>
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Applications Management</h1>
            <p className="text-gray-200">Review and manage job applications</p>
          </div>

          {/* Job Selection and Stats */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6 bg-white rounded-xl shadow-lg p-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                <p className="text-gray-600">Posted: {formatDate(selectedJob.postedDate)}</p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-4 py-2 rounded-full font-medium ${
                    selectedJob.status === "active"
                      ? "bg-green-100 text-green-700"
                      : selectedJob.status === "filled"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {selectedJob.status.charAt(0).toUpperCase() + selectedJob.status.slice(1)}
                </span>
                {selectedJob.status === "active" && (
                  <button
                    onClick={handleCloseJobPosting}
                    style={{
                      background: "linear-gradient(135deg, #64748b, #475569)",
                      color: "white",
                      padding: "12px 24px",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontWeight: "600",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Close Position
                  </button>
                )}
              </div>
            </div>

            {/* Statistics - each stat in its own card */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                <div className="text-2xl font-bold text-blue-600">{selectedJob.applicants.length}</div>
                <div className="text-sm text-gray-600 mt-2">Total Applications</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {selectedJob.applicants.filter((a) => a.status === "pending").length}
                </div>
                <div className="text-sm text-gray-600 mt-2">Pending Review</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                <div className="text-2xl font-bold text-purple-600">
                  {selectedJob.applicants.filter((a) => a.status === "interview_scheduled").length}
                </div>
                <div className="text-sm text-gray-600 mt-2">Interviews</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                <div className="text-2xl font-bold text-green-600">
                  {selectedJob.applicants.filter((a) => a.status === "hired").length}
                </div>
                <div className="text-sm text-gray-600 mt-2">Hired</div>
              </div>
            </div>
          </div>

          {/* Filters and Sorting */}
          <div className="mb-6 bg-white rounded-xl shadow-lg p-4">
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="interview_scheduled">Interview Scheduled</option>
                  <option value="offer_made">Offer Made</option>
                  <option value="rejected">Rejected</option>
                  <option value="hired">Hired</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <FaSort className="text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="date">Sort by Date</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* Applications Grid - Updated to individual cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredApplicants.map((applicant) => {
              const transcriptReq = getTranscriptRequest(applicant.id);
              return (
                <div
                  key={applicant.id}
                  style={{
                    background: "linear-gradient(135deg, rgba(20, 184, 166, 0.6), rgba(6, 182, 212, 0.6))",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(20, 184, 166, 0.3)",
                  }}
                  className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Status Banner */}
                  <div
                    className={`w-full h-3 ${
                      applicant.status === "pending"
                        ? "bg-yellow-500"
                        : applicant.status === "reviewed"
                        ? "bg-blue-500"
                        : applicant.status === "interview_scheduled"
                        ? "bg-purple-500"
                        : applicant.status === "offer_made"
                        ? "bg-green-500"
                        : applicant.status === "rejected"
                        ? "bg-red-500"
                        : "bg-emerald-500"
                    }`}
                  />

                  <div className="p-6">
                    {/* Applicant Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{applicant.name}</h3>
                        <p className="text-teal-100 text-sm mb-2">{applicant.email}</p>
                        <div className="flex items-center gap-2 text-teal-200 text-sm">
                          <FaMapMarkerAlt />
                          <span>{applicant.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
                            applicant.status === "pending"
                              ? "bg-yellow-400/20 text-yellow-50 border-yellow-200/30"
                              : applicant.status === "reviewed"
                              ? "bg-blue-400/20 text-blue-50 border-blue-200/30"
                              : applicant.status === "interview_scheduled"
                              ? "bg-purple-400/20 text-purple-50 border-purple-200/30"
                              : applicant.status === "offer_made"
                              ? "bg-green-400/20 text-green-50 border-green-200/30"
                              : applicant.status === "rejected"
                              ? "bg-red-400/20 text-red-50 border-red-200/30"
                              : "bg-emerald-400/20 text-emerald-50 border-emerald-200/30"
                          }`}
                        >
                          {applicant.status.replace("_", " ").toUpperCase()}
                        </span>
                        {applicant.rating && (
                          <div className="flex items-center mt-2 justify-end">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`text-sm ${i < applicant.rating! ? "text-yellow-400" : "text-gray-400"}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Application Info */}
                    <div className="mb-4 text-sm text-teal-100">
                      <div className="flex justify-between items-center">
                        <span>Applied: {formatDate(applicant.appliedDate)}</span>
                      </div>
                      {applicant.interviewDate && (
                        <div className="mt-2 text-purple-200 font-medium">
                          Interview: {formatDate(applicant.interviewDate)}
                        </div>
                      )}
                    </div>

                    {/* Badges Preview */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-teal-100 mb-2">
                        Badges ({applicant.badges.length})
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {applicant.badges.slice(0, 2).map((badge) => (
                          <span
                            key={badge.id}
                            className={`${badge.color} text-white text-xs px-2 py-1 rounded-full flex items-center gap-1`}
                          >
                            <span>{badge.icon}</span>
                            <span>{badge.name}</span>
                          </span>
                        ))}
                        {applicant.badges.length > 2 && (
                          <span className="bg-white/20 text-teal-100 text-xs px-2 py-1 rounded-full border border-white/30">
                            +{applicant.badges.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Skills Preview */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-teal-100 mb-2">
                        Skills ({applicant.skills.length})
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {applicant.skills.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="bg-cyan-400/20 text-cyan-50 text-xs px-2 py-1 rounded-full border border-cyan-200/30"
                          >
                            {skill}
                          </span>
                        ))}
                        {applicant.skills.length > 3 && (
                          <span className="bg-white/20 text-teal-100 text-xs px-2 py-1 rounded-full border border-white/30">
                            +{applicant.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Education */}
                    {applicant.education.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-teal-100 mb-1">Education</h4>
                        <div className="text-xs text-teal-200">
                          <div>{applicant.education[0].degree}</div>
                          <div>{applicant.education[0].institution}</div>
                          {applicant.education[0].gpa && (
                            <div>GPA: {applicant.education[0].gpa}</div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Academic Transcript Section */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-teal-100 mb-2">
                        Academic Transcript
                      </h4>
                      {transcriptReq.status === "none" && (
                        <button
                          onClick={() => handleRequestTranscript(applicant.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium"
                        >
                          Request Transcript
                        </button>
                      )}
                      {transcriptReq.status === "pending" && (
                        <span className="bg-yellow-400/20 text-yellow-700 px-4 py-1 rounded-full text-xs font-semibold">
                          Pending Admin Approval
                        </span>
                      )}
                      {transcriptReq.status === "approved" && transcriptReq.transcriptUrl && (
                        <a
                          href={transcriptReq.transcriptUrl}
                          download
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm font-medium"
                        >
                          Download Transcript
                        </a>
                      )}
                      {transcriptReq.status === "rejected" && (
                        <span className="bg-red-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                          Request Rejected
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-4 border-t border-teal-200/20">
                      <div className="flex gap-2">
                        <button
                          onClick={() => window.open(applicant.cvUrl, "_blank")}
                          style={{
                            background: "linear-gradient(135deg, #64748b, #475569)",
                            color: "white",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: "600",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            flex: "1",
                          }}
                        >
                          <FaDownload />
                          CV
                        </button>
                        <button
                          onClick={() => setSelectedApplicant(applicant)}
                          style={{
                            background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                            color: "white",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: "600",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            flex: "2",
                          }}
                        >
                          <FaEye />
                          View Details
                        </button>
                        {/* Email button */}
                        <button
                          onClick={() => window.location.href = `mailto:${applicant.email}`}
                          style={{
                            background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                            color: "white",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: "600",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            flex: "1",
                          }}
                        >
                          <FaEnvelope />
                          Email
                        </button>
                        {/* Transcript request button */}
                        <button
                          onClick={() => handleRequestTranscript(applicant.id)}
                          style={{
                            background: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
                            color: "white",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: "600",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            flex: "1",
                          }}
                          disabled={getTranscriptRequest(applicant.id).status !== "none"}
                        >
                          <FaFileAlt />
                          Request Transcript
                        </button>
                      </div>

                      {applicant.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedApplicant(applicant);
                              setShowInterviewModal(true);
                            }}
                            style={{
                              background: "linear-gradient(135deg, #10b981, #059669)",
                              color: "white",
                              padding: "10px 16px",
                              borderRadius: "10px",
                              fontSize: "12px",
                              fontWeight: "600",
                              border: "none",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              flex: "1",
                            }}
                          >
                            <FaVideo />
                            Interview
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(applicant.id, "rejected")}
                            style={{
                              background: "linear-gradient(135deg, #ef4444, #dc2626)",
                              color: "white",
                              padding: "10px 16px",
                              borderRadius: "10px",
                              fontSize: "12px",
                              fontWeight: "600",
                              border: "none",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              flex: "1",
                            }}
                          >
                            <FaTimesCircle />
                            Reject
                          </button>
                        </div>
                      )}

                      {applicant.status === "reviewed" && (
                        <button
                          onClick={() => {
                            setSelectedApplicant(applicant);
                            setShowInterviewModal(true);
                          }}
                          style={{
                            background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                            color: "white",
                            padding: "12px 20px",
                            borderRadius: "10px",
                            fontSize: "14px",
                            fontWeight: "600",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            width: "100%",
                          }}
                        >
                          <FaCalendarAlt />
                          Schedule Interview
                        </button>
                      )}

                      {applicant.status === "interview_scheduled" && (
                        <button
                          onClick={() => handleStatusUpdate(applicant.id, "offer_made")}
                          style={{
                            background: "linear-gradient(135deg, #10b981, #059669)",
                            color: "white",
                            padding: "12px 20px",
                            borderRadius: "10px",
                            fontSize: "14px",
                            fontWeight: "600",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            width: "100%",
                          }}
                        >
                          <FaCheckCircle />
                          Make Offer
                        </button>
                      )}

                      {applicant.status === "offer_made" && (
                        <button
                          onClick={() => {
                            handleStatusUpdate(applicant.id, "hired");
                            handleCloseJobPosting();
                          }}
                          style={{
                            background: "linear-gradient(135deg, #059669, #047857)",
                            color: "white",
                            padding: "12px 20px",
                            borderRadius: "10px",
                            fontSize: "14px",
                            fontWeight: "600",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            width: "100%",
                          }}
                        >
                          <FaAward />
                          Mark as Hired
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Applicant Details Modal - Show when selectedApplicant is set */}
          {selectedApplicant && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div
                className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4 flex items-center justify-center"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "60vh",
                }}
              >
                {/* Details Card */}
                <div
                  style={{
                    background: "linear-gradient(135deg, rgba(167, 123, 202, 0.6), rgba(124, 58, 237, 0.6))",
                    border: "1px solid rgba(124, 58, 237, 0.15)",
                    borderRadius: "1rem",
                    boxShadow: "0 4px 16px rgba(124,58,237,0.08)",
                    width: "100%",
                    maxWidth: "700px",
                    margin: "2rem auto",
                    padding: "2rem",
                    position: "relative"
                  }}
                  className="flex flex-col"
                >
                  <button
                    onClick={() => setSelectedApplicant(null)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                  >
                    ×
                  </button>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Applicant Details</h2>
                  </div>
                  {/* Detailed Applicant Information */}
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b pb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedApplicant.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <FaEnvelope />
                          <span>{selectedApplicant.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaPhone />
                          <span>{selectedApplicant.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt />
                          <span>{selectedApplicant.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <FaAward /> Badges ({selectedApplicant.badges.length})
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedApplicant.badges.map((badge) => (
                          <div key={badge.id} className={`${badge.color} text-white p-4 rounded-lg text-center`}>
                            <div className="text-2xl mb-1">{badge.icon}</div>
                            <div className="font-medium">{badge.name}</div>
                            <div className="text-xs opacity-80">{badge.level}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <FaTrophy /> Achievements ({selectedApplicant.achievements.length})
                      </h4>
                      <div className="grid gap-3">
                        {selectedApplicant.achievements.map((achievement) => (
                          <div key={achievement.id} className="border-l-4 border-blue-500 pl-4 bg-gray-50 p-3 rounded">
                            <h5 className="font-medium text-gray-900">{achievement.title}</h5>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                            <p className="text-xs text-gray-500">{formatDate(achievement.date)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education & Skills */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <FaGraduationCap /> Education
                        </h4>
                        <div className="space-y-3">
                          {selectedApplicant.education.map((edu, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg">
                              <h5 className="font-medium text-gray-900">{edu.degree}</h5>
                              <p className="text-sm text-gray-600">{edu.institution}</p>
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>{edu.year}</span>
                                {edu.gpa && <span>GPA: {edu.gpa}</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedApplicant.skills.map((skill, index) => (
                            <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interview Scheduling Modal */}
          {showInterviewModal && selectedApplicant && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Schedule Interview</h3>
                <p className="text-gray-600 mb-4">Scheduling interview for {selectedApplicant.name}</p>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interview Date & Time</label>
                  <input
                    type="datetime-local"
                    value={interviewDateTime}
                    onChange={(e) => setInterviewDateTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleScheduleInterview(selectedApplicant.id)}
                    className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    disabled={!interviewDateTime}
                  >
                    Schedule
                  </button>
                  <button
                    onClick={() => {
                      setShowInterviewModal(false);
                      setInterviewDateTime("");
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmployerApplicationsPage;
