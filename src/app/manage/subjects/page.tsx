import DisplayCourse from "./components/DisplayCourse";

const page = async () => {
  return (
    <>
      <p className="mb-4 text-gray-500">เพิ่มหรือลบรายวิชาที่ต้องการให้มีการรับสมัคร</p>
      <DisplayCourse />
    </>
  );
};

export default page;
