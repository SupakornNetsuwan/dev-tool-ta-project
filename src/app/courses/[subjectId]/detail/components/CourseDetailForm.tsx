"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import type { DetailCourseModifyType } from "@/app/api/subjects/[subjectId]/CourseTypes";
// Components
import FieldWrapper from "@/core/components/form/FieldWrapper";
import TitleSelector from "@/core/components/form/TitleSelector";
import ShowInputError from "@/core/components/form/ShowInputError";
import * as Label from "@radix-ui/react-label";
const CourseDetailForm: React.FC = () => {
  const { handleSubmit, getValues, register, watch } = useFormContext<DetailCourseModifyType>();
  const queryClient = useQueryClient();

  const subjectId = getValues("subjectId");

  // console.log("Form state มีการเปลี่ยนแปลง 🏗️", watch());

  // query client สำหรับการเข้าถึงข้อมูลของ systemStatus fetching, course fetching
  const [systemQuery, courseDetailQuery] = [
    queryClient.getQueryState(["getSystemStatus"]),
    queryClient.getQueryState(["getCourse", subjectId]),
  ];

  console.log(systemQuery?.status, courseDetailQuery?.status);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-2">
          <FieldWrapper
            errorComponent={<ShowInputError inputName="year" />}
            label={<Label.Root>ปีการศึกษา</Label.Root>}
          >
            <input
              disabled
              type="text"
              {...register("year")}
              className="mt-auto w-full justify-self-end rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
            />
          </FieldWrapper>

          <FieldWrapper
            errorComponent={<ShowInputError inputName="semester" />}
            label={<Label.Root>ภาคการศึกษา</Label.Root>}
          >
            <input
              disabled
              type="text"
              {...register("semester")}
              className="mt-auto w-full justify-self-end rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
            />
          </FieldWrapper>

          <FieldWrapper
            errorComponent={<ShowInputError inputName="contact" />}
            label={<Label.Root>ช่องทางติดต่อ</Label.Root>}
          >
            <input
              type="text"
              {...register("contact")}
              className="mt-auto w-full justify-self-end rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
            />
          </FieldWrapper>

          <FieldWrapper
            errorComponent={<ShowInputError inputName="enrollCondition" />}
            label={
              <Label.Root>
                เงื่อนไขพิเศษในการสมัคร <br />
                <span className="text-gray-400">(ไม่ต้องใส่ก็ได้)</span>
              </Label.Root>
            }
          >
            <input
              type="text"
              {...register("enrollCondition")}
              className="w-full rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
            />
          </FieldWrapper>

          <FieldWrapper
            errorComponent={<ShowInputError inputName="secretCode" />}
            label={
              <Label.Root>
                รหัสล็อกรายวิชา <br />
                <span className="text-gray-400">(สำหรับอาจารย์ที่เลือก TA ไว้อยู่แล้ว)</span>
              </Label.Root>
            }
          >
            <input
              type="text"
              {...register("secretCode")}
              className="w-full rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
            />
          </FieldWrapper>
        </div>
        <button
          type="submit"
          className="btn click-animation mt-4 self-start rounded border border-blue-500 bg-blue-50 px-12 text-blue-500"
        >
          แก้ไข
        </button>
      </form>
    </>
  );
};

export default CourseDetailForm;
