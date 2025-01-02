import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "firebase/auth";
import { app } from "@/config/firebaseConfig";

const auth = getAuth(app);

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = request.nextUrl.pathname;

  // Paths that require admin access
  const adminRoutes = ["/admin"];

  // Paths that require user access
  const userRoutes = ["/report"];

  // Check Firebase Auth
  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    // Redirect to login if not authenticated
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const role = decodedToken.role;

  // Enforce role-based access
  if (adminRoutes.includes(path) && role !== "admin") {
    url.pathname = "/403"; // Forbidden page
    return NextResponse.rewrite(url);
  }

  if (userRoutes.includes(path) && role !== "user") {
    url.pathname = "/403"; // Forbidden page
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/report/:path*"],
};
