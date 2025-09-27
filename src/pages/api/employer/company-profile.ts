import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "employer") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    // Mock company profile update
    const { name, description } = req.body;
    return res.status(200).json({ message: "Profile updated", name, description });
  } else if (req.method === "GET") {
    // Mock company profile retrieval
    const profile = { name: "Company Name", description: "Company Description" };
    return res.status(200).json(profile);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
