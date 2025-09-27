
import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

interface MessageFormState {
  candidateId: string;
  message: string;
}

const EmployerCommunicationPage: NextPage = () => {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<MessageFormState>({
    candidateId: "",
    message: "",
  });

  const handleSend = () => {
    // Mock send to API
    fetch("/api/employer/communication", {
      method: "POST",
      body: JSON.stringify(formState),
    });
  };

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Communicate with Candidates</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Communicate with Candidates
        </h1>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <input
            value={formState.candidateId}
            onChange={(e) => setFormState((prev) => ({ ...prev, candidateId: e.target.value }))}
            placeholder="Candidate ID"
            className="w-full p-3 border rounded mb-2"
          />
          <textarea
            value={formState.message}
            onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
            placeholder="Message"
            className="w-full p-3 border rounded mb-2"
          />
          <button onClick={handleSend} className="bg-blue-800 text-white p-3 rounded">
            Send Message
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployerCommunicationPage;
