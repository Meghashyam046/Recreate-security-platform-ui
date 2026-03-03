"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardHeader } from "@/components/dashboard-header"
import { ScanTable } from "@/components/scan-table"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <ScanTable />
    </DashboardLayout>
  )
}
