import { authFetch } from "@/lib/apiServer";
import type { Task } from "@/types/tasks";
import TaskList from "@/microfrontends/tasks/components/TaskList";

async function fetchSafe<T>(path: string, fallback: T): Promise<T> {
  try { return await authFetch<T>(path); } catch { return fallback; }
}

export default async function TasksPage() {
  const [tasksResult, categories] = await Promise.all([
    fetchSafe<{ data: Task[]; total: number }>("/services/tasks?limit=200", { data: [], total: 0 }),
    fetchSafe<string[]>("/services/tasks/categories", []),
  ]);

  return <TaskList initialTasks={tasksResult.data} categories={categories} />;
}
