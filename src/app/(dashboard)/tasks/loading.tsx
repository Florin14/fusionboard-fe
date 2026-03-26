import { Box, Skeleton, Typography } from "@mui/material";

export default function TasksLoading() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography sx={{ fontSize: "1.75rem", fontWeight: 800, color: "#F9FAFB", letterSpacing: "-0.03em" }}>
            Tasks
          </Typography>
          <Skeleton variant="text" width={160} sx={{ bgcolor: "rgba(255,255,255,0.04)", mt: 0.5 }} />
        </Box>
        <Skeleton variant="rounded" width={100} height={36} sx={{ bgcolor: "rgba(255,255,255,0.04)", borderRadius: "12px" }} />
      </Box>
      <Skeleton variant="rounded" width="100%" height={6} sx={{ bgcolor: "rgba(255,255,255,0.04)", borderRadius: 3 }} />
      <Skeleton variant="rounded" width="100%" height={44} sx={{ bgcolor: "rgba(255,255,255,0.02)", borderRadius: "14px" }} />
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} variant="rounded" width="100%" height={56} sx={{ bgcolor: "rgba(255,255,255,0.02)", borderRadius: "12px" }} />
      ))}
    </Box>
  );
}
