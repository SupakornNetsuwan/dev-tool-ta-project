import React from "react";
import FieldWrapper from "@/core/components/form/FieldWrapper";
import ShowInputError from "@/core/components/form/ShowInputError";
import * as Label from "@radix-ui/react-label";
import Selector from "@/core/components/form/Selector";
import { useFormContext } from "react-hook-form";
import DatePicker from "@/core/components/form/DatePicker";
// Form type
import { THEORYFormType } from "@/app/api/subjects/[subjectId]/approvalForm/func/THEORY/THEORY";
import { HiOutlineTrash } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import useCustomDialog from "@/core/components/CustomDialog/hooks/useCustomDialog";
import CustomDialog from "@/core/components/CustomDialog";

const DeleteGroupButton: React.FC<React.ComponentPropsWithoutRef<"button">> = ({ onClick, className }) => {
  const { dialogState, setShowDialog, openDialog } = useCustomDialog();

  const deleteHandler = (e: React.MouseEvent) => {
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
        onClick={deleteHandler}
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
  const { register } = useFormContext<THEORYFormType>();

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

        <div className="col-span-2 grid grid-cols-1 gap-2 rounded bg-gray-50 p-2 sm:grid-cols-3">
          <FieldWrapper
            label={<Label.Root>วันช่วยสอน</Label.Root>}
            errorComponent={<ShowInputError inputName={`TaForms.${index}.taWorkDay`} />}
          >
            <Selector
              name={`TaForms.${index}.taWorkDay`}
              options={[
                { label: "วันจันทร์", value: "วันจันทร์" },
                { label: "วันอังคาร", value: "วันอังคาร" },
                { label: "วันพุธ", value: "วันพุธ" },
                { label: "วันพฤหัสบดี", value: "วันพฤหัสบดี" },
                { label: "วันศุกร์", value: "วันศุกร์" },
                { label: "วันเสาร์", value: "วันเสาร์" },
                { label: "วันอาทิตย์", value: "วันอาทิตย์" },
              ]}
              placeholder="เลือกวันช่วยสอน"
            />
          </FieldWrapper>
          <FieldWrapper
            label={<Label.Root>เวลาเริ่มต้น</Label.Root>}
            errorComponent={<ShowInputError inputName={`TaForms.${index}.taWorkDayStart`} />}
          >
            <DatePicker name={`TaForms.${index}.taWorkDayStart`} />
          </FieldWrapper>
          <FieldWrapper
            label={<Label.Root>เวลาสิ้นสุด</Label.Root>}
            errorComponent={<ShowInputError inputName={`TaForms.${index}.taWorkDayEnd`} />}
          >
            <DatePicker name={`TaForms.${index}.taWorkDayEnd`} />
          </FieldWrapper>
        </div>

        <div className="col-span-2 grid grid-cols-1 gap-2 rounded bg-gray-50 p-2 sm:grid-cols-3">
          <FieldWrapper
            label={<Label.Root>วันปฏิบัติงานอื่น</Label.Root>}
            errorComponent={<ShowInputError inputName={`TaForms.${index}.taOtherWorkDay`} />}
          >
            <Selector
              name={`TaForms.${index}.taOtherWorkDay`}
              options={[
                { label: "วันจันทร์", value: "วันจันทร์" },
                { label: "วันอังคาร", value: "วันอังคาร" },
                { label: "วันพุธ", value: "วันพุธ" },
                { label: "วันพฤหัสบดี", value: "วันพฤหัสบดี" },
                { label: "วันศุกร์", value: "วันศุกร์" },
                { label: "วันเสาร์", value: "วันเสาร์" },
                { label: "วันอาทิตย์", value: "วันอาทิตย์" },
              ]}
              placeholder="เลือกวันช่วยสอน"
            />
          </FieldWrapper>
          <FieldWrapper
            label={<Label.Root>เวลาเริ่มต้น</Label.Root>}
            errorComponent={<ShowInputError inputName={`TaForms.${index}.taOtherWorkDayStart`} />}
          >
            <DatePicker name={`TaForms.${index}.taOtherWorkDayStart`} />
          </FieldWrapper>
          <FieldWrapper
            label={<Label.Root>เวลาสิ้นสุด</Label.Root>}
            errorComponent={<ShowInputError inputName={`TaForms.${index}.taOtherWorkDayEnd`} />}
          >
            <DatePicker name={`TaForms.${index}.taOtherWorkDayEnd`} />
          </FieldWrapper>
        </div>
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
