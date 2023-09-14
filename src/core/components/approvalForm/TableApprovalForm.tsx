"use client";
import React from "react";
// type
import type { ResponseGetEnrollsType } from "@/app/api/enrolls/[subjectId]/EnrollType";
import { courseInMajorsMapper, degreeMapper, gradeMapper, passedInMajorsMapper } from "@/core/libs/mapper";
// custom hook
import formatEnrolledData from "../../hooks/approvalForm/useFormatEnrolledData";

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

const Td: React.FC<{
  text: React.ReactElement;
  rowSpan: number | undefined;
}> = ({ text, rowSpan }) => {
  return (
    <>
      <td rowSpan={rowSpan} className="p-2 text-center text-black">
        {text}
      </td>
    </>
  );
};
const Th: React.FC<{ text: React.ReactElement }> = ({ text }) => {
  return (
    <>
      <th className="border-r border-gray-300 p-2 font-semibold text-gray-800 [text-wrap:balance] last-of-type:border-none">
        {text}
      </th>
    </>
  );
};

const TableApprovalform: React.FC<{ enrolledStudents: ResponseGetEnrollsType }> = ({ enrolledStudents }) => {
  const enrolledStudentsFormatted = formatEnrolledData(enrolledStudents);
  return (
    <>
      <div className="relative overflow-x-auto rounded shadow-md">
        <table className="w-full min-w-[150em] text-center text-xs text-gray-400">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <Th text={<>ลำดับ</>} />
              <Th text={<>รหัสวิชา</>} />
              <Th text={<>ชื่อวิชา</>} />
              <Th text={<>จำนวน (TA)</>} />
              <Th text={<>อาจารย์ผู้สอน</>} />
              <Th text={<>รหัสนักศึกษา</>} />
              <Th text={<>ชื่อนักศึกษา</>} />
              <Th text={<>ระดับการศึกษา</>} />
              <Th text={<>วิชาที่ช่วยสอนอยู่ในหลักสูตรวิทยาศาสตรบัณฑิต</>} />
              <Th text={<>ผลการเรียนของผู้ช่วยสอนหรือเทียบเคียง (สอบผ่านในหลักสูตร)</>} />
              <Th text={<>รหัสวิชาและชื่อวิชาที่สอบผ่าน (ยึดผลการเรียนตามทรานสคิปของนักศึกษา)</>} />
              <Th text={<>ได้เกรด</>} />
              <Th text={<>หมายเหตุ</>} />
            </tr>
          </thead>
          <tbody>
            {enrolledStudents.length > 0 &&
              enrolledStudentsFormatted.ApprovalForm.map((row, index) => (
                <React.Fragment key={index}>
                  {row.studentData.map((student, studentIndex) => (
                    <tr key={`${index}-${studentIndex}`} className="border-b bg-white  ">
                      <Td rowSpan={undefined} text={<>{studentIndex + 1}</>} />
                      <Td rowSpan={undefined} text={<>{row.subjectId}</>} />
                      <Td rowSpan={undefined} text={<>{row.courseNameEng}</>} />
                      {studentIndex === 0 && <Td rowSpan={row.studentData?.length} text={<>{row.totalStudent}</>} />}

                      {studentIndex === 0 && <Td rowSpan={row.studentData?.length} text={<>{row.courseProfessor}</>} />}
                      <Td rowSpan={undefined} text={<>{student.id}</>} />
                      <Td rowSpan={undefined} text={<>{student.fullname}</>} />
                      <Td rowSpan={undefined} text={<>{degreeMapper.find(item => item.value ===student.degree)?.label}</>} />
                      <Td rowSpan={undefined} text={<>{courseInMajorsMapper.find(item => item.value === student.courseInMajor)?.label}</>} />
                      <Td rowSpan={undefined} text={<>{passedInMajorsMapper.find(item => item.value === student.courseInMajor)?.label}</>} />
                      <Td rowSpan={undefined} text={<>{student.passedCourse} </>} />
                      <Td rowSpan={undefined} text={<>{gradeMapper.find(item => item.value ===student.grade)?.label}</>} />
                      <Td rowSpan={undefined} text={<></>} />
                    </tr>
                  ))}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default TableApprovalform;
