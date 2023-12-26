import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    // const data=await response.json()
    return await response.json();
});
