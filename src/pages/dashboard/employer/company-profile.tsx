import { useState, useRef } from "react";
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
  FaPlus,
  FaMinus,
  FaMapMarkerAlt,
  FaIndustry,
  FaTrophy
} from "react-icons/fa";

interface CompanyProfileFormState {
  // Basic Company Information
  companyName: string;
  email: string;
  website: string;
  phone: string;
  foundedYear: string;
  
  // Company Details
  description: string;
  mission: string;
  vision: string;
  companySize: string;
  industry: string[];
  
  // Location Information
  headquarters: string;
  locations: string[];
  
  // Company Culture
  culture: string;
  values: string[];
  benefits: string[];
  
  // Work & Projects
  existingWorks: string[];
  clientTestimonials: string[];
  
  // Media
  logo: File | null;
  galleryImages: File[];
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
    marginBottom: "1.5rem",
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
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
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    backgroundColor: "#f8f8f8",
    color: "#262626",
    marginBottom: "1rem",
  },
  textarea: {
    width: "100%",
    padding: "0.5rem 0.75rem",
    fontSize: "0.875rem",
    lineHeight: 1.6,
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    backgroundColor: "#f8f8f8",
    color: "#262626",
    marginBottom: "1rem",
    minHeight: "100px",
    resize: "vertical" as const,
  },
  infoField: {
    display: 'flex',
    alignItems: 'baseline',
    padding: '0.625rem 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  },
  infoLabel: {
    width: '180px',
    color: 'white',
    fontSize: '0.875rem',
    fontFamily: '"Open Sans", sans-serif',
  },
  infoValue: {
    flex: 1,
    fontSize: '0.875rem',
    color: '#f0f0f0',
    fontFamily: '"Open Sans", sans-serif',
  },
};

