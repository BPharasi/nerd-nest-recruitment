import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
}

const StudentSkillsChallengesPage: NextPage = () => {
  const { data: session } = useSession();
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  // Mock fetch
  useEffect(() => {
    fetch("/api/student/skills-challenges")
      .then((res) => res.json())
      .then((data) => setChallenges(data));
  }, []);

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Live Skills Challenges</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Live Skills Challenges
        </h1>
        <div className="max-w-md mx-auto space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">{challenge.title}</h2>
              <p>{challenge.description}</p>
              <p>Time Limit: {challenge.timeLimit} minutes</p>
              <button className="bg-blue-800 text-white p-2 rounded">
                Start Challenge
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentSkillsChallengesPage;