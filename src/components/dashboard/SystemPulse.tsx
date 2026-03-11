"use client";

import { Box, Typography } from "@mui/material";
import GlassCard from "./GlassCard";

interface Service {
  id: string;
  name: string;
  healthy: boolean;
  latency_ms: number | null;
  color: string;
}

export default function SystemPulse({ services }: { services: Service[] }) {
  const healthyCount = services.filter((s) => s.healthy).length;
  const total = services.length;
  const allHealthy = healthyCount === total && total > 0;

  return (
    <GlassCard glowColor={allHealthy ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)"}>
      <Box sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
        {/* Orbit rings */}
        <Box sx={{ position: "relative", width: 140, height: 140, mb: 2 }}>
          {/* Outer ring */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: `1px solid ${allHealthy ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)"}`,
              animation: "orbit-spin 20s linear infinite",
            }}
          >
            {services.map((s, i) => {
              const angle = (i / services.length) * 360;
              return (
                <Box
                  key={s.id}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${angle}deg) translateX(70px) rotate(-${angle}deg)`,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: s.healthy ? "#10B981" : "#EF4444",
                    boxShadow: `0 0 10px ${s.healthy ? "rgba(16,185,129,0.6)" : "rgba(239,68,68,0.6)"}`,
                    animation: "pulse-glow 2s ease-in-out infinite",
                    animationDelay: `${i * 0.3}s`,
                    mt: "-5px",
                    ml: "-5px",
                  }}
                />
              );
            })}
          </Box>

          {/* Middle ring */}
          <Box
            sx={{
              position: "absolute",
              top: 20,
              left: 20,
              right: 20,
              bottom: 20,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.04)",
              animation: "orbit-spin 15s linear infinite reverse",
            }}
          />

          {/* Center */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.8rem",
                fontWeight: 800,
                color: allHealthy ? "#10B981" : "#F59E0B",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
                textShadow: `0 0 20px ${allHealthy ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)"}`,
              }}
            >
              {healthyCount}/{total}
            </Typography>
          </Box>
        </Box>

        <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          System Health
        </Typography>

        {/* Service list */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          {services.map((s) => (
            <Box key={s.id} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Box
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  backgroundColor: s.healthy ? "#10B981" : "#EF4444",
                  boxShadow: `0 0 6px ${s.healthy ? "rgba(16,185,129,0.5)" : "rgba(239,68,68,0.5)"}`,
                }}
              />
              <Typography sx={{ fontSize: "0.6rem", color: "#6B7280", fontWeight: 500 }}>
                {s.name}
              </Typography>
              {s.latency_ms != null && (
                <Typography sx={{ fontSize: "0.55rem", color: "#4B5563", fontFamily: "monospace" }}>
                  {s.latency_ms}ms
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </GlassCard>
  );
}
