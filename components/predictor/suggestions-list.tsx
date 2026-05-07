"use client"

import { Lightbulb } from "lucide-react"

interface SuggestionsListProps {
  suggestions: string[]
}

export function SuggestionsList({ suggestions }: SuggestionsListProps) {
  if (suggestions.length === 0) {
    return null
  }

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-amber-400" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Improvement Suggestions
        </h3>
      </div>
      <ul className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="flex gap-3 text-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {index + 1}
            </span>
            <span className="text-muted-foreground">{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
