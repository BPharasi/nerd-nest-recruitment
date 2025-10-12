import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth-options";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "Employer") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    // Mock job posting creation
    const { title, description } = req.body;
    return res.status(200).json({ message: "Job posted", title, description });
  } else if (req.method === "GET") {
    // Mock job posting list
    const postings = [{ id: "1", title: "Developer", status: "Pending" }];
    return res.status(200).json(postings);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
