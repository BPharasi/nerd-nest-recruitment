import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglass,
  FaBuilding,
  FaSearch,
  FaClipboardList,
  FaVideo,
  FaTrophy,
  FaBell,
  FaChartBar,
  FaHome,
} from "react-icons/fa";
import { jobs } from "@/data/mockData";

const mockJobPostings = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechNova Solutions",
    postedDate: "2024-01-15",
    status: "pending",
    approved: false,
    reason: "",
  },
  {
    id: "2",
    title: "Data Analyst",
    company: "InfoFlow Analytics",
    postedDate: "2024-01-10",
    status: "approved",
    approved: true,
    reason: "",
  },
  {
    id: "3",
    title: "Cloud Engineer",
    company: "CloudSolutions",
    postedDate: "2024-01-05",
    status: "rejected",
    approved: false,
    reason: "Insufficient job description",
  },
];

const navigationGroups = [
  {
    title: "Admin",
    items: [
      { href: "/dashboard/admin", label: "Dashboard Home", icon: <FaHome /> },
      { href: "/dashboard/admin/user-management", label: "User Management", icon: <FaClipboardList /> },
      { href: "/dashboard/admin/employer-verification", label: "Employer Verification", icon: <FaBuilding /> },
      { href: "/dashboard/admin/academic-data", label: "Academic Data", icon: <FaFileAlt /> },
      { href: "/dashboard/admin/skill-moderation", label: "Skill Moderation", icon: <FaTrophy /> },
      { href: "/dashboard/admin/job-approval", label: "Job Approval", icon: <FaFileAlt /> },
      { href: "/dashboard/admin/interview-oversight", label: "Interview Oversight", icon: <FaVideo /> },
      { href: "/dashboard/admin/analytics", label: "Analytics", icon: <FaChartBar /> },
      { href: "/dashboard/admin/announcements", label: "Announcements", icon: <FaBell /> },
      { href: "/dashboard/admin/helpdesk", label: "Helpdesk", icon: <FaClipboardList /> },
      { href: "/dashboard/admin/data-governance", label: "Data Governance", icon: <FaCheckCircle /> },
    ],
  },
];

const statusStyles = {
  approved: {
    label: "Approved",
    className: "bg-green-500 text-white",
    icon: <FaCheckCircle />,
  },
  pending: {
    label: "Pending",
    className: "bg-gray-400 text-white",
    icon: <FaHourglass />,
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-500 text-white",
    icon: <FaTimesCircle />,
  },
};

