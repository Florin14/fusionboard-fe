"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Dialog, DialogContent, Button, TextField, Box, Typography,
  IconButton, Chip, Slide, InputAdornment,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import type { Job, JobStatus } from "@/types/jobs";
import { updateJob, deleteJob } from "@/lib/jobs";

const STATUSES: { value: JobStatus; label: string; color: string }[] = [
  { value: "WISHLIST", label: "Wishlist", color: "#6B7280" },
  { value: "APPLIED", label: "Applied", color: "#3B82F6" },
  { value: "PHONE_SCREEN", label: "Phone Screen", color: "#8B5CF6" },
  { value: "INTERVIEW", label: "Interview", color: "#F59E0B" },
  { value: "OFFER", label: "Offer", color: "#10B981" },
  { value: "REJECTED", label: "Rejected", color: "#EF4444" },
];

const dialogSx = {
  "& .MuiDialog-paper": {
    backgroundColor: "#141726",
    backgroundImage: "none",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.08)",
    minWidth: 480,
    maxWidth: 560,
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

interface JobDetailDialogProps {
  job: Job | null;
  onClose: () => void;
  onUpdated: (job: Job) => void;
  onDeleted: (jobId: number) => void;
}

export default function JobDetailDialog({ job, onClose, onUpdated, onDeleted }: JobDetailDialogProps) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<JobStatus>("WISHLIST");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [isPending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (job) {
      setCompany(job.company);
      setRole(job.role);
      setLink(job.link ?? "");
      setNotes(job.notes ?? "");
      setStatus(job.status);
      setSalaryMin(job.salaryMin ? String(job.salaryMin) : "");
      setSalaryMax(job.salaryMax ? String(job.salaryMax) : "");
      setConfirmDelete(false);
    }
  }, [job]);

  function handleSave() {
    if (!job) return;
    startTransition(async () => {
      const updated = await updateJob(job.id, {
        company, role,
        link: link || null,
        notes: notes || null,
        status,
        salary_min: salaryMin ? parseInt(salaryMin) : null,
        salary_max: salaryMax ? parseInt(salaryMax) : null,
      });
      onUpdated(updated);
      onClose();
    });
  }

  function handleDelete() {
    if (!job) return;
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    startTransition(async () => {
      await deleteJob(job.id);
      onDeleted(job.id);
      onClose();
    });
  }

  const currentStatusConfig = STATUSES.find((s) => s.value === status);

  return (
    <Dialog open={!!job} onClose={onClose} sx={dialogSx} TransitionComponent={Slide as any} TransitionProps={{ direction: "up" } as any}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 3, pt: 2.5, pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography sx={{ color: "#F9FAFB", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
            Edit Application
          </Typography>
          {currentStatusConfig && (
            <Box sx={{
              width: 8, height: 8, borderRadius: "50%",
              backgroundColor: currentStatusConfig.color,
              boxShadow: `0 0 8px ${currentStatusConfig.color}40`,
            }} />
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          {link && (
            <IconButton size="small" component="a" href={link} target="_blank" rel="noopener noreferrer" sx={{
              color: "#4B5563",
              "&:hover": { color: "#818CF8", backgroundColor: "rgba(99,102,241,0.1)" },
            }}>
              <OpenInNewOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          )}
          <IconButton size="small" onClick={handleDelete} sx={{
            color: confirmDelete ? "#EF4444" : "#4B5563",
            backgroundColor: confirmDelete ? "rgba(239,68,68,0.1)" : "transparent",
            "&:hover": { color: "#EF4444", backgroundColor: "rgba(239,68,68,0.1)" },
          }}>
            <DeleteOutlineOutlinedIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton onClick={onClose} size="small" sx={{ color: "#4B5563", "&:hover": { color: "#9CA3AF", backgroundColor: "rgba(255,255,255,0.05)" } }}>
            <CloseOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>

      {confirmDelete && (
        <Box sx={{ mx: 3, mb: 1, p: 1.5, borderRadius: "10px", backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}>
          <Typography sx={{ fontSize: "0.72rem", color: "#EF4444", fontWeight: 600 }}>
            Click delete again to confirm removal
          </Typography>
        </Box>
      )}

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, px: 3, pt: "4px !important", pb: 1 }}>
        {/* Status Chips */}
        <Box>
          <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", mb: 1 }}>
            Status
          </Typography>
          <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
            {STATUSES.map((s) => (
              <Chip
                key={s.value}
                label={s.label}
                onClick={() => setStatus(s.value)}
                sx={{
                  fontSize: "0.7rem", fontWeight: 600, height: 30,
                  borderRadius: "10px", cursor: "pointer",
                  color: status === s.value ? s.color : "#4B5563",
                  backgroundColor: status === s.value ? `${s.color}18` : "rgba(255,255,255,0.03)",
                  border: `1.5px solid ${status === s.value ? `${s.color}40` : "rgba(255,255,255,0.06)"}`,
                  transition: "all 0.15s",
                  "&:hover": { backgroundColor: `${s.color}12`, borderColor: `${s.color}30` },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Company & Role */}
        <TextField
          placeholder="Company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessOutlinedIcon sx={{ fontSize: 18, color: "#4B5563" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={fieldSx}
        />
        <TextField
          placeholder="Role / Position"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <WorkOutlineOutlinedIcon sx={{ fontSize: 18, color: "#4B5563" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={fieldSx}
        />

        {/* Job Link */}
        <TextField
          placeholder="Job posting URL"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LinkOutlinedIcon sx={{ fontSize: 18, color: "#4B5563" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={fieldSx}
        />

        {/* Salary */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1 }}>
            <AttachMoneyOutlinedIcon sx={{ fontSize: 14, color: "#4B5563" }} />
            <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Salary Range
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
            <TextField placeholder="Min" type="number" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} size="small" sx={{ ...fieldSx, flex: 1 }} />
            <Typography sx={{ color: "#374151", fontSize: "0.8rem" }}>—</Typography>
            <TextField placeholder="Max" type="number" value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} size="small" sx={{ ...fieldSx, flex: 1 }} />
          </Box>
        </Box>

        {/* Notes */}
        <TextField
          placeholder="Notes about this opportunity..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          multiline
          rows={4}
          fullWidth
          sx={fieldSx}
        />

        {/* Applied date */}
        {job?.appliedDate && (
          <Typography sx={{ fontSize: "0.68rem", color: "#374151", fontStyle: "italic" }}>
            Applied {new Date(job.appliedDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </Typography>
        )}
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
          onClick={handleSave}
          disabled={isPending}
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
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
    </Dialog>
  );
}
