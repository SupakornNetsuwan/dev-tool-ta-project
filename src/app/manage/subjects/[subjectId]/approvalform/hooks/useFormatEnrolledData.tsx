
// change structure of object to foramt csv and can do rows span in table
import type { ResponseGetEnrollsType , ResponseGetEnrollType} from "@/app/api/enrolls/[subjectId]/EnrollType"

type ConseData = {
    subjectId: string | undefined;
    courseNameEng:string | undefined;
    professor : string | undefined;
    enrolledStudents:StudentData[]
    
}
type StudentData = {
    id: string | undefined;
    fullname:string | undefined;
}
const useFormatEnrolledData = (data:ResponseGetEnrollsType)=>{
    const ApprovalForm:ConseData[] =[]
    const enrolledStudents:StudentData[] = []

  
    const courseData = {
        subjectId: '',
        courseNameEng: '',
        professor: '',
        enrolledStudents
    }
    data.forEach((item : ResponseGetEnrollType)=>{
        courseData.subjectId = item.course?.subjectId as string;
        courseData.courseNameEng = item.course?.nameEng as string;
        courseData.professor = item.course?.professor?.fullname as string;
        const studentData = {
            id: item.student?.id,
            fullname: item.student?.fullname,
        };
        courseData.enrolledStudents.push(studentData);

    })
    ApprovalForm.push(Object.assign({}, courseData));
    const formatEnrolledData = {
        ApprovalForm : ApprovalForm
    }
    return formatEnrolledData

}
export default useFormatEnrolledData