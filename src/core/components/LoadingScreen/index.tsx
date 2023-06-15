import React from "react";
import * as Portal from "@radix-ui/react-portal";
import Lottie from "lottie-react";
import itkmitlAnimation from "../../../../public/static/itkmitlAnimation.json";

const LoadingScreen: React.FC<{ showLoadingScreen: boolean }> = ({ showLoadingScreen }) => {
  if (!showLoadingScreen) return null;
  return (
    <Portal.Root asChild={true}>
      <div
        id="loading-screen"
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-gray-500/20 backdrop-blur-sm transition-all`}
      >
        <Lottie animationData={itkmitlAnimation} loop={true} />
      </div>
    </Portal.Root>
  );
};

export default LoadingScreen;
