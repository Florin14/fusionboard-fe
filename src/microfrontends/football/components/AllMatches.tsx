"use client";

import { useState } from "react";
import { Avatar, Box, Typography, Chip, TextField, InputAdornment, ToggleButtonGroup, ToggleButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import GlassCard from "@/components/dashboard/GlassCard";
import { API_BASE } from "@/lib/api";
import type { Match } from "@/types/football";

function TeamLogo({ teamId, hasLogo, name }: { teamId: number; hasLogo?: boolean; name: string }) {
  return (
    <Avatar
      src={hasLogo ? `${API_BASE}/services/football/teams/${teamId}/logo` : undefined}
      sx={{ width: 26, height: 26, fontSize: "0.55rem", fontWeight: 700, backgroundColor: "rgba(255,255,255,0.08)", color: "#9CA3AF" }}
    >
      {!hasLogo && name.charAt(0)}
    </Avatar>
  );
}

const STATE_MAP: Record<string, { label: string; color: string }> = {
  FINISHED: { label: "FT", color: "#10B981" },
  ONGOING: { label: "LIVE", color: "#F59E0B" },
  SCHEDULED: { label: "Upcoming", color: "#6B7280" },
};

function fmtDate(ts: string) { return new Date(ts).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }); }
function fmtTime(ts: string) { return new Date(ts).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }); }

type FilterState = "ALL" | "FINISHED" | "ONGOING" | "SCHEDULED";

export default function AllMatches({ matches }: { matches: Match[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterState>("ALL");

  const filtered = matches.filter((m) => {
    if (filter !== "ALL" && m.state !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        m.team1Name.toLowerCase().includes(q) ||
        m.team2Name.toLowerCase().includes(q) ||
        (m.leagueName && m.leagueName.toLowerCase().includes(q)) ||
        (m.location && m.location.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const counts = {
    ALL: matches.length,
    FINISHED: matches.filter((m) => m.state === "FINISHED").length,
    ONGOING: matches.filter((m) => m.state === "ONGOING").length,
    SCHEDULED: matches.filter((m) => m.state === "SCHEDULED").length,
  };

  return (
    <GlassCard glowColor="rgba(59,130,246,0.12)" hover={false}>
      <Box sx={{ px: 2.5, py: 2, borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#F9FAFB" }}>
            All Matches
          </Typography>
          <Typography sx={{ fontSize: "0.6rem", color: "#6B7280", fontFamily: "monospace" }}>
            {filtered.length} / {matches.length}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", flexWrap: "wrap" }}>
          <TextField
            size="small"
            placeholder="Search team, league, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon sx={{ fontSize: 16, color: "#6B7280" }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              flex: 1,
              minWidth: 180,
              "& .MuiOutlinedInput-root": {
                fontSize: "0.72rem",
                color: "#E5E7EB",
                backgroundColor: "rgba(255,255,255,0.04)",
                borderRadius: "10px",
                "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
                "&:hover fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                "&.Mui-focused fieldset": { borderColor: "rgba(99,102,241,0.4)" },
              },
            }}
          />
          <ToggleButtonGroup
            size="small"
            exclusive
            value={filter}
            onChange={(_, v) => v && setFilter(v)}
            sx={{ "& .MuiToggleButton-root": { fontSize: "0.55rem", fontWeight: 700, px: 1.5, py: 0.5, color: "#6B7280", borderColor: "rgba(255,255,255,0.08)", textTransform: "none", "&.Mui-selected": { backgroundColor: "rgba(99,102,241,0.15)", color: "#818CF8", borderColor: "rgba(99,102,241,0.3)" } } }}
          >
            <ToggleButton value="ALL">All ({counts.ALL})</ToggleButton>
            <ToggleButton value="FINISHED">FT ({counts.FINISHED})</ToggleButton>
            <ToggleButton value="ONGOING">Live ({counts.ONGOING})</ToggleButton>
            <ToggleButton value="SCHEDULED">Upcoming ({counts.SCHEDULED})</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {filtered.length === 0 ? (
        <Box sx={{ p: 5, textAlign: "center" }}>
          <Typography sx={{ fontSize: "0.8rem", color: "#6B7280" }}>No matches found</Typography>
        </Box>
      ) : (
        <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
          {filtered.map((m, i) => {
            const s = STATE_MAP[m.state] ?? STATE_MAP.SCHEDULED;
            const hasScore = m.scoreTeam1 != null;
            return (
              <Box
                component="li"
                key={m.id}
                sx={{
                  px: 2.5,
                  py: 1.5,
                  borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  transition: "background-color 0.12s",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.04)" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <TeamLogo teamId={m.team1Id} hasLogo={m.hasTeam1Logo} name={m.team1Name} />
                  <Typography noWrap sx={{ fontSize: "0.78rem", fontWeight: 600, color: "#E5E7EB", flex: 1 }}>
                    {m.team1Name}
                  </Typography>
                  <Box sx={{ px: 1.5, py: 0.4, borderRadius: "8px", backgroundColor: hasScore ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)", textAlign: "center" }}>
                    <Typography sx={{ fontSize: "0.78rem", fontWeight: 800, color: hasScore ? "#F9FAFB" : "#6B7280", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
                      {hasScore ? `${m.scoreTeam1} - ${m.scoreTeam2}` : "vs"}
                    </Typography>
                  </Box>
                  <Typography noWrap sx={{ fontSize: "0.78rem", fontWeight: 600, color: "#E5E7EB", flex: 1, textAlign: "right" }}>
                    {m.team2Name}
                  </Typography>
                  <TeamLogo teamId={m.team2Id} hasLogo={m.hasTeam2Logo} name={m.team2Name} />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, pl: 0.5 }}>
                  <Chip label={s.label} size="small" sx={{ fontSize: "0.55rem", fontWeight: 700, height: 18, color: s.color, backgroundColor: `${s.color}15`, border: "none" }} />
                  <Typography sx={{ fontSize: "0.6rem", fontWeight: 600, color: "#9CA3AF" }}>
                    {fmtDate(m.timestamp)} &middot; {fmtTime(m.timestamp)}
                  </Typography>
                  {m.leagueName && (
                    <Typography sx={{ fontSize: "0.55rem", color: "#6B7280" }}>
                      {m.leagueName}{m.round ? ` · R${m.round}` : ""}
                    </Typography>
                  )}
                  {m.location && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
                      <PlaceOutlinedIcon sx={{ fontSize: 9, color: "#6B7280" }} />
                      <Typography sx={{ fontSize: "0.55rem", color: "#6B7280" }}>{m.location}</Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </GlassCard>
  );
}
