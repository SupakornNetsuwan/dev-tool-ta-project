import React from "react";
import { Metadata, ResolvingMetadata } from "next";

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
  return <>{children}</>;
};

export default layout;
