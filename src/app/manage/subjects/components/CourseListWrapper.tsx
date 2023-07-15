"use client"
import React from "react";

const CourseListWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7">
      {children}
    </div>
  );
};

export default CourseListWrapper;
