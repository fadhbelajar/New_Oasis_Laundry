import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const session = req.auth;

    if (!session?.user) {
      if (!pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      return NextResponse.next();
    }

    const role = session.user.role as string;

    const publicPaths = ["/login", "/api/auth"];
    if (publicPaths.some((p) => pathname.startsWith(p))) {
      return NextResponse.next();
    }

    if (pathname.startsWith("/dashboard")) {
      return NextResponse.next();
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return token != null;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};