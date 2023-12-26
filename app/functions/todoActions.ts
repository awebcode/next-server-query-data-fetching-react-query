import db from "@/utils/db";
import { todoModel } from "@/utils/todoMode";

export async function GetTodos({ search, page, limit, sortBy }: any) {
  await db();

  const query: any = {};

  if (search) {
    // If search  is provided, create a query for searching
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { desc: { $regex: search, $options: "i" } },
    ];
  }
  // Sort
  if (sortBy === "active" || sortBy === "deactive") {
    query.active = sortBy === "active"; // Filter based on active or deactive
  }

  const countQuery = { ...query }; // Create a separate query for counting total documents
  const total = await todoModel.countDocuments(countQuery);

  let sortOptions: any = {};

  if (sortBy === "active") {
    sortOptions = { createdAt: -1 }; // Sort by active (true/false) first, then by createdAt
  } else {
    sortOptions = { createdAt: 1 }; // Sort by createdAt by default
  }
  const data: any[] = await todoModel
    .find(query)
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(limit);
  return {
    todos: data,
    totalPages: Math.ceil(total / limit),
    total,
  };
}
