
import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

interface JobPosting {
  id: string;
  title: string;
  status: string;
}

const AdminJobApprovalPage: NextPage = () => {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<JobPosting[]>([]);

  useEffect(() => {
    // Mock fetch from API
    fetch("/api/admin/job-postings")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const handleApprove = (id: string) => {
    // Mock approve to API
    fetch("/api/admin/job-postings", {
      method: "PUT",
      body: JSON.stringify({ id, status: "approved" }),
    });
  };

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Job Approval</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Approve Job Postings
        </h1>
        <div className="max-w-md mx-auto space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">{job.title}</h2>
              <p>Status: {job.status}</p>
              {job.status !== "approved" && (
                <button onClick={() => handleApprove(job.id)} className="bg-blue-800 text-white p-2 rounded">
                  Approve
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminJobApprovalPage;
