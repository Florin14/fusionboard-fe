"use client";

import { createTheme } from "@mui/material/styles";
import cssVariables from "./cssVariables";

export const appTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: cssVariables.palette.primary },
    secondary: { main: cssVariables.palette.warning },
    background: { default: "#0F1117", paper: "#0F1117" },
    text: { primary: cssVariables.palette.textPrimary, secondary: cssVariables.palette.textSecondary },
    success: { main: cssVariables.palette.success },
    warning: { main: cssVariables.palette.warning },
    error: { main: cssVariables.palette.danger },
    info: { main: cssVariables.palette.info },
  },
  shape: { borderRadius: cssVariables.radius.md },
  typography: {
    fontFamily: ['var(--font-manrope)', '"Segoe UI"', "system-ui", "-apple-system", "sans-serif"].join(","),
    h4: { fontWeight: 800, letterSpacing: "-0.02em" },
    h5: { fontWeight: 800, letterSpacing: "-0.01em" },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 700 },
    subtitle2: { fontWeight: 600 },
    button: { textTransform: "none" as const, fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        body {
          background: #0F1117;
          overflow: hidden;
        }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `,
    },
    MuiPaper: { defaultProps: { elevation: 0 }, styleOverrides: { root: { backgroundImage: "none" } } },
  },
});

export type AppTheme = typeof appTheme;
