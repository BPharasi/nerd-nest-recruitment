
import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

interface ProfileFormState {
  bio: string;
  skills: string[];
  interests: string[];
  qualifications: string[];
}

const StudentProfilePage: NextPage = () => {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<ProfileFormState>({
    bio: "",
    skills: [],
    interests: [],
    qualifications: [],
  });

  const handleSave = () => {
    // Mock save to API
    fetch("/api/student/profile", {
      method: "POST",
      body: JSON.stringify(formState),
    });
  };

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Student Profile Setup</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Profile Setup
        </h1>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <textarea
            value={formState.bio}
            onChange={(e) => setFormState((prev) => ({ ...prev, bio: e.target.value }))}
            placeholder="Bio"
            className="w-full p-3 border rounded mb-2"
          />
          <input
            type="text"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                setFormState((prev) => ({ ...prev, skills: [...prev.skills, (e.target as HTMLInputElement).value] }));
                (e.target as HTMLInputElement).value = "";
              }
            }}
            placeholder="Add skill and press Enter"
            className="w-full p-3 border rounded mb-2"
          />
          <div className="flex flex-wrap mb-4">
            {formState.skills.map((skill, index) => (
              <span key={index} className="bg-gray-200 p-2 rounded m-1">
                {skill}
              </span>
            ))}
          </div>
          {/* Similar inputs for interests and qualifications */}
          <button onClick={handleSave} className="bg-blue-800 text-white p-3 rounded">
            Save Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default StudentProfilePage;
