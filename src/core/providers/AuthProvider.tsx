"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

/**
 * @description ตัวจัดการ Authentication context
 */

const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
