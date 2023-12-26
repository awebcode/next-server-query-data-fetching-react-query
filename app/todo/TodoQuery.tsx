"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt"); // Default sort by createdAt
  const [pageNumber, setPageNumber] = useState(0);
  const todosPerPage = 4;

  const handlePageClick = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const handleSortChange = (e: any) => {
    setSortBy(e.target.value);
    setPageNumber(0); // Reset page to 0 when changing sorting
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/todo?page=${
            pageNumber + 1
          }&limit=${todosPerPage}&search=${searchTerm}&sort=${sortBy}`
        );
        setTodos(response.data.todos);
        setTotal(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchTerm, sortBy, pageNumber, total]);

  return (
    <div className="container mx-auto">
      <div className="mt-8 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 mr-4"
        />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="border rounded px-4 py-2"
        >
          <option value="createdAt">Sort by CreatedAt</option>
          <option value="active">Sort by Active</option>
        </select>
      </div>
      <ul className="mt-8">
        {todos.map((todo) => (
          <li key={todo._id} className="border rounded p-4 mb-4">
            <h3 className="font-bold">{todo.title}</h3>
            <p>{todo.desc}</p>
            <p>{todo.active ? "Active" : "Inactive"}</p>
          </li>
        ))}
      </ul>
      {console.log("todoslength", todos.length)}
      <div className="mt-8 flex justify-center">
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageCount={total}
          onPageChange={handlePageClick}
          containerClassName="flex  gap-2"
          previousLinkClassName="border rounded px-4 py-2 mr-2"
          nextLinkClassName="border rounded px-4 py-2 ml-2"
          disabledClassName="opacity-50 text-rose-400"
          activeClassName="bg-green-500 text-white p-2"
        />
      </div>
    </div>
  );
};

export default TodoList;
