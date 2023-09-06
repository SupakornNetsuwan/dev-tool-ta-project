import React, { useMemo } from "react";
import NavigateAction from "../NavigateAction";
import { useParams, usePathname } from "next/navigation";
import useGetCourse from "@/core/hooks/courses/useGetCourse";

const SystemClosedCourseCompleted: React.FC<{
  isBasicDetailCompleted?: boolean | undefined;
  isApprovalFormCompleted?: boolean | undefined;
  isVerifyCompleted?: boolean | undefined;
}> = () => {
  const { subjectId } = useParams();
  const pathname = usePathname();
  const { data } = useGetCourse(subjectId);
  const courseDetail = useMemo(() => data?.data.data, [data]);

  return (
    <>
      <NavigateAction disabled={false} isCompleted={Boolean(courseDetail?.shareWorkloadFile)} href={`${pathname}/workload`}>
        <span>อัปโหลดไฟล์แบ่งภาระงาน</span>
      </NavigateAction>
    </>
  );
};

export default SystemClosedCourseCompleted;
