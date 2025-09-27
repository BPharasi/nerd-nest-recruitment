
import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

interface Candidate {
  id: string;
  name: string;
  skills: string[];
  gpa: number;
}

const EmployerCandidateSearchPage: NextPage = () => {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const handleSearch = () => {
    // Mock search from API
    fetch(`/api/employer/candidates?search=${search}`)
      .then((res) => res.json())
      .then((data) => setCandidates(data));
  };

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Candidate Search</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Search & Filter Candidates
        </h1>
        <div className="max-w-md mx-auto">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by skills, GPA, etc."
            className="w-full p-3 border rounded mb-2"
          />
          <button onClick={handleSearch} className="bg-blue-800 text-white p-3 rounded">
            Search
          </button>
          <div className="space-y-4 mt-4">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold">{candidate.name}</h2>
                <p>Skills: {candidate.skills.join(", ")}</p>
                <p>GPA: {candidate.gpa}</p>
                <button className="bg-blue-800 text-white p-2 rounded">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerCandidateSearchPage;
