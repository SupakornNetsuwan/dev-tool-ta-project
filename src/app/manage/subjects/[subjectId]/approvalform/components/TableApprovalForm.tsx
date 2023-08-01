"use client"

import { DataGrid ,GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";
import type { ResponseGetEnrollsType, ResponseGetEnrollType } from "@/app/api/enrolls/[subjectId]/EnrollType";
import React from "react";
import { useRef} from "react";
// custom hook
import useCountStudentsEnrolledBySubject from "../hooks/useCountStudentEnrolledEachSubject";
import useFormatEnrolledData from "../hooks/useFormatEnrolledData";

const TdComponent: React.FC<{
  text:React.ReactElement
  rowSpan : number|undefined
}> =({text, rowSpan}) =>{
  return (
    <>
      <td rowSpan={rowSpan} className="border border-gray-400 p-2">{text}</td>
    </>
  )
}
const ThComponent: React.FC<{
  text:React.ReactElement
}> =({text}) =>{
  return (
    <>
      <td  className="border border-gray-400 p-2">{text}</td>
    </>
  )
}

  
const TableApprovalform : React.FC<{ enrolledStudents: ResponseGetEnrollsType }> = ({ enrolledStudents }) => {

  const professorGroupedRows: Record<string, ResponseGetEnrollsType> = {};
    enrolledStudents.forEach((row) => {
      const professorName = row.course?.professor?.fullname || 'Unknown Professor';
      if (!professorGroupedRows[professorName]) {
        professorGroupedRows[professorName] = [];
      }
      professorGroupedRows[professorName].push(row);
  });
  const enrolledStudentsFormatted = useFormatEnrolledData(enrolledStudents)
  const subjectStudentCounts = useCountStudentsEnrolledBySubject(enrolledStudents);
  console.log(enrolledStudentsFormatted);
  return(
    <>
      <table  className="border border-gray-400 p-2">
        <thead>
          <tr>
            <ThComponent text={<>ลำดับ</>}/>
            <ThComponent text={<>รหัสวิชา</>}/>
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
              {row.enrolledStudents.map((student, studentIndex) =>(
                <tr key={`${index}-${studentIndex}`}>
                   
                    <TdComponent rowSpan={undefined} text={<>{studentIndex+1}</>} />
                    {studentIndex===0 && (
                      <TdComponent  rowSpan={row.enrolledStudents?.length} text={<>{row.subjectId}</>} />
                      // <td rowSpan={row.enrolledStudents?.length}>{row.professor}</td>
                    )}
                    {studentIndex===0 && (
                      <TdComponent rowSpan={row.enrolledStudents?.length} text={<></>} />
                      // <td rowSpan={row.enrolledStudents?.length}>{row.professor}</td>
                    )}
                    {studentIndex===0 && (
                        <TdComponent  rowSpan={row.enrolledStudents?.length}text={<>{row.professor}</>} />
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
          // <tr key={row.subje   ctId}>
          //   <TdComponent text={<>{index+1}</>} />
          //   <TdComponent text={<>{row.subjectId}</>}/>
          //   <TdComponent text={<>{<></>}</>}/>
          //   {enrolledStudentsFormatted.ApprovalForm.}
          //   <TdComponent text={<>{row.professor}</>}/>
          //   <TdComponent text={<>{row.enrolledStudents.}</>}/>
          //   <TdComponent text={<>{row.student?.fullname}</>}/>
          //   <TdComponent text={<>{}</>}/>
          //   <TdComponent text={<>{}</>}/> 
          //   <TdComponent text={<>{}</>}/>
          //   <TdComponent text={<>{}</>}/>
          //   <TdComponent text={<>{}</>}/>
          //   <TdComponent text={<>{}</>}/>

          // </tr>
        ))}
      </tbody>
    </table>
    </>
  )

}
export default TableApprovalform;