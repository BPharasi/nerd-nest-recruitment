import { useState, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Link from "next/link";
import { 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaClock, 
  FaDollarSign, 
  FaUsers, 
  FaGraduationCap,
  FaArrowLeft,
  FaPlus,
  FaMinus,
  FaFileAlt,
  FaCheck,
  FaClipboardList,
  FaVideo,
  FaTrophy,
  FaBell,
  FaSearch,
  FaHome,
  FaSave,
  FaChartBar,
  FaUser
} from "react-icons/fa";

interface JobPostingFormState {
  // Basic Job Information
  jobTitle: string;
  company: string;
  location: string;
  workType: 'remote' | 'office' | 'hybrid';
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  
  // Job Details
  jobDescription: string;
  responsibilities: string[];
  requirements: string[];
  advantages: string[]; // Things that give applicants an advantage
  
  // Compensation & Benefits
  salaryRange: {
    min: string;
    max: string;
    currency: string;
  };
  benefits: string[];
  
  // Application Details
  applicationDeadline: string;
  startDate: string; // When suitable for student to start
  numberOfPositions: string;
  
  // Company Information
  companyDescription: string;
  contactEmail: string;
  
  loading: boolean;
  error: string | null;
}

const jobSections = [
  { id: 'basic', title: 'Basic Information', icon: <FaBuilding /> },
  { id: 'details', title: 'Job Details', icon: <FaClipboardList /> },
  { id: 'requirements', title: 'Requirements', icon: <FaGraduationCap /> },
  { id: 'compensation', title: 'Compensation', icon: <FaDollarSign /> },
  { id: 'preview', title: 'Preview', icon: <FaCheck /> }
];

const styles = {
  sectionHeader: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1F2937',
    marginBottom: '1.5rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid #E5E7EB'
  },
  card: {
    background: '#FFFFFF',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem'
  },
  formGroup: {
    marginBottom: '1.25rem'
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#4B5563',
    marginBottom: '0.5rem'
  },
  input: {
    width: '100%',
    padding: '0.625rem',
    fontSize: '0.875rem',
    border: '1px solid #D1D5DB',
    borderRadius: '0.375rem',
    outline: 'none',
    transition: 'border-color 0.15s ease-in-out'
  },
  tabContainer: {
    position: 'sticky' as const,
    top: '75px',
    zIndex: 20,
    backgroundColor: 'white',
    borderBottom: '1px solid #E5E7EB',
    padding: '1rem',
    width: '100%',
  },
  tabList: {
    display: 'flex',
    gap: '1rem',
    overflowX: 'auto' as const,
    padding: '0.5rem',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#6B7280',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: 'none',
    whiteSpace: 'nowrap' as const,
  },
  activeTab: {
    backgroundColor: '#EBF5FF',
    color: '#2563EB',
  },
  saveButton: {
    position: 'fixed' as const,
    bottom: '2rem',
    right: '2rem',
    zIndex: 50,
    backgroundColor: '#3B82F6',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s',
  }
};