const EmployerCompanyProfilePage: NextPage = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formState, setFormState] = useState<CompanyProfileFormState>({
    // Basic Company Information
    companyName: "TechCorp Solutions",
    email: "hr@techcorp.com",
    website: "https://techcorp.com",
    phone: "+27 11 123 4567",
    foundedYear: "2015",
    
    // Company Details
    description: "Leading technology solutions provider specializing in innovative software development and digital transformation.",
    mission: "To empower businesses through cutting-edge technology solutions that drive growth and efficiency.",
    vision: "To be the leading technology partner for businesses worldwide, fostering innovation and digital excellence.",
    companySize: "51-200",
    industry: ["Technology", "Software Development", "Digital Solutions"],
    
    // Location Information
    headquarters: "Johannesburg, South Africa",
    locations: ["Johannesburg", "Cape Town", "Durban"],
    
    // Company Culture
    culture: "We foster a collaborative, innovative environment where creativity thrives and every team member's contribution is valued. Our culture emphasizes work-life balance, continuous learning, and professional growth.",
    values: ["Innovation", "Integrity", "Collaboration", "Excellence", "Customer Focus"],
    benefits: ["Health Insurance", "Flexible Working Hours", "Professional Development", "Remote Work Options", "Performance Bonuses"],
    
    // Work & Projects
    existingWorks: [
      "Enterprise Resource Planning System for Fortune 500 Company",
      "Mobile Banking Application with 1M+ Users",
      "AI-Powered Analytics Dashboard for Retail Chain"
    ],
    clientTestimonials: [
      "TechCorp delivered exceptional results that exceeded our expectations.",
      "Professional team with deep technical expertise and excellent communication."
    ],
    
    // Media
    logo: null,
    galleryImages: [],
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (field: keyof Pick<CompanyProfileFormState, 'industry' | 'locations' | 'values' | 'benefits' | 'existingWorks' | 'clientTestimonials'>, index: number, value: string) => {
    setFormState(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: keyof Pick<CompanyProfileFormState, 'industry' | 'locations' | 'values' | 'benefits' | 'existingWorks' | 'clientTestimonials'>) => {
    setFormState(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeArrayItem = (field: keyof Pick<CompanyProfileFormState, 'industry' | 'locations' | 'values' | 'benefits' | 'existingWorks' | 'clientTestimonials'>, index: number) => {
    setFormState(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formState);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'galleryImages') => {
    if (e.target.files) {
      if (field === 'logo') {
        setFormState(prev => ({ ...prev, logo: e.target.files![0] }));
      } else {
        setFormState(prev => ({ ...prev, galleryImages: Array.from(e.target.files!) }));
      }
    }
  };

  return (
    <div style={styles.root}>
      <Head>
        <title>Company Profile - UFS Recruitment</title>
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
        padding: "3rem 1.5rem",
        backgroundImage: 'url("/images/skills_background(2).png")',
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
        <div className="max-w-[1000px] mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          <form onSubmit={handleSubmit}>
            {/* Basic Company Information */}
            <section style={styles.section}>
              <h2 style={styles.sectionHeader}>Basic Company Information</h2>
              <div style={styles.sectionContent}>
                <div style={styles.infoField}>
                  <span style={styles.infoLabel}>Company Name</span>
                  <span style={styles.infoValue}>{formState.companyName}</span>
                </div>
                <div style={styles.infoField}>
                  <span style={styles.infoLabel}>Email Address</span>
                  <span style={styles.infoValue}>{formState.email}</span>
                </div>
                <div style={styles.infoField}>
                  <span style={styles.infoLabel}>Website</span>
                  <span style={styles.infoValue}>{formState.website}</span>
                </div>
                <div style={styles.infoField}>
                  <span style={styles.infoLabel}>Phone</span>
                  <span style={styles.infoValue}>{formState.phone}</span>
                </div>
                <div style={styles.infoField}>
                  <span style={styles.infoLabel}>Founded Year</span>
                  <span style={styles.infoValue}>{formState.foundedYear}</span>
                </div>
              </div>
            </section>

            {/* Company Details */}
            <section style={styles.section}>
              <h2 style={styles.sectionHeader}>Company Details</h2>
              <div style={styles.sectionContent}>
                <div>
                  <label style={styles.label}>Company Description</label>
                  <textarea
                    name="description"
                    value={formState.description}
                    onChange={handleChange}
                    style={styles.textarea}
                    placeholder="Describe your company"
                  />
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label style={styles.label}>Mission Statement</label>
                    <textarea
                      name="mission"
                      value={formState.mission}
                      onChange={handleChange}
                      style={styles.textarea}
                      placeholder="Your company's mission"
                    />
                  </div>
                  <div>
                    <label style={styles.label}>Vision Statement</label>
                    <textarea
                      name="vision"
                      value={formState.vision}
                      onChange={handleChange}
                      style={styles.textarea}
                      placeholder="Your company's vision"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label style={styles.label}>Company Size</label>
                    <select
                      name="companySize"
                      value={formState.companySize}
                      onChange={handleChange}
                      style={styles.input}
                    >
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-1000">501-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Industry Fields */}
            <section style={styles.section}>
              <h2 style={styles.sectionHeader}>Industry Fields</h2>
              <div style={styles.sectionContent}>
                <label style={styles.label}>Industries We Work In</label>
                {formState.industry.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleArrayChange('industry', index, e.target.value)}
                      style={{ ...styles.input, marginBottom: 0 }}
                      placeholder="Enter industry"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('industry', index)}
                      className="p-2 text-red-400 hover:text-red-600"
                    >
                      <FaMinus />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('industry')}
                  className="flex items-center gap-2 text-teal-200 hover:text-white font-medium"
                >
                  <FaPlus className="text-sm" />
                  Add Industry
                </button>
              </div>
            </section>

            {/* Location Information */}
            <section style={styles.section}>
              <h2 style={styles.sectionHeader}>Location Information</h2>
              <div style={styles.sectionContent}>
                <div>
                  <label style={styles.label}>Headquarters</label>
                  <input
                    type="text"
                    name="headquarters"
                    value={formState.headquarters}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Company headquarters location"
                  />
                </div>
                <div>
                  <label style={styles.label}>Office Locations</label>
                  {formState.locations.map((location, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => handleArrayChange('locations', index, e.target.value)}
                        style={{ ...styles.input, marginBottom: 0 }}
                        placeholder="Enter office location"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('locations', index)}
                        className="p-2 text-red-400 hover:text-red-600"
                      >
                        <FaMinus />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('locations')}
                    className="flex items-center gap-2 text-teal-200 hover:text-white font-medium"
                  >
                    <FaPlus className="text-sm" />
                    Add Location
                  </button>
                </div>
              </div>
            </section>

            {/* Company Culture */}
            <section style={styles.section}>
              <h2 style={styles.sectionHeader}>Company Culture</h2>
              <div style={styles.sectionContent}>
                <div>
                  <label style={styles.label}>Culture Description</label>
                  <textarea
                    name="culture"
                    value={formState.culture}
                    onChange={handleChange}
                    style={styles.textarea}
                    placeholder="Describe your company culture"
                  />
                </div>
                
                <div>
                  <label style={styles.label}>Company Values</label>
                  {formState.values.map((value, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleArrayChange('values', index, e.target.value)}
                        style={{ ...styles.input, marginBottom: 0 }}
                        placeholder="Enter company value"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('values', index)}
                        className="p-2 text-red-400 hover:text-red-600"
                      >
                        <FaMinus />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('values')}
                    className="flex items-center gap-2 text-teal-200 hover:text-white font-medium"
                  >
                    <FaPlus className="text-sm" />
                    Add Value
                  </button>
                </div>

                <div>
                  <label style={styles.label}>Employee Benefits</label>
                  {formState.benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                        style={{ ...styles.input, marginBottom: 0 }}
                        placeholder="Enter employee benefit"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('benefits', index)}
                        className="p-2 text-red-400 hover:text-red-600"
                      >
                        <FaMinus />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('benefits')}
                    className="flex items-center gap-2 text-teal-200 hover:text-white font-medium"
                  >
                    <FaPlus className="text-sm" />
                    Add Benefit
                  </button>
                </div>
              </div>
            </section>

            {/* Existing Works & Projects */}
            <section style={styles.section}>
              <h2 style={styles.sectionHeader}>Portfolio & Client Work</h2>
              <div style={styles.sectionContent}>
                <div>
                  <label style={styles.label}>Major Projects & Works</label>
                  {formState.existingWorks.map((work, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <textarea
                        value={work}
                        onChange={(e) => handleArrayChange('existingWorks', index, e.target.value)}
                        style={{ ...styles.textarea, marginBottom: 0, minHeight: '60px' }}
                        placeholder="Describe a major project or work"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('existingWorks', index)}
                        className="p-2 text-red-400 hover:text-red-600 self-start"
                      >
                        <FaMinus />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('existingWorks')}
                    className="flex items-center gap-2 text-teal-200 hover:text-white font-medium"
                  >
                    <FaPlus className="text-sm" />
                    Add Project
                  </button>
                </div>

                <div>
                  <label style={styles.label}>Client Testimonials</label>
                  {formState.clientTestimonials.map((testimonial, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <textarea
                        value={testimonial}
                        onChange={(e) => handleArrayChange('clientTestimonials', index, e.target.value)}
                        style={{ ...styles.textarea, marginBottom: 0, minHeight: '60px' }}
                        placeholder="Enter client testimonial"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('clientTestimonials', index)}
                        className="p-2 text-red-400 hover:text-red-600 self-start"
                      >
                        <FaMinus />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('clientTestimonials')}
                    className="flex items-center gap-2 text-teal-200 hover:text-white font-medium"
                  >
                    <FaPlus className="text-sm" />
                    Add Testimonial
                  </button>
                </div>
              </div>
            </section>

            {/* Media & Gallery */}
            <section style={styles.section}>
              <h2 style={styles.sectionHeader}>Company Media</h2>
              <div style={styles.sectionContent}>
                <div>
                  <label style={styles.label}>Company Logo</label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'logo')}
                    style={styles.input}
                    accept="image/*"
                  />
                  <p className="text-teal-100 text-sm mb-4">Upload your company logo (PNG, JPG, SVG)</p>
                </div>

                <div>
                  <label style={styles.label}>Office Gallery</label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileChange(e, 'galleryImages')}
                    style={styles.input}
                    accept="image/*"
                  />
                  <p className="text-teal-100 text-sm mb-4">Upload photos of your office, team events, workspace (multiple files allowed)</p>
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="px-6 py-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                Save Company Profile
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EmployerCompanyProfilePage;