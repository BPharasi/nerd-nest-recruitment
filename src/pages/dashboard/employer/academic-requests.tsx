import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

interface AcademicRequestFormState {
  candidateId: string;
  consent: boolean;
}

const EmployerAcademicRequestsPage: NextPage = () => {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<AcademicRequestFormState>({
    candidateId: "",
    consent: false,
  });

  const handleRequest = () => {
    // Mock request to API
    fetch("/api/employer/academic-requests", {
      method: "POST",
      body: JSON.stringify(formState),
    });
  };

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Academic Data Requests</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Request Academic Data
        </h1>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <input
            value={formState.candidateId}
            onChange={(e) => setFormState((prev) => ({ ...prev, candidateId: e.target.value }))}
            placeholder="Candidate ID"
            className="w-full p-3 border rounded mb-2"
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formState.consent}
              onChange={(e) => setFormState((prev) => ({ ...prev, consent: e.target.checked }))}
              className="mr-2"
            />
            Consent Obtained
          </label>
          <button onClick={handleRequest} className="bg-blue-800 text-white p-3 rounded">
            Request Data
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployerAcademicRequestsPage;
