"use client";

import { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

interface Props {
  children: ReactNode;
}

export default function MuiCacheProvider({ children }: Props) {
  return <AppRouterCacheProvider options={{ key: "mui" }}>{children}</AppRouterCacheProvider>;
}
