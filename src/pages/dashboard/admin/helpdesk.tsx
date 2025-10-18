import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  FaHome,
  FaClipboardList,
  FaBuilding,
  FaFileAlt,
  FaTrophy,
  FaVideo,
  FaChartBar,
  FaBell,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChevronDown,
  FaChevronUp,
  FaArrowUp,
  FaArrowRight,
} from "react-icons/fa";

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

// Mock helpdesk tickets - Updated with 15 tickets using users from mockdata
const mockTickets = [
  {
    id: "TCK-001",
    user: "thabo.mokoena@student.ufs.ac.za",
    role: "Student",
    subject: "Cannot log in",
    description: "I am unable to log in with my credentials. It says 'invalid password' even though I reset it.",
    status: "open",
    createdAt: "2024-02-10 09:15",
    escalated: false,
    resolution: "",
  },
  {
    id: "TCK-002",
    user: "thabo.mthembu@technova.co.za",
    role: "Employer",
    subject: "Job posting feature not working",
    description: "When I try to post a new job, the form does not submit and shows an error.",
    status: "open",
    createdAt: "2024-02-10 10:30",
    escalated: false,
    resolution: "",
  },
  {
    id: "TCK-003",
    user: "lerato.ndlovu@student.ufs.ac.za",
    role: "Student",
    subject: "Incorrect information shown",
    description: "My profile shows the wrong graduation year.",
    status: "resolved",
    createdAt: "2024-02-09 14:20",
    escalated: false,
    resolution: "Profile data corrected.",
  },
  {
    id: "TCK-004",
    user: "aisha.patel@globalnet.co.za",
    role: "Employer",
    subject: "Feature request: Dark mode",
    description: "It would be great to have a dark mode for the dashboard.",
    status: "escalated",
    createdAt: "2024-02-08 11:00",
    escalated: true,
    resolution: "Escalated to IT for review.",
  },
  {
    id: "TCK-005",
    user: "sipho.mabaso@student.ufs.ac.za",
    role: "Student",
    subject: "Application submission failed",
    description: "When submitting my job application, it keeps showing 'network error'.",
    status: "open",
    createdAt: "2024-02-11 08:45",
    escalated: false,
    resolution: "",
  },
  {
    id: "TCK-006",
    user: "zanele.khumalo@student.ufs.ac.za",
    role: "Student",
    subject: "Interview invitation not received",
    description: "I applied for a position but haven't received any interview invitation email.",
    status: "open",
    createdAt: "2024-02-11 12:30",
    escalated: false,
    resolution: "",
  },
  {
    id: "TCK-007",
    user: "sipho.nkosi@infoflow.co.za",
    role: "Employer",
    subject: "Candidate profiles not loading",
    description: "When viewing candidate profiles, the page doesn't load properly.",
    status: "open",
    createdAt: "2024-02-12 09:00",
    escalated: false,
    resolution: "",
  },
  {
    id: "TCK-008",
    user: "jabu.sithole@student.ufs.ac.za",
    role: "Student",
    subject: "Password reset not working",
    description: "I requested a password reset but the email never arrived.",
    status: "resolved",
    createdAt: "2024-02-07 16:20",
    escalated: false,
    resolution: "Email sent successfully after verification.",
  },
  {
    id: "TCK-009",
    user: "lerato.jansen@pixelcraft.co.za",
    role: "Employer",
    subject: "Analytics dashboard blank",
    description: "The analytics section shows no data, just a blank page.",
    status: "escalated",
    createdAt: "2024-02-13 10:15",
    escalated: true,
    resolution: "Escalated to IT for data loading issue.",
  },
  {
    id: "TCK-010",
    user: "nadia.vanwyk@student.ufs.ac.za",
    role: "Student",
    subject: "Skills challenge not saving progress",
    description: "When I complete a skills challenge, my progress isn't being saved.",
    status: "open",
    createdAt: "2024-02-14 11:45",
    escalated: false,
    resolution: "",
  },
  {
    id: "TCK-011",
    user: "zanele.botha@connectix.co.za",
    role: "Employer",
    subject: "Interview scheduling conflict",
    description: "The system allowed double-booking of interview slots.",
    status: "open",
    createdAt: "2024-02-15 14:00",
    escalated: false,
    resolution: "",
  },
  {
    id: "TCK-012",
    user: "kwame.zulu@student.ufs.ac.za",
    role: "Student",
    subject: "Resume builder not exporting",
    description: "When trying to export my resume as PDF, it fails with an error.",
    status: "resolved",
    createdAt: "2024-02-06 13:30",
    escalated: false,
    resolution: "PDF export fixed after server update.",
  },
  {
    id: "TCK-013",
    user: "fatima.petersen@student.ufs.ac.za",
    role: "Student",
    subject: "Notifications not appearing",
    description: "I'm not receiving any notifications for new job postings.",
    status: "open",
    createdAt: "2024-02-16 15:20",
    escalated: false,
    resolution: "",
  },
  {
    id: "TCK-014",
    user: "kwame.dlamini@bughunt.co.za",
    role: "Employer",
    subject: "User management access denied",
    description: "As an employer, I can't access the user management section.",
    status: "escalated",
    createdAt: "2024-02-17 09:45",
    escalated: true,
    resolution: "Escalated to IT for permissions issue.",
  },
  {
    id: "TCK-015",
    user: "thando.botha@student.ufs.ac.za",
    role: "Student",
    subject: "Interview room not connecting",
    description: "When joining an interview, the video doesn't connect properly.",
    status: "open",
    createdAt: "2024-02-18 10:30",
    escalated: false,
    resolution: "",
  },
];

