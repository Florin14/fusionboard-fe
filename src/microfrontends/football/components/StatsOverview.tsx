"use client";

import { Box, Typography } from "@mui/material";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import StadiumOutlinedIcon from "@mui/icons-material/StadiumOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import type { DashboardStats } from "@/types/football";

interface StatProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

function Stat({ label, value, icon, color }: StatProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 2,
        py: 1.5,
        borderRadius: "12px",
        backgroundColor: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.04)",
        transition: "all 0.2s ease",
        cursor: "default",
        "&:hover": {
          borderColor: `${color}30`,
          backgroundColor: "rgba(255,255,255,0.06)",
          boxShadow: `0 0 20px ${color}08`,
        },
      }}
    >
      <Box sx={{ color, display: "flex", alignItems: "center", opacity: 0.8 }}>
        {icon}
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: 800,
            color: "#F9FAFB",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-0.02em",
          }}
        >
          {(value ?? 0).toLocaleString()}
        </Typography>
        <Typography sx={{ fontSize: "0.55rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {label}
        </Typography>
      </Box>
    </Box>
  );
}

export default function StatsOverview({ stats }: { stats: DashboardStats }) {
  const items = [
    { label: "Users", value: stats.users, icon: <PersonOutlinedIcon sx={{ fontSize: 18 }} />, color: "#6366F1" },
    { label: "Players", value: stats.players, icon: <PeopleOutlinedIcon sx={{ fontSize: 18 }} />, color: "#8B5CF6" },
    { label: "Teams", value: stats.teams, icon: <GroupsOutlinedIcon sx={{ fontSize: 18 }} />, color: "#EC4899" },
    { label: "Matches", value: stats.matches, icon: <StadiumOutlinedIcon sx={{ fontSize: 18 }} />, color: "#F59E0B" },
    { label: "Goals", value: stats.goals, icon: <SportsSoccerOutlinedIcon sx={{ fontSize: 18 }} />, color: "#10B981" },
    { label: "Tournaments", value: stats.tournaments, icon: <EmojiEventsOutlinedIcon sx={{ fontSize: 18 }} />, color: "#3B82F6" },
    { label: "Trainings", value: stats.trainings, icon: <FitnessCenterOutlinedIcon sx={{ fontSize: 18 }} />, color: "#EF4444" },
  ];

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2,1fr)", sm: "repeat(3,1fr)", md: "repeat(4,1fr)", lg: "repeat(7,1fr)" }, gap: 1 }}>
      {items.map((s) => <Stat key={s.label} {...s} />)}
    </Box>
  );
}
