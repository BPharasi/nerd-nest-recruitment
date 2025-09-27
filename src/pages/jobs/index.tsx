import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

// Mock job data (replace with API fetch)
const mockJobs = [
  {
    id: "1",
    title: "Brand Designer",
    department: "Design Team",
    location: "Zagreb, Grad Zagreb",
    workPlace: "Zagreb Office",
  },
  // Add more jobs as needed
];

const JobOpeningsPage: NextPage = () => {
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setFilteredJobs(
      mockJobs.filter((job) =>
        job.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Job Openings</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
            Job Openings
          </h1>
          <div className="flex items-center mb-6">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
              placeholder="Search for jobs"
            />
            <button className="ml-2 bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700">
              Search →
            </button>
          </div>
          <div className="space-y-4 mb-6">
            <button className="w-full bg-gray-200 p-3 rounded-md hover:bg-gray-300 flex justify-between items-center">
              Location <span>▼</span>
            </button>
            <button className="w-full bg-gray-200 p-3 rounded-md hover:bg-gray-300 flex justify-between items-center">
              Department <span>▼</span>
            </button>
            <button className="w-full bg-gray-200 p-3 rounded-md hover:bg-gray-300 flex justify-between items-center">
              Employment Type <span>▼</span>
            </button>
            <button className="w-full bg-gray-200 p-3 rounded-md hover:bg-gray-300 flex justify-between items-center">
              Minimum Experience <span>▼</span>
            </button>
          </div>
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold">{job.title}</h2>
                <p>{job.department} · {job.location}</p>
                <p>Place of work: {job.workPlace}</p>
                <Link href={`/jobs/${job.id}`} className="text-purple-600 hover:underline">
                  More information →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobOpeningsPage;