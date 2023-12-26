import DeleteButton from "@/app/todo/DeleteButton";
import { Todo } from "@/app/todo/fetchTodo";
import db from "@/utils/db";
import { todoModel } from "@/utils/todoMode";

export default async function Fetch({data}:{data:any}) {
  

  return (
    <div className="container mx-auto p-4 my-6">
      {/* <h1 className="h1 text-gray-800">Fetch Data</h1> */}
      <div className="flex md:justify-between justify-center items-center gap-3 flex-wrap pb-20">
        {data &&
          data?.length > 0 &&
          data?.map((item: Todo) => {
            return (
              <>
                <div key={item._id} className="bg-gray-100 rounded-md p-8 m-2 md:w-auto w-full">
                  <h2 className="text-gray-900 leading-10 text-3xl">{item.title}</h2>

                  <h3 className="text-gray-600 text-xl">{item.desc}</h3>
                  {item.active ? (
                    <span className="text-green-500">Active</span>
                  ) : (
                    <span className="text-rose-500">Deactive</span>
                  )}

                  <DeleteButton id={item?._id} />
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}
