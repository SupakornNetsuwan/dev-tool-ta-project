import React from "react";
import Image from "next/image";
import { HiOutlineArrowLongDown } from "react-icons/hi2";

const ShowCreationAdvice = () => {
  return (
    <div className="my-6">
      <div>
        <div className="relative h-[40vh] w-full ">
          <Image
            className="object-contain select-none pointer-events-none"
            priority={false}
            fill
            src="/static/handy-line-machine-learning.gif"
            alt="handy-line-machine-learning"
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[10px] text-gray-200">Illustration by <a href="https://icons8.com/illustrations/author/XTPoH093lluQ">Viktoriya Belinio</a> from <a href="https://icons8.com/illustrations">Ouch!</a></p>
          <h2 className=" text-xl font-semibold text-amber-500">
            โอ็ะโอ เหมือนคุณยังไม่ได้สร้างกลุ่ม / ลำดับผู้ช่วยสอนเลย
          </h2>
          <p className="text-lg text-gray-500">ลองกดปุ่มด้านล่างนี้สิ!</p>
          <HiOutlineArrowLongDown className="animate-bounce text-2xl text-gray-500 mt-2" />
        </div>
      </div>
    </div>
  );
};

/**
 * @description A cute advice section 💖
 */

export default ShowCreationAdvice;
