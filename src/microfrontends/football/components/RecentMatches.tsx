"use client";

import { Avatar, Box, Typography, Chip } from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import GlassCard from "@/components/dashboard/GlassCard";
import { API_BASE } from "@/lib/api";
import type { Match } from "@/types/football";

function TeamLogo({ teamId, hasLogo, name }: { teamId: number; hasLogo?: boolean; name: string }) {
  return (
    <Avatar
      src={hasLogo ? `${API_BASE}/services/football/teams/${teamId}/logo` : undefined}
      sx={{ width: 24, height: 24, fontSize: "0.55rem", fontWeight: 700, backgroundColor: "rgba(255,255,255,0.08)", color: "#9CA3AF" }}
    >
      {!hasLogo && name.charAt(0)}
    </Avatar>
  );
}

const STATE: Record<string, { label: string; color: string }> = {
  FINISHED: { label: "FT", color: "#10B981" },
  ONGOING: { label: "LIVE", color: "#F59E0B" },
  SCHEDULED: { label: "Upcoming", color: "#6B7280" },
};

function fmtDate(ts: string) { return new Date(ts).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }); }
function fmtTime(ts: string) { return new Date(ts).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }); }

export default function RecentMatches({ matches }: { matches: Match[] }) {
  return (
    <GlassCard glowColor="rgba(245,158,11,0.12)">
      <Box sx={{ px: 2.5, py: 2, borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "#F9FAFB" }}>Recent Matches</Typography>
        <Typography sx={{ fontSize: "0.6rem", color: "#6B7280", fontFamily: "monospace" }}>{matches.length}</Typography>
      </Box>

      {matches.length === 0 ? (
        <Box sx={{ p: 5, textAlign: "center" }}>
          <Typography sx={{ fontSize: "0.8rem", color: "#6B7280" }}>No matches</Typography>
        </Box>
      ) : (
        <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
          {matches.map((m, i) => {
            const s = STATE[m.state] ?? STATE.SCHEDULED;
            const hasScore = m.scoreTeam1 != null;
            return (
              <Box
                component="li"
                key={m.id}
                sx={{
                  px: 2.5,
                  py: 1.5,
                  borderBottom: i < matches.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  transition: "background-color 0.12s",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.04)" },
                }}
              >
                {/* Row 1: Teams + Score */}
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

                {/* Row 2: Meta info */}
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
