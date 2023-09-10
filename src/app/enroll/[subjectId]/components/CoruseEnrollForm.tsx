import React, { useState } from "react";
import PassedCoursesField from "./PassedCoursesField";
import { useFormContext } from "react-hook-form";
import FieldWrapper from "@/core/components/form/FieldWrapper";
import ShowInputError from "@/core/components/form/ShowInputError";
import * as Label from "@radix-ui/react-label";
import type { EnrollCourseFormType } from "@/app/api/subjects/studentView/[subjectId]/FullCourseWithEnrollStatusType";
import Selector from "@/core/components/form/Selector";
import { HiDocumentPlus } from "react-icons/hi2";
import useGetFullCourseWithEnrollStatus from "@/core/hooks/studentView/useGetFullCourseWithEnrollStatus";
import { useParams } from "next/navigation";

const degreeMapper: { label: string; value: EnrollCourseFormType["degree"] }[] = [
  { label: "ปริญญาตรี", value: "BACHELOR_DEGREE" },
  { label: "ปริญญาโท", value: "MASTER_DEGREE" },
];

const courseInMajorsMapper: { label: string; value: EnrollCourseFormType["courseInMajors"] }[] = [
  { label: "สาขาวิชาเทคโนโลยีปัญญาประดิษฐ์", value: "ARTIFICIAL_INTELLIGENCE_TECHNOLOGY" },
  {
    label: "สาขาวิชาเทคโนโลยีสารสนเทศทางธุรกิจ (หลักสูตรนานาชาติ)",
    value: "BUSINESS_INFORMATION_TECHNOLOGY_INTERNATIONAL_PROGRAM",
  },
  { label: "สาขาวิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ", value: "DATA_SCIENCE_AND_BUSINESS_ANALYTICS" },
  { label: "สาขาวิชาเทคโนโลยีสารสนเทศ", value: "INFORMATION_TECHNOLOGY" },
];

const passedInMajorsMapper: { label: string; value: EnrollCourseFormType["passedInMajors"] }[] = [
  { label: "สาขาวิชาเทคโนโลยีปัญญาประดิษฐ์", value: "ARTIFICIAL_INTELLIGENCE_TECHNOLOGY" },
  {
    label: "สาขาวิชาเทคโนโลยีสารสนเทศทางธุรกิจ (หลักสูตรนานาชาติ)",
    value: "BUSINESS_INFORMATION_TECHNOLOGY_INTERNATIONAL_PROGRAM",
  },
  { label: "สาขาวิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ", value: "DATA_SCIENCE_AND_BUSINESS_ANALYTICS" },
  { label: "สาขาวิชาเทคโนโลยีสารสนเทศ", value: "INFORMATION_TECHNOLOGY" },
];

const gradeMapper: { label: string; value: EnrollCourseFormType["grade"] }[] = [
  { label: "A", value: "A" },
  { label: "B+", value: "B_PLUS" },
  { label: "B", value: "B" },
  { label: "C+", value: "C_PLUS" },
  { label: "C", value: "C" },
  { label: "D+", value: "D_PLUS" },
  { label: "D", value: "D" },
  { label: "F", value: "F" },
];

const CoruseEnrollForm = () => {
  const { subjectId } = useParams();
  const { register, watch } = useFormContext<EnrollCourseFormType>();
  const { data: courseDetail } = useGetFullCourseWithEnrollStatus(subjectId);
  const [submitConfirm, setSubmitConfirm] = useState(false);
  const { isNeedSecretCode } = courseDetail?.data.data!;

  const inverSubmitConfirmState = () => setSubmitConfirm((prevState) => !prevState);

  return (
    <div className="mt-4 rounded-sm bg-white p-4">
      <p className="pb-2 text-lg font-medium text-blue-500">การสมัคร</p>
      <div className="flex flex-col space-y-4">
        <FieldWrapper
          errorComponent={<ShowInputError inputName="degree" />}
          label={<Label.Root>ระดับการศึกษา</Label.Root>}
        >
          <Selector
            name={`degree`}
            options={degreeMapper as { label: string; value: string }[]}
            placeholder="BACHELOR_DEGREE"
          />
        </FieldWrapper>
        <FieldWrapper
          errorComponent={<ShowInputError inputName="courseInMajors" />}
          label={<Label.Root>วิชาที่ช่วยสอนอยู่ในหลักสูตรวิทยศาสตรบันฑิต</Label.Root>}
        >
          <Selector
            name={`courseInMajors`}
            options={courseInMajorsMapper as { label: string; value: string }[]}
            placeholder="INFORMATION_TECHNOLOGY"
          />
        </FieldWrapper>
        <FieldWrapper
          errorComponent={<ShowInputError inputName="passedInMajors" />}
          label={<Label.Root>ผลของการเรียนของผู้ช่วยสอนหรือเทียบเคียง (สอบผ่านในหลักสูตร)</Label.Root>}
        >
          <Selector
            name={`passedInMajors`}
            options={passedInMajorsMapper as { label: string; value: string }[]}
            placeholder="INFORMATION_TECHNOLOGY"
          />
        </FieldWrapper>
        <FieldWrapper errorComponent={<ShowInputError inputName="grade" />} label={<Label.Root>ได้เกรด</Label.Root>}>
          <Selector name={`grade`} options={gradeMapper as { label: string; value: string }[]} placeholder="C" />
        </FieldWrapper>
        {isNeedSecretCode && (
          <FieldWrapper
            errorComponent={<ShowInputError inputName={"secretCode"} />}
            label={<Label.Root>รหัสลงทะเบียน 🗝️</Label.Root>}
          >
            <input
              type="password"
              {...register("secretCode")}
              className="mt-auto w-full justify-self-end rounded border p-2 text-gray-500 outline-none disabled:opacity-50"
            />
          </FieldWrapper>
        )}
        <PassedCoursesField />
        {!submitConfirm ? (
          <button
            onClick={inverSubmitConfirmState}
            type="button"
            className="btn click-animation flex items-center space-x-1 self-end bg-blue-500 px-8 text-white"
          >
            <span>สมัคร</span>
            <HiDocumentPlus className="text-lg" />
          </button>
        ) : (
          <div className="flex items-center space-x-2 self-end">
            <button
              onClick={inverSubmitConfirmState}
              type="button"
              className="btn click-animation flex items-center space-x-1 bg-red-50 px-8 text-red-500"
            >
              <span>ยกเลิก</span>
            </button>
            <button
              type="submit"
              className="btn click-animation flex items-center space-x-1  bg-blue-500 px-8 text-white"
            >
              <span>ยืนยัน</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoruseEnrollForm;
