"use clinet";
import { useEffect } from "react";

export const MSWComponent = () => {
  useEffect(() => {
    if(typeof window !== 'undefined') { // browser에서만 돌아간 다는 것을 명시
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        require("@/mocks/brower");
      }
    }
  }, []);
  return null;
};