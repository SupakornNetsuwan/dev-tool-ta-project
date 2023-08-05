import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import UncreatedCourseRouteGuard from "./layouts/UncreatedCourseRouteGuard";

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
  return <UncreatedCourseRouteGuard>{children}</UncreatedCourseRouteGuard>;
};

export default layout;
