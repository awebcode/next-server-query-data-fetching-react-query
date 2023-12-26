"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const LoginComponent = () => {
  const [Password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", { email, password:Password });
      if (response.status === 200) {
        alert(response.data.message);
        window.location.pathname = "/dashboard"
        setMessage(response.status + response.data.message);
        
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-10">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h1 className="h2">Login</h1>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="btn w-full"
            type="submit"
          >
            Login
          </button>
        </div>
        {message && <p className="text-center mt-4 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default LoginComponent;
