"use client";
import React, { useState, useEffect } from "react";

const StatusConfigure = () => {
  const [dates, setDates] = useState({
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
  });
  

  const setDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };

  return (
    <>
      <input
        type="date"
        aria-label="เวลาเปิดระบบรับสมัคร"
        name="startDate"
        value={dates.startDate}
        onChange={setDate}
      />
      <input type="date" aria-label="เวลาปิดระบบรับสมัคร" name="endDate" value={dates.endDate} onChange={setDate} />
    </>
  );
};

export default StatusConfigure;
