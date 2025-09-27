import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json([{ id: "1", title: "Job 1", description: "Description 1" }]);
  } else if (req.method === "POST") {
    res.status(200).json({ message: "Job posted" });
  }
}