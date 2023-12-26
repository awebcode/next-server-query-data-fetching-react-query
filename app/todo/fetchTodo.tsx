import { BASE_URL } from "@/utils/base_url";
import React from "react";
import DeleteButton from "./DeleteButton";
import TodoList from "./TodoQuery";
export interface Todo {
  _id: string;
  title: string;
  desc: string;
  active: boolean;
}
export async function fetchTodo(query: string | number) {
  const res = await fetch(`${BASE_URL}/todo?search=${query}`, {
    cache: "no-cache",
    next: {
      tags: ["todos"],
    },
  });
  return await res.json();
}
const FetchTodo = async () => {
  const query = 10;
  const data = await fetchTodo(query);
  return (
    <div className="container mx-auto p-4">
      <TodoList/>
      <div className="flex justify-between items-center gap-3 flex-wrap">
        {data &&
          data?.todos?.length > 0 &&
          data?.todos?.map((item: Todo) => {
            return (
              <>
                <div key={item._id} className="bg-gray-200 rounded-md p-3 m-2">
                  <h2 className="text-gray-900 leading-10 text-2xl">{item.title}</h2>

                  <h3 className="text-gray-600 text-sm">{item.desc}</h3>
                  {item.active ? (
                    <span className="text-green-500">Active</span>
                  ) : (
                    <span className="text-rose-500">Deactive</span>
                  )}

                  <DeleteButton id={item?._id} />
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default FetchTodo;
