import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth-options";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "Employer") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    // Mock message sending
    const { candidateId, message } = req.body;
    return res.status(200).json({ message: "Message sent", candidateId, content: message });
  } else if (req.method === "GET") {
    // Mock communication log retrieval
    const communications = [{ id: "1", candidateId: "1", message: "Interview scheduled", timestamp: "2025-09-21T20:25:00Z" }];
    return res.status(200).json(communications);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
