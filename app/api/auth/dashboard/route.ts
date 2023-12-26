import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { authenticatedMiddleware } from "@/utils/middleware";
import { NextApiRequest } from "next";
//,statusText:"wow great status text!"
export async function GET(req: NextApiRequest, res: NextResponse, next: any) {
  const data = await authenticatedMiddleware(req, res, next);
  console.log(data);

  return NextResponse.json(
    {
      message: "Authorized",
    },
    { status: 200, statusText: "wow great status text!" }
  );
}
