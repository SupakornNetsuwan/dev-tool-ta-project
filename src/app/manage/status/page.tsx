import dynamic from "next/dynamic";
const CreateStatusForm = dynamic(() => import("./components/CreateStatusForm"), { ssr: true });
const DisplaySystemStatus = dynamic(() => import("./components/DisplaySystemStatus"), { ssr: true });
// Using API
import getSystemStatus from "@/app/api/systemStatus/func/getSystemStatus";

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
