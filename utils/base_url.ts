export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://next-server-query-data-fetching.vercel.app/api"
    : "http://localhost:3000/api"; // Change the port if needed
