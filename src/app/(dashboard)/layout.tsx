import { ReactNode } from "react";
import DashboardLayout from "@/microfrontends/shell/components/layout/DashboardLayout";

interface DashboardGroupLayoutProps {
  children: ReactNode;
}

export default function DashboardGroupLayout({ children }: DashboardGroupLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
