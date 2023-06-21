import DisplaySystemStatus from "./components/DisplaySystemStatus";
import CreateStatusForm from "./components/CreateStatusForm";
// Using API
import getSystemStatus from "@/app/api/manage/systemStatus/func/getSystemStatus";

const page = async () => {
  const systemStatus = await getSystemStatus();


  return (
    <div>
      <p className="mb-4 text-gray-500">ปรับเปลี่ยนสถานะการรับสมัครโดยการกำหนด เวลาเปิด และ เวลาปิด ของการรับสมัคร</p>
      {!systemStatus ? <CreateStatusForm /> : <DisplaySystemStatus systemStatus={systemStatus} />}
    </div>
  );
};

export default page;
