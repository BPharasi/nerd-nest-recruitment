import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth-options";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "Admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // Mock job posting list
    const postings = [{ id: "1", title: "Developer", approved: false }];
    return res.status(200).json(postings);
  } else if (req.method === "POST") {
    // Mock job approval
    const { jobId, approved } = req.body;
    return res.status(200).json({ message: "Job approved", jobId, approved });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
