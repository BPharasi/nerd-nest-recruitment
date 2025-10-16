import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth-options";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "Employer") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    const { jobId } = req.body;

    try {
      // In a real app, update the database to close the job posting
      // Mark job as filled/closed
      // Notify all pending applicants that the position has been filled
      
      return res.status(200).json({ 
        message: "Job posting closed successfully",
        jobId
      });
    } catch (error) {
      return res.status(500).json({ error: "Failed to close job posting" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
