
// change structure of object to foramt csv and can do rows span in table
import type { ResponseGetEnrollsType , ResponseGetEnrollType} from "@/app/api/enrolls/[subjectId]/EnrollType"

export type AprovalForm ={
  ApprovalForm:FormatEnrolledData[]
}

export type FormatEnrolledData = {
    courseNameEng: string|undefined
    subjectId:string|undefined
    courseProfessor:string|undefined
    studentData:StudentData[]
    totalStudent:string|undefined
}
export type StudentData = {
    id: string | undefined;
    fullname:string | undefined;
    courseBenchelor:string|undefined
    degree:string|undefined
    passedInBenchelor:string|undefined
    passedCourseId:string|undefined
    passedCourseName:string|undefined
    grade:string|undefined,
}

const useFormatEnrolledData = (enrolledStudent:ResponseGetEnrollsType)=>{
    const formattedData:FormatEnrolledData[] = []
    enrolledStudent.forEach((enrolDetail : ResponseGetEnrollType)=>{
        const courseNameEng = enrolDetail.course?.nameEng as string;
        const subjectId = enrolDetail.course?.subjectId as string;
        const courseProfessor = enrolDetail.course?.professor?.fullname as string;
        const courseBenchelor = enrolDetail.courseBenchelor
        const degree = enrolDetail.degree
        const passedInBenchelor = enrolDetail.passedInBenchelor
        const passedCourseId = enrolDetail.passedCourseId
        const passedCourseName = enrolDetail.passedCourseName
        const grade = enrolDetail.grade
        const student:StudentData = {
                id: enrolDetail.student?.id,
                fullname:enrolDetail.student?.fullname,
                courseBenchelor,
                degree,
                passedCourseId,
                passedCourseName,
                passedInBenchelor,
                grade
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
              totalStudent: "1"
            };
            formattedData.push(newFormattedData);
          }
    })
    
    formattedData.forEach(courseDetail =>{
      const totalStudent = courseDetail.studentData?.length
      courseDetail.totalStudent = totalStudent?.toString() 
    })
    return {"ApprovalForm" : formattedData}
}
export default useFormatEnrolledData