import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Link from "next/link";
import {
  FaUsers,
  FaUser,
  FaUserShield,
  FaUserTie,
  FaUserGraduate,
  FaPlus,
  FaSearch,
  FaHome,
  FaClipboardList,
  FaFileAlt,
  FaTrophy,
  FaVideo,
  FaBell,
  FaChartBar,
  FaCheckCircle,
} from "react-icons/fa";

// Replace mockUsers with real user data for companies and students
const companyUsers = [
  {
    id: "1",
    name: "Thabo Mthembu",
    email: "thabo.mthembu@technova.co.za",
    role: "Employer",
    company: "TechNova Solutions",
    industry: "Software Development",
    location: "Johannesburg",
    description: "Mid-sized firm specializing in web apps for education.",
  },
  {
    id: "2",
    name: "Aisha Patel",
    email: "aisha.patel@globalnet.co.za",
    role: "Employer",
    company: "GlobalNet Corp",
    industry: "IT Consulting",
    location: "Cape Town",
    description: "Provides cloud services to universities.",
  },
  {
    id: "3",
    name: "Sipho Nkosi",
    email: "sipho.nkosi@infoflow.co.za",
    role: "Employer",
    company: "InfoFlow Analytics",
    industry: "Data Analytics",
    location: "Durban",
    description: "Focuses on BI tools for student recruitment.",
  },
  {
    id: "4",
    name: "Lerato Jansen",
    email: "lerato.jansen@pixelcraft.co.za",
    role: "Employer",
    company: "PixelCraft Studios",
    industry: "Web Design",
    location: "Pretoria",
    description: "Builds interactive platforms for career services.",
  },
  {
    id: "5",
    name: "Zanele Botha",
    email: "zanele.botha@connectix.co.za",
    role: "Employer",
    company: "Connectix Networks",
    industry: "Networking",
    location: "Bloemfontein",
    description: "Local ISP partnering with UFS for internships.",
  },
  {
    id: "6",
    name: "Kwame Dlamini",
    email: "kwame.dlamini@bughunt.co.za",
    role: "Employer",
    company: "BugHunt Labs",
    industry: "QA Testing",
    location: "Port Elizabeth",
    description: "Develops testing tools for edtech apps.",
  },
  {
    id: "7",
    name: "Nadia Van der Merwe",
    email: "nadia.vandermerwe@datavault.co.za",
    role: "Employer",
    company: "DataVault Inc.",
    industry: "Database Management",
    location: "Stellenbosch",
    description: "Secure data solutions for academic institutions.",
  },
  {
    id: "8",
    name: "Jabu Khumalo",
    email: "jabu.khumalo@mobileedge.co.za",
    role: "Employer",
    company: "MobileEdge Apps",
    industry: "Mobile Development",
    location: "Soweto",
    description: "Creates apps for student collaboration.",
  },
  {
    id: "9",
    name: "Fatima Ismail",
    email: "fatima.ismail@securenet.co.za",
    role: "Employer",
    company: "SecureNet Solutions",
    industry: "Cybersecurity",
    location: "East London",
    description: "Protects university networks from threats.",
  },
  {
    id: "10",
    name: "Thando Naidoo",
    email: "thando.naidoo@designbyte.co.za",
    role: "Employer",
    company: "DesignByte Agency",
    industry: "UI/UX Design",
    location: "Pietermaritzburg",
    description: "Designs user-friendly recruitment interfaces.",
  },
  {
    id: "11",
    name: "Lindiwe Roux",
    email: "lindiwe.roux@codeforge.co.za",
    role: "Employer",
    company: "CodeForge Tech",
    industry: "Scripting & Automation",
    location: "Kimberley",
    description: "Automates HR processes for tech hires.",
  },
  {
    id: "12",
    name: "Bongani Smit",
    email: "bongani.smit@unitech.co.za",
    role: "Employer",
    company: "UniTech Support",
    industry: "Help Desk Services",
    location: "Polokwane",
    description: "On-campus IT support for Free State unis.",
  },
  {
    id: "13",
    name: "Sarah Ngubane",
    email: "sarah.ngubane@cloudpeak.co.za",
    role: "Employer",
    company: "CloudPeak Services",
    industry: "Cloud Computing",
    location: "Nelspruit",
    description: "Migrates academic data to the cloud.",
  },
  {
    id: "14",
    name: "Mpho De Villiers",
    email: "mpho.devilliers@webwave.co.za",
    role: "Employer",
    company: "WebWave Innovations",
    industry: "Frontend Development",
    location: "George",
    description: "Builds responsive sites for job portals.",
  },
  {
    id: "15",
    name: "Nomusa Fourie",
    email: "nomusa.fourie@innovatehub.co.za",
    role: "Employer",
    company: "InnovateHub",
    industry: "Project Management",
    location: "Vanderbijlpark",
    description: "Manages IT projects for student placements.",
  },
  {
    id: "16",
    name: "Elias Zuma",
    email: "elias.zuma@qualitest.co.za",
    role: "Employer",
    company: "QualiTest Group",
    industry: "Software Testing",
    location: "Upington",
    description: "Ensures quality in edtech software.",
  },
  {
    id: "17",
    name: "Priya Govender",
    email: "priya.govender@devopsdynamics.co.za",
    role: "Employer",
    company: "DevOps Dynamics",
    industry: "DevOps",
    location: "Rustenburg",
    description: "Streamlines deployment for recruitment apps.",
  },
  {
    id: "18",
    name: "Tebogo Petersen",
    email: "tebogo.petersen@archivetech.co.za",
    role: "Employer",
    company: "ArchiveTech",
    industry: "Digital Archiving",
    location: "Grahamstown",
    description: "Archives student portfolios digitally.",
  },
  {
    id: "19",
    name: "Zane Vorster",
    email: "zane.vorster@neuralnet.co.za",
    role: "Employer",
    company: "NeuralNet Labs",
    industry: "AI/ML",
    location: "Potchefstroom",
    description: "Develops AI for talent matching.",
  },
  {
    id: "20",
    name: "Naledi Du Toit",
    email: "naledi.dutoit@sysanalytix.co.za",
    role: "Employer",
    company: "SysAnalytix",
    industry: "Systems Analysis",
    location: "Witbank",
    description: "Analyzes systems for UFS career services.",
  },
];

