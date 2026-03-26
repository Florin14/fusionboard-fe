"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Box, Button, TextField, Typography, Alert, InputAdornment, IconButton, CircularProgress,
} from "@mui/material";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { login } from "@/lib/auth";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    backgroundColor: "rgba(255,255,255,0.04)",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.06)" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99,102,241,0.35)" },
    "&:hover": { backgroundColor: "rgba(255,255,255,0.06)" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#6366F1", borderWidth: "1.5px" },
    "&.Mui-focused": { backgroundColor: "rgba(99,102,241,0.06)" },
  },
  "& .MuiInputLabel-root": { color: "#4B5563", fontSize: "0.88rem" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#818CF8" },
  "& .MuiInputBase-input": { color: "#F9FAFB", fontSize: "0.9rem", py: 1.75 },
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      {/* Animated ambient orbs */}
      <Box sx={{
        position: "absolute", top: "-5%", left: "10%", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 60%)",
        pointerEvents: "none", filter: "blur(40px)",
        animation: "float 8s ease-in-out infinite",
        "@keyframes float": { "0%,100%": { transform: "translate(0, 0)" }, "50%": { transform: "translate(30px, 20px)" } },
      }} />
      <Box sx={{
        position: "absolute", bottom: "-10%", right: "5%", width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)",
        pointerEvents: "none", filter: "blur(40px)",
        animation: "float2 10s ease-in-out infinite",
        "@keyframes float2": { "0%,100%": { transform: "translate(0, 0)" }, "50%": { transform: "translate(-25px, -15px)" } },
      }} />
      <Box sx={{
        position: "absolute", top: "50%", left: "60%", width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 60%)",
        pointerEvents: "none", filter: "blur(50px)",
        animation: "float3 12s ease-in-out infinite",
        "@keyframes float3": { "0%,100%": { transform: "translate(0, 0)" }, "50%": { transform: "translate(-20px, 25px)" } },
      }} />

      {/* Grid pattern overlay */}
      <Box sx={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <Box sx={{ width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", gap: 3, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mb: 1 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "16px",
              background: "linear-gradient(135deg, #6366F1, #818CF8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(99,102,241,0.35), 0 8px 32px rgba(99,102,241,0.2)",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: -2,
                borderRadius: "18px",
                background: "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.2), transparent)",
                zIndex: -1,
              },
            }}
          >
            <HubOutlinedIcon sx={{ fontSize: 28, color: "#fff" }} />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: "1.3rem", fontWeight: 800, color: "#F9FAFB", letterSpacing: "-0.02em" }}>
              FusionBoard
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "#4B5563", mt: 0.25, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>
              Command Center
            </Typography>
          </Box>
        </Box>

        {/* Card */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 4,
            borderRadius: "24px",
            backgroundColor: "rgba(255,255,255,0.035)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 25px 80px rgba(0,0,0,0.4), 0 0 60px rgba(99,102,241,0.06), inset 0 1px 0 rgba(255,255,255,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: 800, color: "#F9FAFB", letterSpacing: "-0.03em" }}>
              Welcome back
            </Typography>
            <Typography sx={{ fontSize: "0.85rem", color: "#6B7280", mt: 0.5 }}>
              Sign in to your command center
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                borderRadius: "14px",
                backgroundColor: "rgba(239,68,68,0.08)",
                color: "#FCA5A5",
                border: "1px solid rgba(239,68,68,0.15)",
                fontSize: "0.82rem",
                "& .MuiAlert-icon": { color: "#EF4444" },
                animation: "shake 0.4s ease-in-out",
                "@keyframes shake": {
                  "0%,100%": { transform: "translateX(0)" },
                  "25%": { transform: "translateX(-6px)" },
                  "75%": { transform: "translateX(6px)" },
                },
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
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon sx={{ fontSize: 19, color: "#4B5563" }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={inputSx}
            />
            <TextField
              label="Password"
              placeholder={"\u2022".repeat(8)}
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ fontSize: 19, color: "#4B5563" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        tabIndex={-1}
                        sx={{ color: "#4B5563", "&:hover": { color: "#818CF8" } }}
                      >
                        {showPassword ? <VisibilityOffOutlinedIcon sx={{ fontSize: 18 }} /> : <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={inputSx}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isPending}
              sx={{
                borderRadius: "14px",
                py: 1.6,
                mt: 0.5,
                background: "linear-gradient(135deg, #6366F1, #818CF8)",
                fontWeight: 700,
                fontSize: "0.88rem",
                letterSpacing: "0.01em",
                boxShadow: "0 4px 24px rgba(99,102,241,0.35)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  background: "linear-gradient(135deg, #4F46E5, #6366F1)",
                  boxShadow: "0 8px 32px rgba(99,102,241,0.5)",
                  transform: "translateY(-1px)",
                },
                "&:active": { transform: "translateY(0)" },
                "&.Mui-disabled": {
                  background: "linear-gradient(135deg, #6366F1, #818CF8)",
                  opacity: 0.85,
                  color: "#fff",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                  transform: "translateX(-100%)",
                  transition: "transform 0.5s",
                },
                "&:hover::before": { transform: "translateX(100%)" },
              }}
            >
              {isPending ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <CircularProgress size={18} sx={{ color: "#fff" }} />
                  Signing in...
                </Box>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  Sign in
                  <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </Box>
              )}
            </Button>
          </Box>
        </Box>

        {/* Footer */}
        <Typography sx={{ textAlign: "center", fontSize: "0.7rem", color: "#2D3748" }}>
          Secured with end-to-end encryption
        </Typography>
      </Box>
    </Box>
  );
}
