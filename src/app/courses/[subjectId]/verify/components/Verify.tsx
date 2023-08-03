"use client";
import List from "@/core/components/List";
import React, { useCallback, useEffect } from "react";
import useGetCourseWithApproval from "@/core/hooks/courses/useGetCourseWithApproval";
import { useParams } from "next/navigation";
import useGetSystemStatus from "@/core/hooks/systemStatus/useGetSystemStatus";
import { HiOutlineCheck, HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./LoadingSkeleton";

const Verify = () => {
  const { subjectId } = useParams();
  const router = useRouter();
  const fetchedCourseDetail = useGetCourseWithApproval(subjectId);
  const fetchedSystemStatus = useGetSystemStatus();

  const courseDetail = fetchedCourseDetail.data?.data.data;
  const systemStatus = fetchedSystemStatus.data?.data.data;

  useEffect(() => {
    if (fetchedCourseDetail.isSuccess && fetchedSystemStatus.isSuccess) {
      if (
        !fetchedCourseDetail.data.data.data.approvalForm ||
        !fetchedCourseDetail.data.data.data.isBasicDetailCompleted
      ) {
        router.back();
      }
    }
  }, [fetchedCourseDetail, fetchedSystemStatus, router]);

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  if (fetchedCourseDetail.isLoading || fetchedSystemStatus.isLoading) return <LoadingSkeleton />;

  return (
    <>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-blue-500">ยืนยันการส่งแบบฟอร์ม</h3>
        <p className="text-gray-500">โปรดตรวจทานข้อมูลดังกล่าวต่อไปนี้เพื่อความถูกต้อง</p>
      </div>
      <List.Wrapper>
        <p className="py-4 text-lg font-medium text-gray-800">ข้อมูลผู้ขอ</p>
        <List.Item topic="ชื่อ-นามสกุล">
          <p className="text-gray-500">{`${courseDetail?.title}${courseDetail?.firstname} ${courseDetail?.lastname}`}</p>
        </List.Item>
        <p className="py-4 text-lg font-medium text-gray-800">รายละเอียดวิชา</p>
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
        <List.Item topic="ภาคการศึกษา">
          <p className="text-gray-500">{systemStatus?.semester}</p>
        </List.Item>
        <List.Item topic="ปีการศึกษา">
          <p className="text-gray-500">{systemStatus?.year}</p>
        </List.Item>
        <p className="py-4 text-lg font-medium text-gray-800">ขออนุมัติจ้างนักศึกษาเพื่อช่วยปฏิบัติงานดังนี้</p>
        <List.Item topic="xxxx">
          <p className="text-gray-500">xxxx</p>
        </List.Item>
        <div className="flex justify-between pt-12">
          <button
            onClick={goBack}
            className="btn click-animation  flex items-center space-x-1 rounded border border-gray-300 bg-gray-50 px-4 py-2 text-gray-500"
          >
            <HiOutlineArrowSmallLeft />
            <span>กลับไปแก้ไข</span>
          </button>
          <button className="btn click-animation  flex items-center space-x-1 rounded border border-blue-500 bg-blue-50 px-4 py-2 text-blue-500">
            <span>ยืนยัน</span>
            <HiOutlineCheck />
          </button>
        </div>
      </List.Wrapper>
    </>
  );
};

export default Verify;
