"use client";
import React from "react";
import ApprovalFormProvider from "./providers/ApprovalFormProvider";
import Form from "./Form";

const PROJECTBASE = () => {
  return (
    <ApprovalFormProvider>
      <Form />
    </ApprovalFormProvider>
  );
};

export default PROJECTBASE;
