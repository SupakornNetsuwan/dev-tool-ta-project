import React from "react";

const Loading = () => {
  return (
    <>
      <div className="grid animate-pulse grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7">
        <div className="relative aspect-video rounded bg-gray-200 before:absolute before:bottom-4 before:left-4 before:right-4 before:block before:h-4 before:bg-gray-300" />
        <div className="relative aspect-video rounded bg-gray-200  before:absolute before:bottom-4 before:left-4 before:right-4 before:block before:h-4 before:bg-gray-300" />
        <div className="relative aspect-video rounded bg-gray-200  before:absolute before:bottom-4 before:left-4 before:right-4 before:block before:h-4 before:bg-gray-300" />
      </div>
    </>
  );
};

export default Loading;
