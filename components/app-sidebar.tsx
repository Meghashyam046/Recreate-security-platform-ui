"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FolderOpen,
  Radar,
  CalendarDays,
  Bell,
  Settings,
  HelpCircle,
  ChevronRight,
  Moon,
  Sun,
  X,
} from "lucide-react"
import { useTheme } from "next-themes"
import { ApsLogo } from "./aps-logo"
import { cn } from "@/lib/utils"

const mainNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderOpen },
  { label: "Scans", href: "/scans", icon: Radar },
  { label: "Schedule", href: "/schedule", icon: CalendarDays },
]

const bottomNav = [
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Support", href: "/support", icon: HelpCircle },
]

export function AppSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard" || pathname.startsWith("/scan/")
    return pathname.startsWith(href)
  }

  return (
    <aside className="flex flex-col h-full w-[220px] bg-sidebar border-r border-sidebar-border">
      <div className="flex items-center justify-between px-5 pt-5 pb-6">
        <ApsLogo size="small" />
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground">
            <X className="size-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-3">
        {mainNav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive(item.href)
                ? "bg-teal text-primary-foreground"
                : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            )}
          >
            <item.icon className="size-[18px]" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex flex-col gap-1 px-3 pb-2">
        {bottomNav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive(item.href)
                ? "bg-teal text-primary-foreground"
                : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            )}
          >
            <item.icon className="size-[18px]" />
            {item.label}
          </Link>
        ))}
      </div>

      <div className="border-t border-sidebar-border px-4 py-3">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center gap-2 text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors w-full px-1 py-1"
        >
          {theme === "dark" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="border-t border-sidebar-border px-4 py-4 flex items-center gap-3">
        <div className="size-9 rounded-full bg-yellow-600 flex items-center justify-center text-sm font-bold text-foreground overflow-hidden">
          <svg viewBox="0 0 36 36" className="size-full">
            <circle cx="18" cy="18" r="18" fill="#CA8A04" />
            <circle cx="18" cy="14" r="6" fill="#1a1a1a" />
            <ellipse cx="18" cy="30" rx="12" ry="10" fill="#1a1a1a" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-sidebar-foreground truncate">admin@edu.com</p>
          <p className="text-xs text-sidebar-foreground/60">Security Lead</p>
        </div>
        <ChevronRight className="size-4 text-sidebar-foreground/40" />
      </div>
    </aside>
  )
}
