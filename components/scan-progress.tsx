"use client"

import { activeScanDetail } from "@/lib/mock-data"
import { Radar, Network, FlaskConical, ShieldCheck, FileText } from "lucide-react"

const stepIcons = {
  Spidering: Radar,
  Mapping: Network,
  Testing: FlaskConical,
  Validating: ShieldCheck,
  Reporting: FileText,
}

export function ScanProgress() {
  const scan = activeScanDetail
  const currentIdx = scan.steps.indexOf(scan.currentStep)

  return (
    <div className="mx-6 mt-4 rounded-xl bg-card border border-border p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        {/* Circular progress */}
        <div className="relative size-28 shrink-0">
          <svg className="size-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/50" />
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="#0CC8A8"
              strokeWidth="6"
              strokeDasharray={`${scan.progress * 2.64} ${264 - scan.progress * 2.64}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">{scan.progress}%</span>
            <span className="text-[10px] text-teal font-medium">In Progress</span>
          </div>
        </div>

        {/* Step tracker */}
        <div className="flex-1 flex items-center justify-between w-full overflow-x-auto">
          {scan.steps.map((step, i) => {
            const Icon = stepIcons[step]
            const isActive = i === currentIdx
            const isDone = i < currentIdx

            return (
              <div key={step} className="flex flex-col items-center gap-2 min-w-[80px] relative">
                {i > 0 && (
                  <div
                    className={`absolute top-5 -left-1/2 w-full h-0.5 ${
                      isDone ? "bg-teal" : "bg-border"
                    }`}
                    style={{ zIndex: 0, right: "50%", left: "-50%" }}
                  />
                )}
                <div
                  className={`relative z-10 size-10 rounded-full flex items-center justify-center transition-colors ${
                    isActive
                      ? "bg-teal text-primary-foreground"
                      : isDone
                        ? "bg-teal/20 text-teal"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="size-5" />
                </div>
                <span className={`text-xs font-medium ${isActive ? "text-teal" : "text-muted-foreground"}`}>
                  {step}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Metadata row */}
      <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Scan Type", value: scan.scanType },
          { label: "Targets", value: scan.targets },
          { label: "Started At", value: scan.startedAt },
          { label: "Credentials", value: scan.credentials },
          { label: "Files", value: scan.files },
          { label: "Checklists", value: scan.checklists, highlight: true },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
            <p className={`text-sm font-semibold ${item.highlight ? "text-teal" : "text-foreground"}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
