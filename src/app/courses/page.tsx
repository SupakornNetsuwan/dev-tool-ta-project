import React from "react";
// Components
import Courses from "./components/Courses";
import checkAuth from "@/core/func/checkAuth";
import getSystemStatus from "../api/systemStatus/func/getSystemStatus";
import SystemClosedCourses from "./components/SystemClosedCourses";

const page = async () => {
  const { session } = await checkAuth(["ADMIN", "SUPERADMIN", "PROFESSOR"]);
  const systemStatus = await getSystemStatus();

  if (!session?.user) return null;

  // Condition - เมื่อระบบปิดรับสมัครแล้ว
  if (!systemStatus?.isOpen) return <SystemClosedCourses professorId={session.user.id} />;

  // Condition - ระบบเปิดรับสมัครปกติ
  return <Courses professorId={session.user.id} />;
};

export default page;
