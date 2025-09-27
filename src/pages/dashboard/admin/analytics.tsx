
import { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface AnalyticsData {
  placementRate: number;
  engagement: number;
}

const AdminAnalyticsPage: NextPage = () => {
  const { data: session } = useSession();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    // Mock fetch from API
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then((data) => setAnalytics(data));
  }, []);

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Analytics & Records</title>
      </Head>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Produce Analytics & Records
        </h1>
        {analytics && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <p>Placement Rate: {analytics.placementRate}%</p>
            <p>Engagement: {analytics.engagement}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminAnalyticsPage;
