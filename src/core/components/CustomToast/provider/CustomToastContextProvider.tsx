"use client";
import React, { useState, useCallback } from "react";
import CustomToast from "../index";
import CustomToastContext from "../context/CustomToastContext";
import type { ToastStateProps, ToastOpenFuncProps } from "../CustomToastTypes";

const CustomToastContextProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [toastState, setToastState] = useState<ToastStateProps>({
    showToast: false,
    title: null,
    description: null,
    actionButton: null,
  });

  /**
   * @description ทำการเปิด toast
   */
  const openToast = useCallback(({ title, description, actionButton }: ToastOpenFuncProps) => {
    setToastState({ showToast: false, title, description, actionButton });

    // เพื่อทำให้ clear toast อันที่ผ่านๆ มา
    window.setTimeout(() => {
      setToastState((prevToast) => ({ ...prevToast, showToast: true }));
    }, 100);
  }, []);

  /**
   * @description ทำการปิด toast
   */
  const closeToast = useCallback(() => {
    setToastState((prevToast) => ({ ...prevToast, showToast: false }));
  }, []);

  /**
   * @description ทำการตั้งค่าว่าจะแสดง toast หรือไม่
   */
  const setIsShowToast = useCallback((isShowToast: boolean) => {
    setToastState((prevToast) => ({ ...prevToast, showToast: isShowToast }));
  }, []);

  return (
    <CustomToastContext.Provider value={{ toastState, openToast, closeToast }}>
      <CustomToast
        setShowToast={setIsShowToast}
        showToast={toastState.showToast}
        title={toastState.title}
        description={toastState.description}
        actionButton={toastState.actionButton}
      />
      {children}
    </CustomToastContext.Provider>
  );
};

/**
 * @description ตัวจัดการ CustomToast context provider
 */

export default React.memo(CustomToastContextProvider);
