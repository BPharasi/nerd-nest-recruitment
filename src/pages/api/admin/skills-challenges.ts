import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth-options";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "Admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // Mock skill challenge list
    const challenges = [{ id: "1", title: "Coding Test", approved: true }];
    return res.status(200).json(challenges);
  } else if (req.method === "POST") {
    // Mock challenge moderation
    const { challengeId, approved } = req.body;
    return res.status(200).json({ message: "Challenge moderated", challengeId, approved });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}