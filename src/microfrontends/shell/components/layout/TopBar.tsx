"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";
import { Box, Breadcrumbs, IconButton, Typography } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Theme } from "@mui/material/styles";
import { useClasses } from "@/styles/useClasses";
import cssVariables from "@/theme/cssVariables";
import { useTranslation } from "@/i18n/useTranslation";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/store/slices/uiSlice";

interface TopBarStyles {
  wrapper: any;
  left: any;
  breadcrumb: any;
  right: any;
  crumbLink: any;
  crumbText: any;
}

const TopBarStyles = (theme: Theme): TopBarStyles => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 14px",
    borderRadius: "14px",
    border: `1px solid ${cssVariables.palette.borderSoft}`,
    background: cssVariables.palette.bgCard,
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  crumbLink: {
    color: cssVariables.palette.textSecondary,
    fontSize: 12,
    fontWeight: 600,
  },
  crumbText: {
    color: cssVariables.palette.textPrimary,
    fontSize: 12,
    fontWeight: 700,
  },
});

const toTitle = (value: string) =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const TopBar: FC = () => {
  const classes = useClasses(TopBarStyles, { name: "TopBar" });
  const pathname = usePathname();
  const { languageData } = useTranslation();
  const dispatch = useDispatch();

  const segment = pathname.split("/").filter(Boolean).pop() ?? "";
  const labelMap: Record<string, string | undefined> = {
    overview: languageData?.Overview,
    football: languageData?.Football,
    platforms: languageData?.Platforms,
    settings: languageData?.Settings,
  };
  const currentLabel = labelMap[segment] ?? toTitle(segment || "Overview");

  return (
    <Box sx={classes.wrapper}>
      <Box sx={classes.left}>
        <IconButton size="small" onClick={() => dispatch(toggleSidebar())}>
          <MenuOutlinedIcon fontSize="small" />
        </IconButton>
        <Breadcrumbs separator="/" sx={classes.breadcrumb}>
          <Typography sx={classes.crumbLink}>Board</Typography>
          <Typography sx={classes.crumbText}>{currentLabel}</Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={classes.right}>
        <IconButton size="small">
          <NotificationsNoneOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <ChatBubbleOutlineOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <SearchIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopBar;
