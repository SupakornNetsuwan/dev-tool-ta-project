"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { HiOutlineXMark } from "react-icons/hi2";
// Components
import CustomDialog from "@/core/components/CustomDialog";
// Hooks
import useDeleteSystemStatus from "../hooks/useDeleteSystemStatus";
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import useCustomDialog from "@/core/components/CustomDialog/hooks/useCustomDialog";

const CancelSystemStatus = () => {
  const router = useRouter();
  const { openToast } = useCustomToast();
  const { openDialog, dialogState, setShowDialog } = useCustomDialog();
  const deleteSystemStatus = useDeleteSystemStatus();

  const cancelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    openDialog({
      title: <p className="text-red-500">คำเตือน ⚠️</p>,
      description: <p className="text-gray-500">ยืนยันที่จะลบช่วงเวลาดังกล่าวหรือไม่ การกระทำจะไม่สามารถย้านกลับได้</p>,
      cancelButton: <button className="btn bg-gray-50 px-4 py-2 text-gray-500">ยกเลิก</button>,
      actionButton: (
        <button onClick={confirmDeleteHandler} className="btn bg-red-50 px-4 py-2 text-red-500">
          ยืนยัน
        </button>
      ),
    });
  };

  const confirmDeleteHandler = async () => {
    deleteSystemStatus.mutate(null, {
      onSuccess(data, variables, context) {
        openToast({
          title: <p className="text-blue-500">ลบสำเร็จ</p>,
          description: <p>{data.data.message}</p>,
          actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
        });
        setTimeout(() => router.refresh(), 1000);
      },
      onError(error, variables, context) {
        console.log(error.response?.data.message, variables);
      },
      onSettled: () => {
        console.log("Settled");
      },
    });
  };

  return (
    <div>
      <CustomDialog {...dialogState} setShowDialog={setShowDialog} />
      <button onClick={cancelHandler} className="click-animation btn border border-red-500 bg-red-50 text-red-500">
        ยกเลิกช่วงเวลา
      </button>
    </div>
  );
};

export default CancelSystemStatus;
