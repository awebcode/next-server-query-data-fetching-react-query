import Fetch from "@/app/dataFetch/Fetch";
import { GetTodos } from "@/app/functions/todoActions";
import TodoComponent from "@/components/todo/Todo";
import React from "react";

const page = async ({ searchParams }: any) => {
  const page = typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit = typeof searchParams.limit === "string" ? Number(searchParams.limit) : 8;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const sortBy =
    typeof searchParams.sortBy === "string" ? searchParams.sortBy : undefined;

  const {
    todos: data,
    total,
    totalPages,
  } = await GetTodos({ search, page, limit, sortBy });

  console.log(data);
  return (
    <div>
      <TodoComponent />
      <Fetch data={data} />
    </div>
  );
};

export default page;
