import React from "react";
import { getServerSession } from "next-auth/next";
import authOptions from "@/core/auth/nextAuth/authOptions";

const Home = async () => {
  const session = await getServerSession(authOptions);
  

  return <div className="min-h-[120vh]">หน้าหลัก {JSON.stringify(session)}</div>;
};

export default Home;
