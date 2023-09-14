import React, { Suspense } from "react";
import getProfile from "@/app/api/users/[id]/profile/func/getProfile";
import List from "@/core/components/List";
import FileDownload from "./components/FileDownload";
import CourseEnrollmentDetail from "./components/CourseEnrollmentDetail";

type ParamsType = {
  params: {
    userId: string;
  };
  searchParams: { subjectId?: string };
};

const page = async ({ params: { userId }, searchParams: { subjectId } }: ParamsType) => {
  const profile = await getProfile(userId);

  return (
    <>
      {subjectId && <CourseEnrollmentDetail subjectId={subjectId} userId={userId} />}
      <div className=" bg-white p-4">
        <p className="mb-4 text-lg font-medium text-blue-500">ข้อมูลส่วนตัว</p>
        <List.Wrapper>
          <List.Item topic="ID">
            <p className="text-right lg:max-w-[30em]">{profile?.id}</p>
          </List.Item>
          <List.Item topic="ชื่อ">
            <p className="text-right lg:max-w-[30em]">{`${profile?.title} ${profile?.firstname} ${profile?.lastname}`}</p>
          </List.Item>
          <List.Item topic="ที่อยู่">
            <div className="w-1/2 overflow-x-auto text-right lg:max-w-[30em]">{`${profile?.address}`}</div>
          </List.Item>
          <List.Item topic="หมายเลขโทรศัพท์">
            <div className="text-right lg:max-w-[30em]">{`${profile?.phoneNumber}`}</div>
          </List.Item>
          <List.Item topic="อีเมล">
            <div className="text-right lg:max-w-[30em]">{`${profile?.email}`}</div>
          </List.Item>
          <List.Item topic="เลขบัญชี">
            <div className="text-right lg:max-w-[30em]">{`${profile?.bookBankNumber}`}</div>
          </List.Item>
          <List.Item topic="ชื่อธนาคาร">
            <div className="text-right lg:max-w-[30em]">{`${profile?.bankName}`}</div>
          </List.Item>
          <List.Item topic="ระดับการศึกษา">
            <div className="text-right lg:max-w-[30em]">{`${profile?.degree}`}</div>
          </List.Item>
        </List.Wrapper>
      </div>
      <div className=" bg-white p-4">
        <p className="mb-4 text-lg font-medium text-blue-500">ไฟล์ที่อัปโหลด</p>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <FileDownload name="สำเนาสมุดบัญชีธนาคาร" path={profile?.UserDocument?.bookBankPath} />
          <FileDownload name="ตารางเรียนส่วนบุคคล" path={profile?.UserDocument?.classTablePath} />
          <FileDownload name="สำเนาทรานสคริปปัจจุบัน" path={profile?.UserDocument?.transcriptPath} />
          <FileDownload name="รูปถ่ายขนาดหนึ่งนิ้ว" path={profile?.UserDocument?.picturePath} />
        </div>
      </div>
    </>
  );
};

export default page;
