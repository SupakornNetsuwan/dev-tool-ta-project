import { useContext } from "react";
import { CoursesToolbarContext, CoursesToolbarContextType } from "../providers/CoursesToolbarProvider";

const useCoursesToolbar = () => {
  return useContext(CoursesToolbarContext) as CoursesToolbarContextType;
};

export default useCoursesToolbar;
