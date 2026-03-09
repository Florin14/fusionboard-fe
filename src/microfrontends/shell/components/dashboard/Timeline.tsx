"use client";

import { FC } from "react";
import { Box, Typography, Chip } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { useClasses } from "@/styles/useClasses";
import cssVariables from "@/theme/cssVariables";
import { useTranslation } from "@/i18n/useTranslation";

interface TimelineStyles {
  wrapper: any;
  itemRow: any;
  bullet: any;
}

const TimelineStyles = (theme: Theme): TimelineStyles => ({
  wrapper: {
    backgroundColor: cssVariables.palette.bgCard,
    borderRadius: cssVariables.radius.xl,
    padding: cssVariables.spacing.cardPadding,
    boxShadow: "0 18px 45px rgba(15,23,42,0.04)",
  },
  itemRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: cssVariables.palette.primary,
    marginTop: 6,
  },
});

const Timeline: FC = () => {
  const classes = useClasses(TimelineStyles, { name: "Timeline" });
  const { languageData } = useTranslation();

  return (
    <Box sx={classes.wrapper}>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <Typography variant="subtitle1">{languageData?.Timeline}</Typography>
        <Chip label={languageData?.TimelineToday} size="small" />
      </Box>

      <Box sx={classes.itemRow}>
        <Box sx={classes.bullet} />
        <Box>
          <Typography variant="body2">{languageData?.TimelineArchived}</Typography>
          <Typography variant="caption" color="text.secondary">
            {languageData?.TimelineArchivedTime}
          </Typography>
        </Box>
      </Box>

      <Box sx={classes.itemRow}>
        <Box
          sx={{
            ...classes.bullet,
            backgroundColor: cssVariables.palette.success,
          }}
        />
        <Box>
          <Typography variant="body2">{languageData?.TimelinePayment}</Typography>
          <Typography variant="caption" color="text.secondary">
            {languageData?.TimelinePaymentTime}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Timeline;
