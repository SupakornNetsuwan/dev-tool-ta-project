"use client";
import React, { useCallback } from "react";
import LoadingScreenContext from "../context/LoadingScreenContext";
import LoadingScreen from "..";

const LoadingScreenContextProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [showLoadingScreen, setShowLoadingScreen] = React.useState<boolean>(false);

  const showLoading = useCallback(() => setShowLoadingScreen(true), []);
  const hideLoading = useCallback(() => setShowLoadingScreen(false), []);
  const toggleLoading = useCallback(() => setShowLoadingScreen((prev) => !prev), []);

  return (
    <LoadingScreenContext.Provider value={{ showLoading, hideLoading, toggleLoading }}>
      <LoadingScreen showLoadingScreen={showLoadingScreen} />
      {children}
    </LoadingScreenContext.Provider>
  );
};
/**
 * @description ตัวจัดการ Loading screen context provider
 */
export default React.memo(LoadingScreenContextProvider);
