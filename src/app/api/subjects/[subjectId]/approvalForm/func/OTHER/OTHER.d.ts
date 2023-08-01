import { Prisma } from "@prisma/client";

/**
 * @description เป็นฟอร์มสำหรับ OTHER ที่ให้ผู้ใช้ทำการกรอกข้อมูล โดยที่เราก็อ้างอิงหน้าตามาจาก prisma schema โดยตรง
 */

export type OTHERFormType = { TaForms: Partial<Prisma.OtherFormCreateManyInput>[] }; // TaForms มาจาก useFieldArray