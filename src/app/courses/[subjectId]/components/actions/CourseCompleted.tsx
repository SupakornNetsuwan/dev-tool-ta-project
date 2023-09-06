import React from "react";
import NavigateAction from "../NavigateAction";
import { usePathname } from "next/navigation";

const CourseCompleted: React.FC<{
  isBasicDetailCompleted: boolean | undefined;
  isApprovalFormCompleted: boolean | undefined;
  isVerifyCompleted: boolean | undefined;
}> = ({ isApprovalFormCompleted, isBasicDetailCompleted, isVerifyCompleted }) => {
  const pathname = usePathname();

  return (
    <>
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

export default CourseCompleted;
