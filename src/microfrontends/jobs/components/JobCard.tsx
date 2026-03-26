"use client";

import { DragEvent } from "react";
import { Box, Typography } from "@mui/material";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import type { Job } from "@/types/jobs";

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

export default function JobCard({ job, onClick }: JobCardProps) {
  function handleDragStart(e: DragEvent) {
    e.dataTransfer.setData("jobId", String(job.id));
  }

  const isFollowUpDue = job.followUpDate && new Date(job.followUpDate) <= new Date();
  const salary = job.salaryMin || job.salaryMax
    ? `${job.salaryMin ? `${job.salaryMin / 1000}k` : "?"}–${job.salaryMax ? `${job.salaryMax / 1000}k` : "?"} ${job.salaryCurrency ?? "EUR"}`
    : null;

  return (
    <Box
      draggable
      onDragStart={handleDragStart}
      onClick={onClick}
      sx={{
        p: 1.5,
        borderRadius: "12px",
        backgroundColor: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.05)",
        cursor: "grab",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.07)",
          borderColor: "rgba(255,255,255,0.12)",
          transform: "translateY(-2px)",
          boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
        },
        "&:active": { cursor: "grabbing", transform: "scale(0.98)" },
      }}
    >
      <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#F9FAFB", lineHeight: 1.3, mb: 0.25 }} noWrap>
        {job.company}
      </Typography>
      <Typography sx={{ fontSize: "0.67rem", color: "#9CA3AF", mb: 0.75 }} noWrap>
        {job.role}
      </Typography>
      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", alignItems: "center" }}>
        {salary && (
          <Box sx={{
            fontSize: "0.58rem", fontWeight: 700, color: "#10B981",
            px: 0.75, py: 0.25, borderRadius: "6px",
            backgroundColor: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.15)",
          }}>
            {salary}
          </Box>
        )}
        {isFollowUpDue && (
          <Box sx={{
            fontSize: "0.58rem", fontWeight: 700, color: "#F59E0B",
            px: 0.75, py: 0.25, borderRadius: "6px",
            backgroundColor: "rgba(245,158,11,0.1)",
            border: "1px solid rgba(245,158,11,0.15)",
            animation: "pulse 2s infinite",
          }}>
            Follow up!
          </Box>
        )}
        {job.notes && (
          <NotesOutlinedIcon sx={{ fontSize: 12, color: "#374151" }} />
        )}
      </Box>
    </Box>
  );
}
