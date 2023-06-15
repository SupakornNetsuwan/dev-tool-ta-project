import React from "react";
import type { LoadingScreenContextType } from "../LoadingScreenTypes";

/**
 * @description Context สำหรับแสดง loading screen
 */
const LoadingScreenContext = React.createContext<null | LoadingScreenContextType>(null);

export default LoadingScreenContext;
