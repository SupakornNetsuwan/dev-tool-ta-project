import { Course, Prisma } from "@prisma/client";

// สำหรับ getCourse ทั่วไป
export type FetchCourseType = Prisma.CourseGetPayload<{
    include: {
        professor: true
    },
}> & { isBasicDetailCompleted: boolean }

// สำหรับ getCourse + ข้อมูลฟอร์มอนุมัติ
type FetchCourseTypeWithApprovementType = Prisma.CourseGetPayload<{
    include: {
        professor: true,
        GTEForm: true,
        LTForm: true,
        RefScheduleForm: true,
        TheoryForm: true,
        ProjectBaseForm: true,
        OtherForm: true,
    }
}> & { isBasicDetailCompleted: boolean }

export type UpdateCourseType = Prisma.CourseUpdateInput

// สำหรับอัปเดตข้อมูล Course detail ทั่วไป
export type CourseDetailModifyType = Prisma.CourseGetPayload<{
    select: {
        title: true,
        firstname: true,
        lastname: true,
        subjectId: true,
        nameThai: true,
        contact: true,
        enrollCondition: true,
        secretCode: true,
    }
}> & Prisma.SystemStatusGetPayload<{
    select: {
        semester: true,
        year: true
    }
}>
