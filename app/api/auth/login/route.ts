import bcrypt from "bcrypt";
import db from "@/utils/db";
import { UserModel } from "@/utils/userModel";
import { NextRequest, NextResponse } from "next/server";
import { generateJWTAccessToken, generateJWTRefreshToken } from "@/utils/generateToken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  console.log(email, password);
  try {
    await db();

    const cookieStore = cookies();
    const user = await UserModel.findOne({ email });
    console.log(user)

    // Check if the user exists
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    } else {
      // Compare the passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return NextResponse.json(
          { message: "Password does not match!" },
          { status: 500 }
        );
      } else {
        // Passwords match, proceed with authentication logic
        // ...
        // Return success or any additional data as needed
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
          { message: "Login successfully!", user },
          { status: 200 }
        );
      }
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
