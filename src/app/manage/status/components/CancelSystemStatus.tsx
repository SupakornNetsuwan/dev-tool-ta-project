"use client";
import React from "react";
import useDeleteSystemStatus from "../hooks/useDeleteSystemStatus";
// Hooks
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";

const CancelSystemStatus = () => {
  const { openToast } = useCustomToast();
  const deleteSystemStatus = useDeleteSystemStatus();

  const cancelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    /*
        TODOS : 
        1. ทำการแสดง Modal เพื่อ confirm
    */
    deleteSystemStatus.mutate(null, {
      onSuccess: (data) => {
        /*
            TODOS : 
            1. ทำให้ API สามารถไปลบข้มมูลช่วงของการเปิด/ปิด รับสมัครได้
            2. ทำการ Validate ข้อมูลด้วย
            3. ทำการเรียกใช้ API ตรงนี้ และ ใส่ Alert
        */
        console.log(data.data.message);
      },
      onError: (error) => {
        console.log(error?.response?.data);
      },
    });
  };

  return (
    <div>
      <button onClick={cancelHandler} className="click-animation btn border border-red-500 bg-red-50 text-red-500">
        ยกเลิกช่วงเวลา
      </button>
    </div>
  );
};

export default CancelSystemStatus;
