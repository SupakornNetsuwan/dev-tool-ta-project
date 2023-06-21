import { useState } from "react";
import type { DialogStateProps, DialogOpenFuncProps } from "../CustomDialogTypes";

const useCustomDialog = () => {
  const [dialogState, setDialogState] = useState<DialogStateProps>({
    showDialog: false,
    actionButton: null,
    cancelButton: null,
    description: "",
    title: "",
  });

  /**
   * @description ทำการเปิด dialog
   */

  const openDialog = ({ actionButton, cancelButton, description, title }: DialogOpenFuncProps) => {
    setDialogState({
      showDialog: true,
      actionButton: actionButton,
      cancelButton: cancelButton,
      description: description,
      title: title,
    });
  };

  /**
   * @description ทำการปิด dialog
   */

  const closeDialog = () => {
    setDialogState({
      ...dialogState,
      showDialog: false,
    });
  };

  /**
   * @description ทำการตั้งค่าว่าจะแสดง dialog หรือไม่
   */
  const setShowDialog = (isShowDialog: boolean) => {
    setDialogState({
      ...dialogState,
      showDialog: isShowDialog,
    });
  };

  return { openDialog, closeDialog, setShowDialog, dialogState };
};

export default useCustomDialog;
