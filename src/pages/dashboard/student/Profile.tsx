import { useState, useRef } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import { 
  FaUser, 
  FaFileAlt, 
  FaSearch, 
  FaClipboardList, 
  FaVideo, 
  FaTrophy, 
  FaBell,
  FaHome
} from "react-icons/fa";

interface ProfileFormState {
  // Add new fields
  fullName: string;
  email: string;
  studentId: string;
  password: string;
  gender: string;
  additionalName: string;
  birthday: string;
  educationLevel: string;
  phoneNumber: string;
  company: string;
  jobTitle: string;
  department: string;
}

const styles = {
  root: {
    "--palette-text-primary": "#262626",
    "--palette-text-secondary": "#666666",
    "--palette-background-paper": "#f8f8f8",
    "--palette-background-default": "#ffffff",
    backgroundColor: "#ebebeb",
    fontFamily: '"Open Sans", sans-serif',
  } as React.CSSProperties,
  section: {
    background: 'linear-gradient(135deg, rgba(167, 123, 202, 0.3), rgba(124, 58, 237, 0.4))',
    backdropFilter: "blur(8px)",
    marginBottom: "1rem",
  },
  sectionHeader: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: "1.125rem",
    fontWeight: 600,
    color: "#F5F5F5",
    lineHeight: 1.4,
    marginTop: "0.2rem",
    marginBottom: "0.5rem",
    padding: "1rem 1.5rem",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  sectionContent: {
    padding: "1.5rem",
  },
  label: {
    color: "#F5F5F5",
    fontSize: "0.875rem",
    marginBottom: "0.5rem",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "0.5rem 0.75rem",
    fontSize: "0.875rem",
    lineHeight: 1.6,
    border: "1px solid var(--palette-grey-300, #e0e0e0)",
    borderRadius: "4px",
    backgroundColor: "var(--palette-background-paper)",
    color: "var(--palette-text-primary)",
  },
  infoField: {
    display: 'flex',
    alignItems: 'baseline',
    padding: '0.625rem 0',
    borderBottom: '1px solid var(--palette-grey-200, #eeeeee)',
  },
  infoLabel: {
    width: '180px',
    color: 'white', // Changed from var(--palette-text-secondary)
    fontSize: '0.875rem',
    fontFamily: '"Open Sans", sans-serif',
  },
  infoValue: {
    flex: 1,
    fontSize: '0.875rem',
    color: 'var(--palette-text-primary)',
    fontFamily: '"Open Sans", sans-serif',
  },
  changeButton: {
    marginLeft: '1rem',
    color: '#185677',
    fontSize: '0.875rem',
    fontFamily: '"Open Sans", sans-serif',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    '&:hover': {
      textDecoration: 'underline',
    },
  }
};

