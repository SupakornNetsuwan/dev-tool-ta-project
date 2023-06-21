import { useState, useCallback } from "react";
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

  const openDialog = useCallback(
    ({ actionButton, cancelButton, description, title }: DialogOpenFuncProps) => {
      setDialogState({
        showDialog: true,
        actionButton: actionButton,
        cancelButton: cancelButton,
        description: description,
        title: title,
      });
    },
    [dialogState]
  );

  /**
   * @description ทำการปิด dialog
   */

  const closeDialog = useCallback(() => {
    setDialogState({
      ...dialogState,
      showDialog: false,
    });
  }, [dialogState]);

  /**
   * @description ทำการตั้งค่าว่าจะแสดง dialog หรือไม่
   */
  const setShowDialog = useCallback(
    (isShowDialog: boolean) => {
      setDialogState({
        ...dialogState,
        showDialog: isShowDialog,
      });
    },
    [dialogState]
  );

  return { openDialog, closeDialog, setShowDialog, dialogState };
};

export default useCustomDialog;