const JobApprovalPage: NextPage = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [jobPostings, setJobPostings] = useState(mockJobPostings);
  const [modal, setModal] = useState<{
    open: boolean;
    type: "approve" | "reject" | "revoke" | null;
    jobId: string | null;
  }>({
    open: false,
    type: null,
    jobId: null,
  });
  const [reason, setReason] = useState("");

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())
  );

  // Approve job posting
  const handleApprove = (jobId: string) => {
    setJobPostings((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? { ...job, status: "approved", approved: true, reason: "" }
          : job
      )
    );
    setModal({ open: false, type: null, jobId: null });
    setReason("");
    // In real app, POST to /api/admin/job-postings
  };

  // Reject job posting
  const handleReject = (jobId: string, reason: string) => {
    setJobPostings((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? { ...job, status: "rejected", approved: false, reason }
          : job
      )
    );
    setModal({ open: false, type: null, jobId: null });
    setReason("");
    // In real app, POST to /api/admin/job-postings
  };

  // Revoke approval
  const handleRevoke = (jobId: string, reason: string) => {
    setJobPostings((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? { ...job, status: "pending", approved: false, reason }
          : job
      )
    );
    setModal({ open: false, type: null, jobId: null });
    setReason("");
    // In real app, POST to /api/admin/job-postings
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
        <title>Job Approval - Admin | UFS Recruitment</title>
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
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Job Approval</h1>
          <div
            className="bg-white rounded-xl shadow-lg p-8"
            style={{
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(20, 184, 166, 0.3)",
            }}
          >
            <table
              className="min-w-full text-left border border-gray-300"
              style={{ borderCollapse: "collapse" }}
            >
              <thead>
                <tr className="text-gray-700 font-semibold text-base">
                  <th className="py-3 px-4 border border-gray-400">Title</th>
                  <th className="py-3 px-4 border border-gray-400">Company</th>
                  <th className="py-3 px-4 border border-gray-400">Posted Date</th>
                  <th className="py-3 px-4 border border-gray-400">Status</th>
                  <th className="py-3 px-4 border border-gray-400">Reason</th>
                  <th className="py-3 px-4 border border-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobPostings.map((job) => (
                  <tr key={job.id} style={{ borderBottom: "1px solid #cbd5e1" }}>
                    <td className="py-3 px-4 border border-gray-400">{job.title}</td>
                    <td className="py-3 px-4 border border-gray-400">{job.company}</td>
                    <td className="py-3 px-4 border border-gray-400">{job.postedDate}</td>
                    <td className="py-3 px-4 border border-gray-400">
                      <span
                        className={`px-4 py-1 rounded-full text-xs font-semibold ${
                          job.status === "approved"
                            ? "bg-green-200 text-green-800"
                            : job.status === "pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 border border-gray-400">{job.reason}</td>
                    <td className="py-3 px-4 border border-gray-400">
                      <div className="flex flex-row gap-4">
                        {job.status === "pending" && (
                          <>
                            <button
                              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-700 text-white px-5 py-2 rounded-2xl font-semibold shadow hover:from-teal-600 hover:to-teal-700 hover:text-white transition border-2 border-gray-600"
                              style={{
                                letterSpacing: "0.5px",
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
                              onClick={() => setModal({ open: true, type: "approve", jobId: job.id })}
                            >
                              Approve
                            </button>
                            <button
                              className="flex-1 text-white px-5 py-2 rounded-2xl font-semibold shadow transition border-2 border-red-600"
                              style={{
                              background: 'linear-gradient(to right, rgba(220,38,38,0.7), rgba(239,68,68,0.7))', // Lighter, semi-transparent red
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
                              onClick={() => setModal({ open: true, type: "reject", jobId: job.id })}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {job.status === "approved" && (
                          <button
                            className="w-full bg-gradient-to-r from-gray-500 to-gray-700 text-white px-5 py-2 rounded-2xl font-semibold shadow hover:from-yellow-600 hover:to-yellow-700 hover:text-white transition border-2 border-gray-600"
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
                            onClick={() => setModal({ open: true, type: "revoke", jobId: job.id })}
                          >
                            Revoke Approval
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal for Approve/Reject/Revoke */}
        {modal.open && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md">
              {modal.type === "approve" && (
                <>
                  <h2 className="text-xl font-bold mb-4">Approve Job Posting</h2>
                  <p className="mb-6 text-gray-700">Are you sure you want to approve this job posting?</p>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setModal({ open: false, type: null, jobId: null })}
                      className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleApprove(modal.jobId!)}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                  </div>
                </>
              )}
              {(modal.type === "reject" || modal.type === "revoke") && (
                <>
                  <h2 className="text-xl font-bold mb-4">
                    {modal.type === "reject" ? "Reject Job Posting" : "Revoke Approval"}
                  </h2>
                  <label className="block text-gray-700 font-medium mb-2">Reason (required)</label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Provide a reason for this action"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setModal({ open: false, type: null, jobId: null })}
                      className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() =>
                        modal.type === "reject"
                          ? handleReject(modal.jobId!, reason)
                          : handleRevoke(modal.jobId!, reason)
                      }
                      className={`px-4 py-1 rounded text-white ${
                        modal.type === "reject"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-yellow-600 hover:bg-yellow-700"
                      }`}
                      disabled={!reason.trim()}
                    >
                      {modal.type === "reject" ? "Reject" : "Revoke"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobApprovalPage;
