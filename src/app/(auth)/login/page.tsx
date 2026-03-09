"use client";

import Link from "next/link";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { useClasses } from "@/styles/useClasses";
import cssVariables from "@/theme/cssVariables";

interface LoginPageStyles {
  wrapper: any;
  left: any;
  right: any;
  card: any;
  title: any;
  subtitle: any;
  form: any;
  field: any;
  helperRow: any;
  link: any;
  divider: any;
  pill: any;
  footer: any;
  visual: any;
  visualCard: any;
  visualBadge: any;
  visualPanel: any;
}

const LoginPageStyles = (theme: Theme): LoginPageStyles => ({
  wrapper: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    background: "linear-gradient(135deg, #F6F3EE 0%, #F1EEE9 60%, #EDE7DD 100%)",
    overflow: "hidden",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
    },
  },
  left: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "24px 24px 32px",
    minHeight: 0,
  },
  right: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "24px 32px 32px",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  card: {
    width: "100%",
    maxWidth: 420,
    padding: "28px",
    borderRadius: "20px",
    background: "#fff",
    border: `1px solid ${cssVariables.palette.borderSoft}`,
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.16)",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: cssVariables.palette.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: cssVariables.palette.textSecondary,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  field: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      background: "#F7F6F3",
    },
  },
  helperRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 12,
  },
  link: {
    color: cssVariables.palette.textSecondary,
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: 12,
    color: cssVariables.palette.textSecondary,
    "&::before": {
      content: '""',
      flex: 1,
      height: 1,
      background: cssVariables.palette.borderSoft,
    },
    "&::after": {
      content: '""',
      flex: 1,
      height: 1,
      background: cssVariables.palette.borderSoft,
    },
  },
  pill: {
    borderRadius: 999,
    padding: "8px 18px",
    background: cssVariables.palette.textPrimary,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    color: cssVariables.palette.textSecondary,
  },
  visual: {},
  visualCard: {
    width: "100%",
    maxWidth: 460,
    padding: 28,
    borderRadius: "28px",
    background: "linear-gradient(180deg, #ffffff 0%, #F6F1EB 100%)",
    border: `1px solid ${cssVariables.palette.borderSoft}`,
    boxShadow: "0 20px 50px rgba(15, 23, 42, 0.12)",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  visualBadge: {
    alignSelf: "flex-start",
    padding: "6px 10px",
    borderRadius: 999,
    background: "#111827",
    color: "#fff",
    fontSize: 11,
    fontWeight: 600,
  },
  visualPanel: {
    height: 220,
    borderRadius: "22px",
    background:
      "radial-gradient(circle at 20% 30%, #E0E7FF 0%, #E0E7FF 40%, transparent 41%), radial-gradient(circle at 80% 20%, #FFF4D9 0%, #FFF4D9 40%, transparent 41%), linear-gradient(135deg, #F3F1ED 0%, #EFE9E1 100%)",
    border: `1px dashed ${cssVariables.palette.borderSoft}`,
  },
});

export default function LoginPage() {
  const classes = useClasses(LoginPageStyles, { name: "LoginPage" });

  return (
    <Box className="LoginPage-wrapper" sx={classes.wrapper}>
      <Box className="LoginPage-left" sx={classes.left}>
        <Box className="LoginPage-card" sx={classes.card}>
          <Typography className="LoginPage-title" sx={classes.title}>
            Welcome back
          </Typography>
          <Typography className="LoginPage-subtitle" sx={classes.subtitle}>
            Sign in to access your exams, schedule, and class resources.
          </Typography>

          <Box className="LoginPage-form" sx={classes.form}>
            <TextField
              className="LoginPage-field"
              label="Email"
              placeholder="you@school.edu"
              fullWidth
              sx={classes.field}
            />
            <TextField
              className="LoginPage-field"
              label="Password"
              placeholder="••••••••"
              type="password"
              fullWidth
              sx={classes.field}
            />
            <Box className="LoginPage-helperRow" sx={classes.helperRow}>
              <Typography variant="caption" color="text.secondary">
                Forgot password?
              </Typography>
              <Typography className="LoginPage-link" variant="caption" sx={classes.link}>
                Reset
              </Typography>
            </Box>
            <Button className="LoginPage-submit" variant="contained" sx={classes.pill}>
              Sign in
            </Button>
            <Box className="LoginPage-divider" sx={classes.divider}>
              Or continue
            </Box>
            <Button className="LoginPage-alt" variant="outlined" sx={{ borderRadius: 999 }}>
              Continue with Google
            </Button>
          </Box>

          <Box className="LoginPage-footer" sx={classes.footer}>
            <Typography variant="caption" color="text.secondary">
              Jump to dashboard:
            </Typography>
            <Link href="/overview">Overview</Link>
          </Box>
        </Box>
      </Box>

      <Box className="LoginPage-right" sx={classes.right}>
        <Box className="LoginPage-visual" sx={classes.visualCard}>
          <Box className="LoginPage-visualBadge" sx={classes.visualBadge}>
            FusionBoard
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Smarter classroom planning
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Keep exams, attendance, and schedules aligned with a clean dashboard experience.
          </Typography>
          <Box className="LoginPage-visualPanel" sx={classes.visualPanel} />
        </Box>
      </Box>
    </Box>
  );
}
