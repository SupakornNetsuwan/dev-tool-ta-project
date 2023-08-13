"use client";
// type
import type { ResponseGetEnrollsType } from "@/app/api/enrolls/[subjectId]/EnrollType";4
import React from "react";
// custom hook
import formatEnrolledData from "../../hooks/approvalForm/useFormatEnrolledData";

const TdComponent: React.FC<{
  text: React.ReactElement;
  rowSpan: number | undefined;
}> = ({ text, rowSpan }) => {
  return (
    <>
      <td rowSpan={rowSpan} className="border border-gray-400 p-2 text-center text-black">
        {text}
      </td>
    </>
  );
};
const ThComponent: React.FC<{
  text: React.ReactElement;
}> = ({ text }) => {
  return (
    <>
      <th className="border border-gray-400 p-2 text-gray-100">{text}</th>
    </>
  );
};



const TableApprovalform: React.FC<{ enrolledStudents: ResponseGetEnrollsType }> = ({ enrolledStudents }) => {
  const enrolledStudentsFormatted = formatEnrolledData(enrolledStudents);
  return (
    <>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-400">
        <thead className="text-xs uppercase text-gray-700 bg-gray-700 ">
          <tr>
            <ThComponent text={<>ลำดับ</>} />
            <ThComponent text={<>รหัสวิชา</>} />
            <ThComponent text={<>ชื่อวิชา</>} />
            <ThComponent text={<>จำนวน (TA)</>} />
            <ThComponent text={<>อาจารย์ผู้สอน</>} />
            <ThComponent text={<>รหัสนักศึกษา</>} />
            <ThComponent text={<>ชื่อนักศึกษา</>} />
            <ThComponent text={<>ระดับการศึกษา</>} />
            <ThComponent text={<>วิชาที่ช่วยสอนอยู่ในหลักสูตรวิทยาศาสตรบัณฑิต</>} />
            <ThComponent text={<>ผลการเรียนของผู้ช่วยสอนหรือเทียบเคียง (สอบผ่านในหลักสูตร)</>} />
            <ThComponent text={<>รหัสวิชาและชื่อวิชาที่สอบผ่าน (ยึดผลการเรียนตามทรานสคิปของนักศึกษา)</>} />
            <ThComponent text={<>ได้เกรด</>} />
            <ThComponent text={<>หมายเหตุ</>} />
          </tr>
        </thead>
        <tbody>
          {enrolledStudents.length > 0 &&
            enrolledStudentsFormatted.ApprovalForm.map((row, index) => (
              <React.Fragment key={index}>
                {row.studentData.map((student, studentIndex) => (
                  <tr key={`${index}-${studentIndex}`} className="border-b bg-white  ">
                    <TdComponent rowSpan={undefined} text={<>{studentIndex + 1}</>} />
                    <TdComponent rowSpan={undefined} text={<>{row.subjectId}</>} />
                    <TdComponent rowSpan={undefined} text={<>{row.courseNameEng}</>} />
                    {studentIndex === 0 && (
                      <TdComponent rowSpan={row.studentData?.length} text={<>{row.totalStudent}</>} />
                    )}

                    {studentIndex === 0 && (
                      <TdComponent rowSpan={row.studentData?.length} text={<>{row.courseProfessor}</>} />
                    )}
                    <TdComponent rowSpan={undefined} text={<>{student.id}</>} />
                    <TdComponent rowSpan={undefined} text={<>{student.fullname}</>} />
                    <TdComponent rowSpan={undefined} text={<>{student.degree}</>} />
                    <TdComponent rowSpan={undefined} text={<>{student.courseInMajor}</>} />
                    <TdComponent rowSpan={undefined} text={<>{student.passedInMajors}</>} />
                    <TdComponent rowSpan={undefined} text={<>{student.passedCourse} </>} />
                    <TdComponent rowSpan={undefined} text={<>{student.grade}</>} />
                    <TdComponent rowSpan={undefined} text={<></>} />
                  </tr>
                ))}
              </React.Fragment>
            ))}
        </tbody>
      </table>
      {enrolledStudents.length === 0 && (
        <div className="flex w-full animate-pulse flex-col space-y-4 rounded bg-white p-4 [&>div:nth-child(1)]:bg-blue-100 [&>div]:h-8 [&>div]:rounded-md [&>div]:bg-blue-50">
          {[...new Array(3)].map((_, index) => (
            <div key={index} />
          ))}
          {[...new Array(3)].map((_, index) => (
            <div key={index} />
          ))}
        </div>
      )}
      </div>
    </>
  );
};
export default TableApprovalform;
