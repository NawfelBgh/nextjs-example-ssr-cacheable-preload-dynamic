"use client";

import { isServer } from "@/utils/isServer";
import { useEffect, useState, type ReactNode } from "react";

export function ClientOnly(props: { children: ReactNode, fallback: ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (!isServer()) {
      setIsClient(true);
    }
  }, []);
  return isClient ? props.children : props.fallback;
}