"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { Flame, TrendingUp, Minus, AlertTriangle } from "lucide-react"

interface ViralityScoreProps {
  score: number
  size?: "sm" | "md" | "lg"
}

export function ViralityScore({ score, size = "md" }: ViralityScoreProps) {
  const { label, color, bgGradient, Icon } = useMemo(() => {
    if (score >= 80) {
      return {
        label: "Viral Potential",
        color: "text-emerald-400",
        bgGradient: "from-emerald-500/30 via-emerald-500/10 to-transparent",
        Icon: Flame,
      }
    }
    if (score >= 60) {
      return {
        label: "High Potential",
        color: "text-primary",
        bgGradient: "from-primary/30 via-primary/10 to-transparent",
        Icon: TrendingUp,
      }
    }
    if (score >= 40) {
      return {
        label: "Moderate",
        color: "text-amber-400",
        bgGradient: "from-amber-500/30 via-amber-500/10 to-transparent",
        Icon: Minus,
      }
    }
    return {
      label: "Needs Work",
      color: "text-red-400",
      bgGradient: "from-red-500/30 via-red-500/10 to-transparent",
      Icon: AlertTriangle,
    }
  }, [score])

  const sizeClasses = {
    sm: {
      container: "h-28 w-28",
      score: "text-3xl",
      label: "text-[10px]",
      iconSize: "h-3 w-3",
    },
    md: {
      container: "h-40 w-40",
      score: "text-5xl",
      label: "text-xs",
      iconSize: "h-4 w-4",
    },
    lg: {
      container: "h-52 w-52",
      score: "text-6xl",
      label: "text-sm",
      iconSize: "h-5 w-5",
    },
  }

  const s = sizeClasses[size]
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className={cn("relative flex items-center justify-center", s.container)}>
      {/* Background glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-radial opacity-60 blur-2xl",
          bgGradient
        )}
      />

      {/* Outer ring decorative */}
      <div className="absolute inset-2 rounded-full border border-border/50" />

      {/* Progress ring */}
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.75 0.18 180)" />
            <stop offset="50%" stopColor="oklch(0.80 0.16 320)" />
            <stop offset="100%" stopColor="oklch(0.70 0.22 265)" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-secondary"
        />
        {/* Progress */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
            transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            filter: "drop-shadow(0 0 12px oklch(0.75 0.18 180 / 0.5))",
          }}
        />
      </svg>

      {/* Center content */}
      <div className="relative flex flex-col items-center justify-center gap-1">
        <span className={cn("font-bold tabular-nums tracking-tight", s.score, color)}>
          {score}
        </span>
        <div className={cn("flex items-center gap-1.5 font-medium uppercase tracking-wider text-muted-foreground", s.label)}>
          <Icon className={cn(s.iconSize, color)} />
          {label}
        </div>
      </div>
    </div>
  )
}
