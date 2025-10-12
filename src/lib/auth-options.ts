import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // Simple user validation
        const users = [
          { id: "1", name: "Student User", username: "student123", email: "student@ufs.ac.za", password: "student123", role: "Student" as const },
          { id: "2", name: "Employer User", username: "employer123", email: "employer@company.com", password: "employer123", role: "Employer" as const },
          { id: "3", name: "Admin User", username: "admin123", email: "admin@ufs.ac.za", password: "admin123", role: "Admin" as const }
        ];

        const user = users.find(u => u.email === credentials.username && u.password === credentials.password);
        
        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: null,
            role: user.role
          };
        }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/signin'
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user && token.role) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-key"
};
