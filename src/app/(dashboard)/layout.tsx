import { ReactNode } from "react";
import { cookies } from "next/headers";
import DashboardLayout from "@/microfrontends/shell/components/layout/DashboardLayout";
import WebSocketProvider from "@/components/dashboard/WebSocketProvider";
import PageTracker from "@/components/dashboard/PageTracker";

interface DashboardGroupLayoutProps {
  children: ReactNode;
}

export default async function DashboardGroupLayout({ children }: DashboardGroupLayoutProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value ?? null;

  return (
    <DashboardLayout>
      <WebSocketProvider token={token} />
      <PageTracker />
      {children}
    </DashboardLayout>
  );
}
