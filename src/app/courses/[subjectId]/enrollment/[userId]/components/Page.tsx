"use client";
import React from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const { userId } = useParams();
  
  return <div>Page</div>;
};

export default Page;
