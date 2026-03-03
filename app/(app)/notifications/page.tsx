"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Bell } from "lucide-react"

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center px-6">
        <div className="size-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Bell className="size-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Notifications</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          Stay updated on scan completions, vulnerability alerts, and team activity.
        </p>
      </div>
    </DashboardLayout>
  )
}
