import React from "react";

const ProfileWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mx-auto w-full max-w-3xl px-4 min-h-[150vh]">{children}</div>;
};

export default ProfileWrapper;
