import { Prisma } from "@prisma/client";

/**
 * @description เป็นฟอร์มสำหรับ THEORY ที่ให้ผู้ใช้ทำการกรอกข้อมูล โดยที่เราก็อ้างอิงหน้าตามาจาก prisma schema โดยตรง
 */

export type THEORYFormType = { TaForms: Partial<Prisma.TheoryFormCreateManyInput>[] }; // TaForms มาจาก useFieldArray