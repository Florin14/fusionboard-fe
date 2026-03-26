import type { Task } from "./tasks";
import type { Job } from "./jobs";

export interface DailyBrief {
  tasksToday: Pick<Task, "id" | "title" | "priority" | "isCompleted" | "dueDate" | "category">[];
  tasksTodayCount: number;
  tasksCompletedToday: number;
  overdueTasks: number;
  followUps: Pick<Job, "id" | "company" | "role" | "status" | "followUpDate" | "appliedDate">[];
  followUpsCount: number;
  upcomingInterviews: Pick<Job, "id" | "company" | "role" | "status" | "followUpDate" | "appliedDate">[];
  applicationStreak: number;
  totalActiveApplications: number;
}
