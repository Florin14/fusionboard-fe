"use client";

import { usePathname } from "next/navigation";
import { usePageTracking } from "@/hooks/useWebSocket";

export default function PageTracker() {
  const pathname = usePathname();
  const page = pathname.split("/").pop() || "overview";
  usePageTracking(page);
  return null;
}
