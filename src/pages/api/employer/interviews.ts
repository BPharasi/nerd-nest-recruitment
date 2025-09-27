import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "employer") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    // Mock interview scheduling
    const { candidateId, time } = req.body;
    return res.status(200).json({ message: "Interview scheduled", candidateId, time });
  } else if (req.method === "GET") {
    // Mock interview list
    const interviews = [{ id: "1", candidateId: "1", time: "2025-09-22T10:00:00Z" }];
    return res.status(200).json(interviews);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
