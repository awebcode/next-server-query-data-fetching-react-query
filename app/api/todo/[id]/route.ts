
import db from "@/utils/db";
import { todoModel } from "@/utils/todoMode";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export  async function DELETE(req: Request,{params}:{params:{id:string}}) {
  await db();
    console.log(req.body);
    console.log(params.id);
    await todoModel.deleteOne({ _id: params.id });

  return NextResponse.json(
    {
      message: "Todo DELETED success!",
    },
    { status: 200 }
  );
}
