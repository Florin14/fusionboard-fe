"use client";

import { useState, useTransition } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
  Box, Typography, Chip, IconButton, Slide,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import type { Task, TaskPriority } from "@/types/tasks";
import { createTask } from "@/lib/tasks";

const PRIORITIES: { value: TaskPriority; label: string; color: string }[] = [
  { value: "LOW", label: "Low", color: "#6B7280" },
  { value: "MEDIUM", label: "Medium", color: "#3B82F6" },
  { value: "HIGH", label: "High", color: "#F59E0B" },
  { value: "URGENT", label: "Urgent", color: "#EF4444" },
];

const RECURRING = [
  { value: "", label: "None" },
  { value: "DAILY", label: "Daily" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "MONTHLY", label: "Monthly" },
];

const dialogSx = {
  "& .MuiDialog-paper": {
    backgroundColor: "#141726",
    backgroundImage: "none",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.08)",
    minWidth: 460,
    maxWidth: 520,
    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
  },
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "rgba(255,255,255,0.04)",
    transition: "all 0.2s",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.06)" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99,102,241,0.3)" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#6366F1" },
    "&.Mui-focused": { backgroundColor: "rgba(99,102,241,0.04)" },
  },
  "& .MuiInputLabel-root": { color: "#4B5563", fontSize: "0.82rem" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#818CF8" },
  "& .MuiInputBase-input": { color: "#F9FAFB", fontSize: "0.85rem" },
};

interface AddTaskDialogProps {
  open: boolean;
  categories: string[];
  onClose: () => void;
  onCreated: (task: Task) => void;
}

