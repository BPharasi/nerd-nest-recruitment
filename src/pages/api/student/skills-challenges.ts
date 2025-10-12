import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth-options";

interface Badge {
  name: string;
  description?: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  timeLimit?: number;
  skillsTested: string[];
  format: string;
  badges: Badge[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface ChallengeCategory {
  name: string;
  description: string;
  challenges: Challenge[];
}

const mockChallenges: ChallengeCategory[] = [
  {
    name: "Developer-Focused Challenges",
    description: "Technical Skill Showcase emphasizing coding, engineering, and functional solutions",
    challenges: [
      {
        id: "dev1",
        title: "Solar-Powered Irrigation Optimizer",
        description: "Design and prototype a low-cost irrigation system using Arduino sensors to automate watering based on soil moisture and weather data.",
        skillsTested: ["Hardware integration", "IoT programming", "problem-solving"],
        format: "Code repository + video demo (GitHub + 2-min video)",
        badges: [
          { name: "Eco-Innovator" },
          { name: "Hardware Hero" }
        ],
        difficulty: "Intermediate",
        timeLimit: 120
      },
      {
        id: "dev2",
        title: "Personal Finance Tracker App",
        description: "Create a mobile app that helps users track their income, expenses, and savings goals with visual analytics.",
        skillsTested: ["Mobile development", "data visualization", "user authentication"],
        format: "App prototype + user guide",
        badges: [
          { name: "Finance Guru" },
          { name: "App Innovator" }
        ],
        difficulty: "Intermediate",
        timeLimit: 150
      },
      {
        id: "dev3",
        title: "AI-Powered Resume Scanner",
        description: "Build a tool that uses NLP to analyze resumes and provide feedback on skills matching and improvement areas.",
        skillsTested: ["Natural Language Processing", "machine learning", "data analysis"],
        format: "Code repository + demo video",
        badges: [
          { name: "AI Specialist" },
          { name: "Data Detective" }
        ],
        difficulty: "Advanced",
        timeLimit: 180
      },
      {
        id: "dev4",
        title: "Data Structures Implementation Challenge",
        description: "Implement and optimize common data structures (Binary Trees, Hash Tables, Graphs) with practical applications and performance analysis.",
        skillsTested: ["Data Structures", "Algorithm Analysis", "Optimization"],
        format: "Code repository + performance report",
        badges: [
          { name: "Algorithm Ace" },
          { name: "Performance Pro" }
        ],
        difficulty: "Advanced",
        timeLimit: 180
      },
      {
        id: "dev5",
        title: "Graph Algorithm Visualizer",
        description: "Create an interactive web app that visualizes common graph algorithms (Dijkstra's, DFS, BFS) with step-by-step execution.",
        skillsTested: ["Graph Algorithms", "Data Visualization", "Web Development"],
        format: "Live demo + source code",
        badges: [
          { name: "Algorithm Artist" },
          { name: "Visual Virtuoso" }
        ],
        difficulty: "Intermediate",
        timeLimit: 150
      },
      {
        id: "dev6",
        title: "Full-Stack E-commerce Platform",
        description: "Build a modern e-commerce platform with React, Next.js, and a headless CMS, including authentication and payment integration.",
        skillsTested: ["Full-stack Development", "API Design", "State Management"],
        format: "Deployed app + documentation",
        badges: [
          { name: "Full-Stack Master" },
          { name: "E-commerce Expert" }
        ],
        difficulty: "Advanced",
        timeLimit: 240
      },
      {
        id: "dev7",
        title: "Real-time Collaborative Code Editor",
        description: "Develop a web-based code editor that supports real-time collaboration, syntax highlighting, and version control integration.",
        skillsTested: ["WebSocket", "Frontend Development", "Operational Transformation"],
        format: "Working prototype + technical writeup",
        badges: [
          { name: "Collaboration Champion" },
          { name: "Real-time Wizard" }
        ],
        difficulty: "Advanced",
        timeLimit: 210
      }
    ]
  },
  {
    name: "BIS-Focused Challenges",
    description: "Business Scenario Simulations mirroring real business problems",
    challenges: [
      {
        id: "bis1",
        title: "Retail Inventory Optimization",
        description: "Analyze a dataset of sales and stock levels to design an automated reordering system for a retail chain, including cost-benefit analysis.",
        skillsTested: ["Data analysis", "process modeling", "business strategy"],
        format: "Report + Excel/SQL script",
        badges: [
          { name: "Analytical Thinker" },
          { name: "Supply Chain Strategist" }
        ],
        difficulty: "Intermediate",
        timeLimit: 90
      },
      {
        id: "bis2",
        title: "Marketing Campaign Performance Analysis",
        description: "Evaluate a set of marketing campaign data to determine ROI and provide recommendations for future campaigns.",
        skillsTested: ["Data analysis", "marketing strategy", "financial modeling"],
        format: "Presentation + Excel model",
        badges: [
          { name: "Marketing Maven" },
          { name: "Data Whisperer" }
        ],
        difficulty: "Advanced",
        timeLimit: 120
      },
      {
        id: "bis3",
        title: "Customer Segmentation and Targeting",
        description: "Use clustering techniques on customer data to identify distinct segments and propose targeted marketing strategies.",
        skillsTested: ["Data mining", "statistical analysis", "strategic planning"],
        format: "Report + SQL script",
        badges: [
          { name: "Segmentation Specialist" },
          { name: "Targeting Tactician" }
        ],
        difficulty: "Advanced",
        timeLimit: 150
      }
    ]
  },
  {
    name: "General/Mixed Challenges",
    description: "Collaboration & Portfolio Builders open to all students",
    challenges: [
      {
        id: "gen1",
        title: "Team Hack: Community App for UFS Events",
        description: "In teams, build a mobile-friendly app for event coordination at UFS, including RSVPs, maps, and feedback polls.",
        skillsTested: ["Team collaboration", "agile development", "user-centered design"],
        format: "Team-submitted prototype + reflection log",
        badges: [
          { name: "Team Leader" },
          { name: "Community Connector" }
        ],
        difficulty: "Intermediate",
        timeLimit: 180
      },
      {
        id: "gen2",
        title: "Sustainability Challenge: Carbon Footprint Calculator",
        description: "Develop a calculator that estimates the carbon footprint of individuals or households and suggests reduction strategies.",
        skillsTested: ["Environmental science", "data analysis", "software development"],
        format: "Web app + report",
        badges: [
          { name: "Eco Warrior" },
          { name: "Data Defender" }
        ],
        difficulty: "Advanced",
        timeLimit: 240
      },
      {
        id: "gen3",
        title: "Health Tracker and Advisor",
        description: "Create an application that tracks health metrics and provides personalized advice to users based on their data.",
        skillsTested: ["Health informatics", "data analysis", "user experience design"],
        format: "App prototype + research paper",
        badges: [
          { name: "Health Hero" },
          { name: "Data Driven" }
        ],
        difficulty: "Advanced",
        timeLimit: 210
      }
    ]
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  res.status(200).json(mockChallenges);
}
