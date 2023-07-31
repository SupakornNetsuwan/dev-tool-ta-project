"use client";
import React from "react";
import EachTaForm from "./EachTaForm";
import { useFormContext, useFieldArray, SubmitHandler } from "react-hook-form";
import { HiOutlinePlus } from "react-icons/hi2";
import * as Separator from "@radix-ui/react-separator";
import { GTEFormType } from "@/app/api/subjects/[subjectId]/approvalForm/func/GTE_EIGHT/GTE_EIGHT";
import { useParams } from "next/navigation";

const Form = () => {
  const { subjectId } = useParams();
  const {
    control,
    formState: { isDirty },
  } = useFormContext<GTEFormType>();
  const { fields, append, remove } = useFieldArray({
    name: "TaForms",
    control: control,
  });

  return (
    <div>
      <div className="mt-4 flex flex-col gap-4">
        {fields.map((item, index) => {
          return (
            <EachTaForm.Wrapper key={item.id}>
              <EachTaForm.DeleteGroupButton
                onClick={() => {
                  remove(index);
                }}
              />
              <EachTaForm.Content index={index} />
            </EachTaForm.Wrapper>
          );
        })}
        <button
          type="button"
          onClick={() =>
            append({
              groupNumber: undefined,
              studentAmount: undefined,
              taAmount: undefined,
              taWorkDay: "",
              taHireDuration: "",
              subjectId,
            })
          }
          className="btn click-animation flex items-center justify-center space-x-2 rounded border border-transparent bg-blue-50 p-2 text-blue-500  hover:border-blue-500"
        >
          <span>เพิ่มกลุ่มการสอน</span>
          <HiOutlinePlus className="text-lg" />
        </button>
        <Separator.Root className="my-2 h-px w-full bg-gray-300" />
        <div
          className={`pointer-events-none fixed ${
            isDirty ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
          } bottom-4 right-4 rounded border border-amber-500 bg-amber-200/30 p-2 px-4 text-xs text-amber-500 backdrop-blur-sm duration-300`}
        >
          มีการแก้ไข โปรดบันทึกการเปลี่ยนแปลง
        </div>

        {isDirty && (
          <button className="btn click-animation mt-12 flex items-center justify-center space-x-2 rounded border border-transparent bg-blue-500 p-2 text-white  hover:border-blue-500">
            บันทึกการเปลี่ยนแปลง
          </button>
        )}
      </div>
    </div>
  );
};

export default Form;
