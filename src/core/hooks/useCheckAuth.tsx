import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";

const useCheckAuth = (roles: Role[]) => {
  const session = useSession();

  if (session.status === "loading") return { session, hasPermission: false, loading: true };
  if (session.status === "unauthenticated") return { session, hasPermission: false, loading: false };
  if (session.data?.user.role && roles.includes(session.data.user.role)) {
    return { session, hasPermission: true, loading: false };
  }

  return { session, hasPermission: false, loading: false };
};
/**
 * @description ทำการตรวจสอบว่าผู้ใช้มีสิทธิ์เข้าถึงหน้านี้หรือไม่ ( Client side )
 */
export default useCheckAuth;
