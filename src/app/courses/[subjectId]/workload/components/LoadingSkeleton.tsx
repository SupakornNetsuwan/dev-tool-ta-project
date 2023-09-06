import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="w-full animate-pulse rounded-xl bg-white p-4 pb-12">
      <div className="bg-blue-50 p-4" />
    </div>
  );
};

export default LoadingSkeleton;
