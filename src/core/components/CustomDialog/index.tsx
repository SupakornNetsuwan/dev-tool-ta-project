import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
// Types
import { CustomDialogProps } from "./CustomDialogTypes";

const CustomDialog: React.FC<CustomDialogProps> = ({
  children,
  description,
  title,
  setShowDialog,
  showDialog,
  actionButton,
  cancelButton,
}) => {
  return (
    <AlertDialog.Root open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          onClick={(e) => setShowDialog(false)}
          className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm"
        />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] origin-top-left rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-openDialog">
          <AlertDialog.Title asChild className=" text-lg font-medium">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description asChild className="mb-5 mt-4 text-sm leading-normal">
            {description}
          </AlertDialog.Description>
          <div className="flex justify-end gap-2">
            <AlertDialog.Cancel asChild>{cancelButton}</AlertDialog.Cancel>
            <AlertDialog.Action asChild>{actionButton}</AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default CustomDialog;
