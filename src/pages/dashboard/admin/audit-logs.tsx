
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface AuditLog {
  id: string;
  action: string;
  userId: string;
  date: string;
}

const AdminDataGovernancePage: NextPage = () => {
  const { data: session } = useSession();
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    // Mock fetch from API
    fetch("/api/admin/audit-logs")
      .then((res) => res.json())
      .then((data) => setLogs(data));
  }, []);

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Data Governance & Auditing</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Data Governance & Auditing
        </h1>
        <div className="max-w-md mx-auto space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="bg-white p-4 rounded-lg shadow-md">
              <p>Action: {log.action}</p>
              <p>User ID: {log.userId}</p>
              <p>Date: {log.date}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDataGovernancePage;
