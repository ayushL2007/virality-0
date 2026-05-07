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
    description: "Opening attention-grab power",
    icon: Zap,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    key: "emotionalAppeal" as const,
    label: "Emotional Appeal",
    description: "Emotional resonance level",
    icon: Heart,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    key: "trendAlignment" as const,
    label: "Trend Alignment",
    description: "Current trend relevance",
    icon: TrendingUp,
    gradient: "from-primary to-chart-2",
  },
  {
    key: "timing" as const,
    label: "Timing",
    description: "Optimal posting timing",
    icon: Clock,
    gradient: "from-violet-500 to-purple-500",
  },
  {
    key: "visualImpact" as const,
    label: "Visual Impact",
    description: "Visual attention score",
    icon: Eye,
    gradient: "from-blue-500 to-cyan-500",
  },
]

function getScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-400"
  if (score >= 60) return "text-primary"
  if (score >= 40) return "text-amber-400"
  return "text-red-400"
}

function getScoreBarGradient(score: number): string {
  if (score >= 80) return "from-emerald-500 to-emerald-400"
  if (score >= 60) return "from-primary to-chart-2"
  if (score >= 40) return "from-amber-500 to-amber-400"
  return "from-red-500 to-red-400"
}

export function AnalysisCard({ breakdown }: AnalysisCardProps) {
  return (
    <div className="relative rounded-xl border border-primary/20 bg-card p-6 card-hover overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-2xl -z-10" />
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
          Breakdown
        </h3>
        <div className="h-px flex-1 mx-4 bg-gradient-to-r from-primary/30 to-transparent" />
      </div>
      
      <div className="space-y-5">
        {METRICS.map((metric) => {
          const score = breakdown[metric.key]
          const Icon = metric.icon

          return (
            <div key={metric.key} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    "bg-gradient-to-br opacity-80 group-hover:opacity-100 transition-opacity",
                    metric.gradient
                  )}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">{metric.label}</span>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                </div>
                <span className={cn("text-lg font-bold tabular-nums", getScoreColor(score))}>
                  {score}
                </span>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn(
                    "h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out",
                    getScoreBarGradient(score)
                  )}
                  style={{ 
                    width: `${score}%`,
                    boxShadow: score >= 60 ? '0 0 12px currentColor' : 'none',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
