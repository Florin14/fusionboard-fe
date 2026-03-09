"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItemButton,
  ListItemText,
  Badge,
  IconButton,
} from "@mui/material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ViewQuiltOutlinedIcon from "@mui/icons-material/ViewQuiltOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import RectangleOutlinedIcon from "@mui/icons-material/RectangleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import cssVariables from "@/theme/cssVariables";
import { useClasses } from "@/styles/useClasses";
import { Theme } from "@mui/material/styles";
import { useTranslation } from "@/i18n/useTranslation";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/store/slices/uiSlice";

interface SidebarStyles {
  wrapper: any;
  logo: any;
  logoActions: any;
  sectionLabel: any;
  navList: any;
  navButton: any;
  navIcon: any;
  navText: any;
  badge: any;
  footer: any;
  footerSection: any;
}

const SidebarStyles = (theme: Theme): SidebarStyles => ({
  wrapper: {
    width: 260,
    height: "calc(100vh - 32px)",
    display: "flex",
    flexDirection: "column",
    padding: "0px 6px 4px 6px",
    gap: 4,
    backgroundColor: "transparent",
    overflowY: "hidden",
    overflowX: "hidden",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    padding: "2px 6px",
    borderRadius: "16px",
    backgroundColor: "white",
    border: "1px solid #E2DED7",
  },
  logoActions: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },

  sectionLabel: {
    fontSize: 9,
    textTransform: "none",
    letterSpacing: 0,
    color: "#9CA3AF",
    marginTop: 1,
    marginBottom: 1,
    paddingLeft: 4,
    fontWeight: 600,
  },

  navList: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },

  navButton: {
    borderRadius: "6px !important",
    padding: "4px 12px 4px 8px",
    minHeight: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    color: "#111827",
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.55)",
    },

    "&.Mui-selected": {
      backgroundColor: "#FFFFFF",
      boxShadow: "0 10px 20px rgba(17, 24, 39, 0.06)",
    },
    "&.Mui-selected:hover": {
      backgroundColor: "#FFFFFF",
    },
  },

  navIcon: {
    width: 18,
    height: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    color: "#6B7280",
  },

  navText: {
    fontSize: 11.5,
    fontWeight: 600,
    color: "#111827",
  },

  badge: {
    "& .MuiBadge-badge": {
      fontSize: 10,
      height: 18,
      minWidth: 18,
      borderRadius: "16px",
      backgroundColor: "#111827",
      color: "#fff",
      marginTop: "3px",
    },
  },

  footer: {
    marginTop: "auto",
    padding: "2px 6px",
    borderRadius: "16px",
    backgroundColor: "white",
    border: "1px solid #E2DED7",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  footerSection: {
    marginTop: "auto",
  }
});

