import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { 
  FaArrowLeft, 
  FaMapMarkerAlt, 
  FaClock, 
  FaVideo, 
  FaFile,
  FaUser,
  FaFileAlt,
  FaSearch,
  FaClipboardList,
  FaTrophy,
  FaBell 
} from "react-icons/fa";

// Import the mock data
const applications = [
  {
    id: 1,
    jobTitle: "Junior Software Developer",
    company: "TechNova Solutions",
    appliedDate: "2024-01-15",
    status: "interview",
    interviewDate: "2024-02-01",
    location: "Johannesburg",
    type: "Full-time",
    description: "Join our dynamic team of developers working on cutting-edge projects.",
    salary: "R25,000 - R35,000 per month",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "Knowledge of JavaScript and TypeScript",
      "Experience with React and Next.js",
      "Good problem-solving skills"
    ],
    applicationDetails: {
      resumeUrl: "/path/to/resume.pdf",
      coverLetterUrl: "/path/to/cover-letter.pdf",
      submittedDate: "2024-01-15T10:30:00Z"
    }
  },
  // ... other applications from your mock data
];

const ApplicationDetailsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [application, setApplication] = useState<any>(null);
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  useEffect(() => {
    if (id) {
      // Find the application in our mock data
      const found = applications.find(app => app.id === Number(id));
      if (found) {
        setApplication(found);
      }
    }
  }, [id]);

  if (!application) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: '#f9fafb' }}>
      <Head>
        <title>{application.jobTitle} - Application Details</title>
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
        background: '#f9fafb'
      }}>
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/dashboard/student/applications" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <FaArrowLeft className="mr-2" />
            Back to Applications
          </Link>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <h1 className="text-2xl font-bold mb-2">{application.jobTitle}</h1>
              <p className="text-xl text-blue-100">{application.company}</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Status and Key Details */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2" />
                    {application.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaClock className="mr-2" />
                    Applied: {new Date(application.appliedDate).toLocaleDateString()}
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full font-medium ${
                  application.status === "interview" 
                    ? "bg-green-100 text-green-800"
                    : application.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
              </div>

              {/* Interview Details if scheduled */}
              {application.interviewDate && (
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-500 p-3 rounded-full">
                      <FaVideo className="text-xl text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900">Interview Scheduled</h3>
                      <p className="text-green-700">
                        {new Date(application.interviewDate).toLocaleDateString()} at{' '}
                        {new Date(application.interviewDate).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Job Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Job Details</h2>
                <div className="prose max-w-none text-gray-600">
                  <p>{application.description}</p>
                  <p className="font-medium text-gray-900">{application.salary}</p>
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Requirements</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {application.requirements.map((req: string, index: number) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Application Materials */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Your Application</h2>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={application.applicationDetails.resumeUrl}
                    className="flex items-center justify-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FaFile className="text-gray-500" />
                    <span className="text-gray-700">View Resume</span>
                  </a>
                  <a
                    href={application.applicationDetails.coverLetterUrl}
                    className="flex items-center justify-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FaFile className="text-gray-500" />
                    <span className="text-gray-700">View Cover Letter</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationDetailsPage;
