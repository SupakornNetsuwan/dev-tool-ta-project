import React from "react";

/**
 * @description แสดงรายการของข้อมูลประกอบด้วย หัวข้อ และ ข้อมูล มี Wrapper เป็นตัวคลุม
 * 
 */

export const Item: React.FC<{ children: React.ReactElement; topic: React.ReactNode }> = ({ children, topic }) => {
  return (
    <div className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
      <div className="text-gray-500">{topic}</div>
      {children}
    </div>
  );
};

export const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex flex-col divide-y">{children}</div>;
};

const List = {
  Wrapper,
  Item,
};

export default List;
