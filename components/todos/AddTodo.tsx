"use client";
import { fetchTodos } from "@/lib/action/todoAction";
// TodoComponent.tsx
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Todo, addTodo, removeTodo } from "@/lib/services/todoSlices";
import { RootState } from "@/lib/store";
import { useState, useEffect } from "react";

const TodoComponent: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>("");

  const { todos, loading }: any = useAppSelector((state: RootState) => state.todo);

  const dispatch = useAppDispatch();

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch(addTodo(newTodo as any));
      setNewTodo("");
    }
  };

  const handleRemoveTodo = (id: number) => {
    dispatch(removeTodo(id));
  };
  useEffect(() => {
    const data = dispatch(fetchTodos());
    console.log(data);
  }, [dispatch]);

  if (loading) {
    return <h1 className="h1 spinner">Loading</h1>;
  }
  return (
    <div className="container  max-w-md mx-auto mt-8 p-4 border rounded">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="w-full mb-4 px-2 py-1 border rounded"
        placeholder="Enter a new todo"
      />
      <button
        onClick={handleAddTodo}
        className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
      >
        Add Todo
      </button>
      <ul className="m-3 flex justify-between flex-col">
        {todos?.map((todo: Todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center  bg-gray-100 p-4 rounded-md m-3"
          >
            <span>{todo.email}</span>
            <button
              onClick={() => handleRemoveTodo(todo.id)}
              className="text-red-500 text-xs"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoComponent;
