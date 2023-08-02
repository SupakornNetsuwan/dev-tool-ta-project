"use client"

import { DataGrid ,GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";
import type { ResponseGetEnrollsType, ResponseGetEnrollType } from "@/app/api/enrolls/[subjectId]/EnrollType";
import React from "react";
// custom hook
import useCountStudentsEnrolledBySubject from "../hooks/useCountStudentEnrolledEachSubject";
import useFormatEnrolledData from "../hooks/useFormatEnrolledData";

const TdComponent: React.FC<{
  text:React.ReactElement
  rowSpan : number|undefined
}> =({text, rowSpan}) =>{
  return (
    <>
      <td rowSpan={rowSpan} className="border border-gray-400 p-2 text-center text-black">{text}</td>
    </>
  )
}
const ThComponent: React.FC<{
  text:React.ReactElement
}> =({text}) =>{
  return (
    <>
      <th  className="border border-gray-400 p-2 text-gray-100">{text}</th>
    </>
  )
}
// const testData:ResponseGetEnrollsType = [
//     {
//       "course": {
//         "nameThai":"test",
//         "nameEng": "INFORMATION SYSTEM SECURITY AND IT LAWS",
//         "professor": {
//           "fullname": "Gear vorawee"
//         },
//         "subjectId": "6016309"
//       },
//       "enrollId": 1,
//       "enrollStatus": "PENDING",
//       "student": {
//         "fullname": "pure",
//         "id": "test1"
//       }
//     },
//     {
//       "course": {
//         "nameThai": "test",
//         "nameEng": "INFORMATION SYSTEM SECURITY AND IT LAWS",
//         "professor": {
//           "fullname": "Gear vorawee"
//         },
//         "subjectId": "6016309"
//       },
//       "enrollId": 1,
//       "enrollStatus": "PENDING",
//       "student": {
//         "fullname": "vorawee wirawan",
//         "id": "64070228"
//       }
//     },
//   {
//       "course": {
//         "nameThai":"test",
//         "nameEng": "HUMAN INTERFACE DESIGN",
//         "professor": {
//           "fullname": "Gear vorawee"
//         },
//         "subjectId": "6016310"
//       },
//       "enrollId": 100,
//       "enrollStatus": "PENDING",
//       "student": {
//         "fullname": "geargear",
//         "id": "64070228"
//       }
//     }

// ]
const TableApprovalform : React.FC<{ enrolledStudents: ResponseGetEnrollsType }> = ({ enrolledStudents }) => {
  console.log("Res Data", enrolledStudents)
  const professorGroupedRows: Record<string, ResponseGetEnrollsType> = {};
    enrolledStudents.forEach((row) => {
      const professorName = row.course?.professor?.fullname || 'Unknown Professor';
      if (!professorGroupedRows[professorName]) {
        professorGroupedRows[professorName] = [];
      }
      professorGroupedRows[professorName].push(row);
  });
  const enrolledStudentsFormatted = useFormatEnrolledData(enrolledStudents)
  console.log("formatData",enrolledStudentsFormatted);
  return(
    <>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table  className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <ThComponent text={<>ลำดับ</>}/>
              <ThComponent text={<>รหัสวิชา</>}/>
              <ThComponent text={<>ชื่อวิชา</>}/>
              <ThComponent text={<>จำนวน (TA)</>}/>
              <ThComponent text={<>อาจารย์ผู้สอน</>}/>
              <ThComponent text={<>รหัสนักศึกษา</>}/>
              <ThComponent text={<>ชื่อนักศึกษา</>}/>
              <ThComponent text={<>ระดับการศึกษา</>}/>
              <ThComponent text={<>วิชาที่ช่วยสอนอยู่ในหลักสูตรวิทยาศาสตรบัณฑิต</>}/>
              <ThComponent text={<>ผลการเรียนของผู้ช่วยสอนหรือเทียบเคียง (สอบผ่านในหลักสูตร)</>}/>
              <ThComponent text={<>รหัสวิชาและชื่อวิชาที่สอบผ่าน (ยึดผลการเรียนตามทรานสคิปของนักศึกษา)</>}/>
              <ThComponent text={<>ได้เกรด</>}/>
              <ThComponent text={<>หมายเหตุ</>}/>
            </tr>
          </thead>
        <tbody>
          {enrolledStudents && enrolledStudentsFormatted.ApprovalForm.map((row, index) => (
            <React.Fragment key={index}>
                {row.studentData.map((student, studentIndex) =>(
                  <tr key={`${index}-${studentIndex}` } className="bg-white border-b  dark:border-gray-700">
                    
                      <TdComponent rowSpan={undefined} text={<>{studentIndex+1}</>} />
                      {studentIndex===0 && (
                        <TdComponent  rowSpan={row.studentData?.length} text={<>{row.subjectId}</>} />
                      )}
                      {studentIndex===0 && (
                        <TdComponent  rowSpan={row.studentData?.length} text={<>{row.courseNameEng}</>} />
                        // <td rowSpan={row.enrolledStudents?.length}>{row.professor}</td>
                      )}
                      {studentIndex===0 && (
                        <TdComponent rowSpan={row.studentData?.length} text={<>{row.studentData.length}</>} />
                        // <td rowSpan={row.enrolledStudents?.length}>{row.professor}</td>
                      )}
                      
                      {studentIndex===0 && (
                          <TdComponent  rowSpan={row.studentData?.length}text={<>{row.courseProfessor}</>} />
                        // <td rowSpan={row.enrolledStudents?.length}>{row.professor}</td>
                      )}
                      <TdComponent rowSpan={undefined} text={<>{student.id}</>} />
                      <TdComponent rowSpan={undefined} text={<>{student.fullname}</>} />
                      <TdComponent rowSpan={undefined} text={<></>} />
                      <TdComponent rowSpan={undefined} text={<></>} />
                      <TdComponent rowSpan={undefined} text={<></>} />
                      <TdComponent rowSpan={undefined} text={<></>} />
                      <TdComponent rowSpan={undefined} text={<></>} />
                      <TdComponent rowSpan={undefined} text={<></>} />
                      
                  </tr>  
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )

}
export default TableApprovalform;