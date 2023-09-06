import React, { useCallback, useMemo } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { twMerge } from "tailwind-merge";
import type { AxiosResponse } from "axios";
import { FetchCourseTypeWithApprovementType } from "@/app/api/subjects/[subjectId]/CourseTypes";
// Components
import { HiOutlineChevronRight, HiOutlineArrowPath, HiOutlineXMark } from "react-icons/hi2";
import CustomTooltip from "@/core/components/CustomTooltip";
import CustomDialog from "@/core/components/CustomDialog";
// Custom hooks
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import useDeleteApprovalForm from "@/core/hooks/courses/approvalForm/useDeleteApprovalForm";
import useCustomDialog from "@/core/components/CustomDialog/hooks/useCustomDialog";
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";

const Root: React.FC<React.ComponentPropsWithoutRef<typeof Tabs.Root>> = ({ children, defaultValue, className }) => {
  return (
    <Tabs.Root
      orientation="vertical"
      defaultValue={defaultValue}
      className={twMerge("grid h-full grid-cols-12 md:col-span-3", className)}
    >
      {children}
    </Tabs.Root>
  );
};

const Trigger: React.FC<React.ComponentPropsWithoutRef<typeof Tabs.Trigger>> = ({ value, children, className }) => {
  return (
    <Tabs.Trigger
      value={value}
      className={twMerge(
        "group flex min-h-[5em] w-full items-center justify-between from-white to-gray-100/80 p-4 text-left text-sm hover:bg-gray-50 data-[state='active']:bg-gradient-to-r md:text-base [&>.icon]:data-[state='active']:rounded-full [&>.icon]:data-[state='active']:bg-blue-100 [&>.icon]:data-[state='active']:text-blue-500",
        className
      )}
    >
      <>{children}</>
      <HiOutlineChevronRight className="icon ml-2 box-content p-1 font-medium text-gray-400 duration-200" />
    </Tabs.Trigger>
  );
};

const ContentContainer: React.FC<{ children: React.ReactNode } & React.ComponentPropsWithoutRef<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={twMerge(className)} {...props}>
      {children}
    </div>
  );
};

const Content: React.FC<React.ComponentPropsWithoutRef<typeof Tabs.Content> & { description?: React.ReactNode }> = ({
  className,
  children,
  title,
  description,
  ...props
}) => {
  const queryClient = useQueryClient();
  const { openToast } = useCustomToast();
  const { dialogState, setShowDialog, openDialog, closeDialog } = useCustomDialog();
  const deleteApprovalForm = useDeleteApprovalForm();
  const { subjectId } = useParams();

  const data = queryClient.getQueryData<AxiosResponse<{ message: string; data: FetchCourseTypeWithApprovementType }>>([
    "getCoursesWithapprovalForm",
    subjectId,
  ]); // ทำการเข้าถึง cache จากการ fetch ที่ \type\components\CourseType.tsx ซึ่งยังไงมันก็มีการ fetch อยู่แล้ว จึงไม่มีทางที่จะเป็น nul

  const approvalForm = useMemo(() => data?.data.data.approvalForm, [data?.data.data]);
  const isHasAproovalForm = useMemo(() => Boolean(approvalForm), [approvalForm]);

  // ยืนยัน ทำการเปลี่ยน
  const confirmDeleteApprovalForm = useCallback(() => {
    deleteApprovalForm.mutate(subjectId, {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(["getCoursesWithapprovalForm", subjectId]);
        openToast({
          title: <p className="text-blue-500">สำเร็จ</p>,
          description: <p>โปรดเลือกประเภทฟอร์มที่ต้องการเปลี่ยน</p>,
          actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
        });
      },
      onError(error, variables, context) {
        console.log("⚠️ :", error.response?.data.message);
        openToast({
          title: <p className="text-red-500">ไม่สามารถเปลี่ยนฟอร์มได้</p>,
          description: <p>{error?.response?.data.message || "ไม่ทราบสาเหตุ"}</p>,
          actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
        });
      },
    });
  }, [queryClient, deleteApprovalForm, subjectId, openToast]);

  // ยืนยันมั้ยที่จะเปลี่ยนฟอร์มอนุมัติผู้ช่วยสอน
  const deleteApprovalFormHandler = useCallback(() => {
    openDialog({
      title: <p className="text-red-500">คำเตือน ⚠️</p>,
      description: <p className="text-gray-500">ยืนยันที่จะเปลี่ยนประเภทของฟอร์มอนุมัติผู้ช่วยสอน หรือ ไม่</p>,
      cancelButton: <button className="btn bg-gray-50 px-4 py-2 text-gray-500">ยกเลิก</button>,
      actionButton: (
        <button onClick={confirmDeleteApprovalForm} className="btn bg-red-50 px-4 py-2 text-red-500">
          ยืนยัน
        </button>
      ),
    });
  }, [confirmDeleteApprovalForm, openDialog]);

  return (
    <Tabs.Content {...props} className={twMerge("p-4", className)}>
      <CustomDialog {...dialogState} setShowDialog={setShowDialog} />
      {isHasAproovalForm && (
        <CustomTooltip.tooltip
          defaultOpen={true}
          renderContent={
            <CustomTooltip.TooltipContent sideOffset={5} className="bg-white text-gray-500 ">
              ต้องการเลือกแบบฟอร์มอื่นใช่ไหม!
            </CustomTooltip.TooltipContent>
          }
        >
          <button
            onClick={deleteApprovalFormHandler}
            className="btn click-animation flex items-center space-x-2 rounded-lg  border bg-white px-3 py-2 text-gray-500 duration-100 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-500"
          >
            <HiOutlineArrowPath />
            <span>เปลี่ยนประเภทฟอร์ม</span>
          </button>
        </CustomTooltip.tooltip>
      )}
      <div className="my-4 ">
        <h2 className="text-xl font-semibold text-blue-500">{title}</h2>
        {description && <p className="text-gray-500">{description}</p>}
      </div>
      {children}
    </Tabs.Content>
  );
};

const CustomTabs = {
  Root,
  Trigger,
  Content,
  List: Tabs.List,
  ContentContainer,
};

export default CustomTabs;
