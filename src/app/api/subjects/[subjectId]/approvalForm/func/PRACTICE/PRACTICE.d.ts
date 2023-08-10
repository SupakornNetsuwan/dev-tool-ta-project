import { Prisma } from "@prisma/client";

/**
 * @description เป็นฟอร์มสำหรับ PRACTICE ที่ให้ผู้ใช้ทำการกรอกข้อมูล โดยที่เราก็อ้างอิงหน้าตามาจาก prisma schema โดยตรง
 */

export type PRACTICEFormType = { TaForms: Partial<Prisma.PracticeFormCreateManyInput>[] }; // TaForms มาจาก useFieldArray