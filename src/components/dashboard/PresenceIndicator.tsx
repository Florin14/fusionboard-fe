"use client";

import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Tooltip,
  Avatar,
  AvatarGroup,
  Chip,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import type { RootState } from "@/store";
import type { OnlineUser } from "@/lib/websocket";

const PAGE_LABELS: Record<string, string> = {
  overview: "Command Center",
  football: "Football Tracking",
  platforms: "Platforms",
  settings: "Settings",
};

export default function PresenceIndicator() {
  const { onlineUsers, count } = useSelector(
    (state: RootState) => state.presence
  );

  if (count === 0) return null;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Chip
        icon={
          <CircleIcon
            sx={{
              fontSize: 8,
              color: "#22C55E !important",
              animation: "pulse-glow 2s infinite",
            }}
          />
        }
        label={`${count} online`}
        size="small"
        sx={{
          bgcolor: "rgba(34, 197, 94, 0.1)",
          border: "1px solid rgba(34, 197, 94, 0.2)",
          color: "rgba(255,255,255,0.8)",
          fontSize: "0.75rem",
          height: 28,
        }}
      />
      <AvatarGroup
        max={4}
        sx={{
          "& .MuiAvatar-root": {
            width: 28,
            height: 28,
            fontSize: "0.75rem",
            bgcolor: "rgba(99, 102, 241, 0.3)",
            border: "1px solid rgba(99, 102, 241, 0.4) !important",
          },
        }}
      >
        {onlineUsers.map((user: OnlineUser) => (
          <Tooltip
            key={user.userId}
            title={`${user.userName} — ${PAGE_LABELS[user.currentPage] ?? user.currentPage}`}
          >
            <Avatar>{user.userName.charAt(0).toUpperCase()}</Avatar>
          </Tooltip>
        ))}
      </AvatarGroup>
    </Box>
  );
}
