"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useDebounce } from "use-debounce";

// FilterSelect component
const FilterSelect = ({ onChange }: any) => {
  const [filterValue, setFilterValue] = useState("All");

  const handleFilterChange = (e: any) => {
    setFilterValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <select
      value={filterValue}
      onChange={handleFilterChange}
      className="block appearance-none  bg-white border border-gray-300 py-2 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:border-sky-500 sm:text-sm"
    >
      <option value="All">All</option>
      <option value="active">Active</option>
      <option value="deactive">Inactive</option>
    </select>
  );
};

// Search component
const Search = ({ search }: { search?: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialRender = useRef(true);
  const page = searchParams.get("page");

  const [text, setText] = useState(search);

  const [filter, setFilter] = useState("All"); // New state for filter
  const [query] = useDebounce(text, 750);
  const [filteredValue] = useDebounce(filter, 750);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const route = "/dataFetch";
    let basePath = route;

    const queryParams: { [key: string]: any } = {};

    if (query) {
      queryParams.search = query;
    }

    if (filteredValue) {
      queryParams.sortBy = filteredValue;
    }

    if (page) {
      queryParams.page = page;
    }

    const queryString = Object.keys(queryParams)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join("&");

    if (queryString) {
      basePath += `?${queryString}`;
    }

    router.push(basePath);
  }, [query, filteredValue, page]);

  const handleFilterChange = (selectedFilter: any) => {
    setFilter(selectedFilter); // Update filter state
    console.log("change", selectedFilter);
  };

  return (
    <div className="flex items-center space-x-4 ">
      <FilterSelect onChange={handleFilterChange} /> {/* FilterSelect component */}
      <div className="relative rounded-md shadow-sm min-w-[50%]">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          value={text}
          placeholder="Search movies..."
          onChange={(e) => setText(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default Search;
