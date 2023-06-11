import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

type CustomDialogProps = {};

const CustomDialog: React.FC<CustomDialogProps> = () => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
          Delete account
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] origin-top-left rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-openDialog">
          <AlertDialog.Title className=" text-lg font-medium">Are you absolutely sure?</AlertDialog.Title>
          <AlertDialog.Description className="mb-5 mt-4 text-sm leading-normal">
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <button className="inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium outline-none hover:bg-gray-100 focus:shadow-[0_0_0_2px]">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className="focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-blue-50 px-[15px] font-medium leading-none outline-none hover:bg-blue-100 focus:shadow-[0_0_0_2px]">
                Yes, delete account
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default CustomDialog;
