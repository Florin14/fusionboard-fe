import { authFetch } from "@/lib/apiServer";
import type { Job, JobStats } from "@/types/jobs";
import KanbanBoard from "@/microfrontends/jobs/components/KanbanBoard";

async function fetchSafe<T>(path: string, fallback: T): Promise<T> {
  try { return await authFetch<T>(path); } catch { return fallback; }
}

export default async function JobsPage() {
  const [jobsResult, stats] = await Promise.all([
    fetchSafe<{ data: Job[]; total: number }>("/services/jobs?limit=200", { data: [], total: 0 }),
    fetchSafe<JobStats>("/services/jobs/stats", null as unknown as JobStats),
  ]);

  return <KanbanBoard initialJobs={jobsResult.data} initialStats={stats} />;
}
