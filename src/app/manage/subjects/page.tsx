import DisplayCourses from "./components/DisplayCourses";

const page = async () => {
  return (
    <>
      <p className="mb-4 text-gray-500">เลือกวิชาที่ต้องการจัดการ หรือ สร้างรายวิชาใหม่</p>
      <DisplayCourses />
    </>
  );
};

export default page;
