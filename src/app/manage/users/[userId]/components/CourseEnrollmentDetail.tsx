import React from "react";
import { prisma } from "@/core/libs/prisma/connector";
import {
  courseInMajorsMapper,
  degreeMapper,
  gradeMapper,
  passedInMajorsMapper,
  enrollStatusMapper,
} from "@/core/libs/mapper";
import dayjs from "dayjs";
import List from "@/core/components/List";
import "dayjs/locale/th";
import { Prisma } from "@prisma/client";

dayjs.locale("th");

const CourseEnrollmentDetail: React.FC<{ subjectId: string; userId: string }> = async ({ subjectId, userId }) => {
  try {
    const enrollDetail = await prisma.enroll.findUniqueOrThrow({
      where: {
        courseId_studentId: {
          courseId: subjectId,
          studentId: userId,
        },
      },
    });

    return (
      <div className=" bg-white p-4">
        <p className="mb-4 text-lg font-medium text-blue-500">รายละเอียดการสมัคร</p>
        <List.Wrapper>
          <List.Item topic="วันที่สมัคร">
            <p className="ml-10 text-right lg:max-w-[30em]">{dayjs(enrollDetail.enrollDate).format("DD/MM/YYYY")}</p>
          </List.Item>
          <List.Item topic="สถานะการสมัคร">
            <p className="ml-10 text-right lg:max-w-[30em]">
              {enrollStatusMapper.find((status) => status.value === enrollDetail.enrollStatus)?.label}
            </p>
          </List.Item>
          <List.Item topic="ระดับการศึกษา">
            <p className="ml-10 text-right lg:max-w-[30em]">
              {degreeMapper.find((degree) => degree.value === enrollDetail.degree)?.label}
            </p>
          </List.Item>
          <List.Item topic="วิชาที่ช่วยสอนอยู่ในหลักสูตรวิทยศาสตรบันฑิต">
            <p className="ml-10 text-right lg:max-w-[30em]">
              {courseInMajorsMapper.find((major) => major.value === enrollDetail.courseInMajors)?.label}
            </p>
          </List.Item>
          <List.Item
            topic={
              <p>
                ผลของการเรียนของผู้ช่วยสอนหรือเทียบเคียง
                <br />
                (สอบผ่านในหลักสูตร)
              </p>
            }
          >
            <p className="ml-10 text-right lg:max-w-[30em]">
              {passedInMajorsMapper.find((major) => major.value === enrollDetail.passedInMajors)?.label}
            </p>
          </List.Item>
          <List.Item topic="ได้เกรด">
            <p className="text-right lg:max-w-[30em]">
              {gradeMapper.find((grade) => grade.value === enrollDetail.grade)?.label}
            </p>
          </List.Item>
          <List.Item
            topic={
              <p>
                รหัสวิชาและชื่อวิชาที่สอบผ่าน <br />
                (ยึดผลการเรียนตามทรานสคิปของนักศึกษา)
              </p>
            }
          >
            <p className="text-right lg:max-w-[30em]">{enrollDetail.passedCourse}</p>
          </List.Item>
        </List.Wrapper>
      </div>
    );
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return (
          <div className="mb-2 w-full bg-gray-100 py-12 text-center text-gray-500">
            ไม่พบรหัสวิชาดังกล่าว หรือ รหัสนักศึกษาไม่ถูกต้อง
          </div>
        );
      }
    }

    return (
      <div className="mb-2 w-full bg-gray-100 py-12 text-center text-gray-500">
        พบปัญหาที่ไม่สามารถระบุได้
      </div>
    );
  }
};

export default CourseEnrollmentDetail;
