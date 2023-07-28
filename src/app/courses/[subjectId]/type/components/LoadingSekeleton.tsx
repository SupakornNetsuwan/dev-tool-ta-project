import React from "react";

const LoadingSekeleton = () => {
  return (
    <div className="grid min-h-[60dvh] animate-pulse grid-cols-12  gap-2">
      <div className=" col-span-4 row-span-6 grid grid-cols-1 grid-rows-6 gap-2">
        <div className="relative rounded bg-gray-100 before:absolute before:left-2 before:top-2 before:block before:h-1/4 before:w-2/3 before:rounded before:bg-gray-200" />
        <div className="relative rounded bg-gray-100 before:absolute before:left-2 before:top-2 before:block before:h-1/4 before:w-2/3 before:rounded before:bg-gray-200" />
        <div className="relative rounded bg-gray-100 before:absolute before:left-2 before:top-2 before:block before:h-1/4 before:w-2/3 before:rounded before:bg-gray-200" />
        <div className="relative rounded bg-gray-100 before:absolute before:left-2 before:top-2 before:block before:h-1/4 before:w-2/3 before:rounded before:bg-gray-200" />
        <div className="relative rounded bg-gray-100 before:absolute before:left-2 before:top-2 before:block before:h-1/4 before:w-2/3 before:rounded before:bg-gray-200" />
        <div className="relative rounded bg-gray-100 before:absolute before:left-2 before:top-2 before:block before:h-1/4 before:w-2/3 before:rounded before:bg-gray-200" />
      </div>
      <div className="col-span-8 row-span-6 rounded bg-gray-100" />
    </div>
  );
};

export default LoadingSekeleton;
