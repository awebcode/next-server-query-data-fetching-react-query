import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

export async function GET(res: NextResponse) {
  
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  // console.log("x", res.headers);
  return NextResponse.json({
    message: "wow! asikur amazing!",
    response: await response.json()
  });
}
