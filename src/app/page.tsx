export const revalidate = 30 * 60 * 1000;
import dynamic from "next/dynamic";
import React, { cache } from "react";
import getSystemStatus from "./api/systemStatus/func/getSystemStatus";
// import BookAnimation from "./components/BookAnimation";
const BookAnimation = dynamic(() => import("./components/BookAnimation"), {
  ssr: false,
  loading: (loadingProps) => <div className="w-24 aspect-square animate-pulse rounded-xl bg-white/50 mb-4" />,
});
import dayjs from "dayjs";
import { HiArrowSmallRight } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

const getSystemStatusFunc = cache(async () => {
  return await getSystemStatus();
});

const Home = async () => {
  const systemStatus = await getSystemStatusFunc();

  return (
    <div className="relative mx-auto flex min-h-[80vh] max-w-6xl justify-center bg-gradient-to-tr from-blue-50/50 via-purple-200/40 to-transparent p-4 md:p-12 lg:rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 via-transparent to-amber-200/10" />
      <div className="flex w-full flex-1 justify-center rounded-xl border border-slate-200/50 bg-gradient-to-br from-slate-100/20 to-white/50 p-4 shadow-realistic-2 backdrop-blur md:p-8">
        <div className="flex flex-col items-center">
          <BookAnimation loop={false} className="translate-y w-44 translate-y-6" />
          <h2 className="text-center text-[1.4em] font-semibold text-blue-500 sm:text-[1.8em]">
            ระบบรับสมัครผู้ช่วยสอน
          </h2>
          <a
            rel="noreferrer"
            target="_blank"
            className="text-center text-sm font-medium leading-loose text-blue-500 underline underline-offset-2"
            href="https://drive.google.com/drive/folders/1AOVPlaFnEehem1QWJxDzFlInUgDsfptx?usp=sharing"
          >
            คู่มือการใช้งาน
          </a>

          {systemStatus ? (
            <div className="mt-4 flex flex-col space-y-2 rounded bg-white/70 p-4">
              <div className="flex items-center space-x-2 self-center">
                <span className={twMerge("text-gray-500", systemStatus.isOpen && "text-green-500")}>
                  ช่วงเปิดรับสมัคร
                </span>
                <div
                  className={twMerge(
                    "aspect-square w-2 animate-pulse rounded-full bg-gray-500",
                    systemStatus.isOpen && "bg-green-500"
                  )}
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-gray-200/40 to-transparent px-4 py-2">
                  <p className="text-gray-800">{dayjs(systemStatus.openDate).format("DD/MM/YYYY HH:mm")}</p>
                </div>
                <HiArrowSmallRight className="text-xl" />
                <div className="bg-gradient-to-l from-gray-200/40 to-transparent px-4 py-2">
                  <p className="text-gray-800">{dayjs(systemStatus.closeDate).format("DD/MM/YYYY HH:mm")}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 rounded bg-white/50 px-4 py-2 text-gray-500">ระบบไม่อยู่ในช่วงเปิดรับสมัคร</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
