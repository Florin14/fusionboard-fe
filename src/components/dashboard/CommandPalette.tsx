"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Modal } from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

interface Action {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  group: string;
  action: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const actions: Action[] = [
    { id: "overview", label: "Overview", description: "Command center", icon: <DashboardOutlinedIcon sx={{ fontSize: 16 }} />, group: "Navigation", action: () => router.push("/overview") },
    { id: "football", label: "Football Tracking", description: "Matches, players, stats", icon: <SportsSoccerOutlinedIcon sx={{ fontSize: 16 }} />, group: "Navigation", action: () => router.push("/football") },
    { id: "platforms", label: "Platform Services", description: "Service health & registry", icon: <HubOutlinedIcon sx={{ fontSize: 16 }} />, group: "Navigation", action: () => router.push("/platforms") },
    { id: "settings", label: "Settings", description: "Preferences & language", icon: <SettingsOutlinedIcon sx={{ fontSize: 16 }} />, group: "Navigation", action: () => router.push("/settings") },
    { id: "ext-football", label: "Open Football Tracking", description: "External platform", icon: <OpenInNewOutlinedIcon sx={{ fontSize: 16 }} />, group: "External", action: () => window.open("https://football-tracking-fe.vercel.app", "_blank") },
  ];

  const filtered = query
    ? actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()) || a.description?.toLowerCase().includes(query.toLowerCase()))
    : actions;

  const grouped = filtered.reduce<Record<string, Action[]>>((acc, a) => {
    (acc[a.group] ??= []).push(a);
    return acc;
  }, {});

  const flatFiltered = Object.values(grouped).flat();

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setSelected(0);
      }
      if (!open) return;
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, flatFiltered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === "Enter" && flatFiltered[selected]) {
        flatFiltered[selected].action();
        setOpen(false);
      }
    },
    [open, flatFiltered, selected],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => { setSelected(0); }, [query]);

  let idx = -1;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: "flex", alignItems: "flex-start", justifyContent: "center", pt: "15vh" }}
      slotProps={{ backdrop: { sx: { backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" } } }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 560,
          mx: 2,
          borderRadius: "16px",
          backgroundColor: "rgba(18,20,28,0.96)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.1)",
          overflow: "hidden",
          animation: "fade-in-up 0.15s ease-out",
        }}
      >
        {/* Input */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2.5, py: 2, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <SearchOutlinedIcon sx={{ fontSize: 18, color: "#6B7280" }} />
          <Box
            component="input"
            ref={inputRef}
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            sx={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#F9FAFB",
              fontSize: "0.9rem",
              fontWeight: 500,
              fontFamily: "inherit",
              "&::placeholder": { color: "#4B5563" },
            }}
          />
          <Typography
            sx={{
              fontSize: "0.6rem",
              color: "#4B5563",
              fontFamily: "monospace",
              px: 0.75,
              py: 0.25,
              borderRadius: "4px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            ESC
          </Typography>
        </Box>

        {/* Results */}
        <Box sx={{ maxHeight: 320, overflow: "auto", py: 1 }}>
          {Object.entries(grouped).map(([group, items]) => (
            <Box key={group}>
              <Typography sx={{ fontSize: "0.6rem", fontWeight: 600, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.08em", px: 2.5, py: 0.75 }}>
                {group}
              </Typography>
              {items.map((item) => {
                idx++;
                const isSelected = idx === selected;
                return (
                  <Box
                    key={item.id}
                    onClick={() => { item.action(); setOpen(false); }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mx: 1,
                      px: 1.5,
                      py: 1,
                      borderRadius: "10px",
                      cursor: "pointer",
                      backgroundColor: isSelected ? "rgba(99,102,241,0.1)" : "transparent",
                      transition: "background-color 0.1s",
                      "&:hover": { backgroundColor: "rgba(99,102,241,0.08)" },
                    }}
                  >
                    <Box sx={{ color: isSelected ? "#818CF8" : "#6B7280", display: "flex", alignItems: "center" }}>
                      {item.icon}
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: isSelected ? "#F9FAFB" : "#D1D5DB" }}>
                        {item.label}
                      </Typography>
                      {item.description && (
                        <Typography sx={{ fontSize: "0.65rem", color: "#4B5563" }}>{item.description}</Typography>
                      )}
                    </Box>
                    {isSelected && (
                      <Typography sx={{ fontSize: "0.55rem", color: "#4B5563", fontFamily: "monospace" }}>↵</Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
          ))}
          {flatFiltered.length === 0 && (
            <Box sx={{ px: 2.5, py: 4, textAlign: "center" }}>
              <Typography sx={{ fontSize: "0.8rem", color: "#4B5563" }}>No results found</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
