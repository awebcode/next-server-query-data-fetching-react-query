import db from "@/utils/db";
import { todoModel } from "@/utils/todoMode";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  await db();
  let { title, description: desc, active } = await req.json();

  console.log("acc", active);

  const data = await todoModel.create({ title, desc, active: Boolean(active) });
  console.log(data);

  return NextResponse.json(
    {
      message: "Todo created success!",
      //   json,
      json: data,
    },
    { status: 201 }
  );
}

export async function GET(req: NextRequest, res: NextResponse) {
  const page: number = Number(req.nextUrl.searchParams?.get("page")) || 1;
  const limit: number = Number(req.nextUrl.searchParams?.get("limit")) || 4;
  const searchTerm: string = req.nextUrl.searchParams?.get("search") || "";
  const sortBy: string = req.nextUrl.searchParams?.get("sort") || "createdAt";

  const query: any = {};

  if (searchTerm) {
    // If search term is provided, create a query for searching
    query.$or = [
      { title: { $regex: searchTerm, $options: "i" } },
      { desc: { $regex: searchTerm, $options: "i" } },
    ];
  }

  await db();

  const count = await todoModel.countDocuments(query);

  let sortOptions: any = {};
  if (sortBy === "active") {
    sortOptions = { active: -1, createdAt: -1 }; // Sort by active (true/false) first, then by createdAt
  } else {
    sortOptions = { [sortBy]: -1 }; // Sort by the specified field (createdAt by default)
  }

  const data = await todoModel
    .find(query)
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(limit);

  return NextResponse.json(
    {
      message: "Todo get success!",
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      todos: data,
    },
    { status: 200 }
  );
}
