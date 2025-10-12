
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth-options";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "Student") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // Mock notification retrieval
    const notifications = [{ id: "1", message: "New job match!", read: false }];
    return res.status(200).json(notifications);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
