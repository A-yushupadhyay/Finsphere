import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Block non-admins from accessing admin routes
    if (req.nextUrl.pathname.startsWith("/dashboard/admin")) {
      if (req.nextauth?.token?.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token }) {
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/transfer/:path*",
    "/profile/:path*",
    "/admin/:path*",
  ],
};
