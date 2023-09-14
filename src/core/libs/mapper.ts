import type { EnrollCourseFormType } from "@/app/api/subjects/studentView/[subjectId]/FullCourseWithEnrollStatusType";
import { EnrollStatus } from "@prisma/client";

export const degreeMapper: { label: string; value: EnrollCourseFormType["degree"] }[] = [
    { label: "ปริญญาตรี", value: "BACHELOR_DEGREE" },
    { label: "ปริญญาโท", value: "MASTER_DEGREE" },
];

export const courseInMajorsMapper: { label: string; value: EnrollCourseFormType["courseInMajors"] }[] = [
    { label: "สาขาวิชาเทคโนโลยีปัญญาประดิษฐ์", value: "ARTIFICIAL_INTELLIGENCE_TECHNOLOGY" },
    {
        label: "สาขาวิชาเทคโนโลยีสารสนเทศทางธุรกิจ (หลักสูตรนานาชาติ)",
        value: "BUSINESS_INFORMATION_TECHNOLOGY_INTERNATIONAL_PROGRAM",
    },
    { label: "สาขาวิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ", value: "DATA_SCIENCE_AND_BUSINESS_ANALYTICS" },
    { label: "สาขาวิชาเทคโนโลยีสารสนเทศ", value: "INFORMATION_TECHNOLOGY" },
];

export const passedInMajorsMapper: { label: string; value: EnrollCourseFormType["passedInMajors"] }[] = [
    { label: "สาขาวิชาเทคโนโลยีปัญญาประดิษฐ์", value: "ARTIFICIAL_INTELLIGENCE_TECHNOLOGY" },
    {
        label: "สาขาวิชาเทคโนโลยีสารสนเทศทางธุรกิจ (หลักสูตรนานาชาติ)",
        value: "BUSINESS_INFORMATION_TECHNOLOGY_INTERNATIONAL_PROGRAM",
    },
    { label: "สาขาวิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ", value: "DATA_SCIENCE_AND_BUSINESS_ANALYTICS" },
    { label: "สาขาวิชาเทคโนโลยีสารสนเทศ", value: "INFORMATION_TECHNOLOGY" },
];

export const gradeMapper: { label: string; value: EnrollCourseFormType["grade"] }[] = [
    { label: "A", value: "A" },
    { label: "B+", value: "B_PLUS" },
    { label: "B", value: "B" },
    { label: "C+", value: "C_PLUS" },
    { label: "C", value: "C" },
    { label: "D+", value: "D_PLUS" },
    { label: "D", value: "D" },
    { label: "F", value: "F" },
];

export const enrollStatusMapper: { label: string; value: EnrollStatus }[] = [
    { label: "ไม่คัดเลือก", value: "PENDING" },
    { label: "อาจารย์คัดเลือก", value: "APPROVED" },
    { label: "ผ่านการคัดเลือก", value: "FINAL_APPROVED" },
]