import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const url = req.nextUrl.clone();

  // Check if the user is authenticated
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  // Decode the token or add role checks (if available in headers)
  const role = req.headers.get("x-role"); // Example: Pass role from client

  // Route-based authorization (e.g., admin access)
  if (url.pathname === "/admin" && role !== "admin") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/dashboard"], // Protected routes
};
