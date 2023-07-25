"use client";
import React from "react";
import { useFormContext, SubmitHandler } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { HiOutlineXMark } from "react-icons/hi2";
import type { CourseDetailModifyType } from "@/app/api/subjects/[subjectId]/CourseTypes";
import useUpdateCourse from "@/app/manage/subjects/[subjectId]/hooks/useUpdateCourse";
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import { Prisma } from "@prisma/client";
// Components
import FieldWrapper from "@/core/components/form/FieldWrapper";
import TitleSelector from "@/core/components/form/TitleSelector";
import ShowInputError from "@/core/components/form/ShowInputError";
import * as Label from "@radix-ui/react-label";

const CourseDetailForm: React.FC = () => {
  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = useFormContext<CourseDetailModifyType>();
  const { openToast } = useCustomToast();
  const queryClient = useQueryClient();
  const updateCourse = useUpdateCourse();
  const subjectId = getValues("subjectId");

  // console.log("Form state มีการเปลี่ยนแปลง 🏗️", watch());

  // query client สำหรับการเข้าถึงข้อมูลของ systemStatus fetching, course fetching
  const [systemQuery, courseDetailQuery] = [
    queryClient.getQueryState(["getSystemStatus"]),
    queryClient.getQueryState(["getCourse", subjectId]),
  ];

  const onSubmit: SubmitHandler<CourseDetailModifyType> = (data) => {
    // type สำหรับส่วนของ course อย่างเดียวเราตัดส่วนที่เป็นของ system status ออกไป สำหรับการอัปเดต course
    const courseUpdateData: Omit<CourseDetailModifyType, keyof Prisma.SystemStatusGetPayload<{}>> = {
      contact: data.contact,
      enrollCondition: data.enrollCondition,
      firstname: data.firstname,
      lastname: data.lastname,
      secretCode: data.secretCode,
      title: data.title,
      nameThai: data.nameThai,
      subjectId: data.subjectId,
    };

    updateCourse.mutate(courseUpdateData, {
      onSuccess(data, variables, context) {
        console.log("Success", data);
        openToast({
          title: <p className="text-blue-500">เข้าสู่ระบบสำเร็จ 🎉</p>,
          description: <p>ยินดีต้อนรับ</p>,
          actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
        });
      },
      onError(error, variables, context) {
        openToast({
          title: <p className="text-red-500">ไม่สามารถเข้าสู่ระบบได้</p>,
          description: <p>{error.message}</p>,
          actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
        });
      },
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${
          (systemQuery?.status === "loading" || courseDetailQuery?.status === "loading") && "animate-pulse opacity-50"
        }`}
      >
        <div className="grid grid-cols-1 gap-2">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <FieldWrapper
              errorComponent={<ShowInputError inputName="title" />}
              label={<Label.Root>คำนำหน้า</Label.Root>}
            >
              <TitleSelector />
            </FieldWrapper>

            <FieldWrapper
              errorComponent={<ShowInputError inputName="firstname" />}
              label={<Label.Root>ชื่อจริง</Label.Root>}
            >
              <input
                type="text"
                {...register("firstname")}
                className="mt-auto w-full justify-self-end rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
              />
            </FieldWrapper>

            <FieldWrapper
              errorComponent={<ShowInputError inputName="lastname" />}
              label={<Label.Root>นามสกุล</Label.Root>}
            >
              <input
                type="text"
                {...register("lastname")}
                className="mt-auto w-full justify-self-end rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
              />
            </FieldWrapper>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FieldWrapper
              errorComponent={<ShowInputError inputName="subjectId" />}
              label={<Label.Root>รหัสวิชา</Label.Root>}
            >
              <input
                disabled
                type="text"
                {...register("subjectId")}
                className="mt-auto w-full justify-self-end rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
              />
            </FieldWrapper>

            <FieldWrapper
              errorComponent={<ShowInputError inputName="nameThai" />}
              label={<Label.Root>รายวิชา</Label.Root>}
            >
              <input
                disabled
                type="text"
                {...register("nameThai")}
                className="mt-auto w-full justify-self-end rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
              />
            </FieldWrapper>
          </div>
          <div className="grid grid-cols-2 gap-2">
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
          </div>

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