const studentUsers = [
  {
    id: "1",
    name: "Thabo Mokoena",
    email: "thabo.mokoena@student.ufs.ac.za",
    role: "Student",
    year: "2nd Year",
    program: "CS",
    bio: "Aspiring developer; built a simple chat app project.",
  },
  {
    id: "2",
    name: "Lerato Ndlovu",
    email: "lerato.ndlovu@student.ufs.ac.za",
    role: "Student",
    year: "3rd Year",
    program: "BIS",
    bio: "Focuses on data analytics; interned at local firm.",
  },
  {
    id: "3",
    name: "Sipho Mabaso",
    email: "sipho.mabaso@student.ufs.ac.za",
    role: "Student",
    year: "1st Year",
    program: "CS",
    bio: "Learning Python; interested in game dev.",
  },
  {
    id: "4",
    name: "Zanele Khumalo",
    email: "zanele.khumalo@student.ufs.ac.za",
    role: "Student",
    year: "2nd Year",
    program: "BIS",
    bio: "Studies business processes; volunteered for UFS events.",
  },
  {
    id: "5",
    name: "Jabu Sithole",
    email: "jabu.sithole@student.ufs.ac.za",
    role: "Student",
    year: "3rd Year",
    program: "CS",
    bio: "Web dev enthusiast; contributed to open-source.",
  },
  {
    id: "6",
    name: "Nadia Van Wyk",
    email: "nadia.vanwyk@student.ufs.ac.za",
    role: "Student",
    year: "1st Year",
    program: "BIS",
    bio: "Explores ERP systems; part of UFS debate club.",
  },
  {
    id: "7",
    name: "Kwame Zulu",
    email: "kwame.zulu@student.ufs.ac.za",
    role: "Student",
    year: "2nd Year",
    program: "CS",
    bio: "Cybersecurity hobbyist; won hackathon prize.",
  },
  {
    id: "8",
    name: "Fatima Petersen",
    email: "fatima.petersen@student.ufs.ac.za",
    role: "Student",
    year: "3rd Year",
    program: "BIS",
    bio: "Analyzes market data; aims for consulting role.",
  },
  {
    id: "9",
    name: "Thando Botha",
    email: "thando.botha@student.ufs.ac.za",
    role: "Student",
    year: "2nd Year",
    program: "CS",
    bio: "Mobile app builder; UFS coding club member.",
  },
  {
    id: "10",
    name: "Lindiwe Naidoo",
    email: "lindiwe.naidoo@student.ufs.ac.za",
    role: "Student",
    year: "1st Year",
    program: "BIS",
    bio: "Interested in CRM; tutors peers in Excel.",
  },
  {
    id: "11",
    name: "Bongani Roux",
    email: "bongani.roux@student.ufs.ac.za",
    role: "Student",
    year: "3rd Year",
    program: "CS",
    bio: "Database specialist; project on SQL optimization.",
  },
  {
    id: "12",
    name: "Nomusa De Villiers",
    email: "nomusa.devilliers@student.ufs.ac.za",
    role: "Student",
    year: "2nd Year",
    program: "BIS",
    bio: "Project manager trainee; led group assignment.",
  },
  {
    id: "13",
    name: "Mpho Smit",
    email: "mpho.smit@student.ufs.ac.za",
    role: "Student",
    year: "1st Year",
    program: "CS",
    bio: "Beginner in algorithms; enjoys puzzle-solving.",
  },
  {
    id: "14",
    name: "Sarah Fourie",
    email: "sarah.fourie@student.ufs.ac.za",
    role: "Student",
    year: "3rd Year",
    program: "BIS",
    bio: "Focuses on BI; created sales dashboard.",
  },
  {
    id: "15",
    name: "Elias Vorster",
    email: "elias.vorster@student.ufs.ac.za",
    role: "Student",
    year: "2nd Year",
    program: "CS",
    bio: "Network enthusiast; self-taught Linux.",
  },
  {
    id: "16",
    name: "Priya Du Toit",
    email: "priya.dutoit@student.ufs.ac.za",
    role: "Student",
    year: "1st Year",
    program: "BIS",
    bio: "Studies supply chain IT; e-commerce fan.",
  },
  {
    id: "17",
    name: "Tebogo Ngubane",
    email: "tebogo.ngubane@student.ufs.ac.za",
    role: "Student",
    year: "3rd Year",
    program: "CS",
    bio: "AI explorer; simple ML model builder.",
  },
  {
    id: "18",
    name: "Naledi Govender",
    email: "naledi.govender@student.ufs.ac.za",
    role: "Student",
    year: "2nd Year",
    program: "BIS",
    bio: "Risk management interest; POPIA project.",
  },
  {
    id: "19",
    name: "Zane Zuma",
    email: "zane.zuma@student.ufs.ac.za",
    role: "Student",
    year: "1st Year",
    program: "CS",
    bio: "Frontend learner; practices with React.",
  },
  {
    id: "20",
    name: "Aisha Ismail",
    email: "aisha.ismail@student.ufs.ac.za",
    role: "Student",
    year: "3rd Year",
    program: "BIS",
    bio: "Digital transformation advocate; case study writer.",
  },
];

