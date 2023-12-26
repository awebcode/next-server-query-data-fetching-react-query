import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { generateJWTAccessToken, generateJWTRefreshToken } from "./generateToken";
import { NextResponse } from "next/server";
export async function authenticatedMiddleware(
  req: NextApiRequest,
  res: NextResponse,
  next: () => void
) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken"); // Parse cookies from the request

  if (!token) {
    await refreshToken(req, res);
  }

  jwt.verify(token as any, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) {
      return NextResponse.json(
        { message: "Access Token is expired!", err },
        { status: 403 }
      );
    }

    const newRefreshToken= generateJWTRefreshToken(decoded.email);

    cookieStore.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 2 * 60 * 1000),
    });
    req.email = (decoded as { email: string }).email; // Store the decoded email in the request for later use
    next(); // Move to the next middleware
  });
}

export async function refreshToken(req: NextApiRequest, res: NextResponse) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken");

  if (!refreshToken) {
    return NextResponse.json({ message: "No Refresh token detected!" }, { status: 401 });
  }

  jwt.verify(
    refreshToken as any,
    process.env.JWT_REFRESH_SECRET!,
    (err: any, decoded: any) => {
      if (err) {
        return NextResponse.json(
          { message: "Refresh Token is expired!", err },
          { status: 403 }
        );
      } else {
        const newAccessToken: string = generateJWTAccessToken(decoded?.email);

        cookieStore.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          expires: new Date(Date.now() + 60 * 1000),
        });
        req.email = (decoded as { email: string }).email; // Store the decoded email in the request for later use
      }
    }
  );
}
