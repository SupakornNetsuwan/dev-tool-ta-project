import { useState, useEffect } from "react";

/**
 * @description ดึงค่า scroll ของหน้าเว็บ
 */
const useScrollAmount = () => {
  const [scrolleight, setScrollHeight] = useState<number>(0);

  const handleScroll = () => {
    setScrollHeight(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

  return scrolleight
};

export default useScrollAmount;
