"use client";

import { FC, ReactNode } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { useClasses } from "@/styles/useClasses";
import cssVariables from "@/theme/cssVariables";

interface ModalShellStyles {
  paper: any;
  title: any;
  titleWrap: any;
  content: any;
  actions: any;
  cancelButton: any;
  submitButton: any;
}

const ModalShellStyles = (theme: Theme): ModalShellStyles => ({
  paper: {
    borderRadius: "18px",
    background: "#fff",
    border: `1px solid ${cssVariables.palette.borderSoft}`,
    boxShadow: "0 24px 64px rgba(17, 24, 39, 0.18)",
  },
  title: {
    fontWeight: 700,
    paddingBottom: 4,
  },
  titleWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  content: {
    paddingTop: 6,
  },
  actions: {
    padding: "12px 20px 18px",
    display: "flex",
    gap: 10,
  },
  cancelButton: {
    borderRadius: 999,
    padding: "6px 16px",
  },
  submitButton: {
    borderRadius: 999,
    padding: "6px 18px",
    background: cssVariables.palette.textPrimary,
  },
});

interface ModalShellProps {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  children: ReactNode;
}

const ModalShell: FC<ModalShellProps> = ({
  open,
  title,
  subtitle,
  onClose,
  onSubmit,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  maxWidth = "sm",
  children,
}) => {
  const classes = useClasses(ModalShellStyles, { name: "ModalShell" });

  return (
    <Dialog
      className="ModalShell-root"
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      PaperProps={{ sx: classes.paper }}
    >
      <DialogTitle className="ModalShell-title" sx={classes.title}>
        <Box className="ModalShell-titleWrap" sx={classes.titleWrap}>
          {title}
          {subtitle ? (
            <Typography className="ModalShell-subtitle" variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          ) : null}
        </Box>
      </DialogTitle>
      <DialogContent className="ModalShell-content" sx={classes.content}>
        {children}
      </DialogContent>
      <DialogActions className="ModalShell-actions" sx={classes.actions}>
        <Button className="ModalShell-cancel" onClick={onClose} color="inherit" sx={classes.cancelButton}>
          {cancelLabel}
        </Button>
        {onSubmit ? (
          <Button
            className="ModalShell-submit"
            variant="contained"
            onClick={onSubmit}
            sx={classes.submitButton}
          >
            {submitLabel}
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

export default ModalShell;
