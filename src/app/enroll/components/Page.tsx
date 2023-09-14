"use client";
import React from "react";
import Courses from "./Courses";
import Course from "./Course";

const Page = () => {
  return (
    <div className="mb-12 rounded bg-gray-50 p-4">
      <Courses.WrapperProvider>
        <>
          <div className="mb-4 flex flex-col-reverse justify-between gap-y-2 sm:flex-row sm:items-center sm:gap-y-0">
            <Courses.Search />
            <Courses.SystemStatus />
          </div>
          <Courses.List>
            {(courses) => {
              return (
                <div className="student-view-course">
                  {courses.map((course) => (
                    <Course detail={course} key={course.subjectId} />
                  ))}
                </div>
              );
            }}
          </Courses.List>
        </>
      </Courses.WrapperProvider>
    </div>
  );
};

export default Page;
