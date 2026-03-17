"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert, Typography, Box } from "@mui/material";
import { shiftToast } from "@/store/slices/notificationsSlice";
import type { RootState } from "@/store";
import type { NotificationData } from "@/lib/websocket";

export default function NotificationToast() {
  const dispatch = useDispatch();
  const toastQueue = useSelector(
    (state: RootState) => state.notifications.toastQueue
  );
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<NotificationData | null>(null);

  useEffect(() => {
    if (!open && toastQueue.length > 0) {
      setCurrent(toastQueue[0]);
      setOpen(true);
    }
  }, [toastQueue, open]);

  const handleClose = (_event?: any, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleExited = () => {
    dispatch(shiftToast());
    setCurrent(null);
  };

  if (!current) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionProps={{ onExited: handleExited }}
      sx={{ mt: 7 }}
    >
      <Alert
        onClose={handleClose}
        severity="info"
        variant="filled"
        sx={{
          bgcolor: "rgba(30, 30, 46, 0.95)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${current.color}40`,
          borderLeft: `4px solid ${current.color}`,
          color: "#fff",
          minWidth: 320,
          "& .MuiAlert-icon": { display: "none" },
          "& .MuiAlert-action": { color: "rgba(255,255,255,0.5)" },
        }}
      >
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, color: current.color }}
          >
            {current.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.7)", mt: 0.25 }}
          >
            {current.message}
          </Typography>
        </Box>
      </Alert>
    </Snackbar>
  );
}
