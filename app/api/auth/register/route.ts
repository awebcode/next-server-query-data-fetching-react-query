import db from "@/utils/db";
import { UserModel } from "@/utils/userModel";
import { NextRequest, NextResponse } from "next/server";
import { generateJWTAccessToken, generateJWTRefreshToken } from "@/utils/generateToken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  try {
    await db();

    const cookieStore = cookies();
    const user = await UserModel.create({ name, email, password });

    const accesstoken = await generateJWTAccessToken(user.email);

    const refreshtoken = await generateJWTRefreshToken(user.email);
    cookieStore.set("accessToken", accesstoken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    });
    cookieStore.set("refreshToken", refreshtoken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 2 * 60 * 1000),
    });
    return NextResponse.json(
      { message: "User created successfully!", user },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
