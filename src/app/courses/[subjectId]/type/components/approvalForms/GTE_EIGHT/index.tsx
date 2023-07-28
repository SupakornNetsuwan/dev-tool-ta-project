"use client";
import React, { useEffect } from "react";
import useGetCourse from "@/core/hooks/courses/useGetCourse";
import { useParams } from "next/navigation";
import LoadingSkeleton from "../LoadingSkeleton";
import ApprovalFormProvider from "./providers/ApprovalFormProvider";
import Form from "./Form";

const GTE_EIGHT = () => {
  const { subjectId } = useParams();
  const { status, data } = useGetCourse(subjectId);

  useEffect(() => {
    if (status === "success" && data?.data.data.approvalForm === null) {
      console.group("ข้อมูลที่ได้ ✨");
      console.log("ได้ข้อมูลฟอร์มขออนุมัติผู้ช่วยสอนที่ต้องกับประเภทของฟอร์ม");
      console.log(data?.data.data);
      console.groupEnd();
    }
  }, [data?.data.data, status]);

  if (status === "loading") return <LoadingSkeleton />;

  return (
    <ApprovalFormProvider>
      <Form />
    </ApprovalFormProvider>
  );
};

export default GTE_EIGHT;
