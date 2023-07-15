import Link from "next/link";

const CardUpload = () => {
  return (
    <>
      <div className="flex cursor-pointer items-center justify-center border-2 border-dashed border-gray-300 bg-white p-4">
        <Link href="/manage/subjects/upload" className="text-blue-500">
          เพิ่มรายวิชา
        </Link>
      </div>
    </>
  );
};
export default CardUpload;
