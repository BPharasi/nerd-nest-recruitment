import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

interface AcademicRequest {
  id: string;
  candidateId: string;
  employerId: string;
  consent: boolean;
}

const AdminAcademicDataPage: NextPage = () => {
  const { data: session } = useSession();
  const [requests, setRequests] = useState<AcademicRequest[]>([]);

  useEffect(() => {
    // Mock fetch from API
    fetch("/api/admin/academic-requests")
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, []);

  const handleApprove = (id: string) => {
    // Mock approve to API
    fetch("/api/admin/academic-requests", {
      method: "PUT",
      body: JSON.stringify({ id, consent: true }),
    });
  };

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Academic Data Management</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Manage Academic Data Sync & Consent
        </h1>
        <div className="max-w-md mx-auto space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="bg-white p-4 rounded-lg shadow-md">
              <p>Candidate ID: {request.candidateId}</p>
              <p>Employer ID: {request.employerId}</p>
              <p>Consent: {request.consent ? "Approved" : "Pending"}</p>
              {!request.consent && (
                <button onClick={() => handleApprove(request.id)} className="bg-blue-800 text-white p-2 rounded">
                  Approve Consent
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminAcademicDataPage;
