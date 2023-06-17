import StatusConfigure from "./components/StatusConfigure";

const page = () => {
  return (
    <div>
      <p className="text-gray-500">ปรับเปลี่ยนสถานะการรับสมัครโดยการกำหนด เวลาเปิด และ เวลาปิด ของการรับสมัคร</p>
      <StatusConfigure />
    </div>
  );
};

export default page;
