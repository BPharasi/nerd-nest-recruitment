
import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

interface Interview {
  id: string;
  candidateId: string;
  employerId: string;
  date: string;
}

const AdminInterviewOversightPage: NextPage = () => {
  const { data: session } = useSession();
  const [interviews, setInterviews] = useState<Interview[]>([]);

  useEffect(() => {
    // Mock fetch from API
    fetch("/api/admin/interviews")
      .then((res) => res.json())
      .then((data) => setInterviews(data));
  }, []);

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Interview Oversight</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Oversee Interview Scheduling
        </h1>
        <div className="max-w-md mx-auto space-y-4">
          {interviews.map((interview) => (
            <div key={interview.id} className="bg-white p-4 rounded-lg shadow-md">
              <p>Candidate ID: {interview.candidateId}</p>
              <p>Employer ID: {interview.employerId}</p>
              <p>Date: {interview.date}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminInterviewOversightPage;
