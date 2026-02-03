"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap-config";

export function useScrollTriggerRefresh() {
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Initial refresh
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
}
