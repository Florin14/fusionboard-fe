"use client";

import { Box, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  glowColor?: string;
  sx?: SxProps<Theme>;
  hover?: boolean;
}

export default function GlassCard({ children, glowColor = "rgba(99,102,241,0.15)", sx, hover = true }: GlassCardProps) {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        ...(hover && {
          "&:hover": {
            borderColor: "rgba(255,255,255,0.15)",
            boxShadow: `0 0 30px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.08)`,
            transform: "translateY(-1px)",
          },
        }),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
