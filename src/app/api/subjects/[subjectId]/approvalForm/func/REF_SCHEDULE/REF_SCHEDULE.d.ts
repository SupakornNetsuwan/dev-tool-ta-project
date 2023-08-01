import { Prisma } from "@prisma/client";

/**
 * @description เป็นฟอร์มสำหรับ REF_SCHEDULE ที่ให้ผู้ใช้ทำการกรอกข้อมูล โดยที่เราก็อ้างอิงหน้าตามาจาก prisma schema โดยตรง
 */

export type REF_SCHEDULEFormType = { TaForms: Partial<Prisma.RefScheduleFormCreateManyInput>[] }; // TaForms มาจาก useFieldArray