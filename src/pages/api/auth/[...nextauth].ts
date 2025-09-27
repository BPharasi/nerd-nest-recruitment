import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // For testing purposes - replace with actual auth logic later
        if (credentials?.username === "student" && credentials?.password === "test123") {
          return {
            id: "1",
            name: "Test Student",
            email: "student@ufs.ac.za",
            role: "Student"
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your-development-secret",
};

export default NextAuth(authOptions);