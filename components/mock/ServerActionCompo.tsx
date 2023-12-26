import React, { useTransition } from "react";
import CreateButton from "./CreateButton";
import { submitForm } from "./actions";
import Card from "./Card";

async function fetchData() {
  const res = await fetch("https://6586d1bc468ef171392ecf27.mockapi.io/api/v1/users", {
    cache: "no-cache",
    next: {
      tags: ["users"],
    },
  });
  const data = await res.json();
  return data;
}
interface User {
  name: string;
  avatar: string;
  id: number;
}

const ServerActionCompo = async () => {
  const data = await fetchData();

  return (
    <div className="container mx-auto p-6">
      <form action={submitForm} className="p-6 rounded-md">
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" placeholder="entername" />
        <CreateButton />
      </form>

      <Card data={data} />
    </div>
  );
};

export default ServerActionCompo;
