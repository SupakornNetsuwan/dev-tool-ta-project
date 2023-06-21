/**
 * @description Elements ทีอยู่ใน Toast ที่ต้องส่งไปใน CustomToast Component
 */

export type DialogOpenFuncProps = Omit<CustomDialogProps, "children" | "setShowDialog" | "showDialog">

/**
 * @description state ใช้สำหรับ toast state ใน useCustom Toast
 */

export type DialogStateProps = Omit<CustomDialogProps, "children" | "setShowDialog">

/**
 * @description ใช้สำหรับ CustomDialog Component
 */

export type CustomDialogProps = {
    setShowDialog: (isShowDialog: boolean) => void;
    showDialog: boolean;
    title?: React.ReactNode;
    description?: React.ReactNode;
    cancelButton: React.ReactNode;
    actionButton?: React.ReactNode;
    children?: React.ReactNode;
};


