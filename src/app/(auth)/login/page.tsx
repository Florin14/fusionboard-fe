"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import { login } from "@/lib/auth";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "rgba(255,255,255,0.08)",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.08)" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99,102,241,0.3)" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#6366F1" },
  },
  "& .MuiInputLabel-root": { color: "#6B7280" },
  "& .MuiInputBase-input": { color: "#F9FAFB" },
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const result = await login(email, password);
      if (result.success) {
        router.push("/overview");
      } else {
        setError(result.error ?? "Invalid credentials");
      }
    });
  }

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
          component="form"
          onSubmit={handleSubmit}
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

          {error && (
            <Alert
              severity="error"
              sx={{
                borderRadius: "12px",
                backgroundColor: "rgba(239,68,68,0.1)",
                color: "#FCA5A5",
                border: "1px solid rgba(239,68,68,0.2)",
                "& .MuiAlert-icon": { color: "#EF4444" },
              }}
            >
              {error}
            </Alert>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Email"
              placeholder="you@company.com"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
              sx={inputSx}
            />
            <TextField
              label="Password"
              placeholder={"\u2022".repeat(8)}
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
              sx={inputSx}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isPending}
              sx={{
                borderRadius: "12px",
                py: 1.5,
                mt: 0.5,
                background: "linear-gradient(135deg, #6366F1, #818CF8)",
                fontWeight: 700,
                fontSize: "0.85rem",
                boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
                "&:hover": { background: "linear-gradient(135deg, #4F46E5, #6366F1)", boxShadow: "0 6px 24px rgba(99,102,241,0.4)" },
                "&.Mui-disabled": { opacity: 0.7 },
              }}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
