import { useState, FormEvent, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import jsPDF from "jspdf";
import Link from "next/link";
import Image from 'next/image';
import { FaBars, FaUser, FaGraduationCap, FaBriefcase, FaPhone, FaCheck, FaFileAlt, FaSearch, FaClipboardList, FaVideo, FaTrophy, FaBell, FaSave } from "react-icons/fa";
import type { CSSProperties } from 'react';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface EducationInfo {
  [key: string]: string;
  institution: string;
  degree: string;
  year: string;
}

interface ExperienceInfo {
  [key: string]: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

interface ResumeFormState {
  personal: PersonalInfo;
  education: EducationInfo[];
  experience: ExperienceInfo[];
  skills: string[];
  uploadedCV: File | null;
}

const sections = [
  { id: 'personal', title: 'Personal Information', icon: <FaUser /> },
  { id: 'education', title: 'Education', icon: <FaGraduationCap /> },
  { id: 'experience', title: 'Experience', icon: <FaBriefcase /> },
  { id: 'contact', title: 'Contact Information', icon: <FaPhone /> },
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
    transition: 'border-color 0.15s ease-in-out',
    '&:focus': {
      borderColor: '#3B82F6',
      boxShadow: '0 0 0 1px #3B82F6'
    }
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
    '&:hover': {
      backgroundColor: '#2563EB',
      transform: 'translateY(-1px)',
    }
  } as const
};

const previewStyles = {
  container: {
    background: '#FFFFFF',
    padding: '40px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  header: {
    display: 'flex',
    gap: '24px',
    marginBottom: '32px',
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover' as const,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '8px',
  },
  email: {
    fontSize: '14px',
    color: '#4B5563',
    marginBottom: '4px',
  },
  twoColumnLayout: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '40px',
  },
  section: {
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '2px solid #E5E7EB',
  },
  skillsList: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
  },
  skillItem: {
    padding: '4px 12px',
    background: '#F3F4F6',
    borderRadius: '16px',
    fontSize: '14px',
    color: '#4B5563',
  }
};

const navStyles = {
  header: {
    height: '75px',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E5E7EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
  },
  logo: {
    height: '50px',
    width: 'auto',
  },
  sidebar: {
    background: 'linear-gradient(to bottom, #26A69A, #00BCD4)',
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    color: 'white',
    transition: 'background-color 0.2s',
    borderRadius: '8px',
    margin: '4px 0',
  }
};

