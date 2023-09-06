import { ApprovalFormType } from "@prisma/client"

// เพื่อให้แน่ใจว่าเค้าต้องการสร้าง หรีอ อัปเดตฟอร์มอนุมัติประเภทใด
interface WithApprovalFormType {
    approvalFormType: ApprovalFormType
}

/**
 * @description เป็น interface ที่ใช้สำหรับส่ง Payload request เพื่อแก้ไขฟอร์มอนุมัติ TA เราจะให้มันมีความยืดหยุ่น โดยจะรองรับทั้ง 6 ฟอร์มได้ก่อน
 */

export interface ApprovalFormPayloadType extends WithApprovalFormType { };