# Security Platform UI Dashboard

A modern SaaS-style cybersecurity scanning dashboard built with Next.js and Tailwind CSS.
This project visualizes automated security scan workflows, live console activity, and vulnerability findings in a clean enterprise UI.

## Tech Stack

Framework: Next.js (App Router)

Language: TypeScript

Frontend: React

Styling: Tailwind CSS

UI Components: Custom reusable components (design-system style)

State Handling: React hooks

Routing: Dynamic routes (/scan/[id])

Data Layer: Mock data (local simulation)

Theme Support: Dark / Light mode with hydration-safe rendering

📂 Project Structure
app/                → App Router pages & layouts
components/         → Reusable UI & feature components
  ui/               → Design system components
  live-console.tsx  → Real-time console simulation
  scan-progress.tsx → Scan workflow tracker
  scan-table.tsx    → Dashboard scan listing
hooks/              → Custom React hooks
lib/                → Mock data & utility helpers
public/             → Static assets
styles/             → Global styles
✨ Features

📊 Dashboard scan table

🔄 Multi-step scan progress tracker

🔵 Circular progress indicator

💻 Live console with auto-scroll

🚨 Vulnerability finding log

📈 Real-time metrics status bar

🌗 Dark/Light theme support

📱 Responsive layout

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2️⃣ Install Dependencies
npm install

or

yarn install
3️⃣ Run Development Server
npm run dev

Open in browser:

http://localhost:3000
🏗️ Build for Production
npm run build
npm start
🌍 Deployment

Recommended platforms:

Vercel

Netlify

Deployment requires no additional configuration.

🧠 Architectural Decisions

Component-driven structure for scalability.

Dynamic routing for scan detail pages.

Mock data abstraction to allow easy backend integration later.

Hydration-safe theme rendering to prevent SSR mismatches.

Feature-based separation for maintainability.

⚠️ Known Limitations

Uses mock data (no real backend integration).

Live console simulates activity — not connected to real scan engine.

No authentication system implemented.

No persistent database storage.

Real-time updates are simulated via client-side logic only.

🔮 Future Improvements

Backend integration with real scan engine

WebSocket-based live updates

Authentication & role-based access

Persistent database

Scan configuration UI

Downloadable scan reports


📄 License

This project is for educational and portfolio purposes.
