"use client";
import React from "react";
import ApprovalFormProvider from "./providers/ApprovalFormProvider";
import Form from "./Form";

const GTE_EIGHT = () => {
  return (
    <ApprovalFormProvider>
      <Form />
    </ApprovalFormProvider>
  );
};

export default GTE_EIGHT;
