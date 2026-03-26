"use client";

import { useState, useTransition } from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import type { Job, JobStatus, JobStats } from "@/types/jobs";
import { updateJobStatus } from "@/lib/jobs";
import KanbanColumn from "./KanbanColumn";
import JobDetailDialog from "./JobDetailDialog";
import AddJobDialog from "./AddJobDialog";

const COLUMNS: { status: JobStatus; label: string; color: string }[] = [
  { status: "WISHLIST", label: "Wishlist", color: "#6B7280" },
  { status: "APPLIED", label: "Applied", color: "#3B82F6" },
  { status: "PHONE_SCREEN", label: "Phone Screen", color: "#8B5CF6" },
  { status: "INTERVIEW", label: "Interview", color: "#F59E0B" },
  { status: "OFFER", label: "Offer", color: "#10B981" },
  { status: "REJECTED", label: "Rejected", color: "#EF4444" },
];

interface KanbanBoardProps {
  initialJobs: Job[];
  initialStats: JobStats | null;
}

export default function KanbanBoard({ initialJobs, initialStats }: KanbanBoardProps) {
  const [jobs, setJobs] = useState(initialJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [addToStatus, setAddToStatus] = useState<JobStatus>("WISHLIST");
  const [isPending, startTransition] = useTransition();

  function handleDrop(jobId: number, newStatus: JobStatus) {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
    );
    startTransition(async () => {
      await updateJobStatus(jobId, newStatus);
    });
  }

  function handleAddToColumn(status: JobStatus) {
    setAddToStatus(status);
    setAddOpen(true);
  }

  function handleJobCreated(job: Job) {
    setJobs((prev) => [job, ...prev]);
  }

  function handleJobUpdated(job: Job) {
    setJobs((prev) => prev.map((j) => (j.id === job.id ? job : j)));
  }

  function handleJobDeleted(jobId: number) {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
  }

  const stats = initialStats;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
            <Typography sx={{ fontSize: "1.75rem", fontWeight: 800, color: "#F9FAFB", letterSpacing: "-0.03em" }}>
              Job Tracker
            </Typography>
            {stats && (
              <Chip
                label={`${stats.total} tracked`}
                size="small"
                sx={{ fontWeight: 700, fontSize: "0.55rem", height: 22, color: "#8B5CF6", backgroundColor: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.15)" }}
              />
            )}
          </Box>
          <Typography sx={{ fontSize: "0.8rem", color: "#6B7280" }}>
            Track your applications from wishlist to offer
          </Typography>
        </Box>
        <Button
          onClick={() => { setAddToStatus("WISHLIST"); setAddOpen(true); }}
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
          Add Job
        </Button>
      </Box>

      {/* Stats Row */}
      {stats && (
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          {stats.streak > 0 && (
            <Box sx={{
              display: "flex", alignItems: "center", gap: 1, px: 2, py: 1,
              borderRadius: "12px",
              backgroundColor: "rgba(245,158,11,0.06)",
              border: "1px solid rgba(245,158,11,0.12)",
            }}>
              <WhatshotOutlinedIcon sx={{ fontSize: 16, color: "#F59E0B" }} />
              <Box>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 800, color: "#F59E0B", lineHeight: 1 }}>{stats.streak}</Typography>
                <Typography sx={{ fontSize: "0.55rem", color: "#92743A", fontWeight: 600 }}>day streak</Typography>
              </Box>
            </Box>
          )}
          {stats.thisWeek > 0 && (
            <Box sx={{
              display: "flex", alignItems: "center", gap: 1, px: 2, py: 1,
              borderRadius: "12px",
              backgroundColor: "rgba(59,130,246,0.06)",
              border: "1px solid rgba(59,130,246,0.12)",
            }}>
              <TrendingUpOutlinedIcon sx={{ fontSize: 16, color: "#3B82F6" }} />
              <Box>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 800, color: "#3B82F6", lineHeight: 1 }}>{stats.thisWeek}</Typography>
                <Typography sx={{ fontSize: "0.55rem", color: "#4A6FA5", fontWeight: 600 }}>this week</Typography>
              </Box>
            </Box>
          )}
          {stats.followUpsDue > 0 && (
            <Box sx={{
              display: "flex", alignItems: "center", gap: 1, px: 2, py: 1,
              borderRadius: "12px",
              backgroundColor: "rgba(236,72,153,0.06)",
              border: "1px solid rgba(236,72,153,0.12)",
            }}>
              <CalendarTodayOutlinedIcon sx={{ fontSize: 14, color: "#EC4899" }} />
              <Box>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 800, color: "#EC4899", lineHeight: 1 }}>{stats.followUpsDue}</Typography>
                <Typography sx={{ fontSize: "0.55rem", color: "#9B4D76", fontWeight: 600 }}>follow-ups</Typography>
              </Box>
            </Box>
          )}
        </Box>
      )}

      {/* Kanban Columns */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLUMNS.length}, minmax(200px, 1fr))`,
          gap: 1.5,
          overflowX: "auto",
          pb: 1,
          minHeight: 400,
        }}
      >
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.status}
            status={col.status}
            label={col.label}
            color={col.color}
            jobs={jobs.filter((j) => j.status === col.status)}
            onDrop={handleDrop}
            onCardClick={setSelectedJob}
            onAdd={() => handleAddToColumn(col.status)}
          />
        ))}
      </Box>

      <AddJobDialog
        open={addOpen}
        defaultStatus={addToStatus}
        onClose={() => setAddOpen(false)}
        onCreated={handleJobCreated}
      />

      <JobDetailDialog
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onUpdated={handleJobUpdated}
        onDeleted={handleJobDeleted}
      />
    </Box>
  );
}
