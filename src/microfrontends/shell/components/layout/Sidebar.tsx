"use client";

import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Typography, Avatar, List, ListItemButton, ListItemText, IconButton } from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useTranslation } from "@/i18n/useTranslation";
import { logout } from "@/lib/auth";

function ShortcutHint() {
  const [isMac, setIsMac] = useState(false);
  useEffect(() => { setIsMac(navigator.platform.toUpperCase().includes("MAC")); }, []);
  return (
    <Typography
      sx={{
        fontSize: "0.55rem",
        color: "#6B7280",
        fontFamily: "monospace",
        px: 0.75,
        py: 0.25,
        borderRadius: "4px",
        backgroundColor: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {isMac ? "⌘K" : "Ctrl K"}
    </Typography>
  );
}

function useUser() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  useEffect(() => {
    try {
      const raw = document.cookie.split("; ").find((c) => c.startsWith("user="))?.split("=").slice(1).join("=");
      if (raw) setUser(JSON.parse(decodeURIComponent(raw)));
    } catch {}
  }, []);
  return user;
}

const NAV = [
  { key: "Overview", href: "/overview", icon: <DashboardOutlinedIcon sx={{ fontSize: 17 }} /> },
  { key: "Jobs", href: "/jobs", icon: <WorkOutlineOutlinedIcon sx={{ fontSize: 17 }} /> },
  { key: "Tasks", href: "/tasks", icon: <ChecklistOutlinedIcon sx={{ fontSize: 17 }} /> },
  { key: "Football", href: "/football", icon: <SportsSoccerOutlinedIcon sx={{ fontSize: 17 }} /> },
  { key: "Platforms", href: "/platforms", icon: <HubOutlinedIcon sx={{ fontSize: 17 }} /> },
];

const Sidebar: FC = () => {
  const { languageData } = useTranslation();
  const pathname = usePathname();
  const user = useUser();

  const displayName = user?.name ?? "User";
  const displayRole = user?.role ?? "Admin";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        px: 1.5,
        py: 2,
        overflow: "hidden",
        background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
        backgroundColor: "#12141C",
      }}
    >
      {/* Logo */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 1, mb: 0.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: "9px",
              background: "linear-gradient(135deg, #6366F1 0%, #818CF8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(99,102,241,0.3)",
            }}
          >
            <HubOutlinedIcon sx={{ fontSize: 15, color: "#fff" }} />
          </Box>
          <Typography sx={{ fontSize: "0.8rem", fontWeight: 800, color: "#F9FAFB", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
            FusionBoard
          </Typography>
        </Box>
      </Box>

      {/* Search hint */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mx: 0.5,
          my: 1.5,
          px: 1.5,
          py: 0.75,
          borderRadius: "10px",
          backgroundColor: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.06)",
          cursor: "pointer",
          transition: "all 0.15s",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.08)" },
        }}
      >
        <SearchOutlinedIcon sx={{ fontSize: 14, color: "#4B5563" }} />
        <Typography sx={{ fontSize: "0.7rem", color: "#4B5563", flex: 1 }}>Search...</Typography>
        <ShortcutHint />
      </Box>

      {/* Nav */}
      <Typography sx={{ fontSize: "0.55rem", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.1em", px: 1.5, mb: 0.75 }}>
        {languageData?.MainMenu ?? "Navigation"}
      </Typography>
      <List dense disablePadding>
        {NAV.map((item) => {
          const active = pathname === item.href;
          const label = languageData?.[item.key as keyof typeof languageData] ?? item.key;
          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              selected={active}
              sx={{
                borderRadius: "10px",
                px: 1.5,
                py: 0.7,
                mb: 0.25,
                gap: 1.25,
                color: active ? "#F9FAFB" : "#6B7280",
                backgroundColor: active ? "rgba(99,102,241,0.1)" : "transparent",
                borderLeft: active ? "2px solid #6366F1" : "2px solid transparent",
                "&:hover": { backgroundColor: active ? "rgba(99,102,241,0.14)" : "rgba(255,255,255,0.06)" },
                "&.Mui-selected": { backgroundColor: "rgba(99,102,241,0.1)", "&:hover": { backgroundColor: "rgba(99,102,241,0.14)" } },
                transition: "all 0.15s ease",
              }}
            >
              <Box sx={{ color: active ? "#818CF8" : "#4B5563", display: "flex", alignItems: "center" }}>
                {item.icon}
              </Box>
              <ListItemText
                primary={label}
                primaryTypographyProps={{ fontSize: "0.78rem", fontWeight: active ? 700 : 500, color: "inherit", noWrap: true }}
                sx={{ m: 0 }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* External */}
      <Typography sx={{ fontSize: "0.55rem", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.1em", px: 1.5, mt: 2.5, mb: 0.75 }}>
        Connected Apps
      </Typography>
      <Box
        component="a"
        href="https://football-tracking-fe.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          px: 1.5,
          py: 0.75,
          mx: 0.5,
          borderRadius: "10px",
          textDecoration: "none",
          color: "#6B7280",
          transition: "all 0.15s",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.06)", color: "#9CA3AF" },
        }}
      >
        <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#10B981", boxShadow: "0 0 8px rgba(16,185,129,0.5)", flexShrink: 0 }} />
        <Typography sx={{ fontSize: "0.75rem", fontWeight: 500, flex: 1 }}>Football Tracking</Typography>
        <OpenInNewOutlinedIcon sx={{ fontSize: 12, color: "#374151" }} />
      </Box>

      <Box sx={{ flex: 1 }} />

      {/* Settings */}
      <List dense disablePadding sx={{ mb: 1.5 }}>
        <ListItemButton
          component={Link}
          href="/settings"
          selected={pathname === "/settings"}
          sx={{
            borderRadius: "10px",
            px: 1.5,
            py: 0.7,
            gap: 1.25,
            color: pathname === "/settings" ? "#F9FAFB" : "#6B7280",
            backgroundColor: pathname === "/settings" ? "rgba(99,102,241,0.1)" : "transparent",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.06)" },
            "&.Mui-selected": { backgroundColor: "rgba(99,102,241,0.1)" },
          }}
        >
          <SettingsOutlinedIcon sx={{ fontSize: 17, color: pathname === "/settings" ? "#818CF8" : "#4B5563" }} />
          <ListItemText
            primary={languageData?.Settings ?? "Settings"}
            primaryTypographyProps={{ fontSize: "0.78rem", fontWeight: pathname === "/settings" ? 700 : 500, noWrap: true }}
            sx={{ m: 0 }}
          />
        </ListItemButton>
      </List>

      {/* Account */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          px: 1.5,
          py: 1.25,
          borderRadius: "12px",
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Avatar sx={{ width: 30, height: 30, fontSize: "0.7rem", fontWeight: 700, background: "linear-gradient(135deg, #6366F1, #818CF8)" }}>
          {initial}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: "#E5E7EB", lineHeight: 1.2 }} noWrap>
            {displayName}
          </Typography>
          <Typography sx={{ fontSize: "0.6rem", color: "#4B5563" }}>{displayRole}</Typography>
        </Box>
        <IconButton
          size="small"
          onClick={() => logout()}
          sx={{ color: "#4B5563", "&:hover": { color: "#EF4444", backgroundColor: "rgba(239,68,68,0.1)" } }}
        >
          <LogoutOutlinedIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Sidebar;
