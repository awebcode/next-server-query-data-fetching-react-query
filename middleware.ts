import { NextRequest, NextResponse } from "next/server";
export default async function middleware(requset: NextRequest) {
  const cookies = requset.cookies.get("accessToken")?.value;
  console.log("middleware-cookies", cookies);

  if (!cookies) {
    return NextResponse.redirect(new URL("/", requset.url));
  }

  //   return NextResponse.redirect(new URL("/", requset.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};
