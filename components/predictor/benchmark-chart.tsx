"use client"

import { cn } from "@/lib/utils"
import { BarChart3 } from "lucide-react"

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
      label: "Average",
      score: averageScore,
      color: "bg-muted-foreground/50",
      textColor: "text-muted-foreground",
    },
    {
      label: "Your Score",
      score: yourScore,
      color: yourScore >= topPerformerScore ? "bg-emerald-500" : "bg-primary",
      textColor: yourScore >= topPerformerScore ? "text-emerald-400" : "text-primary",
      highlight: true,
    },
    {
      label: "Top 10%",
      score: topPerformerScore,
      color: "bg-emerald-500/50",
      textColor: "text-emerald-400/70",
    },
  ]

  const maxScore = Math.max(100, yourScore, averageScore, topPerformerScore)

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Benchmark
          </h3>
        </div>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
          {category}
        </span>
      </div>

      <div className="space-y-3">
        {bars.map((bar) => (
          <div key={bar.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span
                className={cn(
                  "font-medium",
                  bar.highlight ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {bar.label}
              </span>
              <span className={cn("font-bold tabular-nums", bar.textColor)}>{bar.score}</span>
            </div>
            <div className="relative h-3 overflow-hidden rounded-full bg-secondary">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-700 ease-out",
                  bar.color,
                  bar.highlight && "shadow-[0_0_12px_rgba(14,165,164,0.4)]"
                )}
                style={{ width: `${(bar.score / maxScore) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {yourScore >= topPerformerScore && (
        <div className="rounded-lg bg-emerald-500/10 px-3 py-2 text-center text-xs font-medium text-emerald-400">
          Congratulations! Your content is in the top 10% for {category}
        </div>
      )}

      {yourScore < averageScore && (
        <div className="rounded-lg bg-amber-500/10 px-3 py-2 text-center text-xs font-medium text-amber-400">
          Your score is below average. Check the suggestions above to improve!
        </div>
      )}
    </div>
  )
}
