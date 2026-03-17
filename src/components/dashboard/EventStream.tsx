"use client";

import { Box, Typography } from "@mui/material";
import GlassCard from "./GlassCard";
import LiveEventFeed from "./LiveEventFeed";
import type { Match } from "@/types/football";

interface StreamEvent {
  id: string;
  type: "match" | "system" | "info";
  title: string;
  detail: string;
  time: string;
  color: string;
}

function generateEvents(matches: Match[], services: { name: string; healthy: boolean }[]): StreamEvent[] {
  const events: StreamEvent[] = [];

  services.forEach((s) => {
    events.push({
      id: `svc-${s.name}`,
      type: "system",
      title: s.healthy ? `${s.name} is online` : `${s.name} is unreachable`,
      detail: s.healthy ? "All endpoints responding" : "Health check failed",
      time: "now",
      color: s.healthy ? "#10B981" : "#EF4444",
    });
  });

  matches.slice(0, 6).forEach((m) => {
    const isFinished = m.state === "FINISHED";
    events.push({
      id: `match-${m.id}`,
      type: "match",
      title: `${m.team1Name} vs ${m.team2Name}`,
      detail: isFinished
        ? `Final: ${m.scoreTeam1} - ${m.scoreTeam2}`
        : m.state === "SCHEDULED"
          ? `Scheduled \u00B7 R${m.round}`
          : "In progress",
      time: new Date(m.timestamp).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
      color: isFinished ? "#10B981" : m.state === "ONGOING" ? "#F59E0B" : "#6B7280",
    });
  });

  return events;
}

interface EventStreamProps {
  matches: Match[];
  services: { name: string; healthy: boolean }[];
}

export default function EventStream({ matches, services }: EventStreamProps) {
  const events = generateEvents(matches, services);

  return (
    <GlassCard glowColor="rgba(59,130,246,0.12)">
      <Box sx={{ px: 2.5, py: 2, borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#3B82F6", animation: "pulse-glow 2s ease-in-out infinite" }} />
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#F9FAFB" }}>
            Event Stream
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "0.6rem", color: "#4B5563" }}>
          {events.length} events
        </Typography>
      </Box>

      <Box sx={{ maxHeight: 320, overflow: "auto", py: 0.5 }}>
        <LiveEventFeed />
        {events.map((e, i) => (
          <Box
            key={e.id}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              px: 2.5,
              py: 1.25,
              transition: "background-color 0.12s",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.04)" },
              animation: "fade-in-up 0.3s ease-out both",
              animationDelay: `${i * 0.05}s`,
            }}
          >
            {/* Timeline */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", pt: 0.5 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: e.color, boxShadow: `0 0 6px ${e.color}60`, flexShrink: 0 }} />
              {i < events.length - 1 && (
                <Box sx={{ width: 1, flex: 1, mt: 0.5, backgroundColor: "rgba(255,255,255,0.04)", minHeight: 16 }} />
              )}
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1, minWidth: 0, pb: 0.5 }}>
              <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: "#E5E7EB", lineHeight: 1.3 }}>
                {e.title}
              </Typography>
              <Typography sx={{ fontSize: "0.62rem", color: "#6B7280", mt: 0.25 }}>
                {e.detail}
              </Typography>
            </Box>

            {/* Time */}
            <Typography sx={{ fontSize: "0.55rem", color: "#4B5563", fontFamily: "monospace", flexShrink: 0, pt: 0.25 }}>
              {e.time}
            </Typography>
          </Box>
        ))}
      </Box>
    </GlassCard>
  );
}
