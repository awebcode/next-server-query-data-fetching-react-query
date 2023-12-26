"use client"
import { deleteTodo } from '@/components/todo/actions'
import React from 'react'

const DeleteButton = ({id}:any) => {
  return <button className='btn p-2 text-xs bg-rose-500 hover:bg-rose-400 text-gray-200 m-2' onClick={()=>deleteTodo(id)}>Delete</button>
}

export default DeleteButton