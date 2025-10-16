import { useState, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import { 
  FaBuilding, 
  FaUsers, 
  FaClipboardList, 
  FaVideo, 
  FaBell,
  FaChartBar,
  FaFileAlt,
  FaHome,
  FaTrophy,
  FaPlus,
  FaEye,
  FaClock,
  FaAward,
  FaCalendarCheck,
  FaStar,
  FaDownload,
  FaComment,
  FaUserGraduate,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglass
} from "react-icons/fa";

interface Submission {
  id: string;
  studentName: string;
  studentId: string;
  submittedAt: string;
  score?: number;
  status: 'pending' | 'reviewed' | 'awarded';
  workUrl: string;
  description: string;
  badges?: string[];
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'coding' | 'design' | 'analysis' | 'presentation';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  deadline: string;
  maxParticipants: number;
  currentParticipants: number;
  submissions: Submission[];
  prizes: string[];
  requirements: string[];
  createdAt: string;
  status: 'draft' | 'active' | 'closed' | 'completed';
}

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Build a React E-commerce Component',
    description: 'Create a responsive product catalog component with filtering and search functionality using React and TypeScript.',
    category: 'coding',
    difficulty: 'intermediate',
    deadline: '2024-02-15',
    maxParticipants: 50,
    currentParticipants: 23,
    createdAt: '2024-01-15',
    status: 'active',
    prizes: ['Internship Interview', 'React Developer Badge', 'Certificate of Excellence'],
    requirements: ['React.js', 'TypeScript', 'CSS/SCSS', 'Responsive Design'],
    submissions: [
      {
        id: 's1',
        studentName: 'John Smith',
        studentId: 'student1',
        submittedAt: '2024-01-20',
        score: 85,
        status: 'reviewed',
        workUrl: 'https://github.com/johnsmith/ecommerce-component',
        description: 'Implemented with advanced filtering and smooth animations',
        badges: ['React Master']
      },
      {
        id: 's2',
        studentName: 'Sarah Johnson',
        studentId: 'student2',
        submittedAt: '2024-01-22',
        score: 92,
        status: 'awarded',
        workUrl: 'https://github.com/sarahjohnson/product-catalog',
        description: 'Excellent use of TypeScript and performance optimization',
        badges: ['TypeScript Expert', 'Performance Champion']
      }
    ]
  },
  {
    id: '2',
    title: 'Data Visualization Dashboard',
    description: 'Design and implement an interactive dashboard showing sales analytics with charts and real-time updates.',
    category: 'analysis',
    difficulty: 'advanced',
    deadline: '2024-02-28',
    maxParticipants: 30,
    currentParticipants: 15,
    createdAt: '2024-01-10',
    status: 'active',
    prizes: ['Senior Analyst Interview', 'Data Visualization Badge', 'Mentorship Program'],
    requirements: ['D3.js or Chart.js', 'API Integration', 'Real-time Updates', 'Mobile Responsive'],
    submissions: [
      {
        id: 's3',
        studentName: 'Mike Chen',
        studentId: 'student3',
        submittedAt: '2024-01-25',
        status: 'pending',
        workUrl: 'https://github.com/mikechen/analytics-dashboard',
        description: 'Interactive dashboard with real-time WebSocket integration'
      }
    ]
  }
];

