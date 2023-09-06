import type { FormatEnrolledData, StudentData, ApprovalFormFormattedType } from "./useFormatEnrolledData";

const useCreateCsv= (enrolledStudentsFormatted: ApprovalFormFormattedType|undefined) => {
  if(enrolledStudentsFormatted){
  let csvContent: string = "";
  // Header row
  csvContent += `ลำดับ,รหัสวิชา,ชื่อวิชา,จำนวน TA,อาจารย์ผู้สอน,รหัสนักศึกษา,ชื่อ - นามสกุล,ระดับการศึกษา/,วิชาที่ช่วยสอนอยู่ในหลักสูตรวิทยาศาสตรบัณฑิต,\
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
        },${student.id},${student.fullname},${student.degree},${student.courseInMajor},${student.passedInMajors},${
          student.passedCourse
        },${student.grade}\n`;
      } else {
        csvContent += `${index + 1},${approval.subjectId},${approval.courseNameEng},,,${student.id},${
          student.fullname
        },${student.degree},${student.courseInMajor},${student.passedInMajors},${student.passedCourse},${
          student.grade
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
