"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { createTodo } from "./actions";

const TodoComponent = () => {
  const [loading, setloading] = useTransition();
  const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
     const [active, setactive] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setloading(async () => await createTodo(title, description,active));

      //   setMessage(response.status + data.message);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Register failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-10 min-h-screen flex justify-center items-center">
      <form
        className="bg-white shadow-md rounded p-10 mb-4"
        onSubmit={handleSubmit}
      >
        <h1 className="h2 text-2xl bg-white">Create Todo!</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <select className="p-2 m-2 w-full rounded-sm" value={active} onChange={(e) => setactive(e.target.value)}>
          <option className="bg-gray-300" value="true">true</option>
          <option value="false">false</option>
        </select>

        <div className="flex items-center justify-between">
          <button
            ref={formRef}
            className="btn w-full"
            type="submit"
          >
            {loading ? "creating..." : "Create"}
          </button>
        </div>
        {message && <p className="text-center mt-4 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default TodoComponent;
