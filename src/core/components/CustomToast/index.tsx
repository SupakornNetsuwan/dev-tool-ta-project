import React from "react";
import * as Toast from "@radix-ui/react-toast";

type CustomToastProps = {
  showToast: boolean;
  setShowToast: (isShowToast: boolean) => void;
  children?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  actionButton?: React.ReactNode;
};

/**
 * 
 * @param showToast เป็น boolean ที่แสดงว่าจะแสดง toast หรือไม่
 * @param setShowToast เป็น function ที่ใช้เปลี่ยนค่า showToast
 * @param children เป็น Button / Element ที่แสดงเพื่อ trigger toast
 * @param title เป็น title ของ toast
 * @param description เป็น description ของ toast
 * @param actionButton เป็น Button ที่แสดงใน toast ปกติให้กดปิด
 * @remarks ใช้คู่กับ useCustomToast
 * ```
 * {
  showToast: boolean;
  setShowToast: (isShowToast: boolean) => void;
  children?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  actionButton?: React.ReactNode;
  };
 * ```
 */

const CustomToast: React.FC<CustomToastProps> = ({
  showToast,
  setShowToast,
  children,
  title,
  description,
  actionButton,
}) => {
  return (
    <Toast.Provider swipeDirection="right">
      <>{children}</>
      <Toast.Root
        duration={2000}
        className="
        data-[swipe=end]:animate-swipeOut flex
        items-center
        justify-between gap-x-[15px] rounded-md bg-white p-[15px]
        shadow-realistic-1
        data-[swipe=cancel]:translate-x-0
        data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
        data-[state=closed]:animate-slideOut
        data-[state=open]:animate-slideIn
        data-[swipe=cancel]:transition-[transform_200ms_ease-out]
        "
        open={showToast}
        onOpenChange={setShowToast}
      >
        <div>
          <Toast.Title className="mb-[5px] text-lg font-medium text-gray-900">{title}</Toast.Title>
          <Toast.Description asChild className="text-sm text-gray-500">
            {description}
          </Toast.Description>
        </div>
        <Toast.Action asChild altText="Goto schedule to undo">
          {actionButton || null}
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
    </Toast.Provider>
  );
};

export default CustomToast;
