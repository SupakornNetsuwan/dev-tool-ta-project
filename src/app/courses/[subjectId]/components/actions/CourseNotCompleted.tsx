import React from "react";
import NavigateAction from "../NavigateAction";
import { usePathname } from "next/navigation";

const CourseNotCompleted: React.FC<{
  isBasicDetailCompleted: boolean | undefined;
  isApprovalFormCompleted: boolean | undefined;
  isVerifyCompleted: boolean | undefined;
}> = ({ isBasicDetailCompleted, isApprovalFormCompleted, isVerifyCompleted }) => {
  const pathname = usePathname();

  return (
    <>
      <NavigateAction isCompleted={isBasicDetailCompleted} href={`${pathname}/detail`}>
        <span>รายละเอียดวิชาเบื้องต้น</span>
      </NavigateAction>
      <NavigateAction isCompleted={isApprovalFormCompleted} href={`${pathname}/type`}>
        <span>ประเภทวิชาที่เปิดรับสมัคร </span>
      </NavigateAction>
      <NavigateAction
        disabled={!isBasicDetailCompleted || !isApprovalFormCompleted}
        isCompleted={isVerifyCompleted}
        href={`${pathname}/verify`}
      >
        <span>ตรวจสอบ และ ยืนยัน</span>
      </NavigateAction>
    </>
  );
};

export default CourseNotCompleted;
