"use client";
import { useRouter } from "next/navigation";
import React from "react";
const ResetQuery = ({
  title,
  path,
  className,
}: {
  title: string;
  path: string;
  className: string;
}) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push(path)} className={`btn bg-rose-500 ${className}`}>
      {title}
    </button>
  );
};

export default ResetQuery;
