import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

interface AnnouncementFormState {
  title: string;
  content: string;
}

const AdminAnnouncementsPage: NextPage = () => {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<AnnouncementFormState>({
    title: "",
    content: "",
  });

  const handlePublish = () => {
    // Mock publish to API
    fetch("/api/admin/announcements", {
      method: "POST",
      body: JSON.stringify(formState),
    });
  };

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Publish Announcements</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Publish Announcements
        </h1>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <input
            value={formState.title}
            onChange={(e) => setFormState((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Title"
            className="w-full p-3 border rounded mb-2"
          />
          <textarea
            value={formState.content}
            onChange={(e) => setFormState((prev) => ({ ...prev, content: e.target.value }))}
            placeholder="Content"
            className="w-full p-3 border rounded mb-2"
          />
          <button onClick={handlePublish} className="bg-blue-800 text-white p-3 rounded">
            Publish
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminAnnouncementsPage;
