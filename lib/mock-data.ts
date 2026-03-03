export interface ScanEntry {
  id: string
  name: string
  type: "Greybox" | "Blackbox"
  status: "Completed" | "Scheduled" | "Failed" | "Running"
  progress: number
  vulnerabilities: {
    critical: number
    high: number
    medium: number
    low: number
  }
  lastScan: string
}

export interface Finding {
  id: string
  severity: "Critical" | "High" | "Medium" | "Low"
  title: string
  endpoint: string
  description: string
  timestamp: string
}

export interface LogEntry {
  timestamp: string
  message: string
  highlights?: { text: string; type: "url" | "code" | "keyword" | "header" }[]
}

export const dashboardStats = {
  org: "Project X",
  owner: "Nammagiri",
  totalScans: 100,
  scheduled: 1000,
  rescans: 100,
  failedScans: 100,
  lastUpdated: "10 mins ago",
  severity: {
    critical: { count: 86, change: "+2%", direction: "up" as const, label: "increase than yesterday" },
    high: { count: 16, change: "+0.9%", direction: "up" as const, label: "increase than yesterday" },
    medium: { count: 26, change: "+0.9%", direction: "down" as const, label: "decrease than yesterday" },
    low: { count: 16, change: "+0.9%", direction: "up" as const, label: "increase than yesterday" },
  },
}

export const scanEntries: ScanEntry[] = [
  { id: "1", name: "Web App Servers", type: "Greybox", status: "Completed", progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: "4d ago" },
  { id: "2", name: "Web App Servers", type: "Greybox", status: "Completed", progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: "4d ago" },
  { id: "3", name: "Web App Servers", type: "Greybox", status: "Completed", progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: "4d ago" },
  { id: "4", name: "Web App Servers", type: "Greybox", status: "Completed", progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: "4d ago" },
  { id: "5", name: "Web App Servers", type: "Greybox", status: "Completed", progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: "4d ago" },
  { id: "6", name: "Web App Servers", type: "Greybox", status: "Completed", progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: "4d ago" },
  { id: "7", name: "Web App Servers", type: "Greybox", status: "Completed", progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: "4d ago" },
  { id: "8", name: "Web App Servers", type: "Greybox", status: "Scheduled", progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 0, low: 0 }, lastScan: "4d ago" },
  { id: "9", name: "Web App Servers", type: "Greybox", status: "Scheduled", progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 0, low: 0 }, lastScan: "4d ago" },
  { id: "10", name: "IoT Devices", type: "Blackbox", status: "Failed", progress: 10, vulnerabilities: { critical: 2, high: 4, medium: 8, low: 1 }, lastScan: "3d ago" },
  { id: "11", name: "Temp Data", type: "Blackbox", status: "Failed", progress: 10, vulnerabilities: { critical: 2, high: 4, medium: 8, low: 1 }, lastScan: "3d ago" },
]

export const activeScanDetail = {
  id: "active-1",
  progress: 0,
  currentStep: "Spidering" as const,
  steps: ["Spidering", "Mapping", "Testing", "Validating", "Reporting"] as const,
  scanType: "Grey Box",
  targets: "google.com",
  startedAt: "Nov 22, 09:00AM",
  credentials: "2 Active",
  files: "Control.pdf",
  checklists: "40/350",
  status: "Running" as const,
}

export const activityLog: LogEntry[] = [
  {
    timestamp: "09:00:00",
    message: "I'll begin a systematic penetration test on helpdesk.democorp.com. Let me start with reconnaissance and enumeration.",
    highlights: [{ text: "helpdesk.democorp.com", type: "url" }],
  },
  {
    timestamp: "09:01:00",
    message: "Good! target is online. Now let me perform port scanning to identify running services.",
  },
  {
    timestamp: "09:02:00",
    message: 'Excellent reconnaissance results:\n    - helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)\nLet me probe the web server on target first to understand its structure.',
  },
  {
    timestamp: "09:03:00",
    message: 'Great! I found a login page for a Help Desk Platform. I can see a useful comment: "TODO: Delete the testing account (test:test)". Let me test this credential. The login redirects to /password/test. Let me follow that path and explore it.',
    highlights: [
      { text: '"TODO: Delete the testing account (test:test)"', type: "keyword" },
      { text: "/password/test", type: "code" },
    ],
  },
  {
    timestamp: "09:04:00",
    message: "The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to '#' which means the current page. Let me try a different approach.",
    highlights: [{ text: "'#'", type: "code" }],
  },
  {
    timestamp: "09:05:00",
    message: "It redirects back to /password/test. Let me check if there's an /api endpoint or look for other paths. Let me also try exploring with the test:test password directly on other endpoints.",
    highlights: [{ text: "test:test", type: "keyword" }],
  },
  {
    timestamp: "09:06:00",
    message: 'Great! I can access the dashboard using the \'X-UserId: 10032\' header. The dashboard shows "Welcome, John Doe". This suggests an **IDOR vulnerability** - I can access any user\'s dashboard by just changing the X-UserId header. Let me explore more of the application...',
    highlights: [
      { text: "'X-UserId: 10032'", type: "header" },
      { text: "**IDOR vulnerability**", type: "keyword" },
    ],
  },
]

export const findings: Finding[] = [
  {
    id: "f1",
    severity: "Critical",
    title: "SQL Injection in Authentication Endpoint",
    endpoint: "/api/users/profile",
    description: "Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.",
    timestamp: "10:45:23",
  },
  {
    id: "f2",
    severity: "High",
    title: "Unauthorized Access to User Metadata",
    endpoint: "/api/auth/login",
    description: "Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.",
    timestamp: "10:45:23",
  },
  {
    id: "f3",
    severity: "Medium",
    title: "Broken Authentication Rate Limiting",
    endpoint: "/api/search",
    description: "No effective rate limiting detected on login attempts. Automated brute-force attempts possible.",
    timestamp: "10:45:23",
  },
]

export const verificationLoops = [
  { id: "v1", title: "SQL Injection Verification", status: "Confirmed", attempts: 3, endpoint: "/api/users/profile" },
  { id: "v2", title: "IDOR Verification", status: "Confirmed", attempts: 5, endpoint: "/api/dashboard" },
  { id: "v3", title: "Rate Limit Verification", status: "In Progress", attempts: 2, endpoint: "/api/auth/login" },
]
