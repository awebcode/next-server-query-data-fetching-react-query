import db from "@/utils/db";
import { todoModel } from "@/utils/todoMode";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  await db();

  const data = await todoModel.find();

  return NextResponse.json(
    {
      todos: data,
    },
    { status: 200 }
  );
}


