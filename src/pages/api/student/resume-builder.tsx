import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "student") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // Mock resume template retrieval
    const resumeTemplate = {
      id: "1",
      personalInfo: { name: "Student Name", email: "student@ufs.ac.za" },
      education: [{ degree: "BSc Computer Science", year: "2025" }],
      experience: [],
    };
    return res.status(200).json(resumeTemplate);
  } else if (req.method === "POST") {
    // Mock resume update
    const { section, data } = req.body;
    return res.status(200).json({ message: "Resume updated", section, data });
  } else if (req.method === "PUT") {
    // Mock resume generation
    const { format } = req.body;
    return res.status(200).json({ message: "Resume generated", format, downloadUrl: "/api/student/resume/1.pdf" });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
