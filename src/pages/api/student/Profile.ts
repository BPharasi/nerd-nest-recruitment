
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "student") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    // Mock profile update
    const { name, bio } = req.body;
    // Simulate saving to database
    return res.status(200).json({ message: "Profile updated", data: { name, bio } });
  } else if (req.method === "GET") {
    // Mock profile retrieval
    const profile = { name: "Student Name", bio: "Student Bio" };
    return res.status(200).json(profile);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
