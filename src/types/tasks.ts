export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type RecurringType = "DAILY" | "WEEKLY" | "MONTHLY";

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  dueDate?: string | null;
  priority: TaskPriority;
  category?: string | null;
  isCompleted: boolean;
  completedAt?: string | null;
  recurringType?: RecurringType | null;
  createdAt: string;
  updatedAt: string;
}
