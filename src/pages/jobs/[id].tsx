import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Mock job detail data (replace with API fetch)
const mockJobDetail = {
  title: "Brand Designer",
  department: "Design Team",
  location: "Zagreb, Grad Zagreb",
  workPlace: "Zagreb Office",
  employmentType: "Full-Time",
  minExperience: "Mid-level",
  about: "Company.name is a leading provider of advanced sports insights...",
  role: "Exciting new things ahead for our Design Team...",
  // Add full text from the design
};

const JobDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Job Detail</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/jobs" className="text-blue-800 hover:underline mb-4 block">
            ← Job Openings
          </Link>
          <h1 className="text-3xl font-bold mb-4">{mockJobDetail.title}</h1>
          <Link href="/jobs/apply" className="bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700 mb-4 block w-fit">
            Apply for the position →
          </Link>
          <p>{mockJobDetail.department} · {mockJobDetail.location}</p>
          <p>Place of work: {mockJobDetail.workPlace}</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p>Location: {mockJobDetail.location}</p>
              <p>Department: {mockJobDetail.department}</p>
            </div>
            <div>
              <p>Employment Type: {mockJobDetail.employmentType}</p>
              <p>Minimum Experience: {mockJobDetail.minExperience}</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold mt-6">ABOUT</h2>
          <p className="mt-2">{mockJobDetail.about}</p>
          <h2 className="text-2xl font-bold mt-6">ABOUT THE ROLE</h2>
          <p className="mt-2">{mockJobDetail.role}</p>
          {/* Add more sections like tasks, requirements, offers from the design */}
        </div>
      </div>
    </>
  );
};

export default JobDetailPage;