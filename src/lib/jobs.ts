"use server";

import { revalidatePath } from "next/cache";
import { authFetch } from "./apiServer";
import type { Job, JobStats } from "@/types/jobs";

export async function getJobs(status?: string, search?: string) {
  return authFetch<{ data: Job[]; total: number }>("/services/jobs", {
    params: { status, search, limit: 200 },
  });
}

export async function getJobStats() {
  return authFetch<JobStats>("/services/jobs/stats");
}

export async function createJob(data: {
  company: string;
  role: string;
  link?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  notes?: string;
  status?: string;
}) {
  const result = await authFetch<Job>("/services/jobs", {
    method: "POST",
    body: {
      company: data.company,
      role: data.role,
      link: data.link || null,
      salary_min: data.salaryMin || null,
      salary_max: data.salaryMax || null,
      salary_currency: data.salaryCurrency || "EUR",
      notes: data.notes || null,
      status: data.status || "WISHLIST",
    },
  });
  revalidatePath("/jobs");
  revalidatePath("/overview");
  return result;
}

export async function updateJob(id: number, data: Record<string, unknown>) {
  const result = await authFetch<Job>(`/services/jobs/${id}`, {
    method: "PUT",
    body: data,
  });
  revalidatePath("/jobs");
  revalidatePath("/overview");
  return result;
}

export async function updateJobStatus(id: number, status: string) {
  const result = await authFetch<Job>(`/services/jobs/${id}/status`, {
    method: "PATCH",
    body: { status },
  });
  revalidatePath("/jobs");
  revalidatePath("/overview");
  return result;
}

export async function deleteJob(id: number) {
  await authFetch(`/services/jobs/${id}`, { method: "DELETE" });
  revalidatePath("/jobs");
  revalidatePath("/overview");
}
