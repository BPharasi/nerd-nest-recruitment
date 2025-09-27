
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "student") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // Mock application list retrieval
    const applications = [{ id: "1", jobTitle: "Developer", status: "Applied" }];
    return res.status(200).json(applications);
  } else if (req.method === "POST") {
    // Mock application submission
    const { jobId } = req.body;
    return res.status(200).json({ message: "Application submitted", jobId });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}