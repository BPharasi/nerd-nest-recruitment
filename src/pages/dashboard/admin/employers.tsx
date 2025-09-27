
import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

interface Employer {
  id: string;
  name: string;
  status: string;
}

const AdminEmployerVerificationPage: NextPage = () => {
  const { data: session } = useSession();
  const [employers, setEmployers] = useState<Employer[]>([]);

  useEffect(() => {
    // Mock fetch from API
    fetch("/api/admin/employers")
      .then((res) => res.json())
      .then((data) => setEmployers(data));
  }, []);

  const handleVerify = (id: string) => {
    // Mock verify to API
    fetch("/api/admin/employer-verification", {
      method: "PUT",
      body: JSON.stringify({ id, status: "verified" }),
    });
  };

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Employer Verification</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Verify Employer Organizations
        </h1>
        <div className="max-w-md mx-auto space-y-4">
          {employers.map((employer) => (
            <div key={employer.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">{employer.name}</h2>
              <p>Status: {employer.status}</p>
              {employer.status !== "verified" && (
                <button onClick={() => handleVerify(employer.id)} className="bg-blue-800 text-white p-2 rounded">
                  Verify
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminEmployerVerificationPage;
