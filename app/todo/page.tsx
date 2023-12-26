import TodoComponent from '@/components/todo/Todo';
import FetchTodo from "@/app/todo/fetchTodo";

import React from 'react'
import HomeDataFetch from '../dataFetch/page';

const page = ({ searchParams }:any) => {
  return (
    <div>
      {/* <TodoComponent />
       */}

      {/* <TodoComponent />
      <FetchTodo/> */}

      <HomeDataFetch searchParams={searchParams} />
    </div>
  );
};

export default page