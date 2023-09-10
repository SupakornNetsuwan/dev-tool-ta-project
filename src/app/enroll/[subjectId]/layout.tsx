import React from "react";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { subjectId: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { subjectId } = params;

  return {
    title: `📚 ${subjectId}`,
  };
}

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default layout;
