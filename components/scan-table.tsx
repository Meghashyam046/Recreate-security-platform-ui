"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, SlidersHorizontal, Columns3, Plus } from "lucide-react"
import { scanEntries, type ScanEntry } from "@/lib/mock-data"
import { toast } from "sonner"

function StatusBadge({ status }: { status: ScanEntry["status"] }) {
  const styles = {
    Completed: "bg-emerald-500/15 text-emerald-500 border-emerald-500/20",
    Scheduled: "bg-muted text-muted-foreground border-border",
    Failed: "bg-severity-critical/15 text-severity-critical border-severity-critical/20",
    Running: "bg-teal/15 text-teal border-teal/20",
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${styles[status]}`}>
      {status}
    </span>
  )
}

function VulnBadges({ vulns }: { vulns: ScanEntry["vulnerabilities"] }) {
  const items = [
    { count: vulns.critical, bg: "bg-severity-critical" },
    { count: vulns.high, bg: "bg-severity-high" },
    { count: vulns.medium, bg: "bg-severity-medium" },
    { count: vulns.low, bg: "bg-severity-low" },
  ]
  return (
    <div className="flex items-center gap-1.5">
      {items.map((item, i) =>
        item.count > 0 ? (
          <span key={i} className={`${item.bg} text-white text-xs font-semibold rounded-md size-7 flex items-center justify-center`}>
            {item.count}
          </span>
        ) : null
      )}
    </div>
  )
}

function ProgressBar({ progress, status }: { progress: number; status: ScanEntry["status"] }) {
  const barColor = status === "Failed" ? "bg-severity-critical" : "bg-teal"
  return (
    <div className="flex items-center gap-3">
      <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full ${barColor} transition-all`} style={{ width: `${progress}%` }} />
      </div>
      <span className="text-xs text-muted-foreground">{progress}%</span>
    </div>
  )
}

export function ScanTable() {
  const router = useRouter()
  const [search, setSearch] = useState("")

  const filtered = scanEntries.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.type.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="mx-6 mt-5 mb-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search scans by name or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toast.info("Filter panel opened")}
            className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg border border-input bg-card text-foreground hover:bg-accent transition"
          >
            <SlidersHorizontal className="size-4" />
            Filter
          </button>
          <button
            onClick={() => toast.info("Column settings opened")}
            className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg border border-input bg-card text-foreground hover:bg-accent transition"
          >
            <Columns3 className="size-4" />
            Column
          </button>
          <button
            onClick={() => {
              toast.success("New scan created!")
              router.push("/scan/active-1")
            }}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-teal text-primary-foreground hover:bg-teal/90 transition"
          >
            <Plus className="size-4" />
            New scan
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Scan Name</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Type</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Progress</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Vulnerability</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Last Scan</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((scan) => (
                <tr
                  key={scan.id}
                  onClick={() => router.push(`/scan/${scan.id}`)}
                  className="border-b border-border last:border-b-0 hover:bg-accent/50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3.5 font-medium text-foreground">{scan.name}</td>
                  <td className="px-4 py-3.5 text-muted-foreground">{scan.type}</td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={scan.status} />
                  </td>
                  <td className="px-4 py-3.5">
                    <ProgressBar progress={scan.progress} status={scan.status} />
                  </td>
                  <td className="px-4 py-3.5">
                    <VulnBadges vulns={scan.vulnerabilities} />
                  </td>
                  <td className="px-4 py-3.5 text-right text-muted-foreground">{scan.lastScan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing {filtered.length} of 100 Scans</span>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 rounded border border-border hover:bg-accent transition">{"<"}</button>
            <button className="px-2 py-1 rounded border border-border hover:bg-accent transition">{">"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
