import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // Mock employer list retrieval
    const employers = [{ id: "1", name: "Company1", verified: true }];
    return res.status(200).json(employers);
  } else if (req.method === "POST") {
    // Mock employer verification
    const { employerId, verified } = req.body;
    return res.status(200).json({ message: "Employer verified", employerId, verified });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
