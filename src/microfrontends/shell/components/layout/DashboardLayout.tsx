"use client";

import { FC, ReactNode } from "react";
import { Box } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { useClasses } from "@/styles/useClasses";
import cssVariables from "@/theme/cssVariables";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface DashboardLayoutStyles {
  wrapper: any;
  contentWrapper: any;
  mainContent: any;
  rightColumn: any;
}

const DashboardLayoutStyles = (theme: Theme): DashboardLayoutStyles => ({
  wrapper: {
    height: "100%",
    minHeight: "100vh",
    overflow: "hidden",
    backgroundColor: cssVariables.palette.bgBody,
    display: "grid",
    gridTemplateColumns: "230px 1fr",
    gap: "14px",
    padding: "14px",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 32px)",
    minHeight: 0,
    overflow: "hidden",
    border: "1px solid " + cssVariables.palette.borderSoft,
    borderRadius: "16px",
    background: "white",
  },
  mainContent: {
    height: "100%",
    minHeight: 0,
    overflow: "auto",
    overflowX: "hidden",
    padding: "20px 24px 24px",
    scrollbarWidth: "thin",
    scrollbarColor: "#111827 transparent",
    "&::-webkit-scrollbar": {
      width: 4,
      height: 4,
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#111827",
      borderRadius: 8,
    },
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
});

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const classes = useClasses(DashboardLayoutStyles, { name: "DashboardLayout" });
  const sidebarCollapsed = useSelector((state: RootState) => state.ui.sidebarCollapsed);

  return (
    <Box
      sx={{
        ...classes.wrapper,
        gridTemplateColumns: sidebarCollapsed ? "0px 1fr" : "260px 1fr",
      }}
    >
      <Box sx={{ width: sidebarCollapsed ? 0 : "auto", overflow: "hidden" }}>
        <Sidebar />
      </Box>
      <Box sx={classes.contentWrapper}>
        <Box sx={classes.mainContent}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
