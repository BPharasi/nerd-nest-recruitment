import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth-options";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "Admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // Mock interview oversight
    const interviews = [{ id: "1", studentId: "1", status: "Scheduled" }];
    return res.status(200).json(interviews);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
