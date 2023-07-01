import DisplayCourses from "./components/DisplayCourses";

const page = async () => {
  return (
    <>
      <p className="mb-4 text-gray-500">เพิ่มหรือลบรายวิชาที่ต้องการให้มีการรับสมัคร</p>
      <DisplayCourses />
    </>
  );
};

export default page;
