"use client";
import React, { useEffect, useState } from "react";

export type OptionsType = "all" | "undone" | "done";
export type CoursesToolbarContextType = {
  option: OptionsType;
  setOption: (option: OptionsType) => void;
};

export const CoursesToolbarContext = React.createContext<CoursesToolbarContextType | null>(null);

const CoursesToolbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toolbarOption, setToolbarOption] = useState<OptionsType>("all");

  useEffect(() => {
    const option = localStorage.getItem("coursesToolbarOption") as OptionsType;
    if (option) setToolbarOption(option);
  }, []);

  const setOption = (option: OptionsType) => {
    if(!option) return;
    localStorage.setItem("coursesToolbarOption", option);
    setToolbarOption(option);
  };

  return (
    <CoursesToolbarContext.Provider value={{ option: toolbarOption, setOption }}>
      {children}
    </CoursesToolbarContext.Provider>
  );
};

export default CoursesToolbarProvider;
