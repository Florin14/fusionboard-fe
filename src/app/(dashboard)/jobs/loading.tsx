import { Box, Skeleton, Typography } from "@mui/material";

export default function JobsLoading() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography sx={{ fontSize: "1.75rem", fontWeight: 800, color: "#F9FAFB", letterSpacing: "-0.03em" }}>
            Job Tracker
          </Typography>
          <Skeleton variant="text" width={200} sx={{ bgcolor: "rgba(255,255,255,0.04)", mt: 0.5 }} />
        </Box>
        <Skeleton variant="rounded" width={100} height={36} sx={{ bgcolor: "rgba(255,255,255,0.04)", borderRadius: "12px" }} />
      </Box>
      <Box sx={{ display: "flex", gap: 1.5 }}>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} variant="rounded" width={100} height={48} sx={{ bgcolor: "rgba(255,255,255,0.02)", borderRadius: "12px" }} />
        ))}
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 1.5 }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} variant="rounded" width="100%" height={300} sx={{ bgcolor: "rgba(255,255,255,0.02)", borderRadius: "16px" }} />
        ))}
      </Box>
    </Box>
  );
}
