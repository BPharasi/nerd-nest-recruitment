import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // Mock user list retrieval
    const users = [{ id: "1", name: "User1", role: "student" }];
    return res.status(200).json(users);
  } else if (req.method === "POST") {
    // Mock user creation
    const { name, role } = req.body;
    return res.status(200).json({ message: "User created", name, role });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
