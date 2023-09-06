import { Prisma } from "@prisma/client";

/**
 * @description เป็นฟอร์มสำหรับ PROJECTBASE ที่ให้ผู้ใช้ทำการกรอกข้อมูล โดยที่เราก็อ้างอิงหน้าตามาจาก prisma schema โดยตรง
 */

export type PROJECTBASEFormType = { TaForms: Partial<Prisma.ProjectBaseFormCreateManyInput>[] }; // TaForms มาจาก useFieldArray