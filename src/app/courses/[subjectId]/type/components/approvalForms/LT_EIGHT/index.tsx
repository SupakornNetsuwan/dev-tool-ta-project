"use client";
import React from "react";
import ApprovalFormProvider from "./providers/ApprovalFormProvider";
import Form from "./Form";

const LT_EIGHT = () => {
  return (
    <ApprovalFormProvider>
      <Form />
    </ApprovalFormProvider>
  );
};

export default LT_EIGHT;
