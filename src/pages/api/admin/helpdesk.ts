
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    // Mock helpdesk ticket resolution
    const { ticketId, resolution } = req.body;
    return res.status(200).json({ message: "Ticket resolved", ticketId, resolution });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