// Combine all users (add default admin/employer/student if needed)
const usersData = [
  ...companyUsers,
  ...studentUsers,
  // ...existing code for default users if needed...
];

const navigationGroups = [
  {
    title: "Admin",
    items: [
      { href: "/dashboard/admin", label: "Dashboard Home", icon: <FaHome /> },
      { href: "/dashboard/admin/user-management", label: "User Management", icon: <FaUsers /> },
      { href: "/dashboard/admin/employer-verification", label: "Employer Verification", icon: <FaUserTie /> },
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

const AdminUserManagementPage: NextPage = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [actionUserId, setActionUserId] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<{ name: string; email: string; role: string } | null>(null);

  // Stats
  const totalUsers = users.length;
  // Example: Count Employers as "Premium" and Students as "Free"
  const premiumUsers = users.filter((u) => u.role === "Employer").length;
  const freeUsers = users.filter((u) => u.role === "Student").length;
  const activeUsers = 0; // For demo

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Handle edit action
  const handleEditUser = (user: { id: string; name: string; email: string; role: string }) => {
    setActionUserId(user.id);
    setEditUser({ name: user.name, email: user.email, role: user.role });
  };

  // Save edited user info
  const handleSaveUser = () => {
    setUsers(users.map(u =>
      u.id === actionUserId ? { ...u, ...editUser } : u
    ));
    setActionUserId(null);
    setEditUser(null);
  };

  // Remove user
  const handleRemoveUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
    setActionUserId(null);
    setEditUser(null);
  };

  // Dismiss action menu on outside click
  useEffect(() => {
    if (!actionUserId) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".admin-action-menu")) {
        setActionUserId(null);
        setEditUser(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [actionUserId]);

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
        <title>User Management - Admin | UFS Recruitment</title>
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
          {/* Header and Stats */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
              <p className="text-gray-600">Manage user accounts, subscriptions, and permissions</p>
            </div>
            <button
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-800 transition flex items-center gap-2"
              style={{ fontSize: "1rem" }}
            >
              <FaPlus /> Invite User
            </button>
          </div>
          {/* Stats Cards - horizontal layout */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1.5rem",
              marginBottom: "2rem",
              justifyContent: "flex-start",
              alignItems: "stretch",
              flexWrap: "wrap"
            }}
          >
            <div style={{
              background: "#fff",
              borderRadius: "1rem",
              boxShadow: "0 2px 8px rgba(59,130,246,0.5)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "180px",
              flex: "1 1 0",
              border: "1px solid #e5e7eb"
            }}>
              <FaUsers className="text-blue-500 text-2xl mb-2" />
              <div className="text-2xl font-bold text-gray-900">{totalUsers}</div>
              <div className="text-gray-600">Total Users</div>
            </div>
            <div style={{
              background: "#fff",
              borderRadius: "1rem",
              boxShadow: "0 2px 8px rgba(59,130,246,0.5)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "180px",
              flex: "1 1 0",
              border: "1px solid #e5e7eb"
            }}>
              <FaUserTie className="text-cyan-600 text-2xl mb-2" />
              <div className="text-2xl font-bold text-gray-900">{premiumUsers}</div>
              <div className="text-gray-600">Employers</div>
            </div>
            <div style={{
              background: "#fff",
              borderRadius: "1rem",
              boxShadow: "0 2px 8px rgba(59,130,246,0.5)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "180px",
              flex: "1 1 0",
              border: "1px solid #e5e7eb"
            }}>
              <FaUserGraduate className="text-purple-600 text-2xl mb-2" />
              <div className="text-2xl font-bold text-gray-900">{freeUsers}</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div style={{
              background: "#fff",
              borderRadius: "1rem",
              boxShadow: "0 2px 8px rgba(59,130,246,0.5)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "180px",
              flex: "1 1 0",
              border: "1px solid #e5e7eb"
            }}>
              <FaUser className="text-yellow-500 text-2xl mb-2" />
              <div className="text-2xl font-bold text-gray-900">{activeUsers}</div>
              <div className="text-gray-600">Active (7 days)</div>
            </div>
          </div>
          {/* User Table Card */}
          <div
            className="bg-white rounded-xl shadow-lg p-8"
            style={{
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.6), rgba(6, 182, 212, 0.6))",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(20, 184, 166, 0.3)",
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">All Users</h2>
                <p className="text-gray-500">{filteredUsers.length} users found</p>
              </div>
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ minWidth: "250px" }}
                />
              </div>
            </div>
            <div className="overflow-x-auto w-full">
              <table
                className="min-w-full text-left border border-gray-300"
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr className="text-gray-700 font-semibold text-base">
                    <th className="py-3 px-4 border border-gray-400">User</th>
                    <th className="py-3 px-4 border border-gray-400">Role</th>
                    <th className="py-3 px-4 border border-gray-400">Email</th>
                    <th className="py-3 px-4 border border-gray-400">Company/Program</th>
                    <th className="py-3 px-4 border border-gray-400">Location/Year</th>
                    <th className="py-3 px-4 border border-gray-400">Description/Bio</th>
                    <th className="py-3 px-4 border border-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user: any, idx: number) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition"
                      style={{
                        borderBottom: "1px solid #cbd5e1",
                      }}
                    >
                      <td className="py-3 px-4 border border-gray-400 flex items-center gap-3 whitespace-nowrap">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-base">
                          {user.name
                            .split(" ")
                            .map((n: string) => n[0]?.toUpperCase())
                            .join("")}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{user.name}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">
                        <span className={`px-4 py-1 rounded-full text-xs font-semibold ${
                          user.role === "Admin"
                            ? "bg-green-600 text-white"
                            : user.role === "Employer"
                            ? "bg-cyan-600 text-white"
                            : "bg-purple-600 text-white"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">{user.email}</td>
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">
                        {user.role === "Employer" ? user.company ?? "" : user.program}
                      </td>
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">
                        {user.role === "Employer" ? user.location : user.year}
                      </td>
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">
                        {user.role === "Employer" ? user.description : user.bio}
                      </td>
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap" style={{ position: "relative" }}>
                        <button
                          className="text-gray-500 hover:text-blue-700 px-2 py-1 rounded transition"
                          onClick={() => handleEditUser(user)}
                        >
                          ...
                        </button>
                        {actionUserId === user.id && (
                          <div
                            className="admin-action-menu"
                            style={{
                              position: "absolute",
                              background: "#fff",
                              border: "1px solid #e5e7eb",
                              borderRadius: "0.5rem",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                              padding: "1rem",
                              zIndex: 100,
                              minWidth: "260px",
                              right: "2rem"
                            }}
                          >
                            <div className="mb-3">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Edit User Information</label>
                              <input
                                type="text"
                                value={editUser?.name ?? ""}
                                onChange={e => setEditUser(editUser ? { ...editUser, name: e.target.value } : null)}
                                className="w-full p-2 border rounded mb-2"
                                placeholder="Name"
                              />
                              <input
                                type="email"
                                value={editUser?.email ?? ""}
                                onChange={e => setEditUser(editUser ? { ...editUser, email: e.target.value } : null)}
                                className="w-full p-2 border rounded mb-2"
                                placeholder="Email"
                              />
                              <select
                                value={editUser?.role ?? ""}
                                onChange={e => setEditUser(editUser ? { ...editUser, role: e.target.value } : null)}
                                className="w-full p-2 border rounded"
                              >
                                <option value="Admin">Admin</option>
                                <option value="Employer">Employer</option>
                                <option value="Student">Student</option>
                              </select>
                            </div>
                            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                              <button
                              onClick={handleSaveUser}
                              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                              >
                              Save
                              </button>
                              <button
                              onClick={() => handleRemoveUser(user.id)}
                              className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                              >
                              Remove
                              </button>
                              <button
                              onClick={() => { setActionUserId(null); setEditUser(null); }}
                              className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400"
                              >
                              Cancel
                              </button>
                            </div>
                            </div>
                          
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminUserManagementPage;
