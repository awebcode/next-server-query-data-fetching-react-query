import TodoComponent from '@/components/todo/Todo';
import FetchTodo from "@/app/todo/fetchTodo";

import React from 'react'

const page = () => {
  return (
    <div>
      {/* <TodoComponent />
       */}
      
      <TodoComponent />
      <FetchTodo/>
    </div>
  );
}

export default page