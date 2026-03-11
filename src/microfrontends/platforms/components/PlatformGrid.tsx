"use client";

import { Box, Typography, Chip } from "@mui/material";
import Link from "next/link";
import GlassCard from "@/components/dashboard/GlassCard";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import type { ReactNode } from "react";

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

const ICON_MAP: Record<string, ReactNode> = {
  sports_soccer: <SportsSoccerOutlinedIcon sx={{ fontSize: 20 }} />,
  extension: <ExtensionOutlinedIcon sx={{ fontSize: 20 }} />,
  hub: <HubOutlinedIcon sx={{ fontSize: 20 }} />,
};

function getIcon(iconName: string, color: string): ReactNode {
  return ICON_MAP[iconName] ?? <HubOutlinedIcon sx={{ fontSize: 20, color }} />;
}

function getHref(id: string) { return id === "football_tracking" ? "/football" : "/platforms"; }
function latColor(ms: number | null) { if (ms == null) return "#6B7280"; if (ms < 300) return "#10B981"; if (ms < 800) return "#F59E0B"; return "#EF4444"; }

export default function PlatformGrid({ platforms }: { platforms: PlatformInfo[] }) {
  if (!platforms?.length) {
    return (
      <GlassCard hover={false}>
        <Box sx={{ p: 6, textAlign: "center" }}>
          <Typography sx={{ fontSize: "0.85rem", color: "#4B5563" }}>No services registered</Typography>
        </Box>
      </GlassCard>
    );
  }

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: 2 }}>
      {platforms.map((p) => (
        <Link key={p.id} href={getHref(p.id)} style={{ textDecoration: "none" }}>
          <GlassCard glowColor={`${p.color}20`}>
            <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: "11px", background: `${p.color}12`, border: `1px solid ${p.color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: p.color }}>
                    {getIcon(p.icon, p.color)}
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: "#F9FAFB", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</Typography>
                    <Typography sx={{ fontSize: "0.58rem", color: "#4B5563", fontFamily: "monospace" }}>{p.prefix}</Typography>
                  </Box>
                </Box>
                <OpenInNewOutlinedIcon sx={{ fontSize: 14, color: "#374151", mt: 0.5, flexShrink: 0 }} />
              </Box>

              <Typography sx={{ fontSize: "0.75rem", color: "#6B7280", lineHeight: 1.5, flex: 1 }}>{p.description}</Typography>

              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pt: 2, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <Chip
                  icon={p.healthy ? <CheckCircleOutlinedIcon sx={{ fontSize: 12 }} /> : <ErrorOutlineOutlinedIcon sx={{ fontSize: 12 }} />}
                  label={p.healthy ? "Healthy" : "Down"}
                  size="small"
                  sx={{
                    fontSize: "0.58rem", fontWeight: 700, height: 22,
                    color: p.healthy ? "#10B981" : "#EF4444",
                    backgroundColor: p.healthy ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                    border: `1px solid ${p.healthy ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
                    "& .MuiChip-icon": { color: "inherit" },
                  }}
                />
                {p.latency_ms != null && (
                  <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: latColor(p.latency_ms), fontFamily: "monospace", fontVariantNumeric: "tabular-nums" }}>
                    {p.latency_ms}ms
                  </Typography>
                )}
              </Box>
            </Box>
          </GlassCard>
        </Link>
      ))}
    </Box>
  );
}
