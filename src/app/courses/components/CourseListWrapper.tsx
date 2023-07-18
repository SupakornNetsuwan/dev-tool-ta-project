"use client";
import React from "react";

const CourseListWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {children}
    </div>
  );
};

export default CourseListWrapper;
