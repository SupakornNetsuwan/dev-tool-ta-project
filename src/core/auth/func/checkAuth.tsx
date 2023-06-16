import { getServerSession } from "next-auth";
import authOptions from "@/core/auth/nextAuth/authOptions";
import type { Role } from "@prisma/client";

const checkAuth = async (roles: Role[]) => {
  const session = await getServerSession(authOptions);

  let userRole = session?.user.role;

  // กรณที่ไม่ได้เข้าสู่ระบบเลย
  if (!userRole || !roles.includes(userRole)) return { session, hasPermission: false };

  return { session, hasPermission: true };
};

export default checkAuth;
