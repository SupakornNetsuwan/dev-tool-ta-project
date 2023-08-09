import React from "react";
import FieldWrapper from "@/core/components/form/FieldWrapper";
import ShowInputError from "@/core/components/form/ShowInputError";
import * as Label from "@radix-ui/react-label";
import { useFormContext } from "react-hook-form";
import { Prisma } from "@prisma/client";
// Form type
import { GTEFormType } from "@/app/api/subjects/[subjectId]/approvalForm/func/GTE_EIGHT/GTE_EIGHT";
import { HiOutlineTrash } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import useCustomDialog from "@/core/components/CustomDialog/hooks/useCustomDialog";
import CustomDialog from "@/core/components/CustomDialog";

const DeleteGroupButton: React.FC<React.ComponentPropsWithoutRef<"button">> = ({ onClick, className }) => {
  const { dialogState, setShowDialog, openDialog } = useCustomDialog();

  const confirmDelete = (e: React.MouseEvent) => {
    openDialog({
      title: <p className="text-red-500">คำเตือน ⚠️</p>,
      description: <p className="text-gray-500">ยืนยันที่จะลบกลุ่ม / ลำดับหรือไม่</p>,
      cancelButton: <button className="btn bg-gray-50 px-4 py-2 text-gray-500">ยกเลิก</button>,
      actionButton: (
        <button onClick={onClick} className="btn bg-red-50 px-4 py-2 text-red-500">
          ยืนยัน
        </button>
      ),
    });
  };

  return (
    <>
      <button
        type="button"
        className={twMerge(
          "btn click-animation rounded rounded-br-none rounded-tr-none border border-r-0 border-red-300 bg-red-50 text-red-500 hover:border-red-500",
          className
        )}
        onClick={confirmDelete}
      >
        <HiOutlineTrash />
      </button>
      <CustomDialog {...dialogState} setShowDialog={setShowDialog} />
    </>
  );
};

const Wrapper: React.FC<{ children: React.ReactNode } & React.ComponentPropsWithoutRef<"div">> = ({
  children,
  className,
}) => {
  return <div className={twMerge("flex", className)}>{children}</div>;
};

const Content: React.FC<{ index: number }> = ({ index }) => {
  const { register } = useFormContext<GTEFormType>();

  return (
    <div className="flex-1 border border-l-0 p-4">
      <div className="grid grid-cols-2 gap-2">
        <FieldWrapper
          label={<Label.Root>กลุ่ม</Label.Root>}
          errorComponent={<ShowInputError inputName={`TaForms.${index}.groupNumber`} />}
        >
          <input
            type="text"
            {...register(`TaForms.${index}.groupNumber`)}
            className="w-full justify-self-end rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
          />
        </FieldWrapper>
        <FieldWrapper
          label={<Label.Root>จำนวนนักศึกษา</Label.Root>}
          errorComponent={<ShowInputError inputName={`TaForms.${index}.studentAmount`} />}
        >
          <input
            type="text"
            {...register(`TaForms.${index}.studentAmount`)}
            className="w-full justify-self-end rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
          />
        </FieldWrapper>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <FieldWrapper
          label={<Label.Root>จำนวน TA</Label.Root>}
          errorComponent={<ShowInputError inputName={`TaForms.${index}.taAmount`} />}
        >
          <input
            type="text"
            {...register(`TaForms.${index}.taAmount`)}
            className="w-full justify-self-end rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
          />
        </FieldWrapper>
        <FieldWrapper
          label={<Label.Root>วัน-เวลาช่วยสอน</Label.Root>}
          errorComponent={<ShowInputError inputName={`TaForms.${index}.taWorkDay`} />}
        >
          <input
            type="text"
            {...register(`TaForms.${index}.taWorkDay`)}
            className="w-full justify-self-end rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
          />
        </FieldWrapper>
        <FieldWrapper
          label={<Label.Root>ระยะเวลาจ้าง</Label.Root>}
          errorComponent={<ShowInputError inputName={`TaForms.${index}.taHireDuration`} />}
        >
          <input
            type="text"
            {...register(`TaForms.${index}.taHireDuration`)}
            className="w-full justify-self-end rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
          />
        </FieldWrapper>
      </div>
    </div>
  );
};

const EachTaForm = {
  Wrapper,
  Content,
  DeleteGroupButton,
};

export default EachTaForm;
