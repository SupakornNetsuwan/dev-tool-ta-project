import React from "react";
import Row from "./Row";
import { useFormContext } from "react-hook-form";

const Form = () => {
  const { watch } = useFormContext();
  console.log(watch());

  const enrollAmount = 10;
  const groupAmount = 3;

  return (
    <div>
      <p className="text-gray-500">
        วิชาปฏิบัติการเฉพาะ ปฏิบัติงานเป็นผู้ช่วยสอน ไม่น้อยกว่า 8 ชม./สัปดาห์ (ทุนละ 15,000 บาท)
        <br />
        จำนวนนักศึกษาลงทะเบียน {enrollAmount} คน แบ่งเป็น {groupAmount} กลุ่ม/สัปดาห์ รวม..........ชม./สัปดาห์
      </p>
      <form>
        <Row />
      </form>
    </div>
  );
};

export default Form;
