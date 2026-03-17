"use client";

import { useSelector } from "react-redux";
import { Box, Typography, Chip } from "@mui/material";
import type { RootState } from "@/store";
import type { NotificationData, ActivityData } from "@/lib/websocket";

interface LiveEvent {
  id: string;
  type: "notification" | "activity";
  title: string;
  detail: string;
  time: string;
  color: string;
}

function mapNotification(n: NotificationData): LiveEvent {
  return {
    id: `notif-${n.id}`,
    type: "notification",
    title: n.title,
    detail: n.message,
    time: new Date(n.createdAt).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    color: n.color,
  };
}

function mapActivity(a: ActivityData, idx: number): LiveEvent {
  return {
    id: `act-${idx}-${a.timestamp}`,
    type: "activity",
    title: `${a.userName} ${a.action}`,
    detail: a.target,
    time: new Date(a.timestamp).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    color: a.color,
  };
}

export default function LiveEventFeed() {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  const activities = useSelector(
    (state: RootState) => state.notifications.activities
  );

  const liveEvents: LiveEvent[] = [
    ...notifications.slice(0, 10).map(mapNotification),
    ...activities.slice(0, 10).map(mapActivity),
  ].sort((a, b) => {
    // Most recent first; fall back to insertion order
    if (a.time !== b.time) return b.time.localeCompare(a.time);
    return 0;
  });

  if (liveEvents.length === 0) return null;

  return (
    <Box sx={{ py: 0.5 }}>
      {/* Live header */}
      <Box
        sx={{
          px: 2.5,
          py: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Chip
          label="LIVE"
          size="small"
          sx={{
            height: 18,
            fontSize: "0.55rem",
            fontWeight: 800,
            letterSpacing: "0.08em",
            bgcolor: "rgba(239, 68, 68, 0.15)",
            color: "#EF4444",
            border: "1px solid rgba(239, 68, 68, 0.3)",
          }}
        />
        <Typography
          sx={{ fontSize: "0.6rem", color: "#4B5563", fontStyle: "italic" }}
        >
          {liveEvents.length} live event{liveEvents.length !== 1 ? "s" : ""}
        </Typography>
      </Box>

      {liveEvents.slice(0, 8).map((e, i) => (
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
          {/* Timeline dot */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pt: 0.5,
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: e.color,
                boxShadow: `0 0 6px ${e.color}60`,
                flexShrink: 0,
              }}
            />
            {i < Math.min(liveEvents.length, 8) - 1 && (
              <Box
                sx={{
                  width: 1,
                  flex: 1,
                  mt: 0.5,
                  backgroundColor: "rgba(255,255,255,0.04)",
                  minHeight: 16,
                }}
              />
            )}
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, minWidth: 0, pb: 0.5 }}>
            <Typography
              sx={{
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "#E5E7EB",
                lineHeight: 1.3,
              }}
            >
              {e.title}
            </Typography>
            <Typography sx={{ fontSize: "0.62rem", color: "#6B7280", mt: 0.25 }}>
              {e.detail}
            </Typography>
          </Box>

          {/* Time */}
          <Typography
            sx={{
              fontSize: "0.55rem",
              color: "#4B5563",
              fontFamily: "monospace",
              flexShrink: 0,
              pt: 0.25,
            }}
          >
            {e.time}
          </Typography>
        </Box>
      ))}

      {/* Separator between live and static events */}
      <Box
        sx={{
          mx: 2.5,
          my: 0.5,
          borderBottom: "1px dashed rgba(255,255,255,0.06)",
        }}
      />
    </Box>
  );
}
