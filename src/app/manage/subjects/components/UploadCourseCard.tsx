"use client";
import { useRouter } from "next/navigation";

const CardUpload = () => {
  const router = useRouter();

  const navigateToUploadCourse = () => {
    router.push("/manage/subjects/upload");
  };

  return (
    <>
      <div
        onClick={navigateToUploadCourse}
        className="flex cursor-pointer items-center justify-center border-2 border-dashed border-gray-300 bg-white p-4"
      >
        <p className="text-blue-500">+ เพิ่มรายวิชา</p>
      </div>
    </>
  );
};
export default CardUpload;