const ResumeBuilderPage: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('personal');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [progress, setProgress] = useState<Record<string, boolean>>({
    personal: false,
    education: false,
    experience: false,
    contact: false
  });
  const [formState, setFormState] = useState<ResumeFormState>({
    personal: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      phone: "",
      address: "",
    },
    education: [],
    experience: [],
    skills: [],
    uploadedCV: null,
  });

  useEffect(() => {
    // Load saved progress from localStorage
    const savedProgress = localStorage.getItem('resumeProgress');
    const savedFormState = localStorage.getItem('resumeFormState');
    
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    if (savedFormState) {
      setFormState(JSON.parse(savedFormState));
    }
  }, []);

  const saveProgress = () => {
    localStorage.setItem('resumeProgress', JSON.stringify(progress));
    localStorage.setItem('resumeFormState', JSON.stringify(formState));
  };

  const updateProgress = (section: string, isComplete: boolean) => {
    setProgress(prev => ({
      ...prev,
      [section]: isComplete
    }));
  };

  const calculateTotalProgress = () => {
    const completedSections = Object.values(progress).filter(Boolean).length;
    return (completedSections / Object.keys(progress).length) * 100;
  };

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      personal: { ...prev.personal, [e.target.name]: e.target.value },
    }));
  };

  const addEducation = () => {
    setFormState((prev) => ({
      ...prev,
      education: [...prev.education, { institution: "", degree: "", year: "" }],
    }));
  };

  const updateEducation = (index: number, field: keyof EducationInfo, value: string) => {
    const updatedEducation = [...formState.education];
    updatedEducation[index][field] = value;
    setFormState((prev) => ({ ...prev, education: updatedEducation }));
  };

  const addExperience = () => {
    setFormState((prev) => ({
      ...prev,
      experience: [...prev.experience, { company: "", role: "", duration: "", description: "" }],
    }));
  };

  const updateExperience = (index: number, field: keyof ExperienceInfo, value: string) => {
    const updatedExperience = [...formState.experience];
    updatedExperience[index][field] = value;
    setFormState((prev) => ({ ...prev, experience: updatedExperience }));
  };

  const addSkill = (skill: string) => {
    setFormState((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormState((prev) => ({ ...prev, uploadedCV: files[0] }));
      const formData = new FormData();
      formData.append("cv", files[0]);
      fetch("/api/upload-cv", { method: "POST", body: formData });
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Resume", 10, 10);
    doc.text(`Name: ${formState.personal.name}`, 10, 20);
    doc.text(`Email: ${formState.personal.email}`, 10, 30);
    doc.text(`Phone: ${formState.personal.phone}`, 10, 40);
    doc.text(`Address: ${formState.personal.address}`, 10, 50);
    doc.text("Education:", 10, 60);
    formState.education.forEach((edu, index) => {
      doc.text(`${edu.degree} from ${edu.institution}, ${edu.year}`, 10, 70 + index * 10);
    });
    doc.text("Experience:", 10, 100);
    formState.experience.forEach((exp, index) => {
      doc.text(`${exp.role} at ${exp.company}, ${exp.duration}: ${exp.description}`, 10, 110 + index * 10);
    });
    doc.text("Skills:", 10, 150);
    formState.skills.forEach((skill, index) => {
      doc.text(skill, 10, 160 + index * 10);
    });
    doc.save("resume.pdf");
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
        { href: "/dashboard/student/interview-practise", label: "Interviews", icon: <FaVideo /> },
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
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: 'linear-gradient(to right, #283593, #5C6BC0)' }}>
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
        <Head>
          <title>Resume Builder</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 mr-4 rounded-md hover:bg-gray-100"
            >
              <FaBars className="h-5 w-5 text-gray-500" />
            </button>
            <Link href="/">
              <Image
                src="/images/Logo.png"
                alt="Nerd.Nest"
                width={120}
                height={40}
                style={navStyles.logo}
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {session?.user?.image && (
              <img
                src={session.user.image}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            )}
          </div>
        </div>
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
              <h3 className="font-semibold text-white text-lg">{session?.user?.name || "Student"}</h3>
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
            {sections.map((section) => (
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
            {/* Form Content - Replace the existing form sections with these styled versions */}
            {activeSection === 'personal' && (
              <div className="space-y-6">
                <div style={styles.card}>
                  <h2 style={styles.sectionHeader}>Personal Information</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div style={styles.formGroup}>
                      <label style={styles.label} htmlFor="name">Name</label>
                      <input
                        id="name"
                        name="name"
                        value={formState.personal.name}
                        onChange={handlePersonalChange}
                        placeholder="Enter your name"
                        style={styles.input}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label} htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        value={formState.personal.email}
                        onChange={handlePersonalChange}
                        placeholder="Enter your email"
                        style={styles.input}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label} htmlFor="phone">Phone</label>
                      <input
                        id="phone"
                        name="phone"
                        value={formState.personal.phone}
                        onChange={handlePersonalChange}
                        placeholder="Enter your phone number"
                        style={styles.input}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label} htmlFor="address">Address</label>
                      <input
                        id="address"
                        name="address"
                        value={formState.personal.address}
                        onChange={handlePersonalChange}
                        placeholder="Enter your address"
                        style={styles.input}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'education' && (
              <div className="space-y-6">
                <div style={styles.card}>
                  <h2 style={styles.sectionHeader}>Education</h2>
                  {formState.education.map((edu, index) => (
                    <div key={index} className="grid grid-cols-2 gap-6">
                      <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor={`institution-${index}`}>Institution</label>
                        <input
                          id={`institution-${index}`}
                          value={edu.institution}
                          onChange={(e) => updateEducation(index, "institution", e.target.value)}
                          placeholder="Enter institution name"
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor={`degree-${index}`}>Degree</label>
                        <input
                          id={`degree-${index}`}
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, "degree", e.target.value)}
                          placeholder="Enter degree obtained"
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor={`year-${index}`}>Year</label>
                        <input
                          id={`year-${index}`}
                          value={edu.year}
                          onChange={(e) => updateEducation(index, "year", e.target.value)}
                          placeholder="Enter year of graduation"
                          style={styles.input}
                        />
                      </div>
                    </div>
                  ))}
                  <button onClick={addEducation} className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Add Education
                  </button>
                </div>
              </div>
            )}
            {activeSection === 'experience' && (
              <div className="space-y-6">
                <div style={styles.card}>
                  <h2 style={styles.sectionHeader}>Experience</h2>
                  {formState.experience.map((exp, index) => (
                    <div key={index} className="grid grid-cols-2 gap-6">
                      <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor={`company-${index}`}>Company</label>
                        <input
                          id={`company-${index}`}
                          value={exp.company}
                          onChange={(e) => updateExperience(index, "company", e.target.value)}
                          placeholder="Enter company name"
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor={`role-${index}`}>Role</label>
                        <input
                          id={`role-${index}`}
                          value={exp.role}
                          onChange={(e) => updateExperience(index, "role", e.target.value)}
                          placeholder="Enter your role"
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor={`duration-${index}`}>Duration</label>
                        <input
                          id={`duration-${index}`}
                          value={exp.duration}
                          onChange={(e) => updateExperience(index, "duration", e.target.value)}
                          placeholder="Enter duration of employment"
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor={`description-${index}`}>Description</label>
                        <textarea
                          id={`description-${index}`}
                          value={exp.description}
                          onChange={(e) => updateExperience(index, "description", e.target.value)}
                          placeholder="Enter job description"
                          style={{ ...styles.input, height: '100px' }}
                        />
                      </div>
                    </div>
                  ))}
                  <button onClick={addExperience} className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Add Experience
                  </button>
                </div>
              </div>
            )}
            {activeSection === 'contact' && (
              <div className="space-y-6">
                <div style={styles.card}>
                  <h2 style={styles.sectionHeader}>Contact Information</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div style={styles.formGroup}>
                      <label style={styles.label} htmlFor="phone">Phone</label>
                      <input
                        id="phone"
                        name="phone"
                        value={formState.personal.phone}
                        onChange={handlePersonalChange}
                        placeholder="Enter your phone number"
                        style={styles.input}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label} htmlFor="address">Address</label>
                      <input
                        id="address"
                        name="address"
                        value={formState.personal.address}
                        onChange={handlePersonalChange}
                        placeholder="Enter your address"
                        style={styles.input}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'preview' && (
              <div className="space-y-6">
                <div style={previewStyles.container}>
                  <div style={previewStyles.header}>
                    <img 
                      src={session?.user?.image || "https://www.gravatar.com/avatar/?d=mp"}
                      alt="Profile"
                      style={previewStyles.profileImage}
                    />
                    <div style={previewStyles.headerInfo}>
                      <h2 style={previewStyles.name}>{formState.personal.name}</h2>
                      <p style={previewStyles.email}>{formState.personal.email}</p>
                      <p style={previewStyles.email}>{formState.personal.phone}</p>
                      <p style={previewStyles.email}>{formState.personal.address}</p>
                    </div>
                  </div>

                  <div style={previewStyles.twoColumnLayout}>
                    <div>
                      {/* Left Column */}
                      <div style={previewStyles.section}>
                        <h3 style={previewStyles.sectionTitle}>Education</h3>
                        {formState.education.map((edu, index) => (
                          <div key={index} className="mb-4">
                            <div className="text-base font-medium text-gray-900">
                              {edu.degree}
                            </div>
                            <div className="text-sm text-gray-600">
                              {edu.institution}
                            </div>
                            <div className="text-sm text-gray-500">
                              {edu.year}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={previewStyles.section}>
                        <h3 style={previewStyles.sectionTitle}>Work History</h3>
                        {formState.experience.map((exp, index) => (
                          <div key={index} className="mb-4">
                            <div className="text-base font-medium text-gray-900">
                              {exp.role}
                            </div>
                            <div className="text-sm text-gray-600">
                              {exp.company}
                            </div>
                            <div className="text-sm text-gray-500">
                              {exp.duration}
                            </div>
                            <p className="mt-2 text-sm text-gray-600">
                              {exp.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      {/* Right Column */}
                      <div style={previewStyles.section}>
                        <h3 style={previewStyles.sectionTitle}>Technical Skills</h3>
                        <div style={previewStyles.skillsList}>
                          {formState.skills.map((skill, index) => (
                            <span key={index} style={previewStyles.skillItem}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={previewStyles.section}>
                        <h3 style={previewStyles.sectionTitle}>Certification</h3>
                        {/* Add certification section if needed */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={generatePDF}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Download PDF
                  </button>
                </div>
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
          <FaSave className="h-5 w-5" />
          <span>Save Progress</span>
        </button>
      </main>

      {/* Footer */}
      <div className="fixed bottom-0 right-0 left-[256px] bg-white border-t">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-end">
            <button
              onClick={saveProgress}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            >
              Save Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;