const EmployerSkillsChallengesPage: NextPage = () => {
  const { data: session } = useSession();
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'judging'>('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);

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

  const handleAwardBadge = async (submissionId: string, badgeName: string) => {
    try {
      // Update local state
      setChallenges(prev => prev.map(challenge => ({
        ...challenge,
        submissions: challenge.submissions.map(sub => 
          sub.id === submissionId 
            ? { 
                ...sub, 
                status: 'awarded' as const,
                badges: [...(sub.badges || []), badgeName]
              }
            : sub
        )
      })));

      // Send API request to award badge to student
      const submission = selectedChallenge?.submissions.find(s => s.id === submissionId);
      if (submission) {
        await fetch('/api/badges/award', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: submission.studentId,
            badgeName: badgeName,
            challengeId: selectedChallenge?.id,
            challengeTitle: selectedChallenge?.title
          })
        });
      }
    } catch (error) {
      console.error('Failed to award badge:', error);
    }
  };

  const handleOfferInterview = async (studentId: string, challengeId: string) => {
    try {
      // Send API request to create interview notification
      const response = await fetch('/api/interviews/offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: studentId,
          challengeId: challengeId,
          challengeTitle: selectedChallenge?.title,
          companyName: session?.user?.name || 'Company',
          message: `Congratulations! You've been selected for an interview based on your excellent performance in the "${selectedChallenge?.title}" challenge.`
        })
      });

      if (response.ok) {
        alert('Interview offer sent successfully!');
      }
    } catch (error) {
      console.error('Failed to offer interview:', error);
      alert('Failed to send interview offer. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'closed': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSubmissionStatusColor = (status: string) => {
    switch (status) {
      case 'awarded': return 'bg-green-100 text-green-700';
      case 'reviewed': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderChallengeDetails = () => {
    if (!selectedChallenge) return null;

    return (
      <div className="max-w-6xl mx-auto">
        {/* Challenge Details Card */}
        <div 
          style={{
            background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(20, 184, 166, 0.3)",
          }}
          className="rounded-xl shadow-lg overflow-hidden mb-8"
        >
          {/* Challenge Header */}
          <div className="p-8 border-b border-teal-200/20">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-3">{selectedChallenge.title}</h2>
                <p className="text-teal-50 text-lg mb-4">{selectedChallenge.description}</p>
                <div className="flex items-center gap-6 text-teal-100">
                  <div className="flex items-center gap-2">
                    <FaUsers />
                    <span>{selectedChallenge.currentParticipants}/{selectedChallenge.maxParticipants} Participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>Deadline: {new Date(selectedChallenge.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTrophy />
                    <span className="capitalize">{selectedChallenge.difficulty}</span>
                  </div>
                </div>
              </div>
              <span className={`px-6 py-3 rounded-full font-semibold text-lg ${getStatusColor(selectedChallenge.status)}`}>
                {selectedChallenge.status.charAt(0).toUpperCase() + selectedChallenge.status.slice(1)}
              </span>
            </div>

            {/* Challenge Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div 
                style={{
                  background: "rgba(59, 130, 246, 0.2)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                }}
                className="text-center p-4 rounded-lg"
              >
                <div className="text-3xl font-bold text-blue-200">{selectedChallenge.currentParticipants}</div>
                <div className="text-sm text-blue-100">Participants</div>
              </div>
              <div 
                style={{
                  background: "rgba(34, 197, 94, 0.2)",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                }}
                className="text-center p-4 rounded-lg"
              >
                <div className="text-3xl font-bold text-green-200">{selectedChallenge.submissions.length}</div>
                <div className="text-sm text-green-100">Submissions</div>
              </div>
              <div 
                style={{
                  background: "rgba(168, 85, 247, 0.2)",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                }}
                className="text-center p-4 rounded-lg"
              >
                <div className="text-3xl font-bold text-purple-200">
                  {selectedChallenge.submissions.filter(s => s.status === 'awarded').length}
                </div>
                <div className="text-sm text-purple-100">Awarded</div>
              </div>
              <div 
                style={{
                  background: "rgba(249, 115, 22, 0.2)",
                  border: "1px solid rgba(249, 115, 22, 0.3)",
                }}
                className="text-center p-4 rounded-lg"
              >
                <div className="text-3xl font-bold text-orange-200">
                  {Math.max(0, Math.ceil((new Date(selectedChallenge.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))}
                </div>
                <div className="text-sm text-orange-100">Days Left</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 px-8 py-4 border-b border-teal-200/20">
            {['overview', 'submissions', 'judging'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                style={{
                  background: activeTab === tab 
                    ? 'linear-gradient(135deg, #64748b, #475569)'
                    : 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'capitalize' as const
                }}
                className={`transition-colors ${
                  activeTab === tab ? '' : 'hover:bg-white/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div 
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                  className="p-6 rounded-lg"
                >
                  <h3 className="font-semibold text-white text-xl mb-4 flex items-center gap-2">
                    <FaCheckCircle className="text-green-400" />
                    Requirements
                  </h3>
                  <ul className="space-y-3">
                    {selectedChallenge.requirements.map((req, index) => (
                      <li key={index} className="flex items-center text-teal-50 text-lg">
                        <FaCheckCircle className="text-green-400 mr-3 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div 
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                  className="p-6 rounded-lg"
                >
                  <h3 className="font-semibold text-white text-xl mb-4 flex items-center gap-2">
                    <FaTrophy className="text-yellow-400" />
                    Prizes & Recognition
                  </h3>
                  <ul className="space-y-3">
                    {selectedChallenge.prizes.map((prize, index) => (
                      <li key={index} className="flex items-center text-teal-50 text-lg">
                        <FaTrophy className="text-yellow-400 mr-3 flex-shrink-0" />
                        {prize}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Student Submissions ({selectedChallenge.submissions.length})</h3>
                {selectedChallenge.submissions.map((submission) => (
                  <div 
                    key={submission.id} 
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                    className="rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-white text-xl">{submission.studentName}</h4>
                        <p className="text-teal-100 mt-2">{submission.description}</p>
                        <p className="text-sm text-teal-200 mt-1">
                          Submitted: {new Date(submission.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${getSubmissionStatusColor(submission.status)}`}>
                        {submission.status.toUpperCase()}
                      </span>
                    </div>

                    {submission.badges && submission.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {submission.badges.map((badge, index) => (
                          <span key={index} className="bg-yellow-400/20 text-yellow-100 px-4 py-2 rounded-full text-sm font-medium border border-yellow-300/30">
                            <FaAward className="inline mr-2" />
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 mt-6">
                      <a
                        href={submission.workUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: 'linear-gradient(135deg, #64748b, #475569)',
                          color: 'white',
                          padding: '14px 28px',
                          borderRadius: '12px',
                          fontSize: '16px',
                          fontWeight: '600',
                          textDecoration: 'none',
                          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          minWidth: '160px',
                          justifyContent: 'center'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #475569, #334155)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #64748b, #475569)';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
                        }}
                      >
                        <FaEye />
                        View Work
                      </a>
                      
                      {submission.status === 'pending' && (
                        <button
                          onClick={() => setActiveTab('judging')}
                          style={{
                            background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                            color: 'white',
                            padding: '14px 28px',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease',
                            minWidth: '180px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #059669, #0d9488)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #10b981, #14b8a6)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
                          }}
                        >
                          Review & Score
                        </button>
                      )}
                      
                      {submission.status === 'reviewed' && (
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleAwardBadge(submission.id, 'Excellence Award')}
                            style={{
                              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                              color: 'white',
                              padding: '14px 28px',
                              borderRadius: '12px',
                              fontSize: '16px',
                              fontWeight: '600',
                              border: 'none',
                              cursor: 'pointer',
                              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                              transition: 'all 0.3s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              minWidth: '170px'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'linear-gradient(135deg, #d97706, #b45309)';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
                            }}
                          >
                            <FaAward />
                            Award Badge
                          </button>
                          <button
                            onClick={() => handleOfferInterview(submission.studentId, selectedChallenge.id)}
                            style={{
                              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                              color: 'white',
                              padding: '14px 28px',
                              borderRadius: '12px',
                              fontSize: '16px',
                              fontWeight: '600',
                              border: 'none',
                              cursor: 'pointer',
                              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                              transition: 'all 0.3s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              minWidth: '190px'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'linear-gradient(135deg, #7c3aed, #6d28d9)';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'linear-gradient(135deg, #8b5cf6, #7c3aed)';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
                            }}
                          >
                            <FaVideo />
                            Offer Interview
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'judging' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Judging Criteria & Tools</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div 
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                    className="p-6 rounded-lg"
                  >
                    <h4 className="font-medium text-white text-lg mb-4">Scoring Rubric</h4>
                    <ul className="space-y-3 text-teal-100">
                      <li>• Code Quality & Structure (25%)</li>
                      <li>• Functionality & Features (30%)</li>
                      <li>• Design & User Experience (25%)</li>
                      <li>• Innovation & Creativity (20%)</li>
                    </ul>
                  </div>
                  <div 
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                    className="p-6 rounded-lg"
                  >
                    <h4 className="font-medium text-white text-lg mb-4">Available Badges</h4>
                    <div className="flex flex-wrap gap-3">
                      {['Code Master', 'Design Excellence', 'Innovation Award', 'Performance Champion'].map((badge) => (
                        <span key={badge} className="bg-gray-600/30 text-gray-100 px-4 py-2 rounded-full text-sm border border-gray-400/30">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: 'linear-gradient(to right, #283593, #5C6BC0)' }}>
      <Head>
        <title>Skills Challenges - UFS Recruitment</title>
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
                <span className="text-xl text-white"><FaHome /></span>
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
        backgroundImage: 'url("/images/skills_background(2).png")',
      }}>
        <div className="max-w-7xl mx-auto">
          {!selectedChallenge ? (
            <>
              {/* Header Section */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Skills Challenges</h1>
                  <p className="text-gray-200">Create and manage skills challenges to discover top talent</p>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
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
                    minWidth: '220px',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
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
                >
                  <FaPlus />
                  Create Challenge
                </button>
              </div>

              {/* Challenges Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    style={{
                      background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(20, 184, 166, 0.3)",
                    }}
                    className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">{challenge.title}</h3>
                          <p className="text-teal-50 text-sm line-clamp-2">{challenge.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(challenge.status)}`}>
                          {challenge.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-teal-100 mb-4">
                        <div className="flex items-center gap-1">
                          <FaUsers />
                          <span>{challenge.currentParticipants}/{challenge.maxParticipants}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaClock />
                          <span>{new Date(challenge.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaTrophy />
                          <span className="capitalize">{challenge.difficulty}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-cyan-200">{challenge.submissions.length}</div>
                          <div className="text-xs text-teal-100">Submissions</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-200">
                            {challenge.submissions.filter(s => s.status === 'reviewed').length}
                          </div>
                          <div className="text-xs text-teal-100">Reviewed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-yellow-200">
                            {challenge.submissions.filter(s => s.status === 'awarded').length}
                          </div>
                          <div className="text-xs text-teal-100">Awarded</div>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedChallenge(challenge)}
                        style={{
                          background: 'linear-gradient(135deg, #64748b, #475569)',
                          color: 'white',
                          padding: '14px 28px',
                          borderRadius: '14px',
                          fontSize: '16px',
                          fontWeight: '600',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                          transition: 'all 0.3s ease',
                          width: '50%',
                          letterSpacing: '0.5px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #475569, #334155)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #64748b, #475569)';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
                        }}
                      >
                        Manage Challenge
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Back Button */}
              <button
                onClick={() => setSelectedChallenge(null)}
                style={{
                  background: 'linear-gradient(135deg, #64748b, #475569)',
                  color: 'white',
                  padding: '14px 28px',
                  borderRadius: '14px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '24px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #475569, #334155)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #64748b, #475569)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
                }}
              >
                <FaUsers />
                Back to Challenges
              </button>
              
              {renderChallengeDetails()}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmployerSkillsChallengesPage;
