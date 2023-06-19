import { useState, useEffect } from "react";

const useScrollAmount = () => {
  const [scrolleight, setScrollHeight] = useState<number>(0);

  const handleScroll = () => {
    setScrollHeight(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrolleight;
};
/**
 * @description ดึงค่า scroll ของหน้าเว็บ
 */
export default useScrollAmount;
