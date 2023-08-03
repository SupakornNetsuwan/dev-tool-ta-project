import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import CourseRouteGuard from "./layouts/CourseRouteGuard";

type Props = {
  params: { subjectId: string };
};

export const generateMetadata = async (
  { params: { subjectId } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  return {
    title: `จัดการคอร์ส (${subjectId}) 📖`,
    description: `จัดการคอร์สเรียนรหัสวิชา ${subjectId}`,
  };
};

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <CourseRouteGuard>{children}</CourseRouteGuard>;
};

export default layout;
