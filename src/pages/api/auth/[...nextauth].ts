import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define custom role type
type UserRole = "Student" | "Admin" | "Employer";

// Define custom user type
interface CustomUser extends User {
  role: UserRole;
  username: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        // Test users - replace with actual auth logic later
        const testUsers: Record<string, CustomUser & { password: string }> = {
          student: {
            id: "1",
            name: "Test Student",
            username: "student123",
            email: "student@ufs.ac.za",
            role: "Student",
            password: "test123"
          },
          admin: {
            id: "2",
            name: "Test Admin",
            username: "admin123",
            email: "admin@ufs.ac.za",
            role: "Admin",
            password: "admin123"
          },
          employer: {
            id: "3",
            name: "Test Employer",
            username: "employer123",
            email: "employer@ufs.ac.za",
            role: "Employer",
            password: "emp123"
          }
        };

        const user = Object.values(testUsers).find(
          user => (user.email === credentials?.username || 
                  user.username === credentials?.username) && 
                  user.password === credentials?.password
        );

        if (user) {
          const { password, ...userWithoutPass } = user;
          return userWithoutPass;
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