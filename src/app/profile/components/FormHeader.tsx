"use client";
import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import { scroll, animate } from "motion";

const ProfileFormHeader: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const [scrollAmount, setScrollAmount] = useState<number>(0);

  useLayoutEffect(() => {
    scroll(
      animate(
        headerRef.current!,
        {
          y: [null, 70],
          opacity: [1, 0],
        },
        {
          easing: "ease-in-out",
        }
      ),
      { offset: [0, 0.15] }
    );

    scroll(
      animate(
        descriptionRef.current!,
        {
          y: [null, 70],
          opacity: [1, 0],
        },
        {
          easing: "ease-in-out",
        }
      ),
      { offset: [0, 0.19] }
    );

    scroll((info) => {
      setScrollAmount(info.y.progress);
    });
  }, []);

  return (
    <div ref={headerContainerRef} className="relative py-12">
      <div
        ref={scrollBarRef}
        style={{ width: scrollAmount * 100 + "%" }}
        className="fixed left-0 right-0 top-0 z-40 h-1 bg-blue-500 font-mono font-semibold"
      />
      <div ref={headerRef}>
        {isLoading ? (
          <div className="h-6 w-2/5 animate-pulse rounded bg-blue-500" />
        ) : (
          <h3 className="text-4xl font-bold text-blue-500">จัดการโปรไฟล์</h3>
        )}
      </div>
      <div ref={descriptionRef}>
        {isLoading ? (
          <>
            <div className="mt-2 h-4 w-full animate-pulse rounded bg-gray-300"></div>
            <div className="mt-2 h-4 w-[70%] animate-pulse rounded bg-gray-300"></div>
          </>
        ) : (
          <p className="pt-2 text-gray-400 md:max-w-[70%]">
            แก้ไขข้อมูล และ ประวัติส่วนบุคคลเพื่อนำไปประกอบการสมัครผู้ช่วยสอน ข้อมูลทั้งหมดควรถูกระบุอย่างชัดเจน
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileFormHeader;
