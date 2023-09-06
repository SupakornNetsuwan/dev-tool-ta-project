"use client";
import List from "@/core/components/List";
import React, { useEffect } from "react";
import useGetCourseWithApproval from "@/core/hooks/courses/useGetCourseWithApproval";
import { useParams } from "next/navigation";
import useGetSystemStatus from "@/core/hooks/systemStatus/useGetSystemStatus";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./LoadingSkeleton";

import UnSubmit from "./UnSubmit";
import Submit from "./Submit";

const Verify = () => {
  const { subjectId } = useParams();
  const router = useRouter();
  const courseDetail = useGetCourseWithApproval(subjectId);
  const systemStatus = useGetSystemStatus();
  const [courseDetailData, systemStatusData] = [courseDetail.data?.data.data, systemStatus.data?.data.data];
  const isVerifyCompleted = courseDetailData?.creationStatus === "ENROLLABLE";

  useEffect(() => {
    if (courseDetail.isSuccess && systemStatus.isSuccess) {
      if (
        !courseDetailData?.approvalForm ||
        !courseDetailData?.isBasicDetailCompleted ||
        systemStatusData?.isOpen === false
      ) {
        router.back();
      }
    }
  }, [courseDetailData, courseDetail, systemStatus, systemStatusData, router]);

  if (courseDetail.isLoading || systemStatus.isLoading) return <LoadingSkeleton />;

  return (
    <>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-blue-500">ยืนยันการส่งแบบฟอร์ม</h3>
        <p className="text-gray-500">โปรดตรวจทานข้อมูลดังกล่าวต่อไปนี้เพื่อความถูกต้อง</p>
      </div>
      <List.Wrapper>
        <p className="py-4 text-lg font-medium text-gray-800">ข้อมูลผู้ขอ</p>
        <List.Item topic="ชื่อ-นามสกุล">
          <p className="text-gray-500">{`${courseDetailData?.title}${courseDetailData?.firstname} ${courseDetailData?.lastname}`}</p>
        </List.Item>
        <p className="py-4 text-lg font-medium text-gray-800">รายละเอียดวิชา</p>
        <List.Item topic="รหัสวิชา">
          <p className="text-gray-500">{courseDetailData?.subjectId}</p>
        </List.Item>
        <List.Item topic="ชื่อวิชาภาษาอังกฤษ">
          <p className="text-gray-500">{courseDetailData?.nameEng}</p>
        </List.Item>
        <List.Item topic="ชื่อวิชาภาษาไทย">
          <p className="text-gray-500">{courseDetailData?.nameThai}</p>
        </List.Item>
        <List.Item topic="หน่วยกิต">
          <p className="text-gray-500">{courseDetailData?.credit}</p>
        </List.Item>
        <List.Item topic="ภาคการศึกษา">
          <p className="text-gray-500">{systemStatusData?.semester}</p>
        </List.Item>
        <List.Item topic="ปีการศึกษา">
          <p className="text-gray-500">{systemStatusData?.year}</p>
        </List.Item>
        <p className="py-4 text-lg font-medium text-gray-800">ขออนุมัติจ้างนักศึกษาเพื่อช่วยปฏิบัติงานดังนี้</p>
        <List.Item topic="xxxx">
          <p className="text-gray-500">xxxx</p>
        </List.Item>
        <div className="flex justify-end pt-12">{isVerifyCompleted ? <UnSubmit /> : <Submit />}</div>
      </List.Wrapper>
    </>
  );
};

export default Verify;
