"use client";

import { FC } from "react";
import { Box, Typography, Chip, Avatar, AvatarGroup } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { useClasses } from "@/styles/useClasses";
import cssVariables from "@/theme/cssVariables";
import { useTranslation } from "@/i18n/useTranslation";

interface CustomersWidgetStyles {
  wrapper: any;
  row: any;
}

const CustomersWidgetStyles = (theme: Theme): CustomersWidgetStyles => ({
  wrapper: {
    backgroundColor: cssVariables.palette.bgCard,
    borderRadius: cssVariables.radius.xl,
    padding: cssVariables.spacing.cardPadding,
    boxShadow: "0 18px 45px rgba(15,23,42,0.04)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
});

const CustomersWidget: FC = () => {
  const classes = useClasses(CustomersWidgetStyles, { name: "CustomersWidget" });
  const { languageData } = useTranslation();

  return (
    <Box sx={classes.wrapper}>
      <Typography variant="subtitle1">{languageData?.Customers}</Typography>
      <Typography variant="body2" color="text.secondary">
        {languageData?.FirstCustomer}
      </Typography>

      <Box sx={classes.row}>
        <AvatarGroup max={3}>
          <Avatar>A</Avatar>
          <Avatar>J</Avatar>
          <Avatar>M</Avatar>
        </AvatarGroup>
        <Chip
          label={languageData?.NewOrder}
          size="small"
          sx={{
            backgroundColor: cssVariables.palette.primarySoft,
            color: cssVariables.palette.primary,
          }}
        />
      </Box>
    </Box>
  );
};

export default CustomersWidget;
