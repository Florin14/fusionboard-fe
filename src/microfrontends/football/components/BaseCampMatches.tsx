"use client";

import { Avatar, Box, Typography, Chip } from "@mui/material";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import GlassCard from "@/components/dashboard/GlassCard";
import { API_BASE } from "@/lib/api";
import type { Match } from "@/types/football";

function TeamLogo({ teamId, hasLogo, name }: { teamId: number; hasLogo?: boolean; name: string }) {
  return (
    <Avatar
      src={hasLogo ? `${API_BASE}/services/football/teams/${teamId}/logo` : undefined}
      sx={{ width: 28, height: 28, fontSize: "0.6rem", fontWeight: 700, backgroundColor: "rgba(255,255,255,0.08)", color: "#9CA3AF" }}
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

function computeRecord(matches: Match[], baseCampTeamName: string) {
  let wins = 0, draws = 0, losses = 0, goalsFor = 0, goalsAgainst = 0;
  for (const m of matches) {
    if (m.state !== "FINISHED" || m.scoreTeam1 == null || m.scoreTeam2 == null) continue;
    const isTeam1 = m.team1Name.toLowerCase() === baseCampTeamName.toLowerCase();
    const sf = isTeam1 ? m.scoreTeam1 : m.scoreTeam2;
    const sa = isTeam1 ? m.scoreTeam2 : m.scoreTeam1;
    goalsFor += sf;
    goalsAgainst += sa;
    if (sf > sa) wins++;
    else if (sf === sa) draws++;
    else losses++;
  }
  return { wins, draws, losses, goalsFor, goalsAgainst, played: wins + draws + losses };
}

interface Props {
  matches: Match[];
  baseCampTeamName: string;
}

export default function BaseCampMatches({ matches, baseCampTeamName }: Props) {
  const record = computeRecord(matches, baseCampTeamName);

  return (
    <GlassCard glowColor="rgba(34,197,94,0.15)" hover={false}>
      {/* Header */}
      <Box sx={{ px: 2.5, py: 2, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <Box sx={{ width: 32, height: 32, borderRadius: "10px", backgroundColor: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <SportsSoccerOutlinedIcon sx={{ fontSize: 18, color: "#22C55E" }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#F9FAFB" }}>
              Base Camp
            </Typography>
            <Typography sx={{ fontSize: "0.6rem", color: "#6B7280" }}>
              {matches.length} match{matches.length !== 1 ? "es" : ""}
            </Typography>
          </Box>
        </Box>

        {/* Record stats */}
        {record.played > 0 && (
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            {[
              { label: "W", value: record.wins, color: "#22C55E" },
              { label: "D", value: record.draws, color: "#F59E0B" },
              { label: "L", value: record.losses, color: "#EF4444" },
              { label: "GF", value: record.goalsFor, color: "#3B82F6" },
              { label: "GA", value: record.goalsAgainst, color: "#9CA3AF" },
            ].map((s) => (
              <Box key={s.label} sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: "1rem", fontWeight: 800, color: "#F9FAFB", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.value}</Typography>
                <Typography sx={{ fontSize: "0.5rem", fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Match list */}
      {matches.length === 0 ? (
        <Box sx={{ p: 5, textAlign: "center" }}>
          <Typography sx={{ fontSize: "0.8rem", color: "#6B7280" }}>No Base Camp matches</Typography>
        </Box>
      ) : (
        <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
          {matches.map((m, i) => {
            const s = STATE_MAP[m.state] ?? STATE_MAP.SCHEDULED;
            const hasScore = m.scoreTeam1 != null;
            const isTeam1 = m.team1Name.toLowerCase() === baseCampTeamName.toLowerCase();
            const opponent = isTeam1 ? m.team2Name : m.team1Name;
            const opponentId = isTeam1 ? m.team2Id : m.team1Id;
            const opponentHasLogo = isTeam1 ? m.hasTeam2Logo : m.hasTeam1Logo;
            const scoreUs = isTeam1 ? m.scoreTeam1 : m.scoreTeam2;
            const scoreThem = isTeam1 ? m.scoreTeam2 : m.scoreTeam1;

            let resultColor = "#6B7280";
            let resultLabel = "";
            if (hasScore && m.state === "FINISHED") {
              if (scoreUs! > scoreThem!) { resultColor = "#22C55E"; resultLabel = "W"; }
              else if (scoreUs! < scoreThem!) { resultColor = "#EF4444"; resultLabel = "L"; }
              else { resultColor = "#F59E0B"; resultLabel = "D"; }
            }

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
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                  {/* Result indicator */}
                  {resultLabel && (
                    <Box sx={{ width: 22, height: 22, borderRadius: "6px", backgroundColor: `${resultColor}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: resultColor }}>{resultLabel}</Typography>
                    </Box>
                  )}

                  {/* Opponent */}
                  <TeamLogo teamId={opponentId} hasLogo={opponentHasLogo} name={opponent} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: "0.55rem", color: "#6B7280", fontWeight: 600 }}>vs</Typography>
                    <Typography noWrap sx={{ fontSize: "0.78rem", fontWeight: 600, color: "#E5E7EB" }}>
                      {opponent}
                    </Typography>
                  </Box>

                  {/* Score */}
                  <Box sx={{ px: 1.5, py: 0.5, borderRadius: "8px", backgroundColor: hasScore ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)", textAlign: "center", minWidth: 52 }}>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 800, color: hasScore ? "#F9FAFB" : "#6B7280", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
                      {hasScore ? `${scoreUs} - ${scoreThem}` : "vs"}
                    </Typography>
                  </Box>
                </Box>

                {/* Meta */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5, pl: resultLabel ? 4 : 0 }}>
                  <Chip label={s.label} size="small" sx={{ fontSize: "0.55rem", fontWeight: 700, height: 18, color: s.color, backgroundColor: `${s.color}15`, border: "none" }} />
                  <Typography sx={{ fontSize: "0.6rem", fontWeight: 600, color: "#9CA3AF" }}>
                    {fmtDate(m.timestamp)} &middot; {fmtTime(m.timestamp)}
                  </Typography>
                  {m.leagueName && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
                      <EmojiEventsOutlinedIcon sx={{ fontSize: 9, color: "#6B7280" }} />
                      <Typography sx={{ fontSize: "0.55rem", color: "#6B7280" }}>
                        {m.leagueName}{m.round ? ` · R${m.round}` : ""}
                      </Typography>
                    </Box>
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
