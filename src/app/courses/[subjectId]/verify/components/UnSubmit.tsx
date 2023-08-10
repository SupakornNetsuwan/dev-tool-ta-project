import React from "react";
import { HiOutlineWrench, HiOutlineXMark } from "react-icons/hi2";
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import useUpdateCourse from "@/core/hooks/courses/useUpdateCourse";
import { useParams, useRouter } from "next/navigation";

const UnSubmit = () => {
  const router = useRouter();
  const updateCourse = useUpdateCourse();
  const { subjectId } = useParams();
  const { openToast } = useCustomToast();
  const submit = () => {
    updateCourse.mutate(
      {
        subjectId: subjectId,
        creationStatus: "CREATED",
      },
      {
        onSuccess(data, variables, context) {
          openToast({
            title: <p className="text-blue-500">กลับเป็นโหมดแก้ไขแล้ว</p>,
            description: <p>ตอนนี้คุณสามารถแก้ไขข้อมูลได้แล้ว</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
          router.replace(`/courses/${subjectId}`);
        },
        onError(error, variables, context) {
          openToast({
            title: <p className="text-red-500">ไม่สามารถกลับเข้าสู่โหมดแก้ไขได้</p>,
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
      className="btn click-animation flex items-center space-x-1 rounded border border-amber-500 bg-amber-50 px-4 py-2 text-amber-500"
    >
      <span>แก้ไข</span>
      <HiOutlineWrench />
    </button>
  );
};

export default UnSubmit;