const Sidebar: FC = () => {
  const classes = useClasses(SidebarStyles, { name: "Sidebar" });
  const { languageData } = useTranslation();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const mainMenuItems = [
    { key: "Overview", href: "/overview", icon: <ViewQuiltOutlinedIcon fontSize="inherit" />, badge: 3 },
    { key: "ClassPreparation", href: "/class-preparation", icon: <AutoStoriesOutlinedIcon fontSize="inherit" /> },
    { key: "Attendance", href: "/attendance", icon: <FactCheckOutlinedIcon fontSize="inherit" /> },
    { key: "Exams", href: "/exams", icon: <AssignmentTurnedInOutlinedIcon fontSize="inherit" /> },
    { key: "Schedule", href: "/schedule", icon: <CalendarMonthOutlinedIcon fontSize="inherit" />, badge: 1 },
  ];

  const settingsItems = [
    { key: "SchoolNews", href: "/school-news", icon: <NewspaperOutlinedIcon fontSize="inherit" /> },
    { key: "SchoolActivities", href: "/school-activities", icon: <CelebrationOutlinedIcon fontSize="inherit" /> },
    { key: "WhatsNew", href: "/whats-new", icon: <LightbulbOutlinedIcon fontSize="inherit" /> },
    { key: "Settings", href: "/settings", icon: <SettingsOutlinedIcon fontSize="inherit" /> },
  ];

  return (
    <Box className="Sidebar-wrapper" sx={classes.wrapper}>
      <Box className="Sidebar-logo" sx={classes.logo}>
        <Box className="Sidebar-logoContent" sx={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Avatar
            className="Sidebar-logoAvatar"
            sx={{
              width: 26,
              height: 26,
              bgcolor: "#111827",
              color: "#fff",
              fontSize: 12,
              borderRadius: "16px",
            }}
          >
            <SchoolOutlinedIcon fontSize="small" />
          </Avatar>
          <Box className="Sidebar-logoText">
            <Typography className="Sidebar-logoTitle" variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.1 }} noWrap>
              {languageData?.FusionBoard ?? "FusionBoard"}
            </Typography>
            <Typography
              className="Sidebar-logoSubtitle"
              variant="caption"
              sx={{ color: cssVariables.palette.textSecondary }}
              noWrap
            >
              {languageData?.ProjectDashboard ?? "Project dashboard"}
            </Typography>
          </Box>
        </Box>
        <Box className="Sidebar-logoActions" sx={classes.logoActions}>
          <IconButton className="Sidebar-toggleButton" size="small" onClick={() => dispatch(toggleSidebar())}>
            <MenuOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            className="Sidebar-logoActionButton"
            size="small"
            sx={{
              width: 24,
              height: 24,
              borderRadius: "16px",
              border: "1px solid #E2DED7",
              backgroundColor: "#FFFFFF",
              "&:hover": { backgroundColor: "#F9FAFB" },
            }}
          >
            <RectangleOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box className="Sidebar-section">
        <Typography className="Sidebar-sectionLabel" sx={classes.sectionLabel}>
          {languageData?.MainMenu ?? "Main menu"}
        </Typography>
        <List className="Sidebar-navList" dense disablePadding sx={classes.navList}>
          {mainMenuItems.map((item) => {
            const isSelected = pathname === item.href;
            const label = languageData?.[item.key as keyof typeof languageData] ?? item.key;

            return (
              <ListItemButton
                className="Sidebar-navButton"
                key={item.href}
                component={Link}
                href={item.href}
                selected={isSelected}
                sx={classes.navButton}
              >
                {/* Left side (icon + text) */}
                <Box className="Sidebar-navLeft" sx={{ display: "flex", alignItems: "center", gap: "16px", minWidth: 0 }}>
                  <Box
                    className="Sidebar-navIcon"
                    sx={{
                      ...classes.navIcon,
                      color: isSelected ? "#111827" : "#6B7280",
                    }}
                  >
                    {item.icon}
                  </Box>

                  <ListItemText
                    className="Sidebar-navText"
                    primary={label}
                    primaryTypographyProps={{
                      ...classes.navText,
                      color: isSelected ? "#111827" : "#374151",
                      noWrap: true,
                    }}
                    sx={{ margin: 0 }}
                  />
                </Box>

                {/* Right side badge (like screenshot) */}
                {item?.badge ? (
                  <Badge
                    className="Sidebar-navBadge"
                    badgeContent={item.badge}
                    sx={classes.badge}
                    overlap="circular"
                  >
                    <Box className="Sidebar-navBadgeSpacer" sx={{ width: 10, height: 10 }} />
                  </Badge>
                ) : (
                  <Box className="Sidebar-navRightSpacer" sx={{ width: 18 }} />
                )}
              </ListItemButton>
            );
          })}
        </List>

      </Box>

      <Box className="Sidebar-section">
        <Typography className="Sidebar-sectionLabel" sx={classes.sectionLabel}>
          {languageData?.SettingsAndNews ?? "Settings and news"}
        </Typography>
        <List className="Sidebar-navList" dense disablePadding sx={classes.navList}>
          {settingsItems.map((item) => {
            const isSelected = pathname === item.href;
            const label = languageData?.[item.key as keyof typeof languageData] ?? item.key;
            return (
              <ListItemButton
                className="Sidebar-navButton"
                key={item.href}
                component={Link}
                href={item.href}
                selected={isSelected}
                sx={classes.navButton}
              >
                <Box className="Sidebar-navLeft" sx={{ display: "flex", alignItems: "center", gap: "16px", minWidth: 0 }}>
                  <Box
                    className="Sidebar-navIcon"
                    sx={{
                      ...classes.navIcon,
                      color: isSelected ? "#111827" : "#6B7280",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <ListItemText
                    className="Sidebar-navText"
                    primary={label}
                    primaryTypographyProps={{
                      ...classes.navText,
                      color: isSelected ? "#111827" : "#374151",
                      noWrap: true,
                    }}
                    sx={{ margin: 0 }}
                  />
                </Box>
                <Box className="Sidebar-navRightSpacer" sx={{ width: 18 }} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
      <Box className="Sidebar-footerSection" sx={classes.footerSection}>
        <Typography className="Sidebar-sectionLabel" sx={classes.sectionLabel}>
          {languageData?.Account ?? "Account"}
        </Typography>
        <Box className="Sidebar-footer" sx={classes.footer}>
          <Avatar className="Sidebar-footerAvatar" sx={{ width: 28, height: 28, background: "#111827" }}>
            F
          </Avatar>
          <Box className="Sidebar-footerText">
            <Typography className="Sidebar-footerName" variant="body2" sx={{ fontWeight: 600 }}>
              Florin
            </Typography>
            <Typography className="Sidebar-footerRole" variant="caption" sx={{ color: cssVariables.palette.textSecondary }}>
              {languageData?.Admin ?? "Admin"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
