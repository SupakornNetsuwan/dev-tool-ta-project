"use client";
import { useState } from "react";
import useCustomDialog from "@/core/components/CustomDialog/hooks/useCustomDialog";
import CustomDialog from "@/core/components/CustomDialog";
import type { FetchCourseType } from "@/app/api/subjects/[subjectId]/CourseTypes";
import { HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import useUpdateCourse from "@/core/hooks/courses/useUpdateCourse";
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";
import { useQueryClient } from "@tanstack/react-query";

const CreateCourseOption = ({ course, closeDialog }: { course: FetchCourseType; closeDialog: () => void }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { openToast } = useCustomToast();
  const updateCourse = useUpdateCourse();
  const queryClient = useQueryClient();

  const addNewCourse = (subjectId: string) => {
    updateCourse.mutate(
      {
        subjectId: subjectId,
        creationStatus: "CREATED",
      },
      {
        onSuccess(data) {
          openToast({
            title: <p className="text-blue-500">สำเร็จ 🎉</p>,
            description: <p>{data.data.message}</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });

          queryClient.invalidateQueries(["getCoursesByProfessorId", data.data.data.professorId]);
        },
        onError(error) {
          openToast({
            title: <p className="text-red-500">ไม่สามารถสร้างวิชาได้</p>,
            description: <p>{error?.response?.data.message || "ไม่ทราบสาเหตุ"}</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
        },
        onSettled() {
          setShowConfirm(false);
          closeDialog()
        },
      }
    );
  };

  return (
    <div className={`flex gap-2`}>
      <button
        onClick={() => setShowConfirm(true)}
        className={`${
          showConfirm ? "hidden" : "block"
        } group w-full rounded-md border p-2 text-sm ring-0 ring-blue-500 ring-offset-0 ring-offset-white duration-100 hover:bg-blue-50 hover:ring-1 hover:ring-offset-4`}
      >
        <p className="inline text-gray-800 group-hover:text-blue-500">
          {course.nameThai}
          <span className="text-gray-500 group-hover:text-blue-500 ml-1">({course.subjectId})</span>
        </p>
        <HiOutlineCheck className="ml-2 inline -translate-x-4 text-lg text-emerald-600 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
      </button>
      <div className={`${showConfirm ? "flex" : "hidden"} w-full space-x-2`}>
        <button
          onClick={() => setShowConfirm(false)}
          className="btn click-animation flex-1 border bg-white  text-gray-500 hover:border-red-500 hover:bg-red-50 hover:text-red-500"
        >
          ยกเลิก
        </button>
        <button
          onClick={() => addNewCourse(course.subjectId)}
          className="btn click-animation flex-1 border bg-white  text-gray-500 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-500"
        >
          เพิ่มวิชา
        </button>
      </div>
    </div>
  );
};

const CreateCourseCard: React.FC<{ uncreatedCourses: FetchCourseType[] }> = ({ uncreatedCourses }) => {
  const { openDialog, dialogState, setShowDialog, closeDialog } = useCustomDialog();

  const openAddingCourseDialog = (e: React.MouseEvent) => {
    openDialog({
      title: <p className="text-blue-500">เพิ่มวิชา</p>,
      description: (
        <div>
          <p className="text-base text-gray-500">เลือกวิชาที่ต้องการเพิ่ม</p>
          <ScrollArea.Root>
            <ScrollArea.Viewport>
              <div className="mt-2 grid h-44 grid-cols-1 content-start space-y-2 p-4">
                {uncreatedCourses.map((course) => (
                  <CreateCourseOption closeDialog={closeDialog} key={course.subjectId} course={course} />
                ))}
                <ScrollArea.Scrollbar
                  className="flex w-2.5 touch-none select-none bg-gray-50 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-gray-100"
                  orientation="vertical"
                >
                  <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-300 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] hover:bg-gray-400" />
                </ScrollArea.Scrollbar>
              </div>
            </ScrollArea.Viewport>
          </ScrollArea.Root>
        </div>
      ),
      cancelButton: <button className="btn bg-gray-50 px-4 py-2 text-gray-500">ยกเลิก</button>,
    });
  };

  return (
    <>
      <CustomDialog {...dialogState} setShowDialog={setShowDialog} />
      <div
        onClick={openAddingCourseDialog}
        className="flex min-h-[8em] cursor-pointer items-center justify-center border-2 border-dashed border-gray-300 bg-white p-4"
      >
        <p className="text-blue-500">เพิ่มรายวิชาของคุณ</p>
      </div>
    </>
  );
};
export default CreateCourseCard;
