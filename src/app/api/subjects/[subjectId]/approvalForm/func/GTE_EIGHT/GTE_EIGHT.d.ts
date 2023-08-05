import { Prisma } from "@prisma/client";

/**
 * @description เป็นฟอร์มสำหรับ GTE_EIGHT ที่ให้ผู้ใช้ทำการกรอกข้อมูล โดยที่เราก็อ้างอิงหน้าตามาจาก prisma schema โดยตรง
 */

export type GTEFormType = { TaForms: Partial<Prisma.GTEFormCreateManyInput>[] }; // TaForms มาจาก useFieldArray