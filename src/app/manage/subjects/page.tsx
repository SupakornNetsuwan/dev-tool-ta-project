import Courses from "./components/Courses";

const page = async () => {
  return (
    <>
      <p className="mb-4 text-gray-500">เลือกวิชาที่ต้องการจัดการ หรือ สร้างรายวิชาใหม่</p>
      <Courses />
    </>
  );
};

export default page;
