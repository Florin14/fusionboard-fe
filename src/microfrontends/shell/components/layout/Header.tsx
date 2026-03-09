"use client";

import { FC } from "react";
import { Box, TextField, IconButton, Avatar, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import cssVariables from "@/theme/cssVariables";
import { Theme } from "@mui/material/styles";
import { useClasses } from "@/styles/useClasses";
import { useTranslation } from "@/i18n/useTranslation";
import { SupportedLanguage } from "@/store/slices/languageSlice";

interface HeaderStyles {
  wrapper: any;
  titleBlock: any;
  rightBlock: any;
}

const HeaderStyles = (theme: Theme): HeaderStyles => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px",
    borderBottom: `1px solid ${cssVariables.palette.borderSoft}`,
    backgroundColor: cssVariables.palette.bgCard,
    borderRadius: `${cssVariables.radius.xl}px`,
    marginBottom: 16,
  },
  titleBlock: {
    display: "flex",
    flexDirection: "column",
  },
  rightBlock: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
});

const Header: FC = () => {
  const classes = useClasses(HeaderStyles, { name: "Header" });
  const { languageData, language, setLanguage } = useTranslation();

  return (
    <Box className="Header-wrapper" sx={classes.wrapper}>
      <Box className="Header-titleBlock" sx={classes.titleBlock}>
        <Typography className="Header-title" variant="h6">
          {languageData?.TodayOverview}
        </Typography>
        <Typography className="Header-subtitle" variant="body2" color="text.secondary">
          {languageData?.HeaderSubline}
        </Typography>
      </Box>

      <Box className="Header-rightBlock" sx={classes.rightBlock}>
        <TextField
          className="Header-search"
          size="small"
          placeholder={languageData?.SearchPlaceholder}
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
          }}
        />
        <IconButton className="Header-notifications">
          <NotificationsNoneIcon />
        </IconButton>
        <ToggleButtonGroup
          className="Header-languageToggle"
          value={language}
          exclusive
          size="small"
          onChange={(_, value: SupportedLanguage | null) => {
            if (value) {
              setLanguage(value);
            }
          }}
          sx={{ bgcolor: "background.paper", borderRadius: 2 }}
        >
          <ToggleButton className="Header-languageOption" value="en">
            EN
          </ToggleButton>
          <ToggleButton className="Header-languageOption" value="ro">
            RO
          </ToggleButton>
        </ToggleButtonGroup>
        <Avatar className="Header-avatar" sx={{ width: 32, height: 32 }}>
          A
        </Avatar>
      </Box>
    </Box>
  );
};

export default Header;
