import { EnrollCourseFormType } from "@/app/api/subjects/studentView/[subjectId]/FullCourseWithEnrollStatusType";
import type { FormatEnrolledData, StudentData, ApprovalFormFormattedType } from "./useFormatEnrolledData";
import { courseInMajorsMapper, degreeMapper, gradeMapper, passedInMajorsMapper } from "@/core/libs/mapper";

// const degreeMapper: { label: string; value: EnrollCourseFormType["degree"] }[] = [
//   { label: "ปริญญาตรี", value: "BACHELOR_DEGREE" },
//   { label: "ปริญญาโท", value: "MASTER_DEGREE" },
// ];

// const courseInMajorsMapper: { label: string; value: EnrollCourseFormType["courseInMajors"] }[] = [
//   { label: "สาขาวิชาเทคโนโลยีปัญญาประดิษฐ์", value: "ARTIFICIAL_INTELLIGENCE_TECHNOLOGY" },
//   {
//     label: "สาขาวิชาเทคโนโลยีสารสนเทศทางธุรกิจ (หลักสูตรนานาชาติ)",
//     value: "BUSINESS_INFORMATION_TECHNOLOGY_INTERNATIONAL_PROGRAM",
//   },
//   { label: "สาขาวิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ", value: "DATA_SCIENCE_AND_BUSINESS_ANALYTICS" },
//   { label: "สาขาวิชาเทคโนโลยีสารสนเทศ", value: "INFORMATION_TECHNOLOGY" },
// ];

// const passedInMajorsMapper: { label: string; value: EnrollCourseFormType["passedInMajors"] }[] = [
//   { label: "สาขาวิชาเทคโนโลยีปัญญาประดิษฐ์", value: "ARTIFICIAL_INTELLIGENCE_TECHNOLOGY" },
//   {
//     label: "สาขาวิชาเทคโนโลยีสารสนเทศทางธุรกิจ (หลักสูตรนานาชาติ)",
//     value: "BUSINESS_INFORMATION_TECHNOLOGY_INTERNATIONAL_PROGRAM",
//   },
//   { label: "สาขาวิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ", value: "DATA_SCIENCE_AND_BUSINESS_ANALYTICS" },
//   { label: "สาขาวิชาเทคโนโลยีสารสนเทศ", value: "INFORMATION_TECHNOLOGY" },
// ];

// const gradeMapper: { label: string; value: EnrollCourseFormType["grade"] }[] = [
//   { label: "A", value: "A" },
//   { label: "B+", value: "B_PLUS" },
//   { label: "B", value: "B" },
//   { label: "C+", value: "C_PLUS" },
//   { label: "C", value: "C" },
//   { label: "D+", value: "D_PLUS" },
//   { label: "D", value: "D" },
//   { label: "F", value: "F" },
// ];

const useCreateCsv= (enrolledStudentsFormatted: ApprovalFormFormattedType|undefined) => {
  
  if(enrolledStudentsFormatted){
  let csvContent: string = "";
  // Header row
  csvContent += `ลำดับ,รหัสวิชา,ชื่อวิชา,จำนวน TA,อาจารย์ผู้สอน,รหัสนักศึกษา,ชื่อ - นามสกุล,ระดับการศึกษา,วิชาที่ช่วยสอนอยู่ในหลักสูตรวิทยาศาสตรบัณฑิต,\
    ผลการเรียนของผู้ช่วยสอนหรือเทียบเคียง (สอบผ่านในหลักสูตร),รหัสวิชาและชื่อวิชาที่สอบผ่าน (ยึดผลการเรียนตามทรานสคิปของนักศึกษา),\
    ได้เกรด,หมายเหตุ\n`;

  // Loop through each ApprovalForm data
  enrolledStudentsFormatted.ApprovalForm.forEach((approval: FormatEnrolledData) => {
    const rowspan = approval.studentData.length;
    let isFirstRow = true;
    // Loop through each studentData
    approval.studentData.forEach((student: StudentData, index) => {
      if (isFirstRow) {
        isFirstRow = false;
        csvContent += `${index + 1},${approval.subjectId},${approval.courseNameEng},${approval.totalStudent},${
          approval.courseProfessor
        },${student.id},${student.fullname},${degreeMapper.find(item => item.value ===student.degree)?.label},${courseInMajorsMapper.find(item => item.value === student.courseInMajor)?.label},${passedInMajorsMapper.find(item => item.value === student.passedInMajors)?.label},${
          student.passedCourse
        },${gradeMapper.find(item => item.value ===student.grade)?.label}\n`;
      } else {
        csvContent += `${index + 1},${approval.subjectId},${approval.courseNameEng},,,${student.id},${
          student.fullname
        },${degreeMapper.find(item => item.value ===student.degree)?.label},${courseInMajorsMapper.find(item => item.value === student.courseInMajor)?.label},${passedInMajorsMapper.find(item => item.value === student.passedInMajors)?.label},${student.passedCourse},${
          gradeMapper.find(item => item.value ===student.grade)?.label
        }\n`;
      }
      if (index === rowspan - 1) {
        isFirstRow = true;
      }
    });
  });
  return csvContent;
}
};

export default useCreateCsv;
