"use client"

import Link from "next/link"
import { Home } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ScanProgress } from "@/components/scan-progress"
import { LiveConsole } from "@/components/live-console"
import { toast } from "sonner"

export default function ScanDetailPage() {
  return (
    <DashboardLayout>
      {/* Breadcrumb and actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 gap-3">
        <div className="flex items-center gap-2 text-sm flex-wrap">
          <span className="font-semibold text-foreground">Scan</span>
          <Home className="size-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">/</span>
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition">Private Assets</Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-teal">New Scan</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => toast.success("Report exported successfully!")}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-card text-card-foreground hover:bg-accent transition"
          >
            Export Report
          </button>
          <button
            onClick={() => toast.error("Scan stopped")}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-severity-critical/30 text-severity-critical hover:bg-severity-critical/10 transition"
          >
            Stop Scan
          </button>
        </div>
      </div>

      <ScanProgress />
      <LiveConsole />
    </DashboardLayout>
  )
}
