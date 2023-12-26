import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-rose-700 h-12 w-12"></div>
    </div>
  );
};

export default Loading;
