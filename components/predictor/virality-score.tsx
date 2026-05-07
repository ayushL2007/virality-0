"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"

interface ViralityScoreProps {
  score: number
  size?: "sm" | "md" | "lg"
}

export function ViralityScore({ score, size = "md" }: ViralityScoreProps) {
  const { label, color, bgColor } = useMemo(() => {
    if (score >= 80) {
      return {
        label: "Viral Potential",
        color: "text-emerald-400",
        bgColor: "from-emerald-500/20 to-emerald-500/5",
      }
    }
    if (score >= 60) {
      return {
        label: "High Potential",
        color: "text-primary",
        bgColor: "from-primary/20 to-primary/5",
      }
    }
    if (score >= 40) {
      return {
        label: "Moderate",
        color: "text-amber-400",
        bgColor: "from-amber-500/20 to-amber-500/5",
      }
    }
    return {
      label: "Needs Work",
      color: "text-red-400",
      bgColor: "from-red-500/20 to-red-500/5",
    }
  }, [score])

  const sizeClasses = {
    sm: {
      container: "h-24 w-24",
      score: "text-2xl",
      label: "text-[10px]",
      ring: "32",
    },
    md: {
      container: "h-36 w-36",
      score: "text-4xl",
      label: "text-xs",
      ring: "48",
    },
    lg: {
      container: "h-48 w-48",
      score: "text-5xl",
      label: "text-sm",
      ring: "64",
    },
  }

  const s = sizeClasses[size]
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className={cn("relative flex items-center justify-center", s.container)}>
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-b opacity-50",
          bgColor
        )}
      />

      {/* Progress ring */}
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
        {/* Track */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-border"
        />
        {/* Progress */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          className={color}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
            transition: "stroke-dashoffset 1s ease-out",
          }}
        />
      </svg>

      {/* Center content */}
      <div className="relative flex flex-col items-center justify-center">
        <span className={cn("font-bold tabular-nums", s.score, color)}>{score}</span>
        <span className={cn("font-medium uppercase tracking-wider text-muted-foreground", s.label)}>
          {label}
        </span>
      </div>
    </div>
  )
}
