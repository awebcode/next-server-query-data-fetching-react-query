import { useState } from "react";
import db from "@/utils/db";
import { todoModel } from "@/utils/todoMode";
import Fetch from "./Fetch";
import Search from "./Search";
import Pagination from "./Pagination";
import { GetTodos } from "../actions/todoActions";
import TodoComponent from "@/components/todo/Todo";
import ResetQuery from "./ResetQuery";
import Loading from "@/components/Loading";

export default async function HomeDataFetch({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  }) {
  
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


  if (!data || data.length<1) {
    
    return <Loading/>
  }
  return (
    <div className="container mx-auto">
      {/* <h1 className="h1 text-rose-400">Fetch</h1> */}

      <div className="flex justify-between items-center px-4">
        {" "}
        <ResetQuery title="Reset Query" path="/dataFetch" className="" />
        <ResetQuery
          title="Add Todo"
          path="/todo/create"
          className="bg-gray-800 text-white"
        />
      </div>
      <div className="flex  items-center  py-5 w-screen">
        <Search search={search} />
      </div>
      <div className="">
        <h1 className="text-2xl font-bold py-4">Total ({total})</h1>
        <h1 className="text-2xl font-bold py-4">Page Items : ({data.length})</h1>
        <Pagination
          total={total}
          totalPages={totalPages}
          search={search}
          page={page}
          sortBy={sortBy}
        />
      </div>
      {/* <TodoComponent /> */}
      <Fetch data={data} />
    </div>
  );
}
