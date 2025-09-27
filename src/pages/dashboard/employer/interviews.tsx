
import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

interface InterviewFormState {
  candidateId: string;
  date: string;
  time: string;
}

const EmployerInterviewManagementPage: NextPage = () => {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<InterviewFormState>({
    candidateId: "",
    date: "",
    time: "",
  });

  const handleSchedule = () => {
    // Mock schedule to API
    fetch("/api/employer/interviews", {
      method: "POST",
      body: JSON.stringify(formState),
    });
  };

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Interview Management</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Manage Interview Scheduling
        </h1>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <input
            value={formState.candidateId}
            onChange={(e) => setFormState((prev) => ({ ...prev, candidateId: e.target.value }))}
            placeholder="Candidate ID"
            className="w-full p-3 border rounded mb-2"
          />
          <input
            type="date"
            value={formState.date}
            onChange={(e) => setFormState((prev) => ({ ...prev, date: e.target.value }))}
            className="w-full p-3 border rounded mb-2"
          />
          <input
            type="time"
            value={formState.time}
            onChange={(e) => setFormState((prev) => ({ ...prev, time: e.target.value }))}
            className="w-full p-3 border rounded mb-2"
          />
          <button onClick={handleSchedule} className="bg-blue-800 text-white p-3 rounded">
            Schedule Interview
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployerInterviewManagementPage;
