"use client";

import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { useClasses } from "@/styles/useClasses";
import cssVariables from "@/theme/cssVariables";

interface SectionPlaceholderStyles {
  wrapper: any;
  title: any;
  subtitle: any;
  card: any;
}

const SectionPlaceholderStyles = (theme: Theme): SectionPlaceholderStyles => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: cssVariables.palette.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: cssVariables.palette.textSecondary,
  },
  card: {
    borderRadius: "14px",
    border: `1px solid ${cssVariables.palette.borderSoft}`,
    background: cssVariables.palette.bgCard,
    padding: "16px",
  },
});

interface SectionPlaceholderProps {
  title: string;
  subtitle?: string;
}

const SectionPlaceholder: FC<SectionPlaceholderProps> = ({ title, subtitle }) => {
  const classes = useClasses(SectionPlaceholderStyles, { name: "SectionPlaceholder" });

  return (
    <Box sx={classes.wrapper}>
      <Box>
        <Typography sx={classes.title}>{title}</Typography>
        {subtitle ? <Typography sx={classes.subtitle}>{subtitle}</Typography> : null}
      </Box>
      <Box sx={classes.card}>
        <Typography sx={classes.subtitle}>Content will be added here.</Typography>
      </Box>
    </Box>
  );
};

export default SectionPlaceholder;
