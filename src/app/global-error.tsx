"use client";
import React, { useEffect } from "react";
import ErrorLayout from "@/core/layouts/ErrorLayout";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
    
  useEffect(() => {
    console.log(error.message);
  }, [error]);
  
  return <ErrorLayout>{error.message}</ErrorLayout>;
};

export default Error;
