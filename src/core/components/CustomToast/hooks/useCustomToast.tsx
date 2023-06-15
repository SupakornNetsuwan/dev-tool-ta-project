import { useContext } from "react";
import CustomToastContext from "../context/CustomToastContext";

const useCustomToast = () => {
  const context = useContext(CustomToastContext)!;
  return context;
};

export default useCustomToast;
