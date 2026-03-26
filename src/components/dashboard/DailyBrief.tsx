import { Box, Typography, Chip } from "@mui/material";
import Link from "next/link";
import GlassCard from "./GlassCard";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import type { DailyBrief as DailyBriefType } from "@/types/brief";

const PRIORITY_COLORS: Record<string, string> = {
  LOW: "#6B7280",
  MEDIUM: "#3B82F6",
  HIGH: "#F59E0B",
  URGENT: "#EF4444",
};

interface DailyBriefProps {
  brief: DailyBriefType;
}

export default function DailyBrief({ brief }: DailyBriefProps) {
  const hasTasks = brief.tasksTodayCount > 0;
  const hasFollowUps = brief.followUpsCount > 0;
  const hasInterviews = brief.upcomingInterviews.length > 0;
  const isEmpty = !hasTasks && !hasFollowUps && !hasInterviews && brief.overdueTasks === 0;

  if (isEmpty) return null;

  return (
    <GlassCard glowColor="rgba(139,92,246,0.12)" hover={false}>
      <Box sx={{ px: 2.5, py: 2, borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#F9FAFB" }}>Daily Brief</Typography>
          {brief.applicationStreak > 0 && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, px: 1, py: 0.25, borderRadius: "6px", backgroundColor: "rgba(245,158,11,0.1)" }}>
              <WhatshotOutlinedIcon sx={{ fontSize: 12, color: "#F59E0B" }} />
              <Typography sx={{ fontSize: "0.55rem", fontWeight: 700, color: "#F59E0B" }}>{brief.applicationStreak} day streak</Typography>
            </Box>
          )}
        </Box>
        <Typography sx={{ fontSize: "0.55rem", color: "#4B5563", fontFamily: "monospace" }}>
          {brief.totalActiveApplications} active apps
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 0 }}>
        {/* Today's Tasks */}
        <Box sx={{ px: 2.5, py: 2, borderRight: { md: "1px solid rgba(255,255,255,0.04)" } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.5 }}>
            <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 14, color: "#10B981" }} />
            <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Today&apos;s Tasks
            </Typography>
            <Chip label={`${brief.tasksCompletedToday}/${brief.tasksTodayCount}`} size="small" sx={{ fontSize: "0.5rem", height: 16, fontWeight: 700, color: "#10B981", backgroundColor: "rgba(16,185,129,0.1)" }} />
          </Box>
          {brief.tasksToday.length > 0 ? brief.tasksToday.slice(0, 4).map((t) => (
            <Box key={t.id} sx={{ display: "flex", alignItems: "center", gap: 0.75, py: 0.5 }}>
              <Box sx={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: t.isCompleted ? "#10B981" : (PRIORITY_COLORS[t.priority ?? "MEDIUM"] ?? "#6B7280"), flexShrink: 0 }} />
              <Typography sx={{ fontSize: "0.68rem", color: t.isCompleted ? "#4B5563" : "#E5E7EB", textDecoration: t.isCompleted ? "line-through" : "none", fontWeight: 500 }} noWrap>
                {t.title}
              </Typography>
            </Box>
          )) : (
            <Typography sx={{ fontSize: "0.65rem", color: "#374151" }}>No tasks for today</Typography>
          )}
          {brief.overdueTasks > 0 && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1, px: 1, py: 0.5, borderRadius: "6px", backgroundColor: "rgba(239,68,68,0.08)" }}>
              <WarningAmberOutlinedIcon sx={{ fontSize: 12, color: "#EF4444" }} />
              <Typography sx={{ fontSize: "0.6rem", fontWeight: 600, color: "#EF4444" }}>{brief.overdueTasks} overdue</Typography>
            </Box>
          )}
          <Box component={Link} href="/tasks" sx={{ display: "block", mt: 1.5, fontSize: "0.6rem", fontWeight: 600, color: "#6366F1", textDecoration: "none", "&:hover": { color: "#818CF8" } }}>
            View all tasks
          </Box>
        </Box>

        {/* Follow-ups */}
        <Box sx={{ px: 2.5, py: 2, borderRight: { md: "1px solid rgba(255,255,255,0.04)" } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.5 }}>
            <WorkOutlineOutlinedIcon sx={{ fontSize: 14, color: "#3B82F6" }} />
            <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Follow-ups Due
            </Typography>
            {brief.followUpsCount > 0 && (
              <Chip label={brief.followUpsCount} size="small" sx={{ fontSize: "0.5rem", height: 16, fontWeight: 700, color: "#F59E0B", backgroundColor: "rgba(245,158,11,0.1)" }} />
            )}
          </Box>
          {brief.followUps.length > 0 ? brief.followUps.slice(0, 4).map((j) => (
            <Box key={j.id} sx={{ py: 0.5 }}>
              <Typography sx={{ fontSize: "0.68rem", fontWeight: 600, color: "#E5E7EB" }} noWrap>{j.company}</Typography>
              <Typography sx={{ fontSize: "0.55rem", color: "#4B5563" }} noWrap>{j.role}</Typography>
            </Box>
          )) : (
            <Typography sx={{ fontSize: "0.65rem", color: "#374151" }}>No follow-ups due</Typography>
          )}
          <Box component={Link} href="/jobs" sx={{ display: "block", mt: 1.5, fontSize: "0.6rem", fontWeight: 600, color: "#6366F1", textDecoration: "none", "&:hover": { color: "#818CF8" } }}>
            Open Job Tracker
          </Box>
        </Box>

        {/* Upcoming Interviews */}
        <Box sx={{ px: 2.5, py: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.5 }}>
            <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Interviews
            </Typography>
          </Box>
          {brief.upcomingInterviews.length > 0 ? brief.upcomingInterviews.slice(0, 4).map((j) => (
            <Box key={j.id} sx={{ py: 0.5 }}>
              <Typography sx={{ fontSize: "0.68rem", fontWeight: 600, color: "#E5E7EB" }} noWrap>{j.company}</Typography>
              <Box sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
                <Typography sx={{ fontSize: "0.55rem", color: "#4B5563" }} noWrap>{j.role}</Typography>
                <Chip label={j.status === "PHONE_SCREEN" ? "Phone" : "Interview"} size="small" sx={{ fontSize: "0.45rem", height: 14, fontWeight: 700, color: "#8B5CF6", backgroundColor: "rgba(139,92,246,0.1)" }} />
              </Box>
            </Box>
          )) : (
            <Typography sx={{ fontSize: "0.65rem", color: "#374151" }}>No upcoming interviews</Typography>
          )}
        </Box>
      </Box>
    </GlassCard>
  );
}
