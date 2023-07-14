"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useWatch } from "react-hook-form";
import { timeline, spring } from "motion";
import colors from "tailwindcss/colors";
import dynamic from "next/dynamic";
const FileStatus = dynamic(() => import("./FileStatus"));

const InputFile: React.FC<{ input: React.ReactElement, label: string }> = ({ input, label }) => {
  const watch = useWatch({ name: input.props.name });
  const [isShowInput, setIsShowInput] = useState(false);
  const WrapperRef = useRef<HTMLDivElement>(null);

  const prepareOpen = () => {
    const wrapper = WrapperRef.current!;
    const divInWrapper = WrapperRef.current!.getElementsByTagName("div")[0];

    timeline([
      [
        divInWrapper,
        {
          width: ["100%", "75%"],
          offset: [0, 0.1],
          background: ["white", "linear-gradient(138deg, rgba(237,237,237,1) 0%, rgba(255,255,255,1) 56%)"],
        },
        { duration: 1, easing: spring({ mass: 1.2 }) },
      ],
      [
        divInWrapper,
        {
          boxShadow: ["23px 1px 50px -5px rgba(0,0,0,0)", "60px 1px 20px -8px rgba(0,0,0,0.14)"],
          transform: ["perspective(600px) rotateY(0)", "perspective(600px) rotateY(-20deg)"],
        },

        {
          duration: 0.5,
          at: "<",
        },
      ],
    ]);

    timeline([
      [
        divInWrapper.getElementsByTagName("p")[0],
        {
          x: [0, -15],
          opacity: [1, 0],
        },
        {
          duration: 0.2,
          at: "<",
        },
      ],
    ]).finished.then(() => {
      divInWrapper.getElementsByTagName("p")[0].innerHTML = "กดเพื่อแก้ไข";
      timeline([
        [
          divInWrapper.getElementsByTagName("p")[0],
          {
            x: [15, 0],
            opacity: [0, 1],
            color: [null, colors.gray[500]],
          },
          {
            duration: 0.2,
            at: "<",
          },
        ],
      ]);
    });
  };

  const unPrepareOpen = () => {
    const wrapper = WrapperRef.current!;
    const divInWrapper = WrapperRef.current!.getElementsByTagName("div")[0];

    timeline([
      [
        divInWrapper,
        {
          width: ["75%", "100%"],
          offset: [0, 0.1],
          background: ["linear-gradient(138deg, rgba(237,237,237,1) 0%, rgba(255,255,255,1) 56%)", "white"],
        },
        { duration: 1, easing: spring({ mass: 0.2 }) },
      ],
      [
        divInWrapper,
        {
          boxShadow: ["60px 1px 20px -8px rgba(0,0,0,0.14)", "23px 1px 50px -5px rgba(0,0,0,0)"],
          transform: ["perspective(500px) rotateY(-20deg)", "perspective(600px) rotateY(0)"],
        },
        {
          duration: 0.5,
          at: "-0.9",
        },
      ],
    ]);

    // innerHTML animation
    timeline([
      [
        divInWrapper.getElementsByTagName("p")[0],
        {
          x: [0, -15],
          opacity: [1, 0],
        },
        {
          duration: 0.2,
          at: "<",
        },
      ],
    ]).finished.then(() => {
      divInWrapper.getElementsByTagName("p")[0].innerHTML = `มีไฟล์ ${label}แล้ว`;

      timeline([
        [
          divInWrapper.getElementsByTagName("p")[0],
          {
            x: [-15, 0],
            opacity: [0, 1],
            color: [null, colors.blue[500]],
          },
          {
            duration: 0.2,
            at: "<",
          },
        ],
      ]);
    });
  };

  const changeToCover = useCallback(() => {
    if (!isShowInput) return;
    const wrapper = WrapperRef.current!;
    const divInWrapper = WrapperRef.current!.getElementsByTagName("div")[0];
    const inputWrapper = WrapperRef.current!.getElementsByTagName("div")[1];
    setIsShowInput(false);

    return timeline([
      [
        divInWrapper,
        {
          width: ["0", "100%"],
          opacity: [0, 1],
          pointerEvents: ["none", "auto"],
        },
        { duration: 0.5 },
      ],
      [
        divInWrapper,
        {
          boxShadow: ["60px 1px 20px -8px rgba(0,0,0,0.4)", "23px 1px 50px -5px rgba(0,0,0,0)"],
          transform: ["perspective(600px) rotateY(-40deg)", "perspective(600px) rotateY(0deg) "],
        },
        {
          duration: 0.5,
          at: "<",
        },
      ],
      [divInWrapper.getElementsByTagName("p")[0], { opacity: [0, 1] }, { duration: 0.2 }],
      [
        inputWrapper,
        {
          opacity: [1, 0],
          pointerEvents: ["auto", "none"],
          transform: ["perspective(600px) rotateY(0deg)", "perspective(600px) rotateY(30deg)"],
        },
        {
          duration: 0.3,
          at: 0,
        },
      ],
    ]);
  }, [isShowInput]);

  const changeToInput = useCallback(() => {
    if (isShowInput) return;
    const wrapper = WrapperRef.current!;
    const divInWrapper = WrapperRef.current!.getElementsByTagName("div")[0];
    const inputWrapper = WrapperRef.current!.getElementsByTagName("div")[1];
    setIsShowInput(true);

    return timeline([
      [divInWrapper.getElementsByTagName("p")[0], { opacity: [1, 0] }, { duration: 0.2 }],
      [
        divInWrapper,
        {
          width: [null, "0%"],
          opacity: [1, 0],
          pointerEvents: ["auto", "none"],
        },
        { duration: 0.6, at: "<" },
      ],
      [
        divInWrapper,
        {
          boxShadow: ["60px 1px 20px -8px rgba(0,0,0,0.14)", "60px 1px 20px -8px rgba(0,0,0,0.0)"],
          transform: ["perspective(600px) rotateY(-20deg)", "perspective(600px) rotateY(-50deg)"],
        },

        {
          duration: 0.5,
        },
      ],
      [
        inputWrapper,
        {
          opacity: [0, 1],
          pointerEvents: ["none", "auto"],
          transform: ["perspective(600px) rotateY(-60deg)", "perspective(600px) rotateY(0)"],
        },
        {
          duration: 0.3,
          at: 0.2,
        },
      ],
    ]);
  }, [isShowInput]);

  useEffect(() => {
    if (typeof watch === "string" || watch instanceof Object) {
      if (watch.length > 0) {
        changeToCover();
      }
    }

    if (watch === null) {
      changeToInput();
    }
  }, [watch]);

  return (
    <>
      <FileStatus status={watch} />
      <div
        className={`group relative h-full w-full cursor-pointer`}
        ref={WrapperRef}
        onClick={() => changeToInput()}
        onMouseEnter={() => prepareOpen()}
        onMouseLeave={() => unPrepareOpen()}
      >
        <div
          className={`${
            isShowInput ? "" : ""
          } absolute inset-0 z-10 flex h-full items-center rounded bg-white p-2 px-6 text-blue-500`}
        >
          <p>มีไฟล์ {label}แล้ว</p>
        </div>
        <div className="pointer-events-none opacity-0">{input}</div>
      </div>
    </>
  );
};

export default InputFile;
