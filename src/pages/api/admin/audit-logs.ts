import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth-options";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "Admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // Mock audit log retrieval
    const logs = [{ id: "1", action: "User created", timestamp: "2025-09-21T19:54:00Z" }];
    return res.status(200).json(logs);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
