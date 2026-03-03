"use client"

import Link from "next/link"
import { Home, Clock } from "lucide-react"
import { dashboardStats } from "@/lib/mock-data"
import { toast } from "sonner"

export function DashboardHeader() {
  return (
    <div>
      {/* Breadcrumb and actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 gap-3">
        <div className="flex items-center gap-2 text-sm flex-wrap">
          <span className="font-semibold text-foreground">Scan</span>
          <Home className="size-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">Private Assets</span>
          <span className="text-muted-foreground">/</span>
          <Link href="/scan/new" className="text-teal hover:underline">New Scan</Link>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => toast.success("Report exported successfully!")} className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-card text-card-foreground hover:bg-accent transition">
            Export Report
          </button>
          <button onClick={() => toast.error("Scan stopped")} className="px-4 py-2 text-sm font-medium rounded-lg border border-severity-critical/30 text-severity-critical hover:bg-severity-critical/10 transition">
            Stop Scan
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="mx-6 rounded-xl bg-card border border-border p-5">
        {/* Org info row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm mb-5 pb-4 border-b border-border">
          <div>
            <span className="text-muted-foreground">Org: </span>
            <span className="font-semibold text-foreground">{dashboardStats.org}</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div>
            <span className="text-muted-foreground">Owner: </span>
            <span className="font-semibold text-foreground">{dashboardStats.owner}</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div>
            <span className="text-muted-foreground">Total Scans: </span>
            <span className="font-semibold text-foreground">{dashboardStats.totalScans}</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div>
            <span className="text-muted-foreground">Scheduled: </span>
            <span className="font-semibold text-foreground">{dashboardStats.scheduled}</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div>
            <span className="text-muted-foreground">Rescans: </span>
            <span className="font-semibold text-foreground">{dashboardStats.rescans}</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div>
            <span className="text-muted-foreground">Failed Scans: </span>
            <span className="font-semibold text-foreground">{dashboardStats.failedScans}</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto text-muted-foreground text-xs">
            <Clock className="size-3.5" />
            {dashboardStats.lastUpdated}
          </div>
        </div>

        {/* Severity cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {(["critical", "high", "medium", "low"] as const).map((severity) => {
            const data = dashboardStats.severity[severity]
            const colors = {
              critical: { icon: "bg-severity-critical", text: "text-severity-critical" },
              high: { icon: "bg-severity-high", text: "text-severity-high" },
              medium: { icon: "bg-severity-medium", text: "text-severity-medium" },
              low: { icon: "bg-teal", text: "text-teal" },
            }
            const icons = {
              critical: (
                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              ),
              high: (
                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              ),
              medium: (
                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              ),
              low: (
                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
                </svg>
              ),
            }

            return (
              <div key={severity} className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground capitalize mb-1">{severity} Severity</p>
                  <p className="text-3xl font-bold text-foreground">{data.count}</p>
                  <p className={`text-xs mt-1 ${data.direction === "up" ? "text-severity-critical" : "text-teal"}`}>
                    {data.direction === "up" ? "↑" : "↓"} {data.change} {data.label}
                  </p>
                </div>
                <div className={`p-2 rounded-full ${colors[severity].icon}/10 ${colors[severity].text}`}>
                  {icons[severity]}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
