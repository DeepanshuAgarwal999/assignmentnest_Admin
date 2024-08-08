import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import cookie from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";

export function middleware(req: NextRequest) {
  console.log(`Request URL: ${req.url}`);

  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const token = cookies.token;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decodedToken = jwt.decode(token) as JwtPayload;

    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp === undefined || decodedToken.exp < currentTime) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/((?!login|signup|api|_next/static|_next/image|favicon.ico|public/.*).*)",
    '/quote','/'
  ],
};
