import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Link from "next/link";
import {
  FaUsers,
  FaUserTie,
  FaHome,
  FaClipboardList,
  FaFileAlt,
  FaTrophy,
  FaVideo,
  FaBell,
  FaChartBar,
  FaCheckCircle,
  FaAward,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

// Mock challenges and badges data
const initialChallenges = [
  {
    id: "1",
    title: "React Coding Challenge",
    description: "Build a responsive dashboard using React and Tailwind CSS.",
    difficulty: "Intermediate",
    participants: 12,
    badge: "React Pro",
  },
  {
    id: "2",
    title: "SQL Query Master",
    description: "Write advanced SQL queries for a sample database.",
    difficulty: "Advanced",
    participants: 8,
    badge: "SQL Guru",
  },
];

const availableBadges = [
  { id: "1", name: "React Pro", color: "bg-blue-500" },
  { id: "2", name: "SQL Guru", color: "bg-green-500" },
  { id: "3", name: "UI Designer", color: "bg-purple-500" },
  { id: "4", name: "Challenge Winner", color: "bg-yellow-500" },
];

const navigationGroups = [
  {
    title: "Admin",
    items: [
      { href: "/dashboard/admin", label: "Dashboard Home", icon: <FaHome /> },
      { href: "/dashboard/admin/users", label: "User Management", icon: <FaUsers /> },
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

const SkillModerationPage: NextPage = () => {
  const { data: session } = useSession();
  const [challenges, setChallenges] = useState(initialChallenges);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    difficulty: "Beginner",
    badge: availableBadges[0].name,
  });
  const [awardModal, setAwardModal] = useState<{ open: boolean; challengeId: string | null }>({ open: false, challengeId: null });
  const [selectedBadge, setSelectedBadge] = useState(availableBadges[0].name);

  // Create challenge
  const handleCreateChallenge = () => {
    setChallenges([
      ...challenges,
      {
        id: (challenges.length + 1).toString(),
        title: newChallenge.title,
        description: newChallenge.description,
        difficulty: newChallenge.difficulty,
        participants: 0,
        badge: newChallenge.badge,
      },
    ]);
    setShowCreateModal(false);
    setNewChallenge({ title: "", description: "", difficulty: "Beginner", badge: availableBadges[0].name });
  };

  // Award badge (mock)
  const handleAwardBadge = (challengeId: string) => {
    // In real app, send API request to award badge to participants
    setAwardModal({ open: false, challengeId: null });
    // Optionally show notification
    alert(`Badge "${selectedBadge}" awarded to participants of challenge ${challengeId}`);
  };

  // Remove challenge
  const handleRemoveChallenge = (id: string) => {
    setChallenges(challenges.filter(c => c.id !== id));
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
        <title>Skill Moderation - Admin | UFS Recruitment</title>
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
        className="hidden md:block"
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Moderation</h1>
              <p className="text-gray-600">Create, moderate, and award badges for student challenges</p>
            </div>
            <button
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-800 transition flex items-center gap-2"
              style={{ fontSize: "1rem" }}
              onClick={() => setShowCreateModal(true)}
            >
              <FaPlus /> Create Challenge
            </button>
          </div>
          {/* Challenges Table */}
          <div
            className="bg-white rounded-xl shadow-lg p-8"
            style={{
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(20, 184, 166, 0.3)",
            }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Challenges</h2>
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
                    <th className="py-3 px-4 border border-gray-400">Title</th>
                    <th className="py-3 px-4 border border-gray-400">Description</th>
                    <th className="py-3 px-4 border border-gray-400">Difficulty</th>
                    <th className="py-3 px-4 border border-gray-400">Participants</th>
                    <th className="py-3 px-4 border border-gray-400">Badge</th>
                    <th className="py-3 px-4 border border-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {challenges.map((challenge) => (
                    <tr
                      key={challenge.id}
                      className="hover:bg-gray-50 transition"
                      style={{ borderBottom: "1px solid #cbd5e1" }}
                    >
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap font-semibold text-gray-900">
                        {challenge.title}
                      </td>
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">{challenge.description}</td>
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">
                        <span className={`px-4 py-1 rounded-full text-xs font-semibold ${
                          challenge.difficulty === "Beginner"
                            ? "bg-green-200 text-green-800"
                            : challenge.difficulty === "Intermediate"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                        }`}>
                          {challenge.difficulty}
                        </span>
                      </td>
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">{challenge.participants}</td>
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">
                        <span className="flex items-center gap-2">
                          <FaAward className="text-yellow-500" />
                          {challenge.badge}
                        </span>
                      </td>
                      <td className="py-3 px-4 border border-gray-400 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1"
                            onClick={() => setAwardModal({ open: true, challengeId: challenge.id })}
                          >
                            <FaAward /> Award Badge
                          </button>
                          <button
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1"
                            onClick={() => handleRemoveChallenge(challenge.id)}
                          >
                            <FaTrash /> Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Create Challenge Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">Create New Challenge</h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={newChallenge.title}
                  onChange={e => setNewChallenge({ ...newChallenge, title: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="Challenge title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  value={newChallenge.description}
                  onChange={e => setNewChallenge({ ...newChallenge, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="Challenge description"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Difficulty</label>
                <select
                  value={newChallenge.difficulty}
                  onChange={e => setNewChallenge({ ...newChallenge, difficulty: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Badge</label>
                <select
                  value={newChallenge.badge}
                  onChange={e => setNewChallenge({ ...newChallenge, badge: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  {availableBadges.map(badge => (
                    <option key={badge.id} value={badge.name}>{badge.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateChallenge}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                  disabled={!newChallenge.title || !newChallenge.description}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Award Badge Modal */}
        {awardModal.open && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Award Badge</h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Select Badge</label>
                <select
                  value={selectedBadge}
                  onChange={e => setSelectedBadge(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  {availableBadges.map(badge => (
                    <option key={badge.id} value={badge.name}>{badge.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setAwardModal({ open: false, challengeId: null })}
                  className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAwardBadge(awardModal.challengeId!)}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Award
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SkillModerationPage;
