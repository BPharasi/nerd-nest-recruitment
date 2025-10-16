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
  FaClock,
  FaTools,
  FaHome, // Add this import
} from "react-icons/fa";

interface Badge {
  name: string;
  description?: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  timeLimit?: number;
  skillsTested: string[];
  format: string;
  badges: Badge[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

interface ChallengeCategory {
  name: string;
  description: string;
  challenges: Challenge[];
}

const StudentSkillsChallengesPage: NextPage = () => {
  const { data: session } = useSession();
  const [categories, setCategories] = useState<ChallengeCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigationGroups = [
    {
      title: "Profile",
      items: [
        {
          href: "/dashboard/student/profile",
          label: "Profile Setup",
          icon: <FaUser />,
        },
        { href: "/dashboard/student/resume-builder", label: "Create CV", icon: <FaFileAlt /> },
      ],
    },
    {
      title: "Challenges",
      items: [
        {
          href: "/dashboard/student/skills-challenge",
          label: "Skills Challenges",
          icon: <FaClipboardList />,
        },
        {
          href: "/dashboard/student/technical-interview",
          label: "Technical Interview",
          icon: <FaVideo />,
        },
      ],
    },
    {
      title: "Resources",
      items: [
        {
          href: "/dashboard/student/learning-resources",
          label: "Learning Resources",
          icon: <FaSearch />,
        },
        {
          href: "/dashboard/student/faq",
          label: "FAQ",
          icon: <FaBell />,
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch("/api/student/skills-challenges");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError("Failed to load challenges. Please try again later.");
        console.error("Error fetching challenges:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (isLoading || error) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          background: "linear-gradient(to right, #283593, #5C6BC0)",
        }}
      >
        <Header />
        <div className="flex items-center justify-center h-full">
          <div className="text-xl text-white">
            {isLoading ? "Loading challenges..." : error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: 'linear-gradient(to right, #283593, #5C6BC0)'
      }}
    >
      <Head>
        <title>Skills Challenges - Nerd.Nest</title>
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

      {/* Sidebar */}
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

        {/* Navigation */}
        <div className="space-y-4">
          {/* Add Home Link */}
          <div className="mb-6">
            <Link
              href="/dashboard/student"
              className="block"
            >
              <div 
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.1))",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
                className="px-4 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-3"
              >
                <span className="text-xl text-white"><FaHome /></span>
                <span className="text-white font-medium">Home</span>
              </div>
            </Link>
          </div>

          {/* Existing Navigation Groups */}
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
          backgroundAttachment: "fixed"
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          {categories.map((category) => (
            <section 
              key={category.name} 
              className="mb-10" // Reduced from mb-20
            >
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-6 mb-8 text-white">
                <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                <p className="text-teal-50">{category.description}</p>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr', 
                gap: '1rem',  // Reduced from 2rem
                padding: '1rem' // Reduced from 2rem
              }}>
                {category.challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    style={{
                      background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(20, 184, 166, 0.3)",
                      margin: '0.5rem', // Reduced from 1rem
                      padding: '0.75rem', // Reduced from 1.5rem
                      borderRadius: '0.75rem',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                    className="hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-white flex-grow pr-4">
                          {challenge.title}
                        </h3>
                        <span 
                          style={{
                            backgroundColor: challenge.difficulty === "Beginner" 
                              ? "rgba(34, 197, 94, 0.2)" 
                              : challenge.difficulty === "Intermediate"
                              ? "rgba(234, 179, 8, 0.2)"
                              : "rgba(239, 68, 68, 0.2)",
                            borderColor: challenge.difficulty === "Beginner"
                              ? "rgba(34, 197, 94, 0.3)"
                              : challenge.difficulty === "Intermediate"
                              ? "rgba(234, 179, 8, 0.3)"
                              : "rgba(239, 68, 68, 0.3)",
                          }}
                          className="px-4 py-1 rounded-full text-sm font-medium text-white border backdrop-blur-sm"
                        >
                          {challenge.difficulty}
                        </span>
                      </div>

                      <p className="text-teal-50 mb-6 line-clamp-2">
                        {challenge.description}
                      </p>

                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="text-sm font-semibold text-teal-100 mb-2">Skills Tested:</h4>
                          <div className="flex flex-wrap gap-2">
                            {challenge.skillsTested.map((skill, idx) => (
                              <span key={idx} className="bg-teal-400/20 text-teal-50 text-xs px-3 py-1 rounded-full border border-teal-200/30">
                                <FaTools className="inline-block mr-1" />
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-teal-100 mb-2">Badges:</h4>
                          <div className="flex flex-wrap gap-2">
                            {challenge.badges.map((badge, idx) => (
                              <span key={idx} className="bg-cyan-400/20 text-cyan-50 text-xs px-3 py-1 rounded-full border border-cyan-200/30">
                                <FaTrophy className="inline-block mr-1" />
                                {badge.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-teal-200/20">
                        <div className="flex items-center text-teal-100">
                          <FaClock className="mr-2" />
                          <span>{challenge.timeLimit} minutes</span>
                        </div>
                        <button 
                          style={{
                            background: 'linear-gradient(135deg, #64748b, #475569)',
                            color: 'white',
                            padding: '16px 32px',
                            borderRadius: '16px',
                            fontSize: '18px',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease',
                            minWidth: '200px',
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
                          className="hover:shadow-xl transition-all duration-300"
                        >
                          Start Challenge
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StudentSkillsChallengesPage;