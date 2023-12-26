import { NextRequest, NextResponse } from "next/server";

//,statusText:"wow great status text!"
export async function GET(req: NextRequest, res: NextResponse, next: any) {
 

  return NextResponse.json(
    {
      message: "Authorized",
    },
    { status: 200, statusText: "wow great status text!" }
  );
}
