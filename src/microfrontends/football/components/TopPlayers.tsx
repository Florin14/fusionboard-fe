"use client";

import { Box, Typography, Chip, Avatar } from "@mui/material";
import GlassCard from "@/components/dashboard/GlassCard";
import { API_BASE } from "@/lib/api";
import type { Player } from "@/types/football";

const POS: Record<string, { label: string; color: string }> = {
  GOALKEEPER: { label: "GK", color: "#F59E0B" },
  DEFENDER: { label: "DEF", color: "#3B82F6" },
  MIDFIELDER: { label: "MID", color: "#10B981" },
  FORWARD: { label: "FWD", color: "#EF4444" },
};

function initials(name: string) { return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase(); }

export default function TopPlayers({ players }: { players: Player[] }) {
  return (
    <GlassCard glowColor="rgba(139,92,246,0.12)">
      <Box sx={{ px: 2.5, py: 2, borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#F9FAFB" }}>Squad Overview</Typography>
        <Typography sx={{ fontSize: "0.6rem", color: "#4B5563", fontFamily: "monospace" }}>{players.length}</Typography>
      </Box>

      {players.length === 0 ? (
        <Box sx={{ p: 5, textAlign: "center" }}>
          <Typography sx={{ fontSize: "0.75rem", color: "#4B5563" }}>No players</Typography>
        </Box>
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
          {players.map((p, i) => {
            const pos = POS[p.position] ?? POS.MIDFIELDER;
            return (
              <Box
                key={p.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 2.5,
                  py: 1.5,
                  gap: 1.25,
                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                  borderRight: { xs: "none", md: i % 2 === 0 ? "1px solid rgba(255,255,255,0.03)" : "none" },
                  transition: "background-color 0.12s",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.04)" },
                  animation: "fade-in-up 0.3s ease-out both",
                  animationDelay: `${i * 0.03}s`,
                }}
              >
                <Avatar
                  src={p.hasAvatar ? `${API_BASE}/services/football/players/${p.id}/avatar` : undefined}
                  sx={{ width: 30, height: 30, fontSize: "0.6rem", fontWeight: 700, backgroundColor: "rgba(255,255,255,0.05)", color: "#9CA3AF" }}
                >
                  {!p.hasAvatar && initials(p.name)}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                    {p.shirtNumber != null && <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: "#374151" }}>{p.shirtNumber}</Typography>}
                    <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: "#E5E7EB", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {p.name}
                    </Typography>
                    <Chip label={pos.label} size="small" sx={{ fontSize: "0.5rem", fontWeight: 700, height: 16, color: pos.color, backgroundColor: `${pos.color}15`, border: "none" }} />
                  </Box>
                  <Typography sx={{ fontSize: "0.55rem", color: "#4B5563" }}>{p.teamName}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
                  {[
                    { v: p.goalsCount, l: "G", c: "#10B981" },
                    { v: p.assistsCount, l: "A", c: "#3B82F6" },
                    { v: p.appearancesCount, l: "MP", c: "#6B7280" },
                  ].map((s) => (
                    <Box key={s.l} sx={{ textAlign: "center", minWidth: 22 }}>
                      <Typography sx={{ fontSize: "0.75rem", fontWeight: 800, color: "#F9FAFB", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.v}</Typography>
                      <Typography sx={{ fontSize: "0.45rem", fontWeight: 700, color: s.c, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.l}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </GlassCard>
  );
}
