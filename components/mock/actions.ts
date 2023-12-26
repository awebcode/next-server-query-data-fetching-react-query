"use server";
import { revalidateTag } from "next/cache";

export const submitForm = async (formData: FormData) => {
  const name = formData.get("name");
  console.log("formDAta",name)
  await fetch("https://6586d1bc468ef171392ecf27.mockapi.io/api/v1/users", {
    method: "POST",
    body: JSON.stringify(name),
  });
  revalidateTag("users");
};

export const deleteUser = async (id: number) => {
  await fetch(`https://6586d1bc468ef171392ecf27.mockapi.io/api/v1/users/${id}`, {
    method: "DELETE",
  });
  revalidateTag("users");
};


