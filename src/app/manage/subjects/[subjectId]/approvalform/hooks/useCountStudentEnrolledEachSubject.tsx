import type { ResponseGetEnrollsType } from "@/app/api/enrolls/[subjectId]/EnrollType";
const useCountStudentsEnrolledBySubject = (rows: ResponseGetEnrollsType): Record<string, number> => {
    const subjectStudentCount: Record<string, number> = {};
    rows.forEach((row) => {
      const subjectId = row.course?.subjectId || "";
      const studentId = row.student?.id || "";
  
      // Increment the student count for the corresponding subject ID
      if (subjectId && studentId) {
        if (!subjectStudentCount[subjectId]) {
          subjectStudentCount[subjectId] = 1;
        } else {
          subjectStudentCount[subjectId]++;
        }
      }
    });
  
    return subjectStudentCount;
  };
export default useCountStudentsEnrolledBySubject