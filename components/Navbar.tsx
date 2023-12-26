import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className=" mx-auto flex justify-between items-start p-4 bg-gray-900">
      <h2 className="text-white">Server Render</h2>
      <nav>
        <ul>
          <li className="flex justify-between items-center">
            <Link
              className="text-white text-sm hover:text-gray-200 duration-300 transition-all mx-2"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-white text-sm hover:text-gray-200 duration-300 transition-all mx-2"
              href="/user/login"
            >
              SignIn
            </Link>
            <Link
              className="text-white text-sm hover:text-gray-200 duration-300 transition-all mx-2"
              href="/user/register"
            >
              SingUp
            </Link>
            <Link
              className="text-white text-sm hover:text-gray-200 duration-300 transition-all mx-2"
              href="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className="text-white text-sm hover:text-gray-200 duration-300 transition-all mx-2"
              href="/todo"
            >
              Todo
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
