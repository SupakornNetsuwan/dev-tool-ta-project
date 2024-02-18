"use client";
import { useMemo } from "react";
import type { FetchCourseType } from "@/app/api/subjects/[subjectId]/CourseTypes";
import Link from "next/link";
import SuccessStepper from "./SuccessStepper";
import { twMerge } from "tailwind-merge";
import useGetSystemStatus from "@/core/hooks/systemStatus/useGetSystemStatus";
import useCustomToast from "../CustomToast/hooks/useCustomToast";
import {  HiOutlineXMark } from "react-icons/hi2";
import CustomDialog from "@/core/components/CustomDialog";
import useCustomDialog from "@/core/components/CustomDialog/hooks/useCustomDialog";
import useDeleteCourse from "@/core/hooks/courses/useDeleteCourse";
import { useQueryClient } from "@tanstack/react-query";
const CourseCard: React.FC<{
  course: FetchCourseType;
  children?: React.ReactNode;
  basicDataDisplay: { key: string; value: JSX.Element }[];
  href: string;
}> = ({ course, children, basicDataDisplay, href }) => {
  const systemStatus = useGetSystemStatus();
  const isSystemOpen = systemStatus.data?.data.data?.isOpen;
  const isBasicDetailCompleted = course?.isBasicDetailCompleted;
  const isApprovalFormCompleted = Boolean(course?.approvalForm);
  const isVerifyCompleted = course?.creationStatus === "ENROLLABLE";''

  // delete course
  const DeleateCourse = useDeleteCourse();
  const {openToast} = useCustomToast()
  const { dialogState, setShowDialog, openDialog } = useCustomDialog();
  const queryClient = useQueryClient()
  const deleteCourse = async () =>{
    DeleateCourse.mutate(
      {
        subjectId: course?.subjectId,
      },
      {
        onSuccess(data, vuriables, context){
          queryClient.invalidateQueries({ queryKey: ["getCourses"],})
          openToast({
            title: <p className="text-blue-500">ลบวิชาสำเร็จ 🗑️</p>,
            description: <p>{data.data.message}</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
        },
        onError(error, variables, context) {
          openToast({
            title: <p className="text-red-500">ไม่สามารถลบวิชาได้</p>,
            description: <p>{error?.response?.data.message || "ไม่ทราบสาเหตุ"}</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
        },
      }
    )
  }
  const confirmDeleteCourse = () => {
    openDialog({
      title: <p className="text-red-500">คำเตือน ⚠️</p>,
      description: (
        <div className="text-gray-500">
          <p>ยืนยันที่จะลบวิชานี้หรือไม่</p>
          <ul className="list-inside list-disc">
            <li>เมื่อลบแล้วรายวิชานี้จะหายไปทันที</li>
            <li>รวมถึงข้อมูลที่เกี่ยวข้องกับรายวิชานี้ด้วย</li>
          </ul>
        </div>
      ),
      cancelButton: <button className="btn bg-gray-50 px-4 py-2 text-gray-500">ยกเลิก</button>,
      actionButton: (
        <button onClick={deleteCourse} className="btn bg-red-50 px-4 py-2 text-red-500">
          ยืนยัน
        </button>
      ),
    });
  };

  const courseStatus = useMemo(() => {
    if (!systemStatus.isSuccess) return "ไม่ทราบสถานะ";

    if (!isSystemOpen && isVerifyCompleted) {
      return "ระบบปิดรับสมัครอัตโนมัติ";
    }

    if (isVerifyCompleted) {
      return "เปิดรับสมัครอยู่";
    }

    return "ยังไม่ได้เปิดรับสมัคร";
  }, [isSystemOpen, systemStatus.isSuccess, isVerifyCompleted]);

  return (
    <>
    <CustomDialog {...dialogState} setShowDialog={setShowDialog} />
    <div className="flex flex-col rounded border border-gray-300 bg-white p-4 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="mb-4 flex items-center justify-center space-x-1">
          <div
            className={twMerge(
              "h-2 w-2 rounded-full bg-gray-500",
              courseStatus === "เปิดรับสมัครอยู่" && "animate-pulse bg-green-600",
              courseStatus === "ระบบปิดรับสมัครอัตโนมัติ" && "bg-amber-500"
            )}
          />
          <span
            className={twMerge(
              "text-xs text-gray-500",
              courseStatus === "เปิดรับสมัครอยู่" && "text-green-600",
              courseStatus === "ระบบปิดรับสมัครอัตโนมัติ" && "text-amber-500"
            )}
          >
            {courseStatus}
          </span>
        </div>
        <div className="mb-4">
          <button className="btn click-animation active-on text-sm text-red-500 hover:text-red-700"
            onClick={confirmDeleteCourse}
          >
            ลบรายวิชา
          </button>
        </div>
      </div>
      <div className="[&>div]:pb-2">
        {basicDataDisplay.map((data) => (
          <div key={data.key}>
            <p className="text-xs text-gray-500">{data.key}</p>
            <div className="text-sm font-medium ">{data.value}</div>
          </div>
        ))}
      </div>
      <div className="mb-2 grid w-full grid-cols-1 gap-2 bg-gray-50 p-2">
        <SuccessStepper isCompleted={isBasicDetailCompleted}>กรอกรายละเอียดเบื้องต้นแล้ว</SuccessStepper>
        <SuccessStepper isCompleted={isApprovalFormCompleted}>เลือกประเภทวิชาแล้ว</SuccessStepper>
        <SuccessStepper isCompleted={isVerifyCompleted}>ตรวจสอบ และ ยืนยันแล้ว</SuccessStepper>
        {isVerifyCompleted && courseStatus === "ระบบปิดรับสมัครอัตโนมัติ" && (
          <SuccessStepper isCompleted={Boolean(course.shareWorkloadFile)}>อัปโหลดไฟล์แบ่งภาระงาน</SuccessStepper>
        )}
      </div>
      {children}
      <div className="mt-auto flex items-center justify-end space-x-2">
        <Link href={href}>
          <button className="btn click-animation active-on text-sm text-blue-500 hover:text-blue-700">
            รายละเอียด
          </button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default CourseCard;
