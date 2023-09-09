import React, { useState } from "react";
import WrapperContext from "../contexts/WrapperContext";

const WrapperProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [search, setSearch] = useState("");
  
  return <WrapperContext.Provider value={{ search, setSearch }}>{children}</WrapperContext.Provider>;
};
export default WrapperProvider;
