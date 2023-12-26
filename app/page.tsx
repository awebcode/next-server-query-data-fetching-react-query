import db from "@/utils/db";
import { todoModel } from "@/utils/todoMode";
import DeleteButton from "./todo/DeleteButton";
import { Todo } from "./todo/fetchTodo";
import HomeDataFetch from "./dataFetch/page";

export default async function Home({searchParams}:any) {
  await db();
   
  const data = await todoModel.find();

  return (
    <div className="container mx-auto p-3">
      <h1 className="h1 text-gray-800 bg-white">ServerSide -Queries</h1>
      <HomeDataFetch searchParams={searchParams} />
    </div>
  );
}
