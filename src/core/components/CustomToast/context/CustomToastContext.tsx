import React from "react";
import type { ToastStateProps, ToastOpenFuncProps } from "../customToastTypes";

type CustomToastContextType = {
  toastState: ToastStateProps;
  openToast: ({ title, description, actionButton }: ToastOpenFuncProps) => void;
  closeToast: () => void;
};

const CustomToastContext = React.createContext<null | CustomToastContextType>(null);

export default CustomToastContext;
