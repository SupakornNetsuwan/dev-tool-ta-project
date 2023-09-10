"use client";
import React, { useEffect } from "react";
import Courses from "./Courses";
import Course from "./Course";

const Page = () => {
  return (
    <div className="rounded bg-gray-50 p-4 mb-12">
      <Courses.WrapperProvider>
        <>
          <div className="mb-4 flex items-center  justify-between">
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
