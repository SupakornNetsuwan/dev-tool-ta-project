import React from "react";
import { HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import useUpdateCourse from "@/core/hooks/courses/useUpdateCourse";
import { useParams, useRouter } from "next/navigation";

const Submit = () => {
  const router = useRouter();
  const updateCourse = useUpdateCourse();
  const { subjectId } = useParams();
  const { openToast } = useCustomToast();
  const submit = () => {
    updateCourse.mutate(
      {
        subjectId: subjectId,
        creationStatus: "ENROLLABLE",
      },
      {
        onSuccess(data, variables, context) {
          openToast({
            title: <p className="text-blue-500">ยืนยันฟอร์มวิชาสำเร็จ 🎉</p>,
            description: <p>วิชา {subjectId} ได้เปิดให้ลงทะเบียนแล้ว</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
          router.replace(`/courses/${subjectId}`);
        },
        onError(error, variables, context) {
          openToast({
            title: <p className="text-red-500">ไม่สามารถยืนยันการส่งฟอร์มได้</p>,
            description: <p>{error?.response?.data.message || "ไม่ทราบสาเหตุ"}</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
        },
      }
    );
  };
  return (
    <button
      onClick={submit}
      className="btn click-animation flex items-center space-x-1 rounded border border-blue-500 bg-blue-50 px-4 py-2 text-blue-500"
    >
      <span>ยืนยัน</span>
      <HiOutlineCheck />
    </button>
  );
};

export default Submit;