export default function AddTaskDialog({ open, categories, onClose, onCreated }: AddTaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
  const [category, setCategory] = useState("");
  const [recurringType, setRecurringType] = useState("");
  const [isPending, startTransition] = useTransition();

  function reset() {
    setTitle(""); setDescription(""); setDueDate(null); setPriority("MEDIUM"); setCategory(""); setRecurringType("");
  }

  function handleSubmit() {
    if (!title.trim()) return;
    startTransition(async () => {
      const task = await createTask({
        title: title.trim(),
        description: description.trim() || undefined,
        due_date: dueDate ? dueDate.toISOString() : undefined,
        priority,
        category: category.trim() || undefined,
        recurring_type: recurringType || undefined,
      });
      onCreated(task);
      reset();
      onClose();
    });
  }

  return (
    <Dialog open={open} onClose={onClose} sx={dialogSx} TransitionComponent={Slide as any} TransitionProps={{ direction: "up" } as any}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 3, pt: 2.5, pb: 1 }}>
        <Typography sx={{ color: "#F9FAFB", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
          New Task
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: "#4B5563", "&:hover": { color: "#9CA3AF", backgroundColor: "rgba(255,255,255,0.05)" } }}>
          <CloseOutlinedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, px: 3, pt: "4px !important", pb: 1 }}>
        {/* Title */}
        <TextField
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          autoFocus
          sx={{
            ...fieldSx,
            "& .MuiInputBase-input": { color: "#F9FAFB", fontSize: "1rem", fontWeight: 500 },
            "& .MuiOutlinedInput-root": {
              ...fieldSx["& .MuiOutlinedInput-root"],
              borderRadius: "14px",
              py: 0.5,
            },
          }}
        />

        {/* Description */}
        <TextField
          placeholder="Add a description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={2}
          fullWidth
          sx={fieldSx}
        />

        {/* Priority Selection */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1 }}>
            <FlagOutlinedIcon sx={{ fontSize: 14, color: "#4B5563" }} />
            <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Priority
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 0.75 }}>
            {PRIORITIES.map((p) => (
              <Chip
                key={p.value}
                label={p.label}
                onClick={() => setPriority(p.value)}
                sx={{
                  fontSize: "0.72rem", fontWeight: 600, height: 30,
                  borderRadius: "10px", cursor: "pointer",
                  color: priority === p.value ? p.color : "#4B5563",
                  backgroundColor: priority === p.value ? `${p.color}18` : "rgba(255,255,255,0.03)",
                  border: `1.5px solid ${priority === p.value ? `${p.color}40` : "rgba(255,255,255,0.06)"}`,
                  transition: "all 0.15s",
                  "&:hover": { backgroundColor: `${p.color}12`, borderColor: `${p.color}30` },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Date & Category Row */}
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Due date"
              value={dueDate}
              onChange={setDueDate}
              slotProps={{
                textField: { size: "small", sx: { ...fieldSx, flex: 1 } },
                popper: {
                  sx: {
                    "& .MuiPaper-root": {
                      backgroundColor: "#1a1d2e",
                      backgroundImage: "none",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "16px",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                      "& .MuiPickersDay-root": { color: "#E5E7EB", "&.Mui-selected": { backgroundColor: "#6366F1" }, "&:hover": { backgroundColor: "rgba(99,102,241,0.2)" } },
                      "& .MuiPickersCalendarHeader-label": { color: "#F9FAFB" },
                      "& .MuiIconButton-root": { color: "#6B7280" },
                      "& .MuiDayCalendar-weekDayLabel": { color: "#4B5563" },
                      "& .MuiClock-pin, & .MuiClockPointer-root": { backgroundColor: "#6366F1" },
                      "& .MuiClockPointer-thumb": { borderColor: "#6366F1" },
                      "& .MuiClockNumber-root": { color: "#E5E7EB" },
                      "& .MuiClock-clock": { backgroundColor: "rgba(255,255,255,0.04)" },
                      "& .MuiTypography-root": { color: "#E5E7EB" },
                      "& .MuiTabs-indicator": { backgroundColor: "#6366F1" },
                      "& .MuiTab-root": { color: "#6B7280", "&.Mui-selected": { color: "#818CF8" } },
                      "& .MuiPickersYear-yearButton, & .MuiPickersMonth-monthButton": { color: "#E5E7EB", "&.Mui-selected": { backgroundColor: "#6366F1" }, "&:hover": { backgroundColor: "rgba(99,102,241,0.2)" } },
                    },
                  },
                },
              }}
              format="DD MMM YYYY, HH:mm"
            />
          </LocalizationProvider>
          <TextField
            label="Category"
            placeholder="e.g. Work"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            size="small"
            sx={{ ...fieldSx, flex: 1 }}
          />
        </Box>

        {/* Category Quick Picks */}
        {categories.length > 0 && !category && (
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {categories.map((c) => (
              <Chip
                key={c} label={c} size="small"
                onClick={() => setCategory(c)}
                sx={{
                  fontSize: "0.6rem", height: 22, cursor: "pointer",
                  color: "#6B7280", backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  "&:hover": { backgroundColor: "rgba(99,102,241,0.1)", borderColor: "rgba(99,102,241,0.2)", color: "#818CF8" },
                }}
              />
            ))}
          </Box>
        )}

        {/* Recurring Selection */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1 }}>
            <RepeatOutlinedIcon sx={{ fontSize: 14, color: "#4B5563" }} />
            <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Repeat
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 0.75 }}>
            {RECURRING.map((r) => (
              <Chip
                key={r.value}
                label={r.label}
                onClick={() => setRecurringType(r.value)}
                sx={{
                  fontSize: "0.72rem", fontWeight: 600, height: 30,
                  borderRadius: "10px", cursor: "pointer",
                  color: recurringType === r.value ? "#6366F1" : "#4B5563",
                  backgroundColor: recurringType === r.value ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.03)",
                  border: `1.5px solid ${recurringType === r.value ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.06)"}`,
                  transition: "all 0.15s",
                  "&:hover": { backgroundColor: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.2)" },
                }}
              />
            ))}
          </Box>
        </Box>
      </DialogContent>

      {/* Actions */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5, px: 3, pb: 2.5, pt: 1.5 }}>
        <Button onClick={onClose} sx={{
          color: "#6B7280", fontSize: "0.78rem", borderRadius: "10px", px: 2,
          "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
        }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isPending || !title.trim()}
          variant="contained"
          sx={{
            borderRadius: "12px", px: 3, py: 0.85,
            background: "linear-gradient(135deg, #6366F1, #818CF8)",
            fontWeight: 600, fontSize: "0.78rem",
            boxShadow: "0 4px 15px rgba(99,102,241,0.3)",
            "&:hover": { background: "linear-gradient(135deg, #4F46E5, #6366F1)", boxShadow: "0 6px 20px rgba(99,102,241,0.4)" },
            "&.Mui-disabled": { background: "rgba(99,102,241,0.2)", color: "rgba(255,255,255,0.3)" },
          }}
        >
          {isPending ? "Creating..." : "Create Task"}
        </Button>
      </Box>
    </Dialog>
  );
}
