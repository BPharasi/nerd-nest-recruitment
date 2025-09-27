
import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

interface Challenge {
  id: string;
  title: string;
  status: string;
}

const AdminSkillModerationPage: NextPage = () => {
  const { data: session } = useSession();
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    // Mock fetch from API
    fetch("/api/admin/skill-challenges")
      .then((res) => res.json())
      .then((data) => setChallenges(data));
  }, []);

  const handleApprove = (id: string) => {
    // Mock approve to API
    fetch("/api/admin/skill-challenges", {
      method: "PUT",
      body: JSON.stringify({ id, status: "approved" }),
    });
  };

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Skill Challenge Moderation</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Moderate Skill Challenges & Live Tests
        </h1>
        <div className="max-w-md mx-auto space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">{challenge.title}</h2>
              <p>Status: {challenge.status}</p>
              {challenge.status !== "approved" && (
                <button onClick={() => handleApprove(challenge.id)} className="bg-blue-800 text-white p-2 rounded">
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

export default AdminSkillModerationPage;
