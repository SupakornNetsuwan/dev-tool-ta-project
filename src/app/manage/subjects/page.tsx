import Courses from "./components/Courses";
import CoursesToolbar from "./components/CoursesToolbar";
import CoursesToolbarProvider from "./providers/CoursesToolbarProvider";

const page = async () => {
  return (
    <CoursesToolbarProvider>
      <p className="mb-4 text-gray-500">เลือกวิชาที่ต้องการจัดการ หรือ สร้างรายวิชาใหม่</p>
      <CoursesToolbar />
      <Courses />
    </CoursesToolbarProvider>
  );
};

export default page;
