import type { NextApiRequest, NextApiResponse } from "next";
import { AcademicData } from "@/types/AcademicData";


export default function handler(req: NextApiRequest, res: NextApiResponse<AcademicData | { message: string }>) {
  if (req.method === "GET") {
    res.status(200).json({
      studentId: "123",
      marks: { "CS101": 85, "MATH201": 78 },
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}