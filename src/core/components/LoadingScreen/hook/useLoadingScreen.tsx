import { useContext } from "react";
import LoadingScreenContext from "../context/LoadingScreenContext";
import type { LoadingScreenContextType } from "../LoadingScreenTypes";

const useLoadingScreen = () => {
  const context = useContext(LoadingScreenContext) as LoadingScreenContextType;
  return context;
};

export default useLoadingScreen;
