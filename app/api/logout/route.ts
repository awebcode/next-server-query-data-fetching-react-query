import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
//,statusText:"wow great status text!"
export async function GET(req: NextRequest, res: NextResponse) {
  const cookie = cookies();
  const x = cookie.delete("foo");
  // console.log("x", res.headers);
  return NextResponse.json(
    {
      message: "<H1>logged out success</H1>",
    },
    { status: 404, statusText: "wow great status text!" }
  );
}
