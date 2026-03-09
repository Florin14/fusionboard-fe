"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { Box, TextField } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { useClasses } from "@/styles/useClasses";
import cssVariables from "@/theme/cssVariables";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { closeAddExam } from "@/store/slices/uiSlice";
import { addExamAsync } from "@/store/slices/examsSlice";
import ModalShell from "@/components/common/ModalShell";

interface AddExamDialogStyles {
  grid: any;
  field: any;
}

const AddExamDialogStyles = (theme: Theme): AddExamDialogStyles => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 12,
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
  },
  field: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      background: "#F7F6F3",
    },
    "& .MuiInputLabel-root": {
      color: cssVariables.palette.textSecondary,
    },
  },
});

const accentPalette = ["#E0E7FF", "#FEF3C7", "#FDE2E2", "#D1FAE5"];

const AddExamDialog: FC = () => {
  const classes = useClasses(AddExamDialogStyles, { name: "AddExamDialog" });
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.ui.addExamOpen);
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [badge, setBadge] = useState("");

  useEffect(() => {
    if (open) {
      setCode("");
      setTitle("");
      setDate("");
      setStart("");
      setEnd("");
      setBadge("");
    }
  }, [open]);

  const canSubmit = code.trim() && title.trim();

  const accent = useMemo(() => {
    const idx = Math.abs(Number(code) || 0) % accentPalette.length;
    return accentPalette[idx];
  }, [code]);

  const handleClose = () => dispatch(closeAddExam());

  const handleSubmit = () => {
    if (!canSubmit) return;
    const timeText = date
      ? `${date}${start ? ` - ${start}` : ""}${end ? ` to ${end}` : ""}`
      : "TBD";
    dispatch(
      addExamAsync({
        id: String(Date.now()),
        code: code.trim(),
        title: title.trim(),
        time: timeText,
        accent,
        badge: badge.trim() || "New",
      })
    );
    dispatch(closeAddExam());
  };

  return (
    <ModalShell
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title="Add new exam"
      subtitle="Create a new exam entry for the upcoming list."
      submitLabel="Save exam"
      cancelLabel="Cancel"
    >
      <Box className="AddExamDialog-grid" sx={classes.grid}>
        <TextField
          className="AddExamDialog-field"
          label="Class code"
          placeholder="302"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          fullWidth
          sx={classes.field}
        />
        <TextField
          className="AddExamDialog-field"
          label="Exam title"
          placeholder="Math Exam"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          fullWidth
          sx={classes.field}
        />
        <TextField
          className="AddExamDialog-field"
          label="Date"
          placeholder="10 Feb"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          fullWidth
          sx={classes.field}
        />
        <TextField
          className="AddExamDialog-field"
          label="Start time"
          placeholder="7:30am"
          value={start}
          onChange={(event) => setStart(event.target.value)}
          fullWidth
          sx={classes.field}
        />
        <TextField
          className="AddExamDialog-field"
          label="End time"
          placeholder="9:00am"
          value={end}
          onChange={(event) => setEnd(event.target.value)}
          fullWidth
          sx={classes.field}
        />
        <TextField
          className="AddExamDialog-field"
          label="Badge"
          placeholder="4 Days left"
          value={badge}
          onChange={(event) => setBadge(event.target.value)}
          fullWidth
          sx={classes.field}
        />
      </Box>
    </ModalShell>
  );
};

export default AddExamDialog;
