import React from "react";
// Components
import DisplayCourses from "./components/Courses";
import checkAuth from "@/core/func/checkAuth";

const page = async () => {
  const { session } = await checkAuth(["ADMIN", "SUPERADMIN", "PROFESSOR"]);

  if (!session?.user) return null;

  return <DisplayCourses professorId={session.user.id} />;
};

export default page;
