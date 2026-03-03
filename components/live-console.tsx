"use client"

import { useState } from "react"
import { ChevronDown, X, Loader2 } from "lucide-react"
import { activityLog, findings, verificationLoops, type Finding } from "@/lib/mock-data"

function FindingCard({ finding }: { finding: Finding }) {
  const severityStyles = {
    Critical: "bg-severity-critical",
    High: "bg-severity-high",
    Medium: "bg-severity-medium",
    Low: "bg-severity-low",
  }

  return (
    <div className="rounded-lg bg-surface-raised border border-border p-4">
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-semibold text-white px-2 py-0.5 rounded ${severityStyles[finding.severity]}`}>
          {finding.severity}
        </span>
        <span className="text-xs text-muted-foreground">{finding.timestamp}</span>
      </div>
      <h4 className="text-sm font-semibold text-foreground mb-1">{finding.title}</h4>
      <p className="text-xs text-teal font-medium mb-2">{finding.endpoint}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{finding.description}</p>
    </div>
  )
}

function renderLogMessage(message: string) {
  const lines = message.split("\n")
  
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        const trimmed = line.trim()
        const isIndented = line.startsWith("    ")
        
        return (
          <p key={i} className={isIndented ? "pl-4 border-l-2 border-border text-muted-foreground" : ""}>
            {colorize(trimmed)}
          </p>
        )
      })}
    </div>
  )
}

function colorize(text: string): React.ReactNode {
  // Replace known patterns with colored spans
  const patterns: [RegExp, string][] = [
    [/helpdesk\.democorp\.com/g, "text-teal underline"],
    [/"TODO: Delete the testing account \(test:test\)"/g, "text-teal underline"],
    [/\/password\/test/g, "bg-muted px-1 py-0.5 rounded text-foreground font-mono text-xs"],
    [/'#'/g, "text-severity-medium font-mono"],
    [/test:test/g, "text-teal font-medium"],
    [/'X-UserId: 10032'/g, "bg-teal/20 text-teal px-1 py-0.5 rounded font-mono text-xs"],
    [/\*\*IDOR vulnerability\*\*/g, "text-severity-critical font-bold"],
  ]

  // Simple: just render the text. For the demo, let's do basic highlighting
  let nodes: React.ReactNode[] = [text]
  
  for (const [pattern, className] of patterns) {
    const newNodes: React.ReactNode[] = []
    for (const node of nodes) {
      if (typeof node !== "string") {
        newNodes.push(node)
        continue
      }
      const parts = node.split(pattern)
      const matches = node.match(pattern)
      if (!matches) {
        newNodes.push(node)
        continue
      }
      parts.forEach((part, i) => {
        if (part) newNodes.push(part)
        if (i < parts.length - 1 && matches[i]) {
          newNodes.push(
            <span key={`${pattern.source}-${i}`} className={className}>
              {matches[i].replace(/\*\*/g, "")}
            </span>
          )
        }
      })
    }
    nodes = newNodes
  }

  return <>{nodes}</>
}

export function LiveConsole() {
  const [activeTab, setActiveTab] = useState<"activity" | "verification">("activity")
  const [minimized, setMinimized] = useState(false)

  if (minimized) {
    return (
      <div className="mx-6 mt-4 mb-6">
        <button
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-xl text-sm font-medium text-foreground hover:bg-accent transition w-full"
        >
          <span className="size-2 rounded-full bg-teal animate-pulse" />
          Live Scan Console
          <span className="ml-2 text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">Running...</span>
        </button>
      </div>
    )
  }

  return (
    <div className="mx-6 mt-4 mb-6 rounded-xl bg-card border border-border overflow-hidden">
      {/* Console header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="size-2.5 rounded-full bg-teal animate-pulse" />
          <span className="text-sm font-semibold text-foreground">Live Scan Console</span>
          <span className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground flex items-center gap-1.5">
            <Loader2 className="size-3 animate-spin" />
            Running...
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setMinimized(true)} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground transition">
            <ChevronDown className="size-4" />
          </button>
          <button onClick={() => setMinimized(true)} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground transition">
            <X className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row" style={{ minHeight: "400px" }}>
        {/* Left panel - logs */}
        <div className="flex-1 lg:border-r border-border flex flex-col min-w-0">
          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("activity")}
              className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                activeTab === "activity" ? "text-teal" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Activity Log
              {activeTab === "activity" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("verification")}
              className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                activeTab === "verification" ? "text-teal" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Verification Loops
              {activeTab === "verification" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal" />
              )}
            </button>
          </div>

          {/* Log content */}
          <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed space-y-4 max-h-[500px]">
            {activeTab === "activity" ? (
              activityLog.map((entry, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-muted-foreground shrink-0 tabular-nums">[{entry.timestamp}]</span>
                  <div className="text-foreground/90 min-w-0">
                    {renderLogMessage(entry.message)}
                  </div>
                </div>
              ))
            ) : (
              <div className="space-y-3">
                {verificationLoops.map((loop) => (
                  <div key={loop.id} className="rounded-lg bg-surface-raised border border-border p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{loop.title}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                        loop.status === "Confirmed" ? "bg-teal/15 text-teal" : "bg-severity-medium/15 text-severity-medium"
                      }`}>
                        {loop.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Attempts: {loop.attempts} | Endpoint: <span className="text-teal">{loop.endpoint}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right panel - findings */}
        <div className="w-full lg:w-[360px] flex flex-col min-w-0 border-t lg:border-t-0 border-border">
          <div className="px-4 py-2.5 border-b border-border">
            <span className="text-sm font-semibold text-foreground">Finding Log</span>
          </div>
          <div className="flex-1 overflow-auto p-3 space-y-3 max-h-[500px]">
            {findings.map((finding) => (
              <FindingCard key={finding.id} finding={finding} />
            ))}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 px-4 py-2.5 border-t border-border text-xs text-muted-foreground bg-muted/30">
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-severity-medium" />
          Sub-Agents: 0
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-teal" />
          Parallel Executions: 2
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-teal" />
          Operations: 1
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-severity-critical">Critical: 0</span>
          <span className="text-severity-high">High: 0</span>
          <span className="text-severity-medium">Medium: 0</span>
          <span className="text-severity-low">Low: 0</span>
        </div>
      </div>
    </div>
  )
}
