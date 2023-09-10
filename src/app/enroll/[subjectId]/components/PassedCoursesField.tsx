import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { EnrollCourseFormType } from "@/app/api/subjects/studentView/[subjectId]/FullCourseWithEnrollStatusType";
import * as Label from "@radix-ui/react-label";
import FieldWrapper from "@/core/components/form/FieldWrapper";
import ShowInputError from "@/core/components/form/ShowInputError";
import { HiXMark, HiOutlinePlus } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

const PassedCourses = () => {
  const { control, register } = useFormContext<EnrollCourseFormType>();
  const { fields, append, remove } = useFieldArray<EnrollCourseFormType>({ name: "passedCourse", control });

  return (
    <div>
      <Label.Root className="mb-1 block text-sm font-medium text-gray-500">
        รหัสวิชาและชื่อวิชาที่สอบผ่าน (ยึดตามผลทรานสคริปของนักศึกษา)
      </Label.Root>
      <button
        onClick={() => append({ subjectId: "", subjectName: "" })}
        className="btn click-animation my-2 flex items-center space-x-1 bg-blue-50 text-blue-500"
      >
        <span>เพิ่มวิชา</span>
        <HiOutlinePlus className="text-lg" />
      </button>
      <div className="flex flex-col space-y-2">
        {fields.map((field, index) => {
          return (
            <div className="relative flex items-start space-x-2 rounded border bg-gray-50 p-4 pt-6" key={field.id}>
              <FieldWrapper
                className="flex-1"
                errorComponent={<ShowInputError inputName={`passedCourse.${index}.subjectId`} />}
                label={<Label.Root>รหัสวิชา</Label.Root>}
              >
                <input
                  {...register(`passedCourse.${index}.subjectId`)}
                  className="mt-auto w-full justify-self-end rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
                />
              </FieldWrapper>
              <FieldWrapper
                className="flex-1"
                errorComponent={<ShowInputError inputName={`passedCourse.${index}.subjectName`} />}
                label={<Label.Root>ชื่อวิชา</Label.Root>}
              >
                <input
                  {...register(`passedCourse.${index}.subjectName`)}
                  className="mt-auto w-full justify-self-end rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
                />
              </FieldWrapper>

              <button
                onClick={() => remove(index)}
                className={twMerge(
                  "absolute right-1 top-1 rounded-full bg-transparent p-1.5 transition-all duration-150 hover:bg-red-50 active:bg-red-100",
                  index == 0 && "hidden"
                )}
              >
                <HiXMark className="text-lg text-red-500" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PassedCourses;
