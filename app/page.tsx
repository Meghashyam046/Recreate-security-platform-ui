"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Check, Star } from "lucide-react"
import { ApsLogo } from "@/components/aps-logo"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

const features = [
  "Effortlessly spider and map targets to uncover hidden security flaws",
  "Deliver high-quality, validated findings in hours, not weeks.",
  "Generate professional, enterprise-grade security reports automatically.",
]

export default function SignUpPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) {
      toast.error("Please agree to the Terms & Conditions")
      return
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }
    setLoading(true)
    setTimeout(() => {
      toast.success("Account created successfully!")
      router.push("/dashboard")
    }, 800)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left panel - dark gradient */}
      <div
        className="relative lg:w-1/2 flex flex-col justify-between p-8 lg:p-12 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0a1a1a 0%, #0f0f0f 40%, #1a0e05 70%, #0f0f0f 100%)",
        }}
      >
        {/* Gradient orb effects */}
        <div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-40 blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #f97316 0%, #ef4444 40%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full opacity-20 blur-[80px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #0CC8A8 0%, transparent 70%)" }}
        />

        <div className="relative z-10">
          <ApsLogo size="default" className="[&_span]:text-white" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-md">
          <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-8 text-balance">
            Expert level Cybersecurity in{" "}
            <span className="text-teal">hours</span> not weeks.
          </h1>

          <div className="mb-8">
            <h2 className="text-sm font-semibold text-white mb-4">{"What's included"}</h2>
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 size-5 rounded-full bg-teal/20 flex items-center justify-center shrink-0">
                    <Check className="size-3 text-teal" />
                  </div>
                  <span className="text-sm text-gray-300 leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-1 mb-1">
            <Star className="size-4 fill-teal text-teal" />
            <span className="text-xs text-gray-400 font-medium">Trustpilot</span>
          </div>
          <p className="text-white font-bold text-lg">
            Rated 4.5/5.0{" "}
            <span className="text-gray-500 font-normal text-sm">(100k+ reviews)</span>
          </p>
        </div>
      </div>

      {/* Right panel - sign up form */}
      <div
        className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12"
        style={{
          background: "linear-gradient(180deg, #0f1a1a 0%, #0f0f0f 50%, #1a0e05 100%)",
        }}
      >
        <div className="w-full max-w-md bg-card rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-card-foreground text-center mb-1">Sign up</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Already have an account?{" "}
            <button className="text-teal hover:underline font-medium">Log in</button>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="First name*"
              required
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition"
            />
            <input
              type="text"
              placeholder="Last name*"
              required
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition"
            />
            <input
              type="email"
              placeholder="Email address*"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (8+ characters)*"
                required
                minLength={8}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>

            <div className="flex items-start gap-3 py-1">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
                className="mt-0.5"
              />
              <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                {"I agree to Aps's "}
                <button type="button" className="text-teal hover:underline font-medium">Terms & Conditions</button>
                {" and acknowledge the "}
                <button type="button" className="text-teal hover:underline font-medium">Privacy Policy</button>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-teal text-primary-foreground font-semibold text-sm hover:bg-teal/90 transition disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="flex items-center gap-3 mt-5">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition">
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-input bg-background text-foreground text-sm font-medium hover:bg-accent transition">
              <svg className="size-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-[#4267B2] text-white text-sm font-medium hover:opacity-90 transition">
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
