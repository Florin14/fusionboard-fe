import { Box, Typography, Chip } from "@mui/material";
import { apiFetch } from "@/lib/api";
import StatsOverview from "@/microfrontends/football/components/StatsOverview";
import BaseCampMatches from "@/microfrontends/football/components/BaseCampMatches";
import AllMatches from "@/microfrontends/football/components/AllMatches";
import TopPlayers from "@/microfrontends/football/components/TopPlayers";
import GlassCard from "@/components/dashboard/GlassCard";
import type { DashboardStats, Match, Player, Team } from "@/types/football";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

const EXT_URL = "https://football-tracking-fe.vercel.app";
const BASE_CAMP_NAME = "base camp";

export default async function FootballPage() {
  let stats: DashboardStats | null = null;
  let matches: Match[] = [];
  let players: Player[] = [];
  let teams: Team[] = [];
  let error: string | null = null;

  try {
    [stats, matches, players, teams] = await Promise.all([
      apiFetch<DashboardStats>("/services/football/stats"),
      apiFetch<Match[]>("/services/football/matches", { limit: 200 }),
      apiFetch<Player[]>("/services/football/players", { limit: 15 }),
      apiFetch<Team[]>("/services/football/teams", { limit: 100 }),
    ]);
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to fetch";
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography sx={{ fontSize: "1.75rem", fontWeight: 800, color: "#F9FAFB", letterSpacing: "-0.03em" }}>
          Football Tracking
        </Typography>
        <GlassCard glowColor="rgba(239,68,68,0.15)" hover={false}>
          <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
            <ErrorOutlineOutlinedIcon sx={{ color: "#EF4444" }} />
            <Box>
              <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#FCA5A5" }}>Connection Error</Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#6B7280", mt: 0.25 }}>{error}</Typography>
            </Box>
          </Box>
        </GlassCard>
      </Box>
    );
  }

  // Find Base Camp team and filter matches
  const baseCampTeam = teams.find((t) => t.name.toLowerCase().includes(BASE_CAMP_NAME) || t.isDefault);
  const baseCampTeamName = baseCampTeam?.name ?? "Base Camp";

  const baseCampMatches = matches.filter(
    (m) =>
      m.team1Name.toLowerCase().includes(BASE_CAMP_NAME) ||
      m.team2Name.toLowerCase().includes(BASE_CAMP_NAME)
  );

  // Sort: ONGOING first, then SCHEDULED, then FINISHED (most recent first within each group)
  const sortedMatches = [...matches].sort((a, b) => {
    const order: Record<string, number> = { ONGOING: 0, SCHEDULED: 1, FINISHED: 2 };
    const oa = order[a.state] ?? 2;
    const ob = order[b.state] ?? 2;
    if (oa !== ob) return oa - ob;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const sortedBaseCamp = [...baseCampMatches].sort((a, b) => {
    const order: Record<string, number> = { ONGOING: 0, SCHEDULED: 1, FINISHED: 2 };
    const oa = order[a.state] ?? 2;
    const ob = order[b.state] ?? 2;
    if (oa !== ob) return oa - ob;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
            <Typography sx={{ fontSize: "1.75rem", fontWeight: 800, color: "#F9FAFB", letterSpacing: "-0.03em" }}>
              Football Tracking
            </Typography>
            <Chip label="Synced" size="small" sx={{ fontWeight: 700, fontSize: "0.55rem", height: 20, color: "#10B981", backgroundColor: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }} />
          </Box>
          <Typography sx={{ fontSize: "0.8rem", color: "#6B7280" }}>
            Real-time data from external Football Tracking platform
          </Typography>
        </Box>
        <Box
          component="a"
          href={EXT_URL}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            px: 2,
            py: 0.85,
            borderRadius: "10px",
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#E5E7EB",
            textDecoration: "none",
            fontSize: "0.72rem",
            fontWeight: 600,
            transition: "all 0.15s",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(99,102,241,0.3)", boxShadow: "0 0 20px rgba(99,102,241,0.1)" },
          }}
        >
          Open Platform
          <OpenInNewOutlinedIcon sx={{ fontSize: 14 }} />
        </Box>
      </Box>

      {/* Stats */}
      {stats && (
        <GlassCard hover={false}>
          <Box sx={{ p: 2.5 }}>
            <StatsOverview stats={stats} />
          </Box>
        </GlassCard>
      )}

      {/* Base Camp Section */}
      <BaseCampMatches matches={sortedBaseCamp} baseCampTeamName={baseCampTeamName} />

      {/* All Matches + Players */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "3fr 2fr" }, gap: 2, alignItems: "start" }}>
        <AllMatches matches={sortedMatches} />
        <TopPlayers players={players} />
      </Box>
    </Box>
  );
}
