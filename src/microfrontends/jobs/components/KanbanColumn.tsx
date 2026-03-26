"use client";

import { useState, DragEvent } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import type { Job, JobStatus } from "@/types/jobs";
import JobCard from "./JobCard";

interface KanbanColumnProps {
  status: JobStatus;
  label: string;
  color: string;
  jobs: Job[];
  onDrop: (jobId: number, newStatus: JobStatus) => void;
  onCardClick: (job: Job) => void;
  onAdd: () => void;
}

export default function KanbanColumn({ status, label, color, jobs, onDrop, onCardClick, onAdd }: KanbanColumnProps) {
  const [dragOver, setDragOver] = useState(false);

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave() {
    setDragOver(false);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const jobId = parseInt(e.dataTransfer.getData("jobId"), 10);
    if (!isNaN(jobId)) {
      onDrop(jobId, status);
    }
  }

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        backgroundColor: dragOver ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${dragOver ? `${color}35` : "rgba(255,255,255,0.05)"}`,
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        minHeight: 300,
        ...(dragOver && {
          boxShadow: `0 0 20px ${color}10`,
        }),
      }}
    >
      {/* Column Header */}
      <Box sx={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        px: 1.5, py: 1.25,
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{
            width: 8, height: 8, borderRadius: "50%",
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}40`,
          }} />
          <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "#E5E7EB" }}>{label}</Typography>
          <Box sx={{
            minWidth: 20, height: 18, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: "6px",
            backgroundColor: jobs.length > 0 ? `${color}15` : "rgba(255,255,255,0.04)",
          }}>
            <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: jobs.length > 0 ? color : "#4B5563", fontFamily: "monospace" }}>
              {jobs.length}
            </Typography>
          </Box>
        </Box>
        <IconButton size="small" onClick={onAdd} sx={{
          color: "#374151", p: 0.5,
          borderRadius: "8px",
          "&:hover": { color, backgroundColor: `${color}12` },
        }}>
          <AddOutlinedIcon sx={{ fontSize: 15 }} />
        </IconButton>
      </Box>

      {/* Cards */}
      <Box sx={{ flex: 1, p: 1, display: "flex", flexDirection: "column", gap: 0.75, overflowY: "auto" }}>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onClick={() => onCardClick(job)} />
        ))}
        {jobs.length === 0 && (
          <Box sx={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
            minHeight: 80, borderRadius: "10px",
            border: "1px dashed rgba(255,255,255,0.06)",
          }}>
            <Typography sx={{ fontSize: "0.6rem", color: "#2D3748" }}>Drop here</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
