"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { Toaster } from "@/components/ui/sonner";
import { PWAInstallPrompt } from "@/components/pwa-install-prompt";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col lg:ml-64">
        <Topbar />
        <div className="flex-1 p-4 lg:p-6 overflow-auto">{children}</div>
      </main>
      <Toaster />
      <PWAInstallPrompt />
    </div>
  );
}