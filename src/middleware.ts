// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // If no token, redirect to sign in
    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    // Protect role-specific dashboard routes
    if (path.startsWith("/dashboard/student") && token.role !== "Student") {
      return NextResponse.redirect(new URL("/dashboard/" + token.role?.toLowerCase(), req.url));
    }

    if (path.startsWith("/dashboard/employer") && token.role !== "Employer") {
      return NextResponse.redirect(new URL("/dashboard/" + token.role?.toLowerCase(), req.url));
    }

    if (path.startsWith("/dashboard/admin") && token.role !== "Admin") {
      return NextResponse.redirect(new URL("/dashboard/" + token.role?.toLowerCase(), req.url));
    }

    // If accessing /dashboard, redirect to role-specific dashboard
    if (path === "/dashboard") {
      return NextResponse.redirect(
        new URL(`/dashboard/${token.role?.toLowerCase()}`, req.url)
      );
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
  ],
};