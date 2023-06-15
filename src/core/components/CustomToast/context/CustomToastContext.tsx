import React from "react";
import type { ToastStateProps, ToastElements } from "../CustomToastTypes";

type CustomToastContextType = {
  toastState: ToastStateProps;
  openToast: ({ title, description, actionButton }: ToastElements) => void;
  closeToast: () => void;
};

const CustomToastContext = React.createContext<null | CustomToastContextType>(null);

export default CustomToastContext;
