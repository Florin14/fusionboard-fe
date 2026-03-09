"use client";

import { createTheme } from "@mui/material/styles";
import cssVariables from "./cssVariables";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: cssVariables.palette.primary,
    },
    secondary: {
      main: cssVariables.palette.accent,
    },
    background: {
      default: cssVariables.palette.bgBody,
      paper: cssVariables.palette.bgCard,
    },
    text: {
      primary: cssVariables.palette.textPrimary,
      secondary: cssVariables.palette.textSecondary,
    },
  },
  shape: {
    borderRadius: cssVariables.radius.lg,
  },
  typography: {
    fontFamily: ['var(--font-manrope)', '"Segoe UI"', "system-ui", "-apple-system", "sans-serif"].join(","),
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
});

export type AppTheme = typeof appTheme;
