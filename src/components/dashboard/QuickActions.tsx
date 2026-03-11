"use client";

import { Box, Typography } from "@mui/material";
import GlassCard from "./GlassCard";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import Link from "next/link";

const ACTIONS = [
  { label: "View Matches", icon: <SportsSoccerOutlinedIcon sx={{ fontSize: 16 }} />, href: "/football", color: "#10B981" },
  { label: "Service Health", icon: <HubOutlinedIcon sx={{ fontSize: 16 }} />, href: "/platforms", color: "#6366F1" },
  { label: "Open FT App", icon: <OpenInNewOutlinedIcon sx={{ fontSize: 16 }} />, href: "https://football-tracking-fe.vercel.app", external: true, color: "#F59E0B" },
  { label: "Dashboard", icon: <DashboardOutlinedIcon sx={{ fontSize: 16 }} />, href: "/overview", color: "#3B82F6" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function QuickActions() {
  return (
    <GlassCard glowColor="rgba(99,102,241,0.12)" hover={false}>
      <Box sx={{ p: 3 }}>
        <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.08em", mb: 0.5 }}>
          {getGreeting()}, Florin
        </Typography>
        <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: "#F9FAFB", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
          What are you working on?
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, mt: 2.5 }}>
          {ACTIONS.map((a) => {
            const Wrapper = a.external ? "a" : Link;
            const props = a.external
              ? { href: a.href, target: "_blank", rel: "noopener noreferrer" }
              : { href: a.href };
            return (
              <Box
                key={a.label}
                component={Wrapper as any}
                {...props}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.5,
                  py: 1.25,
                  borderRadius: "10px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  textDecoration: "none",
                  color: "#9CA3AF",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.06)",
                    borderColor: `${a.color}30`,
                    color: "#E5E7EB",
                    boxShadow: `0 0 16px ${a.color}10`,
                  },
                }}
              >
                <Box sx={{ color: a.color, display: "flex", alignItems: "center" }}>
                  {a.icon}
                </Box>
                <Typography sx={{ fontSize: "0.7rem", fontWeight: 600 }}>
                  {a.label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </GlassCard>
  );
}
