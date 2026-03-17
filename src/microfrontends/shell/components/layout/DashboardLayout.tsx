"use client";

import { FC, ReactNode } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import CommandPalette from "@/components/dashboard/CommandPalette";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const collapsed = useSelector((state: RootState) => state.ui.sidebarCollapsed);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 20% 0%, #1a1f2e 0%, #0F1117 50%)",
      }}
    >
      <CommandPalette />

      {/* Sidebar */}
      <Box
        sx={{
          width: collapsed ? 0 : 240,
          flexShrink: 0,
          overflow: "hidden",
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRight: collapsed ? "none" : "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <Sidebar />
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, position: "relative" }}>
        {/* Ambient glow */}
        <Box
          sx={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <Box sx={{ px: { xs: 2, sm: 3, md: 3.5 }, pt: { xs: 2, sm: 3, md: 3.5 }, position: "relative", zIndex: 1 }}>
          <TopBar />
        </Box>
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            overflowX: "hidden",
            p: { xs: 2, sm: 3, md: 3.5 },
            pt: { xs: 1, sm: 1.5 },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box sx={{ maxWidth: 1440, mx: "auto" }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
