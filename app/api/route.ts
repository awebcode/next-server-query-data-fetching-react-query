import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

export async function GET(res: NextResponse) {
  const cookie = cookies();
  // const x = cookie.set("foo", "bar", {
  //   httpOnly: true,
  //   path: "/",
  //   sameSite: "strict",
  //   expires: Date.now() + 60 * 1000,
  // });
  // console.log(x);
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  // console.log("x", res.headers);
  return NextResponse.json({
    message: "<H1>wow! asikur amazing!</H1>",
    response: JSON.stringify(await response.json()),
  });
}
