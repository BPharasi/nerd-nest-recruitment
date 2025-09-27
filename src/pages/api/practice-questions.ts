
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "student") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // Mock practice question retrieval
    const practiceQuestion = { id: "1", question: "What is a closure in JavaScript?", type: "coding" };
    return res.status(200).json(practiceQuestion);
  } else if (req.method === "POST") {
    // Mock practice question submission
    const { questionId, answer } = req.body;
    return res.status(200).json({ message: "Answer submitted", questionId, answer });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
