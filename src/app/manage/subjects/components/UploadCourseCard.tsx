import Link from "next/link";

const CardUpload = () => {
  return (
    <>
      <Link
        href="/manage/subjects/upload"
        className="flex min-h-[8em] cursor-pointer items-center justify-center border-2 border-dashed border-gray-300 bg-white p-4 text-blue-500 hover:shadow-md"
      >
        เพิ่มรายวิชา
      </Link>
    </>
  );
};
export default CardUpload;
