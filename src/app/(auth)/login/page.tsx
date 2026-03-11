"use client";

import Link from "next/link";
import { Box, Button, TextField, Typography } from "@mui/material";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at 30% 20%, #1e2235 0%, #0F1117 60%)",
        p: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient orbs */}
      <Box sx={{ position: "absolute", top: "10%", left: "20%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", bottom: "20%", right: "15%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <Box sx={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 3, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "11px",
              background: "linear-gradient(135deg, #6366F1, #818CF8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(99,102,241,0.3)",
            }}
          >
            <HubOutlinedIcon sx={{ fontSize: 19, color: "#fff" }} />
          </Box>
          <Typography sx={{ fontSize: "1rem", fontWeight: 800, color: "#F9FAFB", letterSpacing: "-0.01em" }}>
            FusionBoard
          </Typography>
        </Box>

        {/* Card */}
        <Box
          sx={{
            p: 4,
            borderRadius: "20px",
            backgroundColor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.4), 0 0 40px rgba(99,102,241,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "1.4rem", fontWeight: 800, color: "#F9FAFB", letterSpacing: "-0.02em" }}>
              Welcome back
            </Typography>
            <Typography sx={{ fontSize: "0.82rem", color: "#6B7280", mt: 0.5 }}>
              Sign in to your command center
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Email"
              placeholder="you@company.com"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.08)" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99,102,241,0.3)" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#6366F1" },
                },
                "& .MuiInputLabel-root": { color: "#6B7280" },
                "& .MuiInputBase-input": { color: "#F9FAFB" },
              }}
            />
            <TextField
              label="Password"
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
              type="password"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.08)" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99,102,241,0.3)" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#6366F1" },
                },
                "& .MuiInputLabel-root": { color: "#6B7280" },
                "& .MuiInputBase-input": { color: "#F9FAFB" },
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography sx={{ fontSize: "0.72rem", color: "#818CF8", fontWeight: 600, cursor: "pointer", "&:hover": { color: "#6366F1" } }}>
                Forgot password?
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{
                borderRadius: "12px",
                py: 1.5,
                background: "linear-gradient(135deg, #6366F1, #818CF8)",
                fontWeight: 700,
                fontSize: "0.85rem",
                boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
                "&:hover": { background: "linear-gradient(135deg, #4F46E5, #6366F1)", boxShadow: "0 6px 24px rgba(99,102,241,0.4)" },
              }}
            >
              Sign in
            </Button>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: "#4B5563", fontSize: "0.72rem", "&::before, &::after": { content: '""', flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.08)" } }}>
              or
            </Box>

            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: "12px",
                py: 1.25,
                borderColor: "rgba(255,255,255,0.08)",
                color: "#E5E7EB",
                fontWeight: 600,
                fontSize: "0.8rem",
                "&:hover": { borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.03)" },
              }}
            >
              Continue with Google
            </Button>
          </Box>

          <Box sx={{ textAlign: "center", pt: 0.5 }}>
            <Typography sx={{ fontSize: "0.72rem", color: "#6B7280" }}>
              Skip?{" "}
              <Link href="/overview" style={{ color: "#818CF8", fontWeight: 600, textDecoration: "none" }}>
                Go to dashboard
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
