import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth-options";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "Admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    // Mock academic data sync
    const { studentId, data } = req.body;
    return res.status(200).json({ message: "Academic data synced", studentId, data });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
