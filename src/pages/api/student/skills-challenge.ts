
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth-options";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "Student") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    // Mock skills challenge submission
    const { challengeId, score } = req.body;
    return res.status(200).json({ message: "Challenge submitted", challengeId, score });
  } else if (req.method === "GET") {
    // Mock available challenges
    const challenges = [{ id: "1", title: "Coding Test" }];
    return res.status(200).json(challenges);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}