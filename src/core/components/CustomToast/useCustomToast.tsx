import React, { useState } from "react";

const useCustomToast = () => {
  const [showToast, setShowToast] = useState<boolean>(false);

  const openToast = () => {
    setShowToast(false);
    // เพื่อทำให้ clear toast อันที่ผ่านๆ มา
    window.setTimeout(() => {
      setShowToast((prevState) => true);
    }, 100);
  };

  return { showToast, setShowToast, openToast };
};

export default useCustomToast