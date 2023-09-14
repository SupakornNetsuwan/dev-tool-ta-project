// change structure of object to foramt csv and can do rows span in table
import type { ResponseGetEnrollsType, ResponseGetEnrollType } from "@/app/api/enrolls/[subjectId]/EnrollType";

export type ApprovalFormFormattedType = {
  ApprovalForm: FormatEnrolledData[];
};

export type FormatEnrolledData = {
  courseNameEng: string | undefined;
  subjectId: string | undefined;
  courseProfessor: string | undefined;
  studentData: StudentData[];
  totalStudent: string | undefined;
};
export type StudentData = {
  id: string | undefined;
  fullname: string | undefined;
  courseInMajor: string | undefined;
  degree: string | undefined;
  passedInMajors: string | undefined;
  passedCourse: string | undefined;
  grade: string | undefined;
};

const useFormatEnrolledData = (enrolledStudent: ResponseGetEnrollsType) => {
  const formattedData: FormatEnrolledData[] = [];
  if (enrolledStudent.length > 0) {
    enrolledStudent.forEach((enrolDetail: ResponseGetEnrollType) => {
      const courseNameEng = enrolDetail.course?.nameEng as string;
      const subjectId = enrolDetail.course?.subjectId as string;
      const courseProfessor = enrolDetail.course?.professor?.fullname as string;
      const courseInMajor = enrolDetail.courseInMajors;
      const degree = enrolDetail.degree;
      const passedInMajors = enrolDetail.passedInMajors;
      const passedCourse = enrolDetail.passedCourse;
      const grade = enrolDetail.grade;
      const studentEnroll: StudentData = {
        id: enrolDetail.student?.id,
        fullname: enrolDetail.student?.Profile?.firstname + " " + enrolDetail.student?.Profile?.lastname,
        courseInMajor,
        degree,
        passedCourse,
        passedInMajors,
        grade,
      };
      const existingDataIndex = formattedData.findIndex((data) => data?.subjectId === subjectId);
      if (existingDataIndex !== -1) {
        formattedData[existingDataIndex].studentData.push(studentEnroll);
      } else {
        const newFormattedData: FormatEnrolledData = {
          courseNameEng,
          subjectId,
          courseProfessor,
          studentData: [studentEnroll],
          totalStudent: "1",
        };
        formattedData.push(newFormattedData);
      }
    });
  }
  formattedData.forEach((courseDetail) => {
    const totalStudent = courseDetail.studentData?.length;
    courseDetail.totalStudent = totalStudent?.toString();
  });
  return { ApprovalForm: formattedData };
};
export default useFormatEnrolledData;
