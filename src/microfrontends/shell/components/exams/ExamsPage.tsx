"use client";

import { FC } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import cssVariables from "@/theme/cssVariables";
import { useClasses } from "@/styles/useClasses";
import { Theme } from "@mui/material/styles";
import { useTranslation } from "@/i18n/useTranslation";
import TopBar from "@/microfrontends/shell/components/layout/TopBar";
import AddExamDialog from "@/microfrontends/shell/components/exams/AddExamDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { openAddExam } from "@/store/slices/uiSlice";

interface ExamsPageStyles {
  wrapper: any;
  header: any;
  headerActions: any;
  contentGrid: any;
  card: any;
  cardHeader: any;
  filterPill: any;
  monthTabs: any;
  monthTab: any;
  monthTabActive: any;
  calendarRow: any;
  calendarDay: any;
  calendarRowContent: any;
  examCard: any;
  examTopRow: any;
  examBottomRow: any;
  examCode: any;
  examTitle: any;
  examTime: any;
  examFooter: any;
  rightColumn: any;
  calendarGrid: any;
  calendarDayCell: any;
  calendarDayActive: any;
  upcomingItem: any;
  upcomingBadge: any;
}

const ExamsPageStyles = (theme: Theme): ExamsPageStyles => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    height: "100%",
    minHeight: 0,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  contentGrid: {
    display: "grid",
    gap: 16,
    alignItems: "start",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
    },
  },
  card: {
    borderRadius: "14px",
    // border: `1px solid ${cssVariables.palette.borderSoft}`,
    backgroundColor: cssVariables.palette.bgCard,
    padding: 16,
    boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
    overflow: "visible",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 12,
  },
  filterPill: {
    borderRadius: 999,
    textTransform: "none",
    color: cssVariables.palette.textSecondary,
    border: `1px solid ${cssVariables.palette.borderSoft}`,
    background: "#fff",
  },
  monthTabs: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#F3F1ED",
    padding: "6px 8px",
    borderRadius: "14px",
    border: `1px solid ${cssVariables.palette.borderSoft}`,
    flexWrap: "nowrap",
    overflowX: "auto",
    scrollbarWidth: "none",
    minHeight: 40,
  },
  monthTab: {
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    color: cssVariables.palette.textSecondary,
    whiteSpace: "nowrap",
  },
  monthTabActive: {
    background: cssVariables.palette.textPrimary,
    color: "#fff",
  },
  calendarRow: {
    display: "grid",
    gridTemplateColumns: "32px 1fr",
    gap: 12,
    padding: "10px 0",
    borderTop: `1px solid ${cssVariables.palette.borderSoft}`,
  },
  calendarRowContent: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    overflow: "visible",
  },
  calendarDay: {
    fontSize: 13,
    fontWeight: 600,
    color: cssVariables.palette.textSecondary,
  },
  examCard: {
    borderRadius: "12px",
    padding: "8px 10px",
    border: "1px solid rgba(17, 24, 39, 0.06)",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    minWidth: 0,
    height: 60,
    justifyContent: "space-between",
    overflow: "visible",
  },
  examTopRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  examBottomRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  examCode: {
    fontSize: 10,
    fontWeight: 700,
    background: "#fff",
    padding: "2px 6px",
    borderRadius: 6,
  },
  examTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: cssVariables.palette.textPrimary,
  },
  examTime: {
    fontSize: 11,
    color: cssVariables.palette.textSecondary,
  },
  examFooter: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 8,
    textAlign: "center",
    marginTop: 10,
  },
  calendarDayCell: {
    fontSize: 12,
    padding: "6px 0",
    borderRadius: "10px",
    color: cssVariables.palette.textSecondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 28,
  },
  calendarDayActive: {
    background: cssVariables.palette.textPrimary,
    color: "#fff",
  },
  upcomingItem: {
    borderRadius: "12px",
    padding: 14,
    border: `1px solid ${cssVariables.palette.borderSoft}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  upcomingBadge: {
    background: cssVariables.palette.bgBody,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 600,
    padding: "4px 10px",
  },
});

const ExamsPage: FC = () => {
  const classes = useClasses(ExamsPageStyles, { name: "ExamsPage" });
  const { languageData } = useTranslation();
  const dispatch = useDispatch();
  const upcomingExams = useSelector((state: RootState) => state.exams.upcomingExams);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const selectedMonth = "Feb";
  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const calendarDays = Array.from({ length: 28 }, (_, index) => index + 1);

  const calendarRows = [
    {
      day: "1",
      exams: [
        {
          code: "302",
          className: "Class 302",
          title: "Math Exam",
          time: "8:00 am",
          color: "#E0E7FF",
          chip: "Confirmed",
          count: 19,
        },
        {
          code: "303",
          className: "Class 303",
          title: "Physics Exam",
          time: "9:00 am",
          color: "#FEF3C7",
          chip: "Confirmed",
          count: 18,
        },
      ],
    },
    {
      day: "2",
      exams: [],
    },
    {
      day: "3",
      exams: [
        {
          code: "304",
          className: "Class 304",
          title: "Art Exam",
          time: "8:00 am",
          color: "#FDE2E2",
          chip: "Confirmed",
          count: 20,
        },
        {
          code: "302",
          className: "Class 302",
          title: "Math Exam",
          time: "9:00 am",
          color: "#E0E7FF",
          chip: "Confirmed",
          count: 19,
        },
        {
          code: "305",
          className: "Class 305",
          title: "English Exam",
          time: "10:00 am",
          color: "#D1FAE5",
          chip: "Confirmed",
          count: 18,
        },
      ],
    },
    {
      day: "4",
      exams: [],
    },
    {
      day: "5",
      exams: [
        {
          code: "303",
          className: "Class 303",
          title: "Physics Exam",
          time: "8:00 am",
          color: "#FEF3C7",
          chip: "Confirmed",
          count: 19,
        },
      ],
    },
  ];

  return (
    <Box className="ExamsPage-wrapper" sx={classes.wrapper}>
      <TopBar />
      <AddExamDialog />
      <Box className="ExamsPage-header" sx={classes.header}>
        <Box className="ExamsPage-headerTitle">
          <Typography className="ExamsPage-title" variant="h5" sx={{ fontWeight: 700 }}>
            {languageData?.Exams ?? "Exams"}
          </Typography>
          <Typography className="ExamsPage-subtitle" variant="body2" color="text.secondary">
            {languageData?.ExamsSubline ??
              "On the attendance page, you can easily track student attendance and monitor absences."}
          </Typography>
        </Box>
        <Box className="ExamsPage-headerActions" sx={classes.headerActions}>
          <TextField
            size="small"
            placeholder={languageData?.SearchPlaceholder ?? "Search"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{
              minWidth: 220,
              "& .MuiOutlinedInput-root": {
                background: cssVariables.palette.bgBody,
                borderRadius: 999,
              },
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 999, padding: "6px 16px", background: cssVariables.palette.textPrimary }}
            onClick={() => dispatch(openAddExam())}
          >
            {languageData?.AddNewExam ?? "Add new exam"}
          </Button>
        </Box>
      </Box>

      <Box className="ExamsPage-contentGrid" sx={classes.contentGrid}>
        <Box className="ExamsPage-card ExamsPage-calendarCard" sx={classes.card}>
          <Box className="ExamsPage-cardHeader" sx={classes.cardHeader}>
            <Typography className="ExamsPage-cardTitle" variant="subtitle1" sx={{ fontWeight: 700 }}>
              {languageData?.ExamCalendar ?? "Exam Calendar"}
            </Typography>
            <Button className="ExamsPage-filterButton" size="small" startIcon={<FilterListIcon fontSize="small" />} sx={classes.filterPill}>
              {languageData?.Filter ?? "Filter"}
            </Button>
          </Box>

          <Box className="ExamsPage-monthTabs" sx={classes.monthTabs}>
            <IconButton size="small">
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
            {months.map((month) => (
              <Box
                key={month}
                className="ExamsPage-monthTab"
                sx={{
                  ...classes.monthTab,
                  ...(month === selectedMonth ? classes.monthTabActive : {}),
                }}
              >
                {month}
              </Box>
            ))}
            <IconButton size="small">
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </Box>

          {calendarRows.map((row) => (
            <Box
              key={row.day}
              className="ExamsPage-calendarRow"
              sx={{
                ...classes.calendarRow,
                ...(row.day === "1" ? { borderTop: "none", paddingTop: 16 } : {}),
              }}
            >
              <Typography className="ExamsPage-calendarDay" sx={classes.calendarDay}>
                {row.day}
              </Typography>
              <Box className="ExamsPage-calendarRowContent" sx={classes.calendarRowContent}>
                {row.exams.length === 0 ? (
                  <Typography className="ExamsPage-emptyState" variant="body2" color="text.secondary">
                    {languageData?.NoExam ?? "No exam."}
                  </Typography>
                ) : (
                  row.exams.map((exam) => (
                      <Box
                        key={`${row.day}-${exam.code}-${exam.title}`}
                        className="ExamsPage-examCard"
                        sx={{
                          ...classes.examCard,
                          background: exam.color,
                        }}
                      >
                      <Box className="ExamsPage-examTopRow" sx={classes.examTopRow}>
                        <Typography className="ExamsPage-examCode" sx={classes.examCode}>
                          {exam.code}
                        </Typography>
                        <Typography className="ExamsPage-examClass" variant="caption" sx={{ fontWeight: 700 }}>
                          {exam.className}
                        </Typography>
                        <Typography className="ExamsPage-examTime" sx={classes.examTime}>
                          {exam.time}
                        </Typography>
                      </Box>
                      <Box className="ExamsPage-examBottomRow" sx={classes.examBottomRow}>
                        <Typography className="ExamsPage-examTitle" sx={classes.examTitle}>
                          {exam.title}
                        </Typography>
                        <Box className="ExamsPage-examFooter" sx={classes.examFooter}>
                          <Chip
                            label={exam.chip}
                            size="small"
                            sx={{ background: "#fff", borderRadius: 999, fontWeight: 600, height: 20 }}
                          />
                          <Chip
                            label={exam.count}
                            size="small"
                            sx={{ background: "#fff", borderRadius: 999, fontWeight: 600, height: 20 }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
            </Box>
          ))}
        </Box>

        <Box className="ExamsPage-rightColumn" sx={classes.rightColumn}>
          <Box className="ExamsPage-card ExamsPage-miniCalendarCard" sx={classes.card}>
            <Box className="ExamsPage-cardHeader" sx={classes.cardHeader}>
              <Typography className="ExamsPage-cardTitle" variant="subtitle1" sx={{ fontWeight: 700 }}>
                {languageData?.February ?? "February"}
              </Typography>
              <Box>
                <IconButton size="small">
                  <ChevronLeftIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <ChevronRightIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Box className="ExamsPage-miniCalendarGrid" sx={classes.calendarGrid}>
              {daysOfWeek.map((day) => (
                <Typography key={day} className="ExamsPage-miniCalendarDay" variant="caption" color="text.secondary">
                  {day}
                </Typography>
              ))}
              {calendarDays.map((day) => (
                <Box
                  key={day}
                  className="ExamsPage-miniCalendarCell"
                  sx={{
                    ...classes.calendarDayCell,
                    ...(day === 6 ? classes.calendarDayActive : {}),
                  }}
                >
                  {day}
                </Box>
              ))}
            </Box>
            <Typography
              className="ExamsPage-miniCalendarFooter"
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", marginTop: 12 }}
            >
              {languageData?.ExamsThisMonth ?? "9 exams for this month"}
            </Typography>
          </Box>

          <Box className="ExamsPage-card ExamsPage-upcomingCard" sx={classes.card}>
            <Box className="ExamsPage-cardHeader" sx={classes.cardHeader}>
              <Typography className="ExamsPage-cardTitle" variant="subtitle1" sx={{ fontWeight: 700 }}>
                {languageData?.UpcomingExams ?? "Upcoming exams"}
              </Typography>
              <Button className="ExamsPage-filterButton" size="small" startIcon={<FilterListIcon fontSize="small" />} sx={classes.filterPill}>
                {languageData?.Filter ?? "Filter"}
              </Button>
            </Box>
            <Box className="ExamsPage-upcomingList" sx={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {upcomingExams.map((exam) => (
                <Box key={exam.id} className="ExamsPage-upcomingItem" sx={{ ...classes.upcomingItem, background: exam.accent }}>
                  <Box className="ExamsPage-upcomingText">
                    <Typography className="ExamsPage-upcomingCode" variant="caption" sx={{ fontWeight: 700 }}>
                      {exam.code}
                    </Typography>
                    <Typography className="ExamsPage-upcomingTitle" variant="body2" sx={{ fontWeight: 700 }}>
                      {exam.title}
                    </Typography>
                    <Typography className="ExamsPage-upcomingTime" variant="caption" color="text.secondary">
                      {exam.time}
                    </Typography>
                  </Box>
                  <Box className="ExamsPage-upcomingActions" sx={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Box className="ExamsPage-upcomingBadge" sx={classes.upcomingBadge}>
                      {exam.badge}
                    </Box>
                    <IconButton size="small">
                      <MoreHorizOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ExamsPage;
