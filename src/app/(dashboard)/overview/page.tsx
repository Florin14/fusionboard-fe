import { Box, Typography } from "@mui/material";
import { apiFetch } from "@/lib/api";
import { authFetch } from "@/lib/apiServer";
import StatsOverview from "@/microfrontends/football/components/StatsOverview";
import RecentMatches from "@/microfrontends/football/components/RecentMatches";
import TopPlayers from "@/microfrontends/football/components/TopPlayers";
import SystemPulse from "@/components/dashboard/SystemPulse";
import EventStream from "@/components/dashboard/EventStream";
import QuickActions from "@/components/dashboard/QuickActions";
import DailyBrief from "@/components/dashboard/DailyBrief";
import type { DashboardStats, Match, Player } from "@/types/football";
import type { DailyBrief as DailyBriefType } from "@/types/brief";

interface PlatformInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  prefix: string;
  healthy: boolean;
  latency_ms: number | null;
}

async function fetchSafe<T>(path: string, params?: Record<string, string | number | undefined>, fallback?: T): Promise<T | null> {
  try { return await apiFetch<T>(path, params); } catch { return fallback ?? null; }
}

export default async function OverviewPage() {
  const [platforms, stats, matches, players, brief] = await Promise.all([
    fetchSafe<PlatformInfo[]>("/platforms", undefined, []),
    fetchSafe<DashboardStats>("/services/football/stats"),
    fetchSafe<Match[]>("/services/football/matches", { limit: 8 }, []),
    fetchSafe<Player[]>("/services/football/players", { limit: 8 }, []),
    authFetch<DailyBriefType>("/services/brief/today").catch(() => null),
  ]);

  const services = (platforms ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    healthy: p.healthy,
    latency_ms: p.latency_ms,
    color: p.color,
  }));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography
            sx={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "#F9FAFB",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Command Center
          </Typography>
          <Typography sx={{ fontSize: "0.8rem", color: "#6B7280", mt: 0.5 }}>
            Single source of truth across your ecosystem
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: "0.6rem",
            fontFamily: "monospace",
            color: "#4B5563",
            px: 1.5,
            py: 0.5,
            borderRadius: "8px",
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </Typography>
      </Box>

      {/* Daily Brief */}
      {brief && <DailyBrief brief={brief} />}

      {/* Bento Row 1: Quick Actions | System Pulse | Stats (compact) */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "1fr 1fr 2fr" },
          gap: 2,
        }}
      >
        <QuickActions />
        <SystemPulse services={services} />
        {stats && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                px: 2.5,
                py: 1.5,
                borderRadius: "16px 16px 0 0",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderBottomColor: "transparent",
              }}
            >
              <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Football Stats
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                borderRadius: "0 0 16px 16px",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderTop: "none",
                backdropFilter: "blur(20px)",
                p: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <StatsOverview stats={stats} />
            </Box>
          </Box>
        )}
      </Box>

      {/* Bento Row 2: Event Stream | Matches */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 3fr" },
          gap: 2,
          alignItems: "start",
        }}
      >
        <EventStream matches={matches ?? []} services={services} />
        <RecentMatches matches={matches ?? []} />
      </Box>

      {/* Bento Row 3: Players */}
      <TopPlayers players={players ?? []} />
    </Box>
  );
}
