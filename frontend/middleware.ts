import { NextRequest, NextResponse } from "next/server";
import { isPublicRoute } from "@/lib/auth";

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};

export function middleware(request: NextRequest) {
  const accessToken =
    request.cookies.get("access_token")?.value.toString() ?? "";

  const isAccessTokenPresent = accessToken !== "";

  if (!isAccessTokenPresent) {
    if (!isPublicRoute(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  if (isAccessTokenPresent && isPublicRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
