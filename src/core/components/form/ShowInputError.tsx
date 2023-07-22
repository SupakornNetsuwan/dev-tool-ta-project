"use client"
import React, { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { animate } from "motion";

const ShowInputError: React.FC<{ inputName: string }> = ({ inputName }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { getFieldState } = useFormContext();
  const { error } = getFieldState(inputName);

  useEffect(() => {
    animate(
      divRef.current!,
      {
        opacity: [0, 1],
        y: [-5, 0],
      },
      {
        duration: 0.5,
        easing: "ease-in-out",
      }
    );
  }, [error]);

  return (
    <div className="opacity-0" ref={divRef}>
      <p className="text-xs text-red-500">{error?.message}</p>
    </div>
  );
};

export default ShowInputError;
