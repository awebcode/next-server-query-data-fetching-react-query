"use server";

import { revalidateTag } from "next/cache";

export async function createTodo(title: any, description: any, active:any) {
  const response = await fetch(`/api/todo`, {
    method: "POST",
    body: JSON.stringify({ title, description,active }),
  });
  const data = await response.json();
  revalidateTag("todos");

  return data;
}


//delete

export async function deleteTodo(id: any) {
  const response = await fetch(`/api/todo/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  revalidateTag("todos");

  return data;
}