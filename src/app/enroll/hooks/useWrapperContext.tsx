import { useContext } from "react";
import WrapperContext from "../contexts/WrapperContext";
import { WrapperContextType } from "../contexts/WrapperContext";

/**
 * @description ใช้สำหรับการเรียกใช้งาน WrapperContext โดยประกอบไปด้วย
 * 1. search และ setSearch - เพื่อใช้ในการค้นหา Course ที่ต้องการ
 */

const useWrapperContext = () => {
  return useContext<WrapperContextType | null>(WrapperContext)!;
};

export default useWrapperContext;
