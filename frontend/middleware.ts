import { NextRequest, NextResponse } from "next/server";
import { isPublicRoute } from "@/lib/auth";

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};

export function middleware(request: NextRequest) {
  const isAccessTokenPresent = request.cookies.has("access_token");

  if (!isAccessTokenPresent && !isPublicRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAccessTokenPresent && isPublicRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
