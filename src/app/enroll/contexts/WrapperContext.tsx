import React from "react";

export type WrapperContextType = {
  search: string;
  setSearch: (value: string) => void;
};

const WrapperContext = React.createContext<WrapperContextType | null>(null);

export default WrapperContext;
