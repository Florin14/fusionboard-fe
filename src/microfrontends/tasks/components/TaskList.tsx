"use client";

import { useState, useTransition } from "react";
import {
  Box, Typography, Button, Chip, IconButton, Checkbox,
  Fade, Tooltip, LinearProgress, ToggleButtonGroup, ToggleButton,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import type { Task, TaskPriority } from "@/types/tasks";
import { toggleTaskComplete, deleteTask } from "@/lib/tasks";
import AddTaskDialog from "./AddTaskDialog";

const PRIORITY_CONFIG: Record<TaskPriority, { color: string; bg: string; label: string }> = {
  LOW: { color: "#6B7280", bg: "rgba(107,114,128,0.12)", label: "Low" },
  MEDIUM: { color: "#3B82F6", bg: "rgba(59,130,246,0.12)", label: "Medium" },
  HIGH: { color: "#F59E0B", bg: "rgba(245,158,11,0.12)", label: "High" },
  URGENT: { color: "#EF4444", bg: "rgba(239,68,68,0.12)", label: "Urgent" },
};

const priorityOrder: TaskPriority[] = ["URGENT", "HIGH", "MEDIUM", "LOW"];

interface TaskListProps {
  initialTasks: Task[];
  categories: string[];
}

export default function TaskList({ initialTasks, categories }: TaskListProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [addOpen, setAddOpen] = useState(false);
  const [filterPriority, setFilterPriority] = useState<string>("ALL");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [showCompleted, setShowCompleted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const filtered = tasks.filter((t) => {
    if (!showCompleted && t.isCompleted) return false;
    if (filterPriority !== "ALL" && t.priority !== filterPriority) return false;
    if (filterCategory !== "ALL" && t.category !== filterCategory) return false;
    return true;
  });

  const todayStr = new Date().toISOString().slice(0, 10);
  const overdue = tasks.filter((t) => !t.isCompleted && t.dueDate && t.dueDate.slice(0, 10) < todayStr).length;
  const dueToday = tasks.filter((t) => !t.isCompleted && t.dueDate && t.dueDate.slice(0, 10) === todayStr).length;
  const completed = tasks.filter((t) => t.isCompleted).length;
  const total = tasks.length;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  function handleToggle(taskId: number) {
    setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, isCompleted: !t.isCompleted, completedAt: !t.isCompleted ? new Date().toISOString() : null } : t));
    startTransition(async () => { await toggleTaskComplete(taskId); });
  }

  function handleDelete(taskId: number) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    startTransition(async () => { await deleteTask(taskId); });
  }

  function handleCreated(task: Task) {
    setTasks((prev) => [task, ...prev]);
  }

  const toggleBtnSx = {
    fontSize: "0.65rem",
    fontWeight: 600,
    px: 1.5,
    py: 0.5,
    borderRadius: "20px !important",
    border: "none !important",
    color: "#6B7280",
    textTransform: "none" as const,
    "&.Mui-selected": {
      backgroundColor: "rgba(99,102,241,0.15) !important",
      color: "#818CF8 !important",
    },
    "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
            <Typography sx={{ fontSize: "1.75rem", fontWeight: 800, color: "#F9FAFB", letterSpacing: "-0.03em" }}>
              Tasks
            </Typography>
            <Chip label={`${total - completed} active`} size="small" sx={{ fontWeight: 700, fontSize: "0.55rem", height: 22, color: "#EC4899", backgroundColor: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.15)" }} />
          </Box>
          <Typography sx={{ fontSize: "0.8rem", color: "#6B7280" }}>
            Stay on top of everything
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          {overdue > 0 && (
            <Chip
              label={`${overdue} overdue`}
              size="small"
              sx={{ fontWeight: 700, fontSize: "0.6rem", height: 24, color: "#EF4444", backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.15)", animation: "pulse 2s infinite" }}
            />
          )}
          {dueToday > 0 && (
            <Chip
              label={`${dueToday} due today`}
              size="small"
              sx={{ fontWeight: 700, fontSize: "0.6rem", height: 24, color: "#F59E0B", backgroundColor: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.15)" }}
            />
          )}
          <Button
            onClick={() => setAddOpen(true)}
            variant="contained"
            size="small"
            startIcon={<AddOutlinedIcon sx={{ fontSize: 16 }} />}
            sx={{
              borderRadius: "12px", px: 2.5, py: 1,
              background: "linear-gradient(135deg, #6366F1, #818CF8)",
              fontWeight: 600, fontSize: "0.75rem",
              boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
              "&:hover": { background: "linear-gradient(135deg, #4F46E5, #6366F1)", boxShadow: "0 6px 25px rgba(99,102,241,0.4)" },
            }}
          >
            Add Task
          </Button>
        </Box>
      </Box>

      {/* Progress Bar */}
      {total > 0 && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: "rgba(255,255,255,0.06)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 3,
                  background: "linear-gradient(90deg, #6366F1, #EC4899)",
                },
              }}
            />
          </Box>
          <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#6B7280", whiteSpace: "nowrap" }}>
            {completed}/{total} done
          </Typography>
        </Box>
      )}

      {/* Filters */}
      <Box sx={{
        display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center",
        p: 1, borderRadius: "14px",
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.04)",
      }}>
        <FilterListOutlinedIcon sx={{ fontSize: 14, color: "#4B5563", ml: 0.5 }} />
        <ToggleButtonGroup
          value={filterPriority}
          exclusive
          onChange={(_, v) => v && setFilterPriority(v)}
          size="small"
          sx={{ gap: 0.5, "& .MuiToggleButtonGroup-grouped": { border: "none" } }}
        >
          <ToggleButton value="ALL" sx={toggleBtnSx}>All</ToggleButton>
          {priorityOrder.map((p) => (
            <ToggleButton key={p} value={p} sx={{
              ...toggleBtnSx,
              "&.Mui-selected": {
                backgroundColor: `${PRIORITY_CONFIG[p].bg} !important`,
                color: `${PRIORITY_CONFIG[p].color} !important`,
              },
            }}>
              {PRIORITY_CONFIG[p].label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {categories.length > 0 && (
          <>
            <Box sx={{ width: 1, height: 16, backgroundColor: "rgba(255,255,255,0.06)" }} />
            <ToggleButtonGroup
              value={filterCategory}
              exclusive
              onChange={(_, v) => v && setFilterCategory(v)}
              size="small"
              sx={{ gap: 0.5, "& .MuiToggleButtonGroup-grouped": { border: "none" } }}
            >
              <ToggleButton value="ALL" sx={toggleBtnSx}>All</ToggleButton>
              {categories.map((c) => (
                <ToggleButton key={c} value={c} sx={toggleBtnSx}>{c}</ToggleButton>
              ))}
            </ToggleButtonGroup>
          </>
        )}

        <Box sx={{ ml: "auto" }} />
        <Chip
          label="Completed"
          size="small"
          variant={showCompleted ? "filled" : "outlined"}
          onClick={() => setShowCompleted(!showCompleted)}
          icon={showCompleted ? <CheckCircleOutlineIcon sx={{ fontSize: "14px !important" }} /> : undefined}
          sx={{
            fontSize: "0.6rem", fontWeight: 600, height: 26,
            cursor: "pointer",
            color: showCompleted ? "#10B981" : "#4B5563",
            backgroundColor: showCompleted ? "rgba(16,185,129,0.1)" : "transparent",
            borderColor: showCompleted ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.08)",
            "&:hover": { backgroundColor: showCompleted ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)" },
          }}
        />
      </Box>

      {/* Task Cards */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {filtered.length === 0 ? (
          <Box sx={{
            p: 6, textAlign: "center",
            borderRadius: "16px",
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px dashed rgba(255,255,255,0.08)",
          }}>
            <Typography sx={{ fontSize: "0.85rem", color: "#4B5563", fontWeight: 500 }}>
              No tasks yet. Add one to get started!
            </Typography>
          </Box>
        ) : filtered.map((task, i) => {
          const isOverdue = !task.isCompleted && task.dueDate && task.dueDate.slice(0, 10) < todayStr;
          const isDueToday = !task.isCompleted && task.dueDate && task.dueDate.slice(0, 10) === todayStr;
          const pConfig = PRIORITY_CONFIG[task.priority];
          return (
            <Fade in key={task.id} timeout={150 + i * 30}>
              <Box
                sx={{
                  display: "flex", alignItems: "center", px: 2, py: 1.5, gap: 1.5,
                  borderRadius: "12px",
                  backgroundColor: task.isCompleted ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isOverdue ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.05)"}`,
                  opacity: task.isCompleted ? 0.55 : 1,
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.055)",
                    borderColor: "rgba(255,255,255,0.1)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {/* Priority indicator */}
                <Box sx={{
                  width: 3, height: 32, borderRadius: 2,
                  backgroundColor: pConfig.color,
                  opacity: task.isCompleted ? 0.3 : 0.8,
                  flexShrink: 0,
                }} />

                {/* Checkbox */}
                <Checkbox
                  checked={task.isCompleted}
                  onChange={() => handleToggle(task.id)}
                  icon={<RadioButtonUncheckedIcon sx={{ fontSize: 20, color: "#374151" }} />}
                  checkedIcon={<CheckCircleOutlineIcon sx={{ fontSize: 20, color: "#10B981" }} />}
                  sx={{ p: 0.5 }}
                />

                {/* Content */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{
                    fontSize: "0.82rem", fontWeight: 600,
                    color: task.isCompleted ? "#4B5563" : "#F9FAFB",
                    textDecoration: task.isCompleted ? "line-through" : "none",
                    lineHeight: 1.4,
                  }} noWrap>
                    {task.title}
                  </Typography>
                  {task.description && (
                    <Typography sx={{ fontSize: "0.68rem", color: "#4B5563", mt: 0.2, lineHeight: 1.3 }} noWrap>
                      {task.description}
                    </Typography>
                  )}
                </Box>

                {/* Tags */}
                <Box sx={{ display: "flex", gap: 0.75, alignItems: "center", flexShrink: 0 }}>
                  {task.category && (
                    <Chip label={task.category} size="small" sx={{
                      fontSize: "0.55rem", fontWeight: 600, height: 20,
                      color: "#9CA3AF",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: "6px",
                    }} />
                  )}
                  <Chip
                    label={pConfig.label}
                    size="small"
                    sx={{
                      fontSize: "0.55rem", fontWeight: 700, height: 20,
                      color: pConfig.color,
                      backgroundColor: pConfig.bg,
                      borderRadius: "6px",
                    }}
                  />
                  {task.recurringType && (
                    <Tooltip title={`Repeats ${task.recurringType.toLowerCase()}`} arrow>
                      <Chip
                        icon={<RepeatOutlinedIcon sx={{ fontSize: "12px !important", color: "inherit !important" }} />}
                        label={task.recurringType}
                        size="small"
                        sx={{ fontSize: "0.5rem", height: 20, color: "#6366F1", backgroundColor: "rgba(99,102,241,0.1)", borderRadius: "6px" }}
                      />
                    </Tooltip>
                  )}
                  {task.dueDate && (
                    <Chip
                      icon={<CalendarTodayOutlinedIcon sx={{ fontSize: "10px !important", color: "inherit !important" }} />}
                      label={new Date(task.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      size="small"
                      sx={{
                        fontSize: "0.55rem", fontWeight: 600, height: 20,
                        color: isOverdue ? "#EF4444" : isDueToday ? "#F59E0B" : "#6B7280",
                        backgroundColor: isOverdue ? "rgba(239,68,68,0.1)" : isDueToday ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.04)",
                        borderRadius: "6px",
                      }}
                    />
                  )}
                  <Tooltip title="Delete" arrow>
                    <IconButton size="small" onClick={() => handleDelete(task.id)} sx={{
                      color: "#2D3748", p: 0.5,
                      "&:hover": { color: "#EF4444", backgroundColor: "rgba(239,68,68,0.1)" },
                    }}>
                      <DeleteOutlineOutlinedIcon sx={{ fontSize: 15 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Fade>
          );
        })}
      </Box>

      <AddTaskDialog open={addOpen} categories={categories} onClose={() => setAddOpen(false)} onCreated={handleCreated} />
    </Box>
  );
}
