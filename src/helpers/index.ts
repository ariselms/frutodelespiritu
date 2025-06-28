"use client"

import { usePathname } from "next/navigation";

export const isActive = (currentPath: string,) => {
  const pathname = usePathname();

  return pathname === currentPath;
};
