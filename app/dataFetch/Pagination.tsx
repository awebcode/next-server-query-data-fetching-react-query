// import clsx from "clsx";
// import Link from "next/link";
// import React from "react";

// const Pagination = ({ total, totalPages, search, page, sortBy }: any) => {
//   const renderPageLink = (pageNumber:number) => (
//     <Link
//       href={{
//         pathname: "/dataFetch",
//         query: {
//           ...(search ? { search } : {}),
//           ...(sortBy ? { sortBy } : {}),
//           page: pageNumber,
//         },
//       }}
//       key={pageNumber}
//     >
//       <span
//         className={clsx(
//           "rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800",
//           pageNumber === page && "bg-gray-300" // Add a different style for the active page
//         )}
//       >
//         {pageNumber}
//       </span>
//     </Link>
//   );

//   const renderPaginationLinks = () => {
//     const pagesToRender = [];

//     if (totalPages <= 5) {
//       for (let i = 1; i <= totalPages; i++) {
//         pagesToRender.push(renderPageLink(i));
//       }
//     } else {
//       // First 3 pages
//       for (let i = 1; i <= 3; i++) {
//         pagesToRender.push(renderPageLink(i));
//       }

//       // Ellipsis
//       pagesToRender.push(
//         <span key="ellipsis" className="px-2 py-1">
//           ...
//         </span>
//       );

//       // Last 2 pages
//       for (let i = totalPages - 1; i <= totalPages; i++) {
//         pagesToRender.push(renderPageLink(i));
//       }
//     }

//     return pagesToRender;
//   };

//   return (
//     <div className="flex space-x-6">
//       {page > 1 && (
//         <Link
//           href={{
//             pathname: "/dataFetch",
//             query: {
//               ...(search ? { search } : {}),
//               ...(sortBy ? { sortBy } : {}),
//               page: page - 1,
//             },
//           }}
//           key="prev"
//         >
//           <span className="rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800">
//             Previous
//           </span>
//         </Link>
//       )}

//       {renderPaginationLinks()}

//       {page < totalPages && (
//         <Link
//           href={{
//             pathname: "/dataFetch",
//             query: {
//               ...(search ? { search } : {}),
//               ...(sortBy ? { sortBy } : {}),
//               page: page + 1,
//             },
//           }}
//           key="next"
//         >
//           <span className="rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800">
//             Next
//           </span>
//         </Link>
//       )}
//     </div>
//   );
// };
"use client";
// export default Pagination;
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

const Pagination = ({ total, totalPages, search, page, sortBy }: any) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (currentPage > totalPages && totalPages > 0) {
      const route = "/dataFetch";
      let basePath = route;

      const queryParams: { [key: string]: any } = {};

      if (page) {
        queryParams.page = 1;
      }

      const queryString = Object.keys(queryParams)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
        )
        .join("&");

      if (queryString) {
        basePath += `?${queryString}`;
      }
      console.log("basepath", basePath);

      router.push(basePath);
    }
  }, [sortBy]);

  const renderPageLink = (pageNumber: number) => (
    <Link
      href={{
        pathname: "/dataFetch",
        query: {
          ...(search ? { search } : {}),
          ...(sortBy ? { sortBy } : {}),
          page: pageNumber,
        },
      }}
      key={pageNumber}
    >
      <span
        className={clsx(
          "rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800",
          pageNumber === page && "bg-gray-300" // Add a different style for the active page
        )}
      >
        {pageNumber}
      </span>
    </Link>
  );

  const renderPaginationLinks = () => {
    const pagesToRender = [];
    const showEllipsis = totalPages > 5;

    if (showEllipsis && page > 3) {
      pagesToRender.push(renderPageLink(1));
      pagesToRender.push(
        <span key="startEllipsis" className="px-2 py-1">
          ...
        </span>
      );
    }

    let start = Math.max(1, page - 1);
    let end = Math.min(page + 1, totalPages);

    if (showEllipsis && page >= totalPages - 2) {
      start = totalPages - 3;
      end = totalPages;
    }

    for (let i = start; i <= end; i++) {
      pagesToRender.push(renderPageLink(i));
    }

    if (showEllipsis && page < totalPages - 2) {
      pagesToRender.push(
        <span key="endEllipsis" className="px-2 py-1">
          ...
        </span>
      );
      pagesToRender.push(renderPageLink(totalPages));
    }

    return pagesToRender;
  };

  return (
    <div className="flex justify-end space-x-6 mt-[-50px] md:w-auto w-screen ">
      {page > 1 && (
        <Link
          href={{
            pathname: "/dataFetch",
            query: {
              ...(search ? { search } : {}),
              ...(sortBy ? { sortBy } : {}),
              page: page - 1,
            },
          }}
          key="prev"
        >
          <span className="btn outline">
            Previous
          </span>
        </Link>
      )}

      {renderPaginationLinks()}

      {page < totalPages && (
        <Link
          href={{
            pathname: "/dataFetch",
            query: {
              ...(search ? { search } : {}),
              ...(sortBy ? { sortBy } : {}),
              page: page + 1,
            },
          }}
          key="next"
        >
          <span className="btn ">
            Next
          </span>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
