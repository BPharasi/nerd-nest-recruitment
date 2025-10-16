import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth-options";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "Employer") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    const { studentId, challengeId, challengeTitle, companyName, message } = req.body;

    try {
      // In a real app, save to database and send notification
      // For now, we'll simulate the notification being created
      
      const notification = {
        id: Math.random().toString(36),
        type: 'interview_offer',
        title: 'Interview Opportunity! 🎉',
        message: message,
        studentId,
        challengeId,
        challengeTitle,
        companyName,
        createdAt: new Date().toISOString(),
        read: false,
        actionRequired: true,
        metadata: {
          interviewType: 'skills_challenge_based',
          status: 'pending'
        }
      };

      return res.status(200).json({ 
        message: "Interview offer sent successfully",
        notification
      });
    } catch (error) {
      return res.status(500).json({ error: "Failed to send interview offer" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
