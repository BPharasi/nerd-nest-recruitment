import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Header from "@/components/Header";
import {
  FaClipboardList,
  FaCheckCircle,
  FaVideo,
  FaAward,
  FaTrophy,
  FaFileAlt,
  FaBell,
  FaBuilding,
  FaChartBar,
  FaHome,
} from "react-icons/fa";

const notifications = [
  {
    id: 1,
    type: "job_posting",
    title: "Job Posting Approved",
    message: "Your job posting for 'Frontend Developer' has been approved and is now live.",
    icon: <FaClipboardList className="text-blue-500" />,
    date: "2024/02/01",
  },
  {
    id: 2,
    type: "offer_accepted",
    title: "Offer Accepted",
    message: "Sarah Johnson has accepted your job offer for 'Backend Developer'.",
    icon: <FaCheckCircle className="text-green-500" />,
    date: "2024/02/02",
  },
  {
    id: 3,
    type: "interview_scheduled",
    title: "Interview Scheduled",
    message: "Interview with John Smith is scheduled for 2024/02/05 at 10:00 AM.",
    icon: <FaVideo className="text-purple-500" />,
    date: "2024/02/03",
  },
  {
    id: 4,
    type: "badge_awarded",
    title: "Badge Awarded",
    message: "You have awarded the 'React Master' badge to Sarah Johnson.",
    icon: <FaAward className="text-yellow-500" />,
    date: "2024/02/04",
  },
  {
    id: 5,
    type: "challenge_created",
    title: "Challenge Created",
    message: "Your new coding challenge 'Data Structures Test' is now available to students.",
    icon: <FaTrophy className="text-cyan-500" />,
    date: "2024/02/05",
  },
];

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

const EmployerNotificationsPage: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Employer Notifications - UFS Recruitment</title>
      </Head>
      <div style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: "linear-gradient(to right, #283593, #5C6BC0)"
      }}>
        {/* Header */}
        <header style={{
          height: "75px",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
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
            padding: "1rem"
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
        <main style={{
          position: "absolute",
          top: "75px",
          right: 0,
          bottom: 0,
          left: "256px",
          overflowY: "auto",
          padding: "2rem",
          backgroundImage: "url('/images/skills_background(1).png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}>
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
          <div className="max-w-2xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
            <h1 className="text-3xl font-bold text-center text-white mb-8 flex items-center justify-center gap-2">
              <FaBell className="text-yellow-300" /> Notifications
            </h1>
            <div className="grid grid-cols-1 gap-6">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  style={{
                    background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(20, 184, 166, 0.3)",
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                  className="rounded-xl shadow-lg p-6 flex items-start gap-4 border-l-4 hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-3xl">{notif.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h2 className="text-lg font-semibold text-white">{notif.title}</h2>
                      <span className="text-xs text-gray-200">{notif.date}</span>
                    </div>
                    <p className="text-teal-50">{notif.message}</p>
                  </div>
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="text-center text-gray-200 py-12">
                  <FaBell className="mx-auto text-4xl mb-4" />
                  <p>No notifications yet.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EmployerNotificationsPage;
