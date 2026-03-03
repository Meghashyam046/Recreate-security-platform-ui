"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center px-6">
        <div className="size-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Settings className="size-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Settings</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          Manage your account, API keys, team members, and application preferences.
        </p>
      </div>
    </DashboardLayout>
  )
}