const AdminHelpdeskPage: NextPage = () => {
  const { data: session } = useSession();
  // Initialize tickets directly with mockTickets
  const [tickets, setTickets] = useState<any[]>(mockTickets);

  // Load user tickets from localStorage on client side
  useEffect(() => {
    const storedTickets = localStorage.getItem('userTickets');
    const userTickets = storedTickets ? JSON.parse(storedTickets) : [];
    setTickets(prev => [...prev, ...userTickets]);
  }, []);

  const [expanded, setExpanded] = useState<string | null>(null);
  const [modal, setModal] = useState<{
    open: boolean;
    ticketId: string | null;
    action: "resolve" | "escalate" | null;
  }>({ open: false, ticketId: null, action: null });
  const [resolution, setResolution] = useState("");

  // Defensive: always use an array for mapping
  const safeTickets = Array.isArray(tickets) ? tickets : [];

  const handleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleResolve = (id: string, resolution: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: "resolved", resolution, escalated: false }
          : t
      )
    );
    setModal({ open: false, ticketId: null, action: null });
    setResolution("");
    // In real app, POST to /api/admin/helpdesk
  };

  const handleEscalate = (id: string, resolution: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: "escalated", resolution, escalated: true }
          : t
      )
    );
    setModal({ open: false, ticketId: null, action: null });
    setResolution("");
    // In real app, POST to /api/admin/helpdesk
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
        <title>Helpdesk - Admin | UFS Recruitment</title>
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
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Helpdesk Tickets</h1>
          <div className="bg-white rounded-xl shadow-lg p-8"
            style={{
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(20, 184, 166, 0.3)",
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-gray-300" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr className="text-gray-700 font-semibold text-base">
                    <th className="py-4 px-6 border border-gray-400">Ticket ID</th>
                    <th className="py-4 px-6 border border-gray-400">User</th>
                    <th className="py-4 px-6 border border-gray-400">Role</th>
                    <th className="py-4 px-6 border border-gray-400">Subject</th>
                    <th className="py-4 px-6 border border-gray-400">Status</th>
                    <th className="py-4 px-6 border border-gray-400">Created</th>
                    <th className="py-4 px-6 border border-gray-400"></th>
                  </tr>
                </thead>
                <tbody>
                  {safeTickets.map((ticket) => (
                    <tr key={ticket.id} style={{ borderBottom: "1px solid #cbd5e1" }}>
                      <td className="py-4 px-6 border border-gray-400">{ticket.id}</td>
                      <td className="py-4 px-6 border border-gray-400">{ticket.user}</td>
                      <td className="py-4 px-6 border border-gray-400">{ticket.role}</td>
                      <td className="py-4 px-6 border border-gray-400">{ticket.subject}</td>
                      <td className="py-4 px-6 border border-gray-400">
                        <span className={`px-4 py-1 rounded-full text-xs font-semibold ${
                          ticket.status === "resolved"
                            ? "bg-green-200 text-green-800"
                            : ticket.status === "escalated"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                        }`}>
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6 border border-gray-400">{ticket.createdAt}</td>
                      <td className="py-4 px-6 border border-gray-400">
                        <button
                          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                          onClick={() => handleExpand(ticket.id)}
                          title={expanded === ticket.id ? "Hide details" : "Show details"}
                        >
                          {expanded === ticket.id ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Ticket Details */}
            {safeTickets.map((ticket) =>
              expanded === ticket.id ? (
                <div key={ticket.id} className="bg-white rounded-xl shadow p-6 mt-4 mb-8 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FaExclamationTriangle className="text-yellow-500" />
                    <span className="font-semibold text-gray-900 text-lg">{ticket.subject}</span>
                  </div>
                  <div className="mb-4 text-gray-700">{ticket.description}</div>
                  <div className="mb-4">
                    <span className="font-semibold text-gray-700">Status:</span>{" "}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      ticket.status === "resolved"
                        ? "bg-green-200 text-green-800"
                        : ticket.status === "escalated"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}>
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                  </div>
                  {ticket.resolution && (
                    <div className="mb-4">
                      <span className="font-semibold text-gray-700">Resolution:</span>{" "}
                      <span className="text-gray-800">{ticket.resolution}</span>
                    </div>
                  )}
                  {/* Actions */}
                  {ticket.status === "open" && (
                    <div className="flex gap-4 mt-6">
                      <button
                        className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-xl font-semibold shadow hover:from-green-600 hover:to-green-800 transition border-2 border-green-600"
                        onClick={() => setModal({ open: true, ticketId: ticket.id, action: "resolve" })}
                      >
                        Resolve
                      </button>
                      <button
                        className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-6 py-2 rounded-xl font-semibold shadow hover:from-yellow-600 hover:to-yellow-800 transition border-2 border-yellow-600"
                        onClick={() => setModal({ open: true, ticketId: ticket.id, action: "escalate" })}
                      >
                        Escalate to IT
                      </button>
                    </div>
                  )}
                  {ticket.status === "escalated" && (
                    <div className="flex items-center gap-2 mt-4 text-yellow-700">
                      <FaArrowUp />
                      <span>Escalated to IT</span>
                    </div>
                  )}
                  {ticket.status === "resolved" && (
                    <div className="flex items-center gap-2 mt-4 text-green-700">
                      <FaCheckCircle />
                      <span>Resolved</span>
                    </div>
                  )}
                </div>
              ) : null
            )}
          </div>
        </div>
        {/* Modal for Resolve/Escalate */}
        {modal.open && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {modal.action === "resolve" ? "Resolve Ticket" : "Escalate Ticket to IT"}
              </h2>
              <label className="block text-gray-700 font-medium mb-2">
                {modal.action === "resolve"
                  ? "Resolution (required)"
                  : "Reason for escalation (required)"}
              </label>
              <textarea
                value={resolution}
                onChange={e => setResolution(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                placeholder={
                  modal.action === "resolve"
                    ? "Describe how you resolved the issue"
                    : "Describe why this ticket needs to be escalated"
                }
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setModal({ open: false, ticketId: null, action: null })}
                  className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    modal.action === "resolve"
                      ? handleResolve(modal.ticketId!, resolution)
                      : handleEscalate(modal.ticketId!, resolution)
                  }
                  className={`px-4 py-1 rounded text-white ${
                    modal.action === "resolve"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-yellow-600 hover:bg-yellow-700"
                  }`}
                  disabled={!resolution.trim()}
                >
                  {modal.action === "resolve" ? "Resolve" : "Escalate"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminHelpdeskPage;