const EmployerJobPostingPage: NextPage = () => {
  const { data: session } = useSession();
  const [activeSection, setActiveSection] = useState('basic');
  const [progress, setProgress] = useState<Record<string, boolean>>({
    basic: false,
    details: false,
    requirements: false,
    compensation: false
  });
  
  const [formState, setFormState] = useState<JobPostingFormState>({
    // Basic Job Information
    jobTitle: "",
    company: "",
    location: "",
    workType: 'office',
    employmentType: 'full-time',
    
    // Job Details
    jobDescription: "",
    responsibilities: [""],
    requirements: [""],
    advantages: [""],
    
    // Compensation & Benefits
    salaryRange: {
      min: "",
      max: "",
      currency: "ZAR"
    },
    benefits: [""],
    
    // Application Details
    applicationDeadline: "",
    startDate: "",
    numberOfPositions: "1",
    
    // Company Information
    companyDescription: "",
    contactEmail: session?.user?.email || "",
    
    loading: false,
    error: null
  });

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

  const calculateTotalProgress = () => {
    const completedSections = Object.values(progress).filter(Boolean).length;
    return (completedSections / Object.keys(progress).length) * 100;
  };

  const saveProgress = () => {
    localStorage.setItem('jobPostingProgress', JSON.stringify(progress));
    localStorage.setItem('jobPostingFormState', JSON.stringify(formState));
  };

  const addArrayItem = (field: keyof Pick<JobPostingFormState, 'responsibilities' | 'requirements' | 'advantages' | 'benefits'>) => {
    setFormState(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeArrayItem = (field: keyof Pick<JobPostingFormState, 'responsibilities' | 'requirements' | 'advantages' | 'benefits'>, index: number) => {
    setFormState(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field: keyof Pick<JobPostingFormState, 'responsibilities' | 'requirements' | 'advantages' | 'benefits'>, index: number, value: string) => {
    setFormState(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleSubmit = async () => {
    setFormState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch("/api/employer/job-postings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      
      if (response.ok) {
        localStorage.removeItem('jobPostingProgress');
        localStorage.removeItem('jobPostingFormState');
        window.location.href = '/dashboard/employer';
      } else {
        throw new Error('Failed to create job posting');
      }
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        error: "Failed to create job posting. Please try again.",
        loading: false
      }));
    }
  };

  const renderBasicSection = () => (
    <div className="space-y-6">
      <div style={styles.card}>
        <h2 style={styles.sectionHeader}>Basic Job Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="jobTitle">Job Title *</label>
            <input
              id="jobTitle"
              type="text"
              value={formState.jobTitle}
              onChange={(e) => setFormState(prev => ({ ...prev, jobTitle: e.target.value }))}
              placeholder="e.g., Software Developer Intern"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="company">Company Name *</label>
            <input
              id="company"
              type="text"
              value={formState.company}
              onChange={(e) => setFormState(prev => ({ ...prev, company: e.target.value }))}
              placeholder="Enter company name"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="location">Location *</label>
            <input
              id="location"
              type="text"
              value={formState.location}
              onChange={(e) => setFormState(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g., Bloemfontein, Free State"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="workType">Work Type *</label>
            <select
              id="workType"
              value={formState.workType}
              onChange={(e) => setFormState(prev => ({ ...prev, workType: e.target.value as any }))}
              style={styles.input}
              required
            >
              <option value="office">Office Based</option>
              <option value="remote">Work from Home</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="employmentType">Employment Type *</label>
            <select
              id="employmentType"
              value={formState.employmentType}
              onChange={(e) => setFormState(prev => ({ ...prev, employmentType: e.target.value as any }))}
              style={styles.input}
              required
            >
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="contactEmail">Contact Email *</label>
            <input
              id="contactEmail"
              type="email"
              value={formState.contactEmail}
              onChange={(e) => setFormState(prev => ({ ...prev, contactEmail: e.target.value }))}
              placeholder="contact@company.com"
              style={styles.input}
              required
            />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="companyDescription">Company Description *</label>
          <textarea
            id="companyDescription"
            value={formState.companyDescription}
            onChange={(e) => setFormState(prev => ({ ...prev, companyDescription: e.target.value }))}
            placeholder="Brief description of your company"
            style={{ ...styles.input, height: '100px' }}
            required
          />
        </div>
      </div>
    </div>
  );

  const renderDetailsSection = () => (
    <div className="space-y-6">
      <div style={styles.card}>
        <h2 style={styles.sectionHeader}>Job Details</h2>
        
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="jobDescription">Job Description *</label>
          <textarea
            id="jobDescription"
            value={formState.jobDescription}
            onChange={(e) => setFormState(prev => ({ ...prev, jobDescription: e.target.value }))}
            placeholder="Detailed description of the role and what the candidate will be doing"
            style={{ ...styles.input, height: '120px' }}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Key Responsibilities *</label>
          {formState.responsibilities.map((responsibility, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={responsibility}
                onChange={(e) => updateArrayItem('responsibilities', index, e.target.value)}
                placeholder="Enter a key responsibility"
                style={{ ...styles.input, marginBottom: 0 }}
              />
              <button
                type="button"
                onClick={() => removeArrayItem('responsibilities', index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <FaMinus />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('responsibilities')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mt-2"
          >
            <FaPlus className="text-sm" />
            Add Responsibility
          </button>
        </div>
      </div>
    </div>
  );

  const renderRequirementsSection = () => (
    <div className="space-y-6">
      <div style={styles.card}>
        <h2 style={styles.sectionHeader}>Requirements & Qualifications</h2>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Job Requirements *</label>
          {formState.requirements.map((requirement, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={requirement}
                onChange={(e) => updateArrayItem('requirements', index, e.target.value)}
                placeholder="Enter a job requirement"
                style={{ ...styles.input, marginBottom: 0 }}
              />
              <button
                type="button"
                onClick={() => removeArrayItem('requirements', index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <FaMinus />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('requirements')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mt-2"
          >
            <FaPlus className="text-sm" />
            Add Requirement
          </button>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Things That Give Applicants an Advantage</label>
          <p className="text-sm text-gray-500 mb-3">Additional skills, experience, or qualifications that would be beneficial but not required</p>
          {formState.advantages.map((advantage, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={advantage}
                onChange={(e) => updateArrayItem('advantages', index, e.target.value)}
                placeholder="e.g., Previous internship experience, GitHub portfolio"
                style={{ ...styles.input, marginBottom: 0 }}
              />
              <button
                type="button"
                onClick={() => removeArrayItem('advantages', index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <FaMinus />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('advantages')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mt-2"
          >
            <FaPlus className="text-sm" />
            Add Advantage
          </button>
        </div>
      </div>
    </div>
  );

  const renderCompensationSection = () => (
    <div className="space-y-6">
      <div style={styles.card}>
        <h2 style={styles.sectionHeader}>Compensation & Timeline</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div style={styles.formGroup}>
            <label style={styles.label}>Salary Range</label>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                placeholder="Min"
                value={formState.salaryRange.min}
                onChange={(e) => setFormState(prev => ({ 
                  ...prev, 
                  salaryRange: { ...prev.salaryRange, min: e.target.value }
                }))}
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Max"
                value={formState.salaryRange.max}
                onChange={(e) => setFormState(prev => ({ 
                  ...prev, 
                  salaryRange: { ...prev.salaryRange, max: e.target.value }
                }))}
                style={styles.input}
              />
              <select
                value={formState.salaryRange.currency}
                onChange={(e) => setFormState(prev => ({ 
                  ...prev, 
                  salaryRange: { ...prev.salaryRange, currency: e.target.value }
                }))}
                style={styles.input}
              >
                <option value="ZAR">ZAR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="numberOfPositions">Number of Positions</label>
            <input
              id="numberOfPositions"
              type="number"
              min="1"
              value={formState.numberOfPositions}
              onChange={(e) => setFormState(prev => ({ ...prev, numberOfPositions: e.target.value }))
              }
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="applicationDeadline">Application Deadline *</label>
            <input
              id="applicationDeadline"
              type="date"
              value={formState.applicationDeadline}
              onChange={(e) => setFormState(prev => ({ ...prev, applicationDeadline: e.target.value }))}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="startDate">Suitable Start Date for Students *</label>
            <input
              id="startDate"
              type="date"
              value={formState.startDate}
              onChange={(e) => setFormState(prev => ({ ...prev, startDate: e.target.value }))}
              style={styles.input}
              required
            />
            <p className="text-sm text-gray-500 mt-1">When would it be suitable for a student to start this position?</p>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Benefits & Perks</label>
          {formState.benefits.map((benefit, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={benefit}
                onChange={(e) => updateArrayItem('benefits', index, e.target.value)}
                placeholder="e.g., Health insurance, Flexible hours, Learning opportunities"
                style={{ ...styles.input, marginBottom: 0 }}
              />
              <button
                type="button"
                onClick={() => removeArrayItem('benefits', index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <FaMinus />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('benefits')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mt-2"
          >
            <FaPlus className="text-sm" />
            Add Benefit
          </button>
        </div>
      </div>
    </div>
  );

  const renderPreviewSection = () => (
    <div className="space-y-6">
      <div style={styles.card}>
        <h2 style={styles.sectionHeader}>Job Posting Preview</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{formState.jobTitle}</h1>
            <p className="text-lg text-gray-700 mb-4">{formState.company}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt />
                <span>{formState.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaClock />
                <span>{formState.employmentType.replace('-', ' ').toUpperCase()}</span>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {formState.workType.toUpperCase()}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">About the Company</h3>
              <p className="text-gray-700">{formState.companyDescription}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Job Description</h3>
              <p className="text-gray-700">{formState.jobDescription}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Key Responsibilities</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {formState.responsibilities.filter(r => r.trim()).map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {formState.requirements.filter(r => r.trim()).map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>

            {formState.advantages.some(a => a.trim()) && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Preferred Qualifications</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {formState.advantages.filter(a => a.trim()).map((advantage, index) => (
                    <li key={index}>{advantage}</li>
                  ))}
                </ul>
              </div>
            )}

            {formState.benefits.some(b => b.trim()) && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Benefits</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {formState.benefits.filter(b => b.trim()).map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Application Details</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Application Deadline:</strong> {new Date(formState.applicationDeadline).toLocaleDateString()}</p>
                <p><strong>Suitable Start Date:</strong> {new Date(formState.startDate).toLocaleDateString()}</p>
                <p><strong>Positions Available:</strong> {formState.numberOfPositions}</p>
                <p><strong>Contact:</strong> {formState.contactEmail}</p>
                {formState.salaryRange.min && formState.salaryRange.max && (
                  <p><strong>Salary Range:</strong> {formState.salaryRange.currency} {formState.salaryRange.min} - {formState.salaryRange.max}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={() => setActiveSection('compensation')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Back to Edit
          </button>
          <button
            onClick={handleSubmit}
            disabled={formState.loading}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {formState.loading ? 'Publishing...' : 'Publish Job Posting'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: 'linear-gradient(to right, #283593, #5C6BC0)' }}>
      <Head>
        <title>Create Job Posting - UFS Recruitment</title>
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

      {/* Left Navigation */}
      <aside style={{ 
        position: 'absolute',
        top: '75px',
        bottom: 0,
        left: 0,
        width: '256px',
        overflowY: 'auto',
        background: 'linear-gradient(to bottom, #26A69A, #00BCD4)',
        padding: '1rem'
      }}>
        {/* Profile Avatar Section */}
        <div className="relative mb-8" style={{ height: '180px', width: '100%' }}>
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '20px',
            width: '120px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '60px',
              border: '4px solid rgba(255, 255, 255, 0.9)',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              marginBottom: '12px'
            }}>
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

        {/* Progress Section */}
        <div className="mb-8 p-4 bg-white/10 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">
              Progress: {Math.round(calculateTotalProgress())}%
            </span>
          </div>
          <div className="h-2 bg-white/20 rounded-full">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${calculateTotalProgress()}%` }}
            />
          </div>
        </div>

        {/* Navigation Groups */}
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
      <main style={{
        position: 'absolute',
        top: '75px',
        right: 0,
        bottom: 0,
        left: '256px',
        overflowY: 'auto',
        backgroundImage: 'url("/images/skills_background(1).png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}>
        {/* Horizontal Tabs */}
        <div style={styles.tabContainer}>
          <div style={styles.tabList}>
            {jobSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  ...styles.tab,
                  ...(activeSection === section.id ? styles.activeTab : {})
                }}
              >
                <span>{section.icon}</span>
                <span>{section.title}</span>
                {progress[section.id] && (
                  <FaCheck className="text-green-500 ml-2" size={12} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link 
                href="/dashboard/employer" 
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
              >
                <FaArrowLeft className="mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Create Job Posting</h1>
            </div>

            {activeSection === 'basic' && renderBasicSection()}
            {activeSection === 'details' && renderDetailsSection()}
            {activeSection === 'requirements' && renderRequirementsSection()}
            {activeSection === 'compensation' && renderCompensationSection()}
            {activeSection === 'preview' && renderPreviewSection()}

            {/* Error Message */}
            {formState.error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{formState.error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Save Progress Button */}
        <button
          onClick={saveProgress}
          style={styles.saveButton}
          className="hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FaSave />
          <span>Save Progress</span>
        </button>
      </main>
    </div>
  );
};

export default EmployerJobPostingPage;
