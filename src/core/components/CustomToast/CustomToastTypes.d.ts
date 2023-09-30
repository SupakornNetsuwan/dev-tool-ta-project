/**
 * @description Elements ทีอยู่ใน Toast ที่ต้องส่งไปใน CustomToast Component
 */

export type ToastOpenFuncProps = Omit<CustomToastProps, "children" | "setShowToast" | "showToast">

/**
 * @description state ใช้สำหรับ toast state ใน useCustom Toast
 */

export type ToastStateProps = Omit<CustomToastProps, "children" | "setShowToast">

/**
 * @description ใช้สำหรับ CustomToast Component
 */

export type CustomToastProps = {
    setShowToast: (isShowToast: boolean) => void;
    showToast: boolean;
    title: React.ReactNode;
    description: React.ReactNode;
    actionButton?: React.ReactNode;
    children?: React.ReactNode;
}
