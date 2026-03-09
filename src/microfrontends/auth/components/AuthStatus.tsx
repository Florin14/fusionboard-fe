"use client";

import { FC } from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { useClasses } from "@/styles/useClasses";
import cssVariables from "@/theme/cssVariables";
import { useTranslation } from "@/i18n/useTranslation";

interface AuthStatusStyles {
  wrapper: any;
}

const AuthStatusStyles = (theme: Theme): AuthStatusStyles => ({
  wrapper: {
    backgroundColor: cssVariables.palette.bgCard,
    borderRadius: cssVariables.radius.xl,
    padding: cssVariables.spacing.cardPadding,
    boxShadow: "0 18px 45px rgba(15,23,42,0.04)",
  },
});

const AuthStatus: FC = () => {
  const classes = useClasses(AuthStatusStyles, { name: "AuthStatus" });
  const { languageData } = useTranslation();

  // aici vei înlocui cu date reale din microserviciul de auth
  const isAuthenticated = true;
  const userEmail = "alex.dev@example.com";

  return (
    <Box sx={classes.wrapper}>
      <Typography variant="subtitle1" gutterBottom>
        {languageData?.Account}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {userEmail}
      </Typography>
      <Chip
        label={isAuthenticated ? languageData?.Authenticated : languageData?.Guest}
        size="small"
        sx={{
          marginTop: 1,
          backgroundColor: isAuthenticated ? cssVariables.palette.primarySoft : cssVariables.palette.accentSoft,
          color: isAuthenticated ? cssVariables.palette.primary : cssVariables.palette.accent,
        }}
      />
      <Box sx={{ marginTop: 2, display: "flex", gap: 1 }}>
        <Button size="small" variant="outlined">
          {languageData?.ManageSessions}
        </Button>
        <Button size="small" variant="text">
          {languageData?.SignOut}
        </Button>
      </Box>
    </Box>
  );
};

export default AuthStatus;
