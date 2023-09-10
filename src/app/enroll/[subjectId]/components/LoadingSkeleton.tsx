import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse rounded bg-white p-4 ">
      <div className="grid h-44 grid-cols-2 gap-2">
        {[...new Array(4)].map((_, index) => (
          <div key={index} className="rounded bg-blue-50 first:bg-blue-100" />
        ))}
      </div>
      <div className="my-4 h-32 w-full bg-blue-50" />
      <div className=" flex w-full flex-col space-y-2">
        {[...new Array(5)].map((_, index) => (
          <div key={index} className="h-8 rounded bg-blue-50  first:bg-blue-100" />
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
