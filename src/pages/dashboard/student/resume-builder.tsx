
import { useState, FormEvent } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import jsPDF from "jspdf";

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

const ResumeBuilderPage: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
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

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated" || session?.user?.role !== "Student") {
    router.push("/auth/signin");
    return null;
  }

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

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Resume Builder</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">Resume Builder</h1>
        <div className="flex justify-center mb-6">
          <button onClick={() => setStep(1)} className="mx-2 p-2 bg-gray-200 rounded">
            Personal
          </button>
          <button onClick={() => setStep(2)} className="mx-2 p-2 bg-gray-200 rounded">
            Education
          </button>
          <button onClick={() => setStep(3)} className="mx-2 p-2 bg-gray-200 rounded">
            Experience
          </button>
          <button onClick={() => setStep(4)} className="mx-2 p-2 bg-gray-200 rounded">
            Skills
          </button>
          <button onClick={() => setStep(5)} className="mx-2 p-2 bg-gray-200 rounded">
            Preview & Download
          </button>
          <button onClick={() => setStep(6)} className="mx-2 p-2 bg-gray-200 rounded">
            Upload CV
          </button>
        </div>
        {step === 1 && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2>Personal Information</h2>
            <input
              name="name"
              value={formState.personal.name}
              onChange={handlePersonalChange}
              placeholder="Name"
              className="w-full p-3 border rounded mb-2"
            />
            <input
              name="email"
              value={formState.personal.email}
              onChange={handlePersonalChange}
              placeholder="Email"
              className="w-full p-3 border rounded mb-2"
            />
            <input
              name="phone"
              value={formState.personal.phone}
              onChange={handlePersonalChange}
              placeholder="Phone"
              className="w-full p-3 border rounded mb-2"
            />
            <input
              name="address"
              value={formState.personal.address}
              onChange={handlePersonalChange}
              placeholder="Address"
              className="w-full p-3 border rounded mb-2"
            />
            <button onClick={() => setStep(2)} className="bg-blue-800 text-white p-3 rounded">
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2>Education</h2>
            {formState.education.map((edu, index) => (
              <div key={index}>
                <input
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  placeholder="Institution"
                  className="w-full p-3 border rounded mb-2"
                />
                <input
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  placeholder="Degree"
                  className="w-full p-3 border rounded mb-2"
                />
                <input
                  value={edu.year}
                  onChange={(e) => updateEducation(index, "year", e.target.value)}
                  placeholder="Year"
                  className="w-full p-3 border rounded mb-2"
                />
              </div>
            ))}
            <button onClick={addEducation} className="bg-blue-800 text-white p-3 rounded mb-2">
              Add Education
            </button>
            <button onClick={() => setStep(3)} className="bg-blue-800 text-white p-3 rounded">
              Next
            </button>
          </div>
        )}
        {step === 3 && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2>Experience</h2>
            {formState.experience.map((exp, index) => (
              <div key={index}>
                <input
                  value={exp.company}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                  placeholder="Company"
                  className="w-full p-3 border rounded mb-2"
                />
                <input
                  value={exp.role}
                  onChange={(e) => updateExperience(index, "role", e.target.value)}
                  placeholder="Role"
                  className="w-full p-3 border rounded mb-2"
                />
                <input
                  value={exp.duration}
                  onChange={(e) => updateExperience(index, "duration", e.target.value)}
                  placeholder="Duration"
                  className="w-full p-3 border rounded mb-2"
                />
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  placeholder="Description"
                  className="w-full p-3 border rounded mb-2"
                />
              </div>
            ))}
            <button onClick={addExperience} className="bg-blue-800 text-white p-3 rounded mb-2">
              Add Experience
            </button>
            <button onClick={() => setStep(4)} className="bg-blue-800 text-white p-3 rounded">
              Next
            </button>
          </div>
        )}
        {step === 4 && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2>Skills</h2>
            <input
              type="text"
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  addSkill((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = "";
                }
              }}
              placeholder="Add skill and press Enter"
              className="w-full p-3 border rounded mb-2"
            />
            <div className="flex flex-wrap">
              {formState.skills.map((skill, index) => (
                <span key={index} className="bg-gray-200 p-2 rounded m-1">
                  {skill}
                </span>
              ))}
            </div>
            <button onClick={() => setStep(5)} className="bg-blue-800 text-white p-3 rounded">
              Next
            </button>
          </div>
        )}
        {step === 5 && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2>Preview & Download</h2>
            <div className="border p-4 mb-4">
              <h3>{formState.personal.name}</h3>
              <p>{formState.personal.email} | {formState.personal.phone}</p>
              <p>{formState.personal.address}</p>
              <h4>Education</h4>
              {formState.education.map((edu, index) => (
                <p key={index}>{edu.degree} from {edu.institution}, {edu.year}</p>
              ))}
              <h4>Experience</h4>
              {formState.experience.map((exp, index) => (
                <p key={index}>{exp.role} at {exp.company}, {exp.duration}: {exp.description}</p>
              ))}
              <h4>Skills</h4>
              <ul>
                {formState.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <button onClick={generatePDF} className="bg-blue-800 text-white p-3 rounded">
              Download PDF
            </button>
          </div>
        )}
        {step === 6 && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2>Upload Existing CV</h2>
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleUpload}
              className="w-full p-3 border rounded mb-2"
            />
            {formState.uploadedCV && <p>Uploaded: {formState.uploadedCV.name}</p>}
          </div>
        )}
      </div>
    </>
  );
};

export default ResumeBuilderPage;