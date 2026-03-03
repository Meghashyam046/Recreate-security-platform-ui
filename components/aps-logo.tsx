export function ApsLogo({ className = "", size = "default" }: { className?: string; size?: "small" | "default" | "large" }) {
  const sizes = {
    small: { circle: 24, text: "text-base" },
    default: { circle: 32, text: "text-xl" },
    large: { circle: 40, text: "text-2xl" },
  }
  const s = sizes[size]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="rounded-full flex items-center justify-center"
        style={{
          width: s.circle,
          height: s.circle,
          background: "#0CC8A8",
        }}
      >
        <div
          className="rounded-full"
          style={{
            width: s.circle * 0.35,
            height: s.circle * 0.35,
            background: "#0F0F0F",
            border: "2px solid #0F0F0F",
            boxShadow: "0 0 0 2px #0CC8A8",
          }}
        />
      </div>
      <span className={`font-semibold ${s.text} text-foreground`}>aps</span>
    </div>
  )
}
