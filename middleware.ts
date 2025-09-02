import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("🔥 middleware fired:", req.nextUrl.pathname);
  const token =
    req.cookies.get("next-auth.session-token") ??
    req.cookies.get("__Secure-next-auth.session-token");
  console.log(token);
  if (
    !token &&
    (req.nextUrl.pathname.startsWith("/rooms") ||
      req.nextUrl.pathname.startsWith("/create-join"))
  ) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/rooms/:path*", "/create-join"],
};
