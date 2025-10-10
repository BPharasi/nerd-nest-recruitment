import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, FormEvent, useEffect } from "react";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { FaArrowLeft, FaGithub, FaAward, FaFile, FaUser, FaFileAlt, FaSearch, FaClipboardList, FaVideo, FaTrophy, FaBell } from "react-icons/fa";

interface ApplyFormState {
  cvOption: 'built' | 'upload';
  useBuiltCV: boolean;
  cv: File | null;
  coverLetter: File | null;
  dateAvailable: string;
  portfolioLinks: {
    github?: string;
    linkedin?: string;
    personal?: string;
  };
  achievements: string[];
  recommendationLetters: File[];
  error: string | null;
  loading: boolean;
}

const ApplyPage: NextPage = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formState, setFormState] = useState<ApplyFormState>({
    cvOption: 'built',
    useBuiltCV: true,
    cv: null,
    coverLetter: null,
    dateAvailable: "",
    portfolioLinks: {},
    achievements: [],
    recommendationLetters: [],
    error: null,
    loading: false
  });
  const [builtCV, setBuiltCV] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBuiltCV = async () => {
      try {
        const response = await fetch('/api/cv/built');
        if (response.ok) {
          const data = await response.json();
          setBuiltCV(data.cvUrl);
        }
      } catch (error) {
        console.error('Error fetching built CV:', error);
      }
    };

    fetchBuiltCV();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ApplyFormState) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormState((prev) => ({ ...prev, [field]: e.target.files![0] }));
    } else {
      setFormState((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'recommendationLetters') => {
    if (e.target.files) {
      setFormState(prev => ({ 
        ...prev, 
        [field]: Array.from(e.target.files || [])
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, error: null, loading: true }));

    // Mock apply logic (replace with API call, e.g., using FormData for files)
    try {
      const formData = new FormData();
      // Append fields and files to formData
      const response = await fetch("/api/jobs/apply", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        router.push("/jobs"); // Redirect to job openings after submission
      } else {
        setFormState((prev) => ({
          ...prev,
          error: "Application failed. Try again.",
          loading: false,
        }));
      }
    } catch (err) {
      setFormState((prev) => ({
        ...prev,
        error: "An error occurred.",
        loading: false,
      }));
    }
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

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: '#f9fafb' }}>
      <Head>
        <title>Apply for Position - UFS Recruitment</title>
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
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/jobs" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <FaArrowLeft className="mr-2" />
            Back to Jobs
          </Link>

          {/* Application Form Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 bg-[#003B73] text-white">
              <h1 className="text-2xl font-bold">Apply for Position</h1>
              <p className="mt-2 text-gray-100">Fill in your details to apply</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Date Available Section */}
              <div className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-semibold text-gray-900">Availability</h3>
                <div className="flex items-center gap-4">
                  <input
                    type="date"
                    value={formState.dateAvailable}
                    onChange={(e) => setFormState(prev => ({ ...prev, dateAvailable: e.target.value }))}
                    className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B73]"
                    disabled={formState.loading}
                    required
                  />
                  <label className="text-gray-600">Date Available to Start</label>
                </div>
              </div>

              {/* CV/Resume Section */}
              <div className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-semibold text-gray-900">CV/Resume</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="useBuiltCV"
                      name="cvOption"
                      value="built"
                      checked={formState.cvOption === 'built'}
                      onChange={() => setFormState(prev => ({ ...prev, cvOption: 'built' }))}
                      className="w-4 h-4 text-[#003B73]"
                    />
                    <label htmlFor="useBuiltCV" className="text-gray-700">
                      Use CV from CV Builder
                    </label>
                  </div>

                  {formState.cvOption === 'built' && (
                    <div className="ml-7">
                      {builtCV ? (
                        <div className="flex items-center gap-4">
                          <div className="flex-1 p-3 bg-white rounded-lg border border-gray-200">
                            <span className="text-gray-600">Built CV ready to use</span>
                          </div>
                          <Link
                            href="/dashboard/student/resume-builder"
                            className="text-[#003B73] hover:text-[#002855] font-medium"
                          >
                            Edit CV
                          </Link>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                          <span className="text-gray-600">No CV built yet</span>
                          <Link
                            href="/dashboard/student/resume-builder"
                            className="bg-[#003B73] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#002855] transition-colors"
                          >
                            Build CV Now
                          </Link>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="uploadCV"
                      name="cvOption"
                      value="upload"
                      checked={formState.cvOption === 'upload'}
                      onChange={() => setFormState(prev => ({ ...prev, cvOption: 'upload' }))}
                      className="w-4 h-4 text-[#003B73]"
                    />
                    <label htmlFor="uploadCV" className="text-gray-700">
                      Upload a CV
                    </label>
                  </div>

                  {formState.cvOption === 'upload' && (
                    <div className="ml-7">
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "cv")}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B73]"
                        accept=".pdf,.doc,.docx"
                        disabled={formState.loading}
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        Accepted formats: PDF, DOC, DOCX
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Cover Letter Section */}
              <div className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-semibold text-gray-900">Cover Letter</h3>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "coverLetter")}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B73]"
                  accept=".pdf,.doc,.docx"
                  disabled={formState.loading}
                />
              </div>

              {/* Portfolio Links Section */}
              <div className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FaGithub />
                  Portfolio & Professional Links
                </h3>
                
                <div className="space-y-4">
                  <input
                    type="url"
                    placeholder="GitHub Profile URL"
                    value={formState.portfolioLinks.github || ''}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      portfolioLinks: { ...prev.portfolioLinks, github: e.target.value }
                    }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B73]"
                  />
                  
                  <input
                    type="url"
                    placeholder="LinkedIn Profile URL"
                    value={formState.portfolioLinks.linkedin || ''}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      portfolioLinks: { ...prev.portfolioLinks, linkedin: e.target.value }
                    }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B73]"
                  />
                  
                  <input
                    type="url"
                    placeholder="Personal Website URL"
                    value={formState.portfolioLinks.personal || ''}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      portfolioLinks: { ...prev.portfolioLinks, personal: e.target.value }
                    }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B73]"
                  />
                </div>
              </div>

              {/* Achievements Section */}
              <div className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FaAward />
                  Achievements & Certifications
                </h3>
                
                <div className="space-y-4">
                  <textarea
                    placeholder="List your key achievements, certifications, or awards (one per line)"
                    value={formState.achievements.join('\n')}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      achievements: e.target.value.split('\n').filter(item => item.trim())
                    }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B73] min-h-[100px]"
                  />
                  
                  <div className="text-sm text-gray-500">
                    Examples: AWS Certification, Hackathon Winner, Dean's List, etc.
                  </div>
                </div>
              </div>

              {/* Recommendation Letters Section */}
              <div className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FaFile />
                  Recommendation Letters
                </h3>
                
                <div className="space-y-4">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleMultipleFileChange(e, 'recommendationLetters')}
                    accept=".pdf,.doc,.docx"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B73]"
                  />
                  
                  {formState.recommendationLetters.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Selected Files:</div>
                      {formState.recommendationLetters.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                          <span className="text-sm text-gray-600">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newFiles = [...formState.recommendationLetters];
                              newFiles.splice(index, 1);
                              setFormState(prev => ({ ...prev, recommendationLetters: newFiles }));
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-500">
                    Upload recommendation letters from previous employers or professors (PDF, DOC, DOCX)
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex-1 bg-[#003B73] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#002855] transition-colors disabled:opacity-50"
                  disabled={formState.loading}
                >
                  {formState.loading ? "Submitting..." : "Submit Application"}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                  disabled={formState.loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplyPage;