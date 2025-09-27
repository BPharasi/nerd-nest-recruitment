
import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

interface JobPostingFormState {
  title: string;
  description: string;
  requirements: string;
  location: string;
  type: string;
}

const EmployerJobPostingsPage: NextPage = () => {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<JobPostingFormState>({
    title: "",
    description: "",
    requirements: "",
    location: "",
    type: "",
  });

  const handlePost = () => {
    // Mock post to API
    fetch("/api/employer/job-postings", {
      method: "POST",
      body: JSON.stringify(formState),
    });
  };

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Job Postings</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Manage Job Postings
        </h1>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <input
            value={formState.title}
            onChange={(e) => setFormState((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Job Title"
            className="w-full p-3 border rounded mb-2"
          />
          <textarea
            value={formState.description}
            onChange={(e) => setFormState((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Description"
            className="w-full p-3 border rounded mb-2"
          />
          <textarea
            value={formState.requirements}
            onChange={(e) => setFormState((prev) => ({ ...prev, requirements: e.target.value }))}
            placeholder="Requirements"
            className="w-full p-3 border rounded mb-2"
          />
          <input
            value={formState.location}
            onChange={(e) => setFormState((prev) => ({ ...prev, location: e.target.value }))}
            placeholder="Location"
            className="w-full p-3 border rounded mb-2"
          />
          <select
            value={formState.type}
            onChange={(e) => setFormState((prev) => ({ ...prev, type: e.target.value }))}
            className="w-full p-3 border rounded mb-2"
          >
            <option>Employment Type</option>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
          </select>
          <button onClick={handlePost} className="bg-blue-800 text-white p-3 rounded">
            Post Job
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployerJobPostingsPage;
