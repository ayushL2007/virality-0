"use client"

import { Lightbulb, ArrowRight } from "lucide-react"

interface SuggestionsListProps {
  suggestions: string[]
}

export function SuggestionsList({ suggestions }: SuggestionsListProps) {
  if (suggestions.length === 0) {
    return null
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 card-hover">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
            <Lightbulb className="h-4 w-4 text-amber-400" />
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Improvement Suggestions
          </h3>
        </div>
        <span className="text-xs text-muted-foreground">{suggestions.length} tips</span>
      </div>
      
      <ul className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <li 
            key={index} 
            className="group flex items-start gap-3 rounded-lg border border-transparent p-3 transition-all duration-200 hover:border-border hover:bg-secondary/50"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-chart-2/20 text-xs font-bold text-primary transition-transform duration-200 group-hover:scale-110">
              {index + 1}
            </span>
            <div className="flex-1 pt-0.5">
              <span className="text-sm text-foreground">{suggestion}</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground/50 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5" />
          </li>
        ))}
      </ul>
    </div>
  )
}
