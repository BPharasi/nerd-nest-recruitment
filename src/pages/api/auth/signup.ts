import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  // For now, allow sign-up without session (to be restricted later, e.g., admin-only)
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Mock user creation
  if (role === "admin" && !session) {
    return res.status(403).json({ error: "Admin role requires authentication" });
  }

  // Simulate user creation
  const user = { id: Date.now().toString(), email, role };
  return res.status(201).json({ message: "User created successfully", user });
}
