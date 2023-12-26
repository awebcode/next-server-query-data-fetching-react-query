"use server";

import { BASE_URL } from "@/utils/base_url";
import { revalidateTag } from "next/cache";

export async function createTodo(title: any, description: any, active:any) {
  try {
    const response = await fetch(`${BASE_URL}/todo`, {
      method: "POST",
      body: JSON.stringify({ title, description, active }),
    });
    const data = await response.json();
    revalidateTag("todos");

    return data;
  } catch (error) {
    console.log("error",error)
    
  }
}


//delete

export async function deleteTodo(id: any) {
  const response = await fetch(`${BASE_URL}/todo/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  revalidateTag("todos");

  return data;
}