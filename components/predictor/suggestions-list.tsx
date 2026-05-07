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
    <div className="relative rounded-xl border border-chart-4/20 bg-card p-6 card-hover overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-chart-4/10 to-transparent rounded-full blur-3xl -z-10" />
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-chart-4 to-chart-3 shadow-lg shadow-chart-4/20">
            <Lightbulb className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-chart-4">
            Improvement Suggestions
          </h3>
        </div>
        <span className="rounded-full bg-chart-4/10 px-3 py-1 text-xs font-medium text-chart-4 border border-chart-4/20">{suggestions.length} tips</span>
      </div>
      
      <ul className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <li 
            key={index} 
            className="group flex items-start gap-3 rounded-lg border border-transparent p-3 transition-all duration-200 hover:border-chart-4/20 hover:bg-chart-4/5"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-chart-4 to-chart-3 text-xs font-bold text-white shadow-lg shadow-chart-4/20 transition-transform duration-200 group-hover:scale-110">
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
