"use client"
import React from "react";

const page = ({ params:{id} }:any) => {
  console.log(id);
  return (
    <div>
      <h1 className="h1">About Id : {id}</h1>
    </div>
  );
};

export default page;
