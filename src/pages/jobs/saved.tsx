import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { jobs } from '@/data/mockData';
import {
  FaMapMarkerAlt,
  FaUser,
  FaFileAlt,
  FaSearch,
  FaClipboardList,
  FaVideo,
  FaTrophy,
  FaBell,
  FaHome,
  FaArrowLeft
} from "react-icons/fa";

// Example: saved job IDs (replace with real logic or localStorage)
const savedJobIds = [1, 2]; // Only jobs with these IDs will be shown

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

const SavedJobsPage: NextPage = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Defensive: jobs may be undefined/null, so fallback to []
  const savedJobs = Array.isArray(jobs) ? jobs.filter(job => job && typeof job.id === 'number' && savedJobIds.includes(job.id)) : [];

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: 'linear-gradient(to right, #283593, #5C6BC0)' }}>
      <Head>
        <title>Saved Jobs - UFS Recruitment</title>
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
        {/* Home Link */}
        <div className="mb-6">
          <Link href="/dashboard/student" className="block">
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
          {/* Back Arrow */}
          <div className="mb-8 flex items-center">
            <Link
              href="/jobs"
              className="inline-flex items-center text-white hover:text-blue-200 font-medium transition-colors"
              style={{ marginRight: '1rem', fontSize: '1.1rem' }}
            >
              <FaArrowLeft className="mr-2" />
              Back to Jobs
            </Link>
            <h1 className="text-2xl font-bold text-white">Saved Jobs</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {savedJobs.length === 0 ? (
              <div className="col-span-3 text-center text-gray-200 py-12">
                No saved jobs yet.
              </div>
            ) : (
              savedJobs.map(job => (
                <div
                  key={job.id}
                  className="bg-white/95 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-0 flex flex-col group"
                  style={{
                    background: 'rgba(255, 255, 255, 0.6)',
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
                        <h3 className="text-2xl font-bold text-white drop-shadow mb-1 group-hover:underline transition-all duration-200">{job.title}</h3>
                        <p className="text-blue-100 mt-1 font-medium">{job.company}</p>
                      </div>
                      {'salary' in job && typeof job.salary === 'number' ? (
                        <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-base font-semibold whitespace-nowrap shadow border border-green-200 group-hover:scale-105 transition-transform">
                          R{(job.salary / 1000).toFixed(0)}k/year
                        </div>
                      ) : (
                        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-base font-semibold whitespace-nowrap shadow border border-blue-200 group-hover:scale-105 transition-transform">
                          {/* Fallback text if stipend does not exist */}
                          Not specified
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Card Body */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center text-blue-700 font-medium">
                        <FaMapMarkerAlt className="mr-1" />
                        <span>{job.location}</span>
                      </div>
                      {'duration' in job && typeof job.duration !== 'undefined' && (
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200">
                          {String(job.duration)}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-6 font-medium line-clamp-3 group-hover:line-clamp-none transition-all duration-200">
                      {job.briefDescription}
                    </p>
                    <div className="mt-auto">
                      <h4 className="font-semibold text-blue-900 mb-2">Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(job.keyRequirements) && job.keyRequirements.map((req: string, index: number) => (
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
                      Deadline: {job.applicationDeadline ? new Date(job.applicationDeadline).toLocaleDateString('en-CA') : 'N/A'}
                    </span>
                    <Link
                      href={`/jobs/apply?id=${job.id}`}
                      className="bg-gradient-to-r from-[#283593] to-[#00BCD4] hover:from-[#002855] hover:to-[#0097a7] text-white px-8 py-3 rounded-xl text-base font-semibold transition-colors shadow group-hover:scale-105"
                      style={{
                        boxShadow: '0 2px 8px rgba(44,62,80,0.10)',
                        border: 'none'
                      }}
                    >
                      Apply Now
                    </Link>
                  </div>
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:bg-blue-50/10 transition-all duration-200" />
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SavedJobsPage;
