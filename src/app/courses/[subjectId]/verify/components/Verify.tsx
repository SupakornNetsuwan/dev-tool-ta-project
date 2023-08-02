"use client";
import List from "@/core/components/List";
import React from "react";
import useGetCourseWithApproval from "@/core/hooks/courses/useGetCourseWithApproval";
import { useParams } from "next/navigation";

const Verify = () => {
  const { subjectId } = useParams();
  const { data, status } = useGetCourseWithApproval(subjectId);
  const courseDetail = data?.data.data;

  return (
    <List.Wrapper>
      <List.Item topic="ชื่อ - นามสกุล">
        <p className="text-gray-500">{`${courseDetail?.title}${courseDetail?.firstname} ${courseDetail?.lastname}`}</p>
      </List.Item>
      <List.Item topic="รหัสวิชา">
        <p className="text-gray-500">{courseDetail?.subjectId}</p>
      </List.Item>
      <List.Item topic="ชื่อวิชาภาษาอังกฤษ">
        <p className="text-gray-500">{courseDetail?.nameEng}</p>
      </List.Item>
      <List.Item topic="ชื่อวิชาภาษาไทย">
        <p className="text-gray-500">{courseDetail?.nameThai}</p>
      </List.Item>
      <List.Item topic="หน่วยกิต">
        <p className="text-gray-500">{courseDetail?.credit}</p>
      </List.Item>
      <List.Item topic="อาจารย์ผู้สอน">
        <p className="text-gray-500">{courseDetail?.professor?.id}</p>
      </List.Item>
      <List.Item topic="จำนวนนักศึกษาที่สมัคร">
        <p className="text-gray-500">{0}</p>
      </List.Item>
    </List.Wrapper>
  );
};

export default Verify;
