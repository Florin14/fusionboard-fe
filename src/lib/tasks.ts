"use server";

import { revalidatePath } from "next/cache";
import { authFetch } from "./apiServer";
import type { Task } from "@/types/tasks";

export async function getTasks(filters?: { priority?: string; category?: string; completed?: boolean }) {
  return authFetch<{ data: Task[]; total: number }>("/services/tasks", {
    params: {
      priority: filters?.priority,
      category: filters?.category,
      completed: filters?.completed !== undefined ? String(filters.completed) : undefined,
      limit: 200,
    },
  });
}

export async function createTask(data: {
  title: string;
  description?: string;
  due_date?: string;
  priority?: string;
  category?: string;
  recurring_type?: string;
}) {
  const result = await authFetch<Task>("/services/tasks", {
    method: "POST",
    body: data,
  });
  revalidatePath("/tasks");
  revalidatePath("/overview");
  return result;
}

export async function updateTask(id: number, data: Record<string, unknown>) {
  const result = await authFetch<Task>(`/services/tasks/${id}`, {
    method: "PUT",
    body: data,
  });
  revalidatePath("/tasks");
  revalidatePath("/overview");
  return result;
}

export async function toggleTaskComplete(id: number) {
  const result = await authFetch<Task>(`/services/tasks/${id}/complete`, {
    method: "PATCH",
  });
  revalidatePath("/tasks");
  revalidatePath("/overview");
  return result;
}

export async function deleteTask(id: number) {
  await authFetch(`/services/tasks/${id}`, { method: "DELETE" });
  revalidatePath("/tasks");
  revalidatePath("/overview");
}

export async function getCategories() {
  return authFetch<string[]>("/services/tasks/categories");
}
