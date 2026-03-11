import { Box, Typography, Chip } from "@mui/material";
import { apiFetch } from "@/lib/api";
import PlatformGrid from "@/microfrontends/platforms/components/PlatformGrid";
import GlassCard from "@/components/dashboard/GlassCard";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

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

export default async function PlatformsPage() {
  let platforms: PlatformInfo[] = [];
  let error: string | null = null;

  try {
    platforms = await apiFetch<PlatformInfo[]>("/platforms");
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load";
  }

  const online = platforms.filter((p) => p.healthy).length;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography sx={{ fontSize: "1.75rem", fontWeight: 800, color: "#F9FAFB", letterSpacing: "-0.03em" }}>
            Platform Services
          </Typography>
          <Typography sx={{ fontSize: "0.8rem", color: "#6B7280", mt: 0.5 }}>
            All connected services and health status
          </Typography>
        </Box>
        {!error && platforms.length > 0 && (
          <Chip
            label={`${online}/${platforms.length} healthy`}
            size="small"
            sx={{
              fontWeight: 700, fontSize: "0.6rem", height: 22,
              color: online === platforms.length ? "#10B981" : "#F59E0B",
              backgroundColor: online === platforms.length ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
              border: `1px solid ${online === platforms.length ? "rgba(16,185,129,0.2)" : "rgba(245,158,11,0.2)"}`,
            }}
          />
        )}
      </Box>

      {error ? (
        <GlassCard glowColor="rgba(239,68,68,0.15)" hover={false}>
          <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
            <ErrorOutlineOutlinedIcon sx={{ color: "#EF4444" }} />
            <Box>
              <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#FCA5A5" }}>Failed to load services</Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#6B7280", mt: 0.25 }}>{error}</Typography>
            </Box>
          </Box>
        </GlassCard>
      ) : (
        <PlatformGrid platforms={platforms} />
      )}
    </Box>
  );
}
