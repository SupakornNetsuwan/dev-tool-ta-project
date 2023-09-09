import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse p-4">
      <div className="mt-4 flex w-full flex-col space-y-4 rounded bg-white p-4  [&>div:nth-child(1)]:bg-blue-100 [&>div]:h-8 [&>div]:rounded-md [&>div]:bg-blue-50">
        {[...new Array(10)].map((_, index) => (
          <div key={index} />
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
