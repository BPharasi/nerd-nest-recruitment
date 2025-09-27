import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Mock upload (replace with actual storage like S3 or filesystem)
    // Parse req.body or req.formData for the file
    res.status(200).json({ message: "CV uploaded successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}