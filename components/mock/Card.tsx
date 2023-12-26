"use client";
import React, { useTransition } from "react";
import { deleteUser } from "./actions";

const Card = ({ data }: any) => {
  const [pending, setPending] = useTransition();
  return (
    <div>
      <div className="flex justify-between items-center gap-2 flex-wrap">
        {data.map((user: any) => (
          <>
            <div key={user.id} className="bg-gray-200 p-6 rounded-md leading-10 ">
              {user.name}
            </div>
            <span
              onClick={() => setPending(() => deleteUser(user.id))}
              className="text-xs m-2 text-rose-500 cursor-pointer"
            >
              {pending ? "Removing.." : "Remove"}
            </span>
          </>
        ))}
      </div>
    </div>
  );
};

export default Card;
