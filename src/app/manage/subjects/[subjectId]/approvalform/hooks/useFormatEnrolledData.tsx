
// change structure of object to foramt csv and can do rows span in table
import type { ResponseGetEnrollsType , ResponseGetEnrollType} from "@/app/api/enrolls/[subjectId]/EnrollType"

type FormatEnrolledData = {
    courseNameEng: string|undefined
    subjectId:string|undefined
    courseProfessor:string|undefined
    studentData:StudentData[]
}
type StudentData = {
    id: string | undefined;
    fullname:string | undefined;
}
const useFormatEnrolledData = (enrolledStudent:ResponseGetEnrollsType)=>{
    const formattedData:FormatEnrolledData[] = []


    enrolledStudent.forEach((enrolDetail : ResponseGetEnrollType)=>{
        const courseNameEng = enrolDetail.course?.nameEng as string;
        const subjectId = enrolDetail.course?.subjectId as string;
        const courseProfessor = enrolDetail.course?.professor?.fullname as string;
        const student:StudentData = {
                id: enrolDetail.student?.id,
                fullname:enrolDetail.student?.fullname,
        };
        const existingDataIndex = formattedData.findIndex((data) => data?.subjectId === subjectId);
        if (existingDataIndex !== -1) {
            formattedData[existingDataIndex].studentData.push(student);
          } else {
            const newFormattedData: FormatEnrolledData = {
              courseNameEng,
              subjectId,
              courseProfessor,
              studentData: [student],
            };
            formattedData.push(newFormattedData);
          }
    })

    return {"ApprovalForm" : formattedData}
}
export default useFormatEnrolledData