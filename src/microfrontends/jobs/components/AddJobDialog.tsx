"use client";

import { useState, useTransition } from "react";
import {
  Dialog, DialogContent, Button, TextField, Box, Typography,
  IconButton, Slide, InputAdornment,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import type { Job, JobStatus } from "@/types/jobs";
import { createJob } from "@/lib/jobs";

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

interface AddJobDialogProps {
  open: boolean;
  defaultStatus: JobStatus;
  onClose: () => void;
  onCreated: (job: Job) => void;
}

export default function AddJobDialog({ open, defaultStatus, onClose, onCreated }: AddJobDialogProps) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [link, setLink] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [notes, setNotes] = useState("");
  const [isPending, startTransition] = useTransition();

  function reset() {
    setCompany(""); setRole(""); setLink(""); setSalaryMin(""); setSalaryMax(""); setNotes("");
  }

  function handleSubmit() {
    if (!company.trim() || !role.trim()) return;
    startTransition(async () => {
      const job = await createJob({
        company: company.trim(),
        role: role.trim(),
        link: link.trim() || undefined,
        salaryMin: salaryMin ? parseInt(salaryMin) : undefined,
        salaryMax: salaryMax ? parseInt(salaryMax) : undefined,
        notes: notes.trim() || undefined,
        status: defaultStatus,
      });
      onCreated(job);
      reset();
      onClose();
    });
  }

  return (
    <Dialog open={open} onClose={onClose} sx={dialogSx} TransitionComponent={Slide as any} TransitionProps={{ direction: "up" } as any}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 3, pt: 2.5, pb: 1 }}>
        <Typography sx={{ color: "#F9FAFB", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
          Add Application
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: "#4B5563", "&:hover": { color: "#9CA3AF", backgroundColor: "rgba(255,255,255,0.05)" } }}>
          <CloseOutlinedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, px: 3, pt: "4px !important", pb: 1 }}>
        {/* Company */}
        <TextField
          placeholder="Company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          fullWidth
          required
          autoFocus
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessOutlinedIcon sx={{ fontSize: 18, color: "#4B5563" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            ...fieldSx,
            "& .MuiInputBase-input": { color: "#F9FAFB", fontSize: "1rem", fontWeight: 500 },
          }}
        />

        {/* Role */}
        <TextField
          placeholder="Role / Position"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          fullWidth
          required
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
            <TextField
              placeholder="Min"
              type="number"
              value={salaryMin}
              onChange={(e) => setSalaryMin(e.target.value)}
              size="small"
              sx={{ ...fieldSx, flex: 1 }}
            />
            <Typography sx={{ color: "#374151", fontSize: "0.8rem" }}>—</Typography>
            <TextField
              placeholder="Max"
              type="number"
              value={salaryMax}
              onChange={(e) => setSalaryMax(e.target.value)}
              size="small"
              sx={{ ...fieldSx, flex: 1 }}
            />
          </Box>
        </Box>

        {/* Notes */}
        <TextField
          placeholder="Add notes about this opportunity..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          multiline
          rows={3}
          fullWidth
          sx={fieldSx}
        />
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
          disabled={isPending || !company.trim() || !role.trim()}
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
          {isPending ? "Adding..." : "Add Application"}
        </Button>
      </Box>
    </Dialog>
  );
}
