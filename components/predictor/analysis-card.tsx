"use client"

import { cn } from "@/lib/utils"
import type { ViralityBreakdown } from "@/hooks/use-viral-predictor"
import { Zap, Heart, TrendingUp, Clock, Eye } from "lucide-react"

interface AnalysisCardProps {
  breakdown: ViralityBreakdown
}

const METRICS = [
  {
    key: "hookStrength" as const,
    label: "Hook Strength",
    description: "How attention-grabbing is your opening?",
    icon: Zap,
  },
  {
    key: "emotionalAppeal" as const,
    label: "Emotional Appeal",
    description: "Does it evoke strong emotions?",
    icon: Heart,
  },
  {
    key: "trendAlignment" as const,
    label: "Trend Alignment",
    description: "How well does it tap into current trends?",
    icon: TrendingUp,
  },
  {
    key: "timing" as const,
    label: "Timing",
    description: "Is this relevant right now?",
    icon: Clock,
  },
  {
    key: "visualImpact" as const,
    label: "Visual Impact",
    description: "How visually striking is the content?",
    icon: Eye,
  },
]

function getScoreColor(score: number): string {
  if (score >= 80) return "bg-emerald-500"
  if (score >= 60) return "bg-primary"
  if (score >= 40) return "bg-amber-500"
  return "bg-red-500"
}

function getScoreTextColor(score: number): string {
  if (score >= 80) return "text-emerald-400"
  if (score >= 60) return "text-primary"
  if (score >= 40) return "text-amber-400"
  return "text-red-400"
}

export function AnalysisCard({ breakdown }: AnalysisCardProps) {
  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Breakdown
      </h3>
      <div className="space-y-4">
        {METRICS.map((metric) => {
          const score = breakdown[metric.key]
          const Icon = metric.icon

          return (
            <div key={metric.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{metric.label}</span>
                </div>
                <span className={cn("text-sm font-bold tabular-nums", getScoreTextColor(score))}>
                  {score}
                </span>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn("h-full rounded-full transition-all duration-700 ease-out", getScoreColor(score))}
                  style={{ width: `${score}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
