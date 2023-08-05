"use client";
import React from "react";
import ApprovalFormProvider from "./providers/ApprovalFormProvider";
import Form from "./Form";

const REF_SCHEDULE = () => {
  return (
    <ApprovalFormProvider>
      <Form />
    </ApprovalFormProvider>
  );
};

export default REF_SCHEDULE;
