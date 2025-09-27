import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

interface CompanyProfileFormState {
  name: string;
  description: string;
  logo: File | null;
}

const EmployerCompanyProfilePage: NextPage = () => {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<CompanyProfileFormState>({
    name: "",
    description: "",
    logo: null,
  });

  const handleSave = () => {
    // Mock save to API
    fetch("/api/employer/company-profile", {
      method: "POST",
      body: JSON.stringify(formState),
    });
  };

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Company Profile</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Manage Company Profile
        </h1>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <input
            value={formState.name}
            onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Company Name"
            className="w-full p-3 border rounded mb-2"
          />
          <textarea
            value={formState.description}
            onChange={(e) => setFormState((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Description"
            className="w-full p-3 border rounded mb-2"
          />
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFormState((prev) => ({ ...prev, logo: e.target.files![0] }));
              }
            }}
            className="w-full p-3 border rounded mb-2"
          />
          <button onClick={handleSave} className="bg-blue-800 text-white p-3 rounded">
            Save Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployerCompanyProfilePage;