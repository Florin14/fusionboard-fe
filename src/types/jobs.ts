export type JobStatus = "WISHLIST" | "APPLIED" | "PHONE_SCREEN" | "INTERVIEW" | "OFFER" | "REJECTED";

export interface Job {
  id: number;
  company: string;
  role: string;
  link?: string | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryCurrency?: string | null;
  notes?: string | null;
  status: JobStatus;
  followUpDate?: string | null;
  appliedDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface JobStats {
  counts: Record<JobStatus, number>;
  total: number;
  followUpsDue: number;
  upcomingInterviews: Job[];
  streak: number;
  thisWeek: number;
}
