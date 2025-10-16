import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth-options";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "Employer") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    const { applicantId, status } = req.body;

    try {
      // In a real app, update the database
      // Mock response for now
      
      // Send notification to student if status changes
      if (status === 'interview_scheduled') {
        // Send interview notification
        await fetch('/api/notifications/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recipientId: applicantId,
            type: 'interview_scheduled',
            title: 'Interview Scheduled! 📅',
            message: 'Your interview has been scheduled. Please check your dashboard for details.'
          })
        });
      } else if (status === 'offer_made') {
        // Send job offer notification
        await fetch('/api/notifications/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recipientId: applicantId,
            type: 'job_offer',
            title: 'Job Offer Received! 🎉',
            message: 'Congratulations! You have received a job offer. Please review the details in your dashboard.'
          })
        });
      }

      return res.status(200).json({ 
        message: "Status updated successfully",
        applicantId,
        status
      });
    } catch (error) {
      return res.status(500).json({ error: "Failed to update status" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
