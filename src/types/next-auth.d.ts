
import { User as NextAuthUser, Session as NextAuthSession } from "next-auth";

declare module "next-auth" {
  interface User extends NextAuthUser {
    role: "Student" | "Employer" | "Admin";
  }

  interface Session extends NextAuthSession {
    user: {
      role: "Student" | "Employer" | "Admin";
    } & NextAuthSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "Student" | "Employer" | "Admin";
  }
}
