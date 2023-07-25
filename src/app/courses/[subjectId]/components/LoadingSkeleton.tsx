import React from "react";

const Loading = () => {
  return (
    <div className="flex w-full animate-pulse flex-col space-y-4 rounded bg-white p-4 [&>div:nth-child(1)]:bg-blue-100 [&>div]:h-8 [&>div]:rounded-md [&>div]:bg-blue-50">
      {[...new Array(7)].map((_, index) => (
        <div key={index} />
      ))}
    </div>
  );
};

export default Loading;
