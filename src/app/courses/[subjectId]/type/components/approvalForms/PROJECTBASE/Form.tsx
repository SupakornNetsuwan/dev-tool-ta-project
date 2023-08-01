"use client";
import React from "react";
import EachTaForm from "./EachTaForm";
import { useFormContext, useFieldArray } from "react-hook-form";
import * as Separator from "@radix-ui/react-separator";
import { PROJECTBASEFormType } from "@/app/api/subjects/[subjectId]/approvalForm/func/PROJECTBASE/PROJECTBASE";
import { useParams } from "next/navigation";
import ShowCreationAdvice from "../core/ShowCreationAdvice";
import CreateGroupBtn from "../core/CreateGroupBtn";

const Form = () => {
  const { subjectId } = useParams();
  const {
    control,
    getValues,
    formState: { isDirty },
  } = useFormContext<PROJECTBASEFormType>();
  const { fields, append, remove } = useFieldArray({
    name: "TaForms",
    control: control,
  });

  const gropAmount = getValues().TaForms.length;

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
        {!gropAmount && <ShowCreationAdvice />}
        <CreateGroupBtn
          onClick={() =>
            append({
              groupNumber: undefined,
              studentAmount: undefined,
              subjectId,
              otherTaWorkDay: "",
              otherTaTeachDay: "",
            })
          }
        />
        <div
          className={`pointer-events-none fixed ${
            isDirty ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          } bottom-4 right-4 rounded border border-amber-500 bg-amber-200/30 p-2 px-4 text-xs text-amber-500 backdrop-blur-sm duration-300`}
        >
          มีการแก้ไข โปรดบันทึกการเปลี่ยนแปลง
        </div>

        {isDirty && (
          <>
            <Separator.Root className="my-2 h-px w-full bg-gray-300" />
            <button className="btn click-animation mt-12 flex items-center justify-center space-x-2 rounded border border-transparent bg-blue-500 p-2 text-white  hover:border-blue-500">
              บันทึกการเปลี่ยนแปลง
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Form;
