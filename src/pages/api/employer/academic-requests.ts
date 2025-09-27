import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "employer") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    // Mock academic mark access request
    const { studentId } = req.body;
    return res.status(200).json({ message: "Request submitted", studentId });
  } else if (req.method === "GET") {
    // Mock request status
    const requests = [{ id: "1", studentId: "1", status: "Pending" }];
    return res.status(200).json(requests);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
