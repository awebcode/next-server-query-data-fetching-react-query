import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTodos } from "../action/todoAction";

export interface Todo {
  id: number;
  text: string;
  email: string;
}

export interface TodoState {
  loading: boolean;
  error: string | null;
  todos: Todo[];
}

const initialState: TodoState = {
  loading: false,
  error: null,
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // This action handles both adding a todo and managing loading and error states
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.loading = false;
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Handle loading state when the action starts
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action: any) => {
      console.log("fulfilled", action);
      state.loading = false;
      state.error = null;
      state.todos = action.payload;
    });
    // Handle error state if the action fails
    builder.addCase(fetchTodos.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || "Failed to add todo.";
    });
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
