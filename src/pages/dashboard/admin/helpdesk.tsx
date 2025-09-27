
import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

interface Ticket {
  id: string;
  userId: string;
  issue: string;
  status: string;
}

const AdminHelpdeskPage: NextPage = () => {
  const { data: session } = useSession();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    // Mock fetch from API
    fetch("/api/admin/helpdesk")
      .then((res) => res.json())
      .then((data) => setTickets(data));
  }, []);

  const handleResolve = (id: string) => {
    // Mock resolve to API
    fetch("/api/admin/helpdesk", {
      method: "PUT",
      body: JSON.stringify({ id, status: "resolved" }),
    });
  };

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Helpdesk & Support</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Operate Helpdesk & Support
        </h1>
        <div className="max-w-md mx-auto space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white p-4 rounded-lg shadow-md">
              <p>User ID: {ticket.userId}</p>
              <p>Issue: {ticket.issue}</p>
              <p>Status: {ticket.status}</p>
              {ticket.status !== "resolved" && (
                <button onClick={() => handleResolve(ticket.id)} className="bg-blue-800 text-white p-2 rounded">
                  Resolve
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminHelpdeskPage;
