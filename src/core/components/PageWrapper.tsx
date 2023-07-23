import React from "react";

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mx-auto min-h-[150vh] w-full max-w-3xl px-4">{children}</div>;
};

export default PageWrapper;
