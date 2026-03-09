"use client";

import { FC } from "react";
import { Box, Typography, Button, Chip, Divider } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { useClasses } from "@/styles/useClasses";
import cssVariables from "@/theme/cssVariables";
import { useTranslation } from "@/i18n/useTranslation";

interface OrderSummaryStyles {
  wrapper: any;
  headerRow: any;
  amountsRow: any;
  footerRow: any;
}

const OrderSummaryStyles = (theme: Theme): OrderSummaryStyles => ({
  wrapper: {
    backgroundColor: cssVariables.palette.bgCard,
    borderRadius: cssVariables.radius.xl,
    padding: cssVariables.spacing.cardPadding,
    boxShadow: "0 18px 45px rgba(15,23,42,0.04)",
    marginBottom: 16,
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  amountsRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 12,
  },
  footerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
});

const OrderSummaryCard: FC = () => {
  const classes = useClasses(OrderSummaryStyles, { name: "OrderSummaryCard" });
  const { languageData } = useTranslation();

  return (
    <Box sx={classes.wrapper}>
      <Box sx={classes.headerRow}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            {languageData?.OrderSummary}
          </Typography>
          <Typography variant="h6">$1,489.00</Typography>
        </Box>
        <Chip
          label={languageData?.PaymentPending}
          size="small"
          sx={{
            backgroundColor: cssVariables.palette.accentSoft,
            color: cssVariables.palette.accent,
            fontWeight: 500,
          }}
        />
      </Box>

      <Divider />

      <Box sx={classes.amountsRow}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {languageData?.Subtotal}
          </Typography>
          <Typography variant="body1">$1,500.00</Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {languageData?.Discount}
          </Typography>
          <Typography variant="body1">-$10.00</Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {languageData?.Shipping}
          </Typography>
          <Typography variant="body1">{languageData?.Free}</Typography>
        </Box>
      </Box>

      <Divider />

      <Box sx={classes.footerRow}>
        <Typography variant="body2" color="text.secondary">
          {languageData?.ReviewOrder}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" size="small">
            {languageData?.SendInvoice}
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              background: `linear-gradient(135deg, ${cssVariables.palette.primary}, ${cssVariables.palette.accent})`,
            }}
          >
            {languageData?.CollectPayment}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderSummaryCard;
