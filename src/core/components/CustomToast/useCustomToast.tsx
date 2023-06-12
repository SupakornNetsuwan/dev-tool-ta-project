import  { useState } from "react";
import type { ToastStateProps, ToastElements } from "./customToastTypes";

const useCustomToast = () => {
  const [toastState, setToastState] = useState<ToastStateProps>({
    showToast: false,
    title: null,
    description: null,
    actionButton: null,
  });

  /**
   * @description ทำการเปิด toast
   */
  const openToast = ({ title, description, actionButton }: ToastElements) => {
    setToastState({ showToast: false, title, description, actionButton });

    // เพื่อทำให้ clear toast อันที่ผ่านๆ มา
    window.setTimeout(() => {
      setToastState((prevToast) => ({ ...prevToast, showToast: true }));
    }, 100);
  };

  /**
   * @description ทำการปิด toast
   */
  const closeToast = () => {
    setToastState((prevToast) => ({ ...prevToast, showToast: false }));
  };

  /**
   * @description ทำการตั้งค่าว่าจะแสดง toast หรือไม่
   */
  const setIsShowToast = (isShowToast: boolean) => {
    setToastState((prevToast) => ({ ...prevToast, showToast: isShowToast }));
  };

  return { toastState, setIsShowToast, openToast };
};

export default useCustomToast;
