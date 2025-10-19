import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import {
  FaSearch,
  FaClock,
  FaStar,
  FaBookmark,
  FaMapMarkerAlt,
  FaRegSquare,
  FaCheckSquare,
  FaUser,
  FaFileAlt,
  FaClipboardList,
  FaVideo,
  FaTrophy,
  FaBell,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { jobs, internships } from '@/data/mockData';
import { Job, Internship, Position } from '@/types/jobs';
import { useRouter } from 'next/router';

const TaskCard = ({ title, description, location, assignee, icon, type = "default" }: any) => (
  <div className="card">
    <div className="flex items-start gap-3">
      <div className="mt-1">
        {type === "welcome" ? (
          <FaRegSquare className="text-gray-400 text-base" />
        ) : type === "complete" ? (
          <FaCheckSquare className="text-green-500 text-base" />
        ) : (
          <div className="w-4 h-4 rounded-sm border-2 border-gray-300" />
        )}
      </div>
      <div className="flex-1">
        <span className="text-gray-500 text-sm block mb-1">{title}</span>
        <p className="jlui-text-neutral-100 jlui-font-heading jlui-text-m-heading-5 mb-2">{description}</p>
        {location && (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FaMapMarkerAlt className="text-gray-400 text-xs" />
            <span>{location}</span>
          </div>
        )}
        {assignee && (
          <div className="flex items-center gap-2 mt-3">
            <img src={assignee.image} alt="" className="w-6 h-6 rounded-full" />
            <span className="text-sm text-gray-600">{assignee.name}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const QuickLinksSection = ({ onStartSearch }: { onStartSearch: () => void }) => (
  <div className="card">
    <div className="card-header">
      <h3 className="text-xl font-semibold">Quick links</h3>
      <p className="text-gray-600">
        Important links related to your searches and bookmarks.
      </p>
    </div>
    <div className="card-body space-y-2">
      <button
        onClick={onStartSearch}
        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
      >
        <FaSearch className="text-gray-400" />
        <span className="text-gray-700">New job search</span>
      </button>
      <Link
        href="/jobs/previous"
        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
      >
        <FaClock className="text-gray-400" />
        <span className="text-gray-700">Previous job searches (2)</span>
      </Link>
      <Link
        href="/jobs/saved"
        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
      >
        <FaStar className="text-gray-400" />
        <span className="text-gray-700">Saved searches (2)</span>
      </Link>
      <Link
        href="/jobs/bookmarked"
        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
      >
        <FaBookmark className="text-gray-400" />
        <span className="text-gray-700">Bookmarked jobs (2)</span>
      </Link>
    </div>
  </div>
);

const JobOpeningsPage: NextPage = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<'jobs' | 'internships'>('jobs');
  const [filteredItems, setFilteredItems] = useState<Position[]>(jobs);
  const [selectedItems, setSelectedItems] = useState<Position[]>(jobs);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const items = activeTab === 'jobs' ? jobs : internships;
    setSelectedItems(items);
    setFilteredItems(items);
  }, [activeTab]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilteredItems(
      selectedItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.company.toLowerCase().includes(searchTerm) ||
        item.location.toLowerCase().includes(searchTerm)
      )
    );
    setSearch(searchTerm);
  };

  const handleStartSearch = () => {
    setShowSearchResults(true);
  };

  const handleApply = (jobId: number) => {
    router.push(`/jobs/apply?id=${jobId}`);
  };

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

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      background: 'linear-gradient(120deg, #283593 0%, #5C6BC0 100%)'
    }}>
      <Head>
        <title>UFS Recruitment System - Job Openings</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
                    className="block group"
                  >
                    <div
                      style={{
                        background: "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        borderLeft: "5px solid transparent",
                        transition: "all 0.2s",
                        position: "relative",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                        paddingLeft: "1.25rem"
                      }}
                      className="px-4 py-3 rounded-lg flex items-center gap-3 group-hover:bg-white/20 group-hover:border-l-teal-400"
                      onMouseOver={e => {
                        (e.currentTarget as HTMLElement).style.background = "linear-gradient(90deg, rgba(20,184,166,0.12) 0%, rgba(6,182,212,0.10) 100%)";
                        (e.currentTarget as HTMLElement).style.borderLeft = "5px solid #14b8a6";
                      }}
                      onMouseOut={e => {
                        (e.currentTarget as HTMLElement).style.background = "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)";
                        (e.currentTarget as HTMLElement).style.borderLeft = "5px solid transparent";
                      }}
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
        <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          <div className="space-y-8">
            {/* Quick Links Section */}
            <div>
              <QuickLinksSection onStartSearch={handleStartSearch} />
            </div>

            {/* Welcome Card - Show only when not searching */}
            {!showSearchResults && (
              <div className="card bg-gradient-to-r from-[#288893] to-[#00BCD4] text-white shadow-2xl border-0 rounded-2xl">
                <div className="max-w-2xl">
                  <h1 className="text-4xl font-bold !m-0 !p-0 drop-shadow-lg tracking-tight">
                    Land a better job faster!  Welcome, {session?.user?.name || 'Student'}!
                  </h1>
                  <p className="text-lg opacity-90 my-4 !m-0 drop-shadow font-medium">
                    Benefit from expert support and feedback during every step of your job search.
                  </p>
                  <button className="bg-white text-[#283593] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg mt-4">
                    Start your search
                  </button>
                </div>
              </div>
            )}

            {/* Jobs/Internships Tabs - Show when searching */}
            {showSearchResults && (
              <div className="card bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border-0">
                <div className="flex gap-4 mb-6 justify-center">
                  <button
                    className={`px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg mx-4 flex items-center gap-3
                      ${activeTab === 'jobs'
                        ? 'bg-gradient-to-r from-[#283593] to-[#00BCD4] text-white scale-105 ring-4 ring-[#283593]/30'
                        : 'bg-white text-[#283593] border-2 border-[#283593] hover:bg-blue-50 hover:text-[#283593]'
                    }`}
                    style={{
                      marginRight: '24px',
                      marginLeft: '24px',
                      minWidth: '200px',
                      letterSpacing: '0.03em',
                      boxShadow: activeTab === 'jobs'
                        ? '0 8px 32px rgba(44,62,80,0.15)'
                        : '0 2px 8px rgba(44,62,80,0.08)',
                      border: activeTab === 'jobs' ? 'none' : '2px solid #283593',
                      transition: 'all 0.2s',
                    }}
                    onClick={() => setActiveTab('jobs')}
                  >
                    <FaSearch className="text-xl" />
                    <span>Jobs</span>
                  </button>
                  <button
                    className={`px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg mx-4 flex items-center gap-3
                      ${activeTab === 'internships'
                        ? 'bg-gradient-to-r from-[#283593] to-[#00BCD4] text-white scale-105 ring-4 ring-[#283593]/30'
                        : 'bg-white text-[#283593] border-2 border-[#283593] hover:bg-blue-50 hover:text-[#283593]'
                    }`}
                    style={{
                      marginRight: '24px',
                      marginLeft: '24px',
                      minWidth: '200px',
                      letterSpacing: '0.03em',
                      boxShadow: activeTab === 'internships'
                        ? '0 8px 32px rgba(44,62,80,0.15)'
                        : '0 2px 8px rgba(44,62,80,0.08)',
                      border: activeTab === 'internships' ? 'none' : '2px solid #283593',
                      transition: 'all 0.2s',
                    }}
                    onClick={() => setActiveTab('internships')}
                  >
                    <FaStar className="text-xl" />
                    <span>Internships</span>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      value={search}
                      onChange={handleSearch}
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#283593] bg-white/90 font-semibold text-lg"
                    />
                    <FaSearch className="absolute right-6 top-4 text-gray-400" />
                  </div>
                </div>

                {/* Jobs/Internships List */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/95 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-0 flex flex-col group"
                      style={{
                        backdropFilter: 'blur(2px)',
                        boxShadow: '0 8px 32px rgba(44, 62, 80, 0.10)',
                        border: 'none',
                        position: 'relative'
                      }}
                    >
                      {/* Decorative top accent */}
                      <div
                        style={{
                          height: '8px',
                          width: '100%',
                          background: 'linear-gradient(90deg, #283593 0%, #00BCD4 100%)',
                          borderTopLeftRadius: '1rem',
                          borderTopRightRadius: '1rem'
                        }}
                      />
                      {/* Card Header */}
                      <div className="p-6 bg-gradient-to-r from-[#283593] to-[#00BCD4] border-b-0 rounded-t-2xl">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white drop-shadow mb-1 group-hover:underline transition-all duration-200">{item.title}</h3>
                            <p className="text-blue-100 mt-1 font-medium">{item.company}</p>
                          </div>
                          {'salary' in item ? (
                            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-base font-semibold whitespace-nowrap shadow border border-green-200 group-hover:scale-105 transition-transform">
                              R{(item.salary / 1000).toFixed(0)}k/year
                            </div>
                          ) : (
                            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-base font-semibold whitespace-nowrap shadow border border-blue-200 group-hover:scale-105 transition-transform">
                              R{item.stipend}/month
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 flex-grow flex flex-col">
                        {/* Location & Duration */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex items-center text-blue-700 font-medium">
                            <FaMapMarkerAlt className="mr-1" />
                            <span>{item.location}</span>
                          </div>
                          {'duration' in item && (
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200">
                              {item.duration}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 mb-6 font-medium line-clamp-3 group-hover:line-clamp-none transition-all duration-200">
                          {item.briefDescription}
                        </p>

                        {/* Requirements */}
                        <div className="mt-auto">
                          <h4 className="font-semibold text-blue-900 mb-2">Requirements:</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.keyRequirements.map((req, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-blue-50 text-blue-700 font-medium border border-blue-200 group-hover:bg-blue-100 transition-colors"
                              >
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="px-6 py-4 border-t-0 bg-white/90 rounded-b-2xl flex items-center justify-between">
                        <span className="text-sm text-gray-500 font-medium">
                          Deadline: {new Date(item.applicationDeadline).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => handleApply(item.id)}
                          className="bg-gradient-to-r from-[#283593] to-[#00BCD4] hover:from-[#002855] hover:to-[#0097a7] text-white px-8 py-3 rounded-xl text-base font-semibold transition-colors shadow group-hover:scale-105"
                          style={{
                            boxShadow: '0 2px 8px rgba(44,62,80,0.10)',
                            border: 'none'
                          }}
                        >
                          Apply Now
                        </button>
                      </div>
                      {/* Subtle hover overlay */}
                      <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:bg-blue-50/10 transition-all duration-200" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tasks Section - Show only when not searching */}
            {!showSearchResults && (
              <div className="card bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border-0">
                <div className="card-header">
                  <h2 className="section-title text-[#283593] text-2xl font-bold">Tasks</h2>
                  <p className="text-gray-500 text-base font-medium">There are open tasks for you</p>
                </div>
                <div className="card-body space-y-4">
                  <TaskCard
                    title="View your desired jobs"
                    description="Jobs | Indeed"
                    location="South Africa"
                    type="complete"
                  />

                  <TaskCard
                    title="Welcome"
                    description="Finish onboarding"
                    type="welcome"
                  />

                  <TaskCard
                    title="Assessment"
                    description="Continue job search assessment"
                    assignee={{
                      name: "Susan Gray",
                      image: "https://www.gravatar.com/avatar/?d=mp",
                    }}
                  />

                  <TaskCard
                    title="Resume"
                    description="Expert resume review"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobOpeningsPage;