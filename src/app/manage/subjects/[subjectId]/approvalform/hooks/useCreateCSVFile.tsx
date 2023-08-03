import { unique } from "next/dist/build/utils";
import type { FormatEnrolledData , StudentData, AprovalForm} from "./useFormatEnrolledData";

const useCreateCSVFile = (data:AprovalForm) =>{
    let csvContent:string="";
    
  
    // Header row
    csvContent += "ลำดับ,รหัสวิชา,ชื่อวิชา,จำนวน TA,อาจารย์ผู้สอน,รหัสนักศึกษา,ชื่อ - นามสกุล,ระดับการศึกษา/,วิชาที่ช่วยสอนอยู่ในหลักสูตรวิทยาศาสตรบัณฑิต\
    ผลการเรียนของผู้ช่วยสอนหรือเทียบเคียง (สอบผ่านในหลักสูตร),รหัสวิชาและชื่อวิชาที่สอบผ่าน (ยึดผลการเรียนตามทรานสคิปของนักศึกษา)\
    ได้เกรด,หมายเหตุ";
  
    // Loop through each ApprovalForm data
    data.ApprovalForm.forEach((approval:FormatEnrolledData) => {
      const rowspan = approval.studentData.length;
      let isFirstRow = true;
  
      // Loop through each studentData
      approval.studentData.forEach((student:StudentData, index) => {
        if (isFirstRow) {
          isFirstRow = false;
          csvContent += `${index+1},${approval.subjectId},${approval.courseNameEng},${approval.totalStudent},${approval.courseProfessor},${student.id},${student.fullname},${student.degree},${student.courseBenchelor},${student.passedInBenchelor},${student.passedCourseId as string+student.passedCourseName},${student.grade}\n`;
        } else {
          csvContent += `${index+1},${approval.subjectId},${approval.courseNameEng},,,${student.id},${student.fullname},${student.degree},${student.courseBenchelor},${student.passedInBenchelor},${student.passedCourseId as string+student.passedCourseName},${student.grade}\n`;
        }
  
        if (index === rowspan - 1) {
          isFirstRow = true;
        }
      });
    });
  
    // Return the formatted CSV content
    return csvContent;
}

export default useCreateCSVFile