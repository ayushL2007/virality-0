"use client"

import { cn } from "@/lib/utils"
import { BarChart3, Trophy, Users, Star } from "lucide-react"

interface BenchmarkChartProps {
  yourScore: number
  category: string
  averageScore: number
  topPerformerScore: number
}

export function BenchmarkChart({
  yourScore,
  category,
  averageScore,
  topPerformerScore,
}: BenchmarkChartProps) {
  const bars = [
    {
      label: "Category Avg",
      score: averageScore,
      icon: Users,
      gradient: "from-muted-foreground/60 to-muted-foreground/40",
      textColor: "text-muted-foreground",
    },
    {
      label: "Your Score",
      score: yourScore,
      icon: Star,
      gradient: yourScore >= topPerformerScore 
        ? "from-emerald-500 to-emerald-400" 
        : "from-primary to-chart-2",
      textColor: yourScore >= topPerformerScore ? "text-emerald-400" : "text-primary",
      highlight: true,
    },
    {
      label: "Top 10%",
      score: topPerformerScore,
      icon: Trophy,
      gradient: "from-amber-500/70 to-amber-400/70",
      textColor: "text-amber-400/80",
    },
  ]

  const maxScore = Math.max(100, yourScore, averageScore, topPerformerScore)

  return (
    <div className="rounded-xl border border-border bg-card p-6 card-hover">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Benchmark
          </h3>
        </div>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground border border-border">
          {category}
        </span>
      </div>

      <div className="space-y-4">
        {bars.map((bar) => {
          const Icon = bar.icon
          return (
            <div key={bar.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={cn("h-4 w-4", bar.textColor)} />
                  <span
                    className={cn(
                      "text-sm font-medium",
                      bar.highlight ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {bar.label}
                  </span>
                </div>
                <span className={cn("text-base font-bold tabular-nums", bar.textColor)}>
                  {bar.score}
                </span>
              </div>
              <div className="relative h-3 overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn(
                    "h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out",
                    bar.gradient
                  )}
                  style={{ 
                    width: `${(bar.score / maxScore) * 100}%`,
                    boxShadow: bar.highlight ? '0 0 16px oklch(0.70 0.14 175 / 0.4)' : 'none',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {yourScore >= topPerformerScore && (
        <div className="mt-5 flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-4 py-3">
          <Trophy className="h-4 w-4 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-400">
            Top 10% performer in {category}!
          </span>
        </div>
      )}

      {yourScore < averageScore && (
        <div className="mt-5 flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-3">
          <Star className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-medium text-amber-400">
            Below average - check suggestions to improve
          </span>
        </div>
      )}
    </div>
  )
}
