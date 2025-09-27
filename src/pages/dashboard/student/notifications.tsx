
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Notification {
  id: string;
  message: string;
  date: string;
}

const StudentNotificationsPage: NextPage = () => {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Mock fetch from API
    fetch("/api/student/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data));
  }, []);

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Notifications</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Notifications
        </h1>
        <div className="max-w-md mx-auto space-y-4">
          {notifications.map((notif) => (
            <div key={notif.id} className="bg-white p-4 rounded-lg shadow-md">
              <p>{notif.message}</p>
              <p>{notif.date}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentNotificationsPage;