const StudentProfilePage: NextPage = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formState, setFormState] = useState<ProfileFormState>({
    fullName: "John Smith",
    email: "john.smith@student.ufs.ac.za",
    studentId: "20210001",
    password: "",
    gender: "Male",
    additionalName: "",
    birthday: "2000-01-01",
    educationLevel: "Bachelor of Science",
    phoneNumber: "+27 12 345 6789",
    company: "",
    jobTitle: "",
    department: ""
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const systemInfo = {
    accountStatus: "Active",
    lastLogin: "2024-01-20 08:30:15",
    accountType: "Student",
    createdAt: "2021-01-15",
    verificationStatus: "Verified"
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formState);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
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
        { href: "/dashboard/student/interview-practise", label: "Practise Interviews", icon: <FaVideo /> },
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
    <div style={styles.root}>
      <Head>
        <title>Edit Profile - Nerd.Nest</title>
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

        {/* Navigation */}
        <div className="space-y-4">
          {/* Home Link */}
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
        position: "absolute",
        top: "75px",
        right: 0,
        bottom: 0,
        left: "256px",
        overflowY: "auto",
        padding: "3rem 1.5rem",
        backgroundImage: 'url("/images/skills_background.png")',
      }}>
        
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

        <div className="max-w-[1000px] mx-auto">
          {/* Basic Information */}
          <section style={{
            background: 'linear-gradient(135deg, rgba(167, 123, 202, 0.3), rgba(124, 58, 237, 0.4))',
            backdropFilter: "blur(8px)",
            marginBottom: '1.5rem',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <h2 style={{
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '1.125rem',
              fontWeight: 600,
              color: 'var(--palette-text-primary)',
              padding: '1rem 1.5rem',
              borderBottom: '1px solid var(--palette-divider)',
              margin: 0,
            }}>
              Basic Information
            </h2>
            
            <div style={{ padding: '1rem 1.5rem' }}>
              <div style={styles.infoField}>
                <span style={styles.infoLabel}>Full Name</span>
                <span style={styles.infoValue}>{formState.fullName}</span>
              </div>
              
              <div style={styles.infoField}>
                <span style={styles.infoLabel}>Email Address</span>
                <span style={styles.infoValue}>{formState.email}</span>
              </div>
              
              <div style={styles.infoField}>
                <span style={styles.infoLabel}>Student ID</span>
                <span style={styles.infoValue}>{formState.studentId}</span>
              </div>
              
              <div style={styles.infoField}>
                <span style={styles.infoLabel}>Password</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={styles.infoValue}>********</span>
                  <button type="button" style={styles.changeButton}>
                    Change
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* System Information */}
          <section style={{
            background: 'linear-gradient(135deg, rgba(167, 123, 202, 0.3), rgba(124, 58, 237, 0.4))',
            backdropFilter: "blur(8px)",
            marginBottom: '1.5rem',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <h2 style={{
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '1.125rem',
              fontWeight: 600,
              color: 'var(--palette-text-primary)',
              padding: '1rem 1.5rem',
              borderBottom: '1px solid var(--palette-divider)',
              margin: 0,
            }}>
              System Information
            </h2>
            
            <div style={{ padding: '1rem 1.5rem' }}>
              <div style={styles.infoField}>
                <span style={styles.infoLabel}>Account Status</span>
                <span style={styles.infoValue}>{systemInfo.accountStatus}</span>
              </div>
              
              <div style={styles.infoField}>
                <span style={styles.infoLabel}>Last Login</span>
                <span style={styles.infoValue}>{systemInfo.lastLogin}</span>
              </div>
              
              <div style={styles.infoField}>
                <span style={styles.infoLabel}>Account Type</span>
                <span style={styles.infoValue}>{systemInfo.accountType}</span>
              </div>

              <div style={styles.infoField}>
                <span style={styles.infoLabel}>Member Since</span>
                <span style={styles.infoValue}>{systemInfo.createdAt}</span>
              </div>

              <div style={styles.infoField}>
                <span style={styles.infoLabel}>Verification Status</span>
                <span style={styles.infoValue}>{systemInfo.verificationStatus}</span>
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section style={styles.section}>
            <h2 style={styles.sectionHeader}>Additional Information</h2>
            <div style={styles.sectionContent}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label style={styles.label}>Gender</label>
                  <input
                    type="text"
                    name="gender"
                    value={formState.gender}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Add gender"
                  />
                </div>
                <div>
                  <label style={styles.label}>Additional Name</label>
                  <input
                    type="text"
                    name="additionalName"
                    value={formState.additionalName}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Add additional name"
                  />
                </div>
                <div>
                  <label style={styles.label}>Birthday</label>
                  <input
                    type="date"
                    name="birthday"
                    value={formState.birthday}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
                <div>
                  <label style={styles.label}>Education Level</label>
                  <input
                    type="text"
                    name="educationLevel"
                    value={formState.educationLevel}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Add education level"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section style={styles.section}>
            <h2 style={styles.sectionHeader}>Contact Information</h2>
            <div style={styles.sectionContent}>
              <div>
                <label style={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formState.phoneNumber}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Add phone number"
                />
              </div>
            </div>
          </section>

          {/* Job Information */}
          <section style={styles.section}>
            <h2 style={styles.sectionHeader}>Job Information</h2>
            <div style={styles.sectionContent}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label style={styles.label}>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Add company"
                  />
                </div>
                <div>
                  <label style={styles.label}>Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formState.jobTitle}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Add job title"
                  />
                </div>
                <div className="col-span-2">
                  <label style={styles.label}>Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formState.department}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Add department"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="px-6 py-4 flex justify-end">
            <button
              type="submit"
              className="px-4 h-8 text-[13px] bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfilePage;


