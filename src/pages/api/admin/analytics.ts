
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // Mock analytics data
    const analytics = { totalUsers: 100, activeJobs: 50 };
    return res.status(200).json(analytics);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
