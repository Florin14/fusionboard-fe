import { Box, LinearProgress, Typography } from "@mui/material";

export default function FootballLoading() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      <Typography sx={{ fontSize: "1.75rem", fontWeight: 800, color: "#F9FAFB", letterSpacing: "-0.03em" }}>
        Football Tracking
      </Typography>
      <LinearProgress
        sx={{
          borderRadius: 2,
          backgroundColor: "rgba(255,255,255,0.05)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#6366F1",
          },
        }}
      />
    </Box>
  );
}
