
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Application {
  id: string;
  jobTitle: string;
  status: string;
}

const StudentApplicationsPage: NextPage = () => {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    // Mock fetch from API
    fetch("/api/student/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, []);

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Track Applications</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Track Applications
        </h1>
        <div className="max-w-md mx-auto space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">{app.jobTitle}</h2>
              <p>Status: {app.status}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentApplicationsPage;
