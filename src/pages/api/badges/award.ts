import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth-options";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || session.user?.role !== "Employer") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    const { studentId, badgeName, challengeId, challengeTitle } = req.body;

    try {
      // In a real app, save to database
      // For now, we'll simulate the award being saved
      
      // Mock badge award
      const badge = {
        id: Math.random().toString(36),
        name: badgeName,
        challengeId,
        challengeTitle,
        awardedBy: session.user.name,
        awardedAt: new Date().toISOString(),
        icon: getBadgeIcon(badgeName),
        level: getBadgeLevel(badgeName),
        color: getBadgeColor(badgeName)
      };

      return res.status(200).json({ 
        message: "Badge awarded successfully",
        badge
      });
    } catch (error) {
      return res.status(500).json({ error: "Failed to award badge" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}

function getBadgeIcon(badgeName: string): string {
  const icons: Record<string, string> = {
    'Excellence Award': '🏆',
    'Code Master': '💻',
    'Design Excellence': '🎨',
    'Innovation Award': '💡',
    'Performance Champion': '🚀',
    'React Master': '⚛️',
    'TypeScript Expert': '📘'
  };
  return icons[badgeName] || '🏅';
}

function getBadgeLevel(badgeName: string): string {
  const levels: Record<string, string> = {
    'Excellence Award': 'Advanced',
    'Code Master': 'Advanced',
    'Design Excellence': 'Intermediate',
    'Innovation Award': 'Advanced',
    'Performance Champion': 'Advanced',
    'React Master': 'Intermediate',
    'TypeScript Expert': 'Advanced',
  };
  return levels[badgeName] || 'Beginner';
}

function getBadgeColor(badgeName: string): string {
  const colors: Record<string, string> = {
    'Excellence Award': 'bg-yellow-500',
    'Code Master': 'bg-blue-500',
    'Design Excellence': 'bg-purple-500',
    'Innovation Award': 'bg-green-500',
    'Performance Champion': 'bg-red-500',
    'React Master': 'bg-cyan-500',
    'TypeScript Expert': 'bg-indigo-500',
  };
  return colors[badgeName] || 'bg-gray-500';
}
