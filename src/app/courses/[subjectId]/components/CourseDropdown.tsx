import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineTrash, HiOutlineXMark } from "react-icons/hi2";
import useCustomDialog from "@/core/components/CustomDialog/hooks/useCustomDialog";
import CustomDialog from "@/core/components/CustomDialog";
import useUpdateCourse from "@/core/hooks/courses/useUpdateCourse";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useCustomToast from "@/core/components/CustomToast/hooks/useCustomToast";

const CourseDropdown: React.FC<{ children: React.ReactElement<"button"> }> = ({ children }) => {
  const { subjectId } = useParams();
  const router = useRouter();
  const { dialogState, setShowDialog, openDialog } = useCustomDialog();
  const { openToast } = useCustomToast();
  const updateCourse = useUpdateCourse();

  const deleteCourse = async () => {
    updateCourse.mutate(
      {
        subjectId,
        creationStatus: "UNCREATED",
      },
      {
        onSuccess(data, variables, context) {
          openToast({
            title: <p className="text-blue-500">ลบวิชาสำเร็จ 🗑️</p>,
            description: <p>{data.data.message}</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
          router.replace("/courses");
        },
        onError(error, variables, context) {
          openToast({
            title: <p className="text-red-500">ไม่สามารถลบวิชาได้</p>,
            description: <p>{error?.response?.data.message || "ไม่ทราบสาเหตุ"}</p>,
            actionButton: <HiOutlineXMark className="text-2xl text-gray-900" />,
          });
        },
      }
    );
  };

  const confirmDeleteCourse = () => {
    openDialog({
      title: <p className="text-red-500">คำเตือน ⚠️</p>,
      description: (
        <div className="text-gray-500">
          <p>ยืนยันที่จะลบวิชานี้หรือไม่</p>
          <ul className="list-inside list-disc">
            <li>คุณสามารถกลับมาสร้างใหม่ได้</li>
            <li>ข้อมูลที่มีอยู่ จะยังคงอยู่หากคุณกลับมาสร้างใหม่</li>
          </ul>
        </div>
      ),
      cancelButton: <button className="btn bg-gray-50 px-4 py-2 text-gray-500">ยกเลิก</button>,
      actionButton: (
        <button onClick={deleteCourse} className="btn bg-red-50 px-4 py-2 text-red-500">
          ยืนยัน
        </button>
      ),
    });
  };

  return (
    <>
      <CustomDialog {...dialogState} setShowDialog={setShowDialog} />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={5}
            className="min-w-[10em] bg-white p-2 text-sm text-gray-500 shadow-realistic-1 data-[state=open]:animate-slideUpAndFade"
          >
            <DropdownMenu.Item
              onClick={confirmDeleteCourse}
              className="cursor-pointer rounded px-2 py-1 outline-none focus:bg-red-50 focus:text-red-500"
            >
              <div className="flex items-center justify-between space-x-2">
                <span>ลบรายวิชา</span>
                <HiOutlineTrash />
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Arrow className="fill-white" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};

export default CourseDropdown;
