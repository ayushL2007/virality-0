"use client"

import { ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FeedbackButtonsProps {
  feedback: "thumbs-up" | "thumbs-down" | null
  onFeedback: (feedback: "thumbs-up" | "thumbs-down" | null) => void
}

export function FeedbackButtons({ feedback, onFeedback }: FeedbackButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-4 rounded-xl border border-border bg-card p-4">
      <span className="text-sm text-muted-foreground">Was this analysis helpful?</span>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFeedback(feedback === "thumbs-up" ? null : "thumbs-up")}
          className={cn(
            "gap-2 transition-colors",
            feedback === "thumbs-up" && "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 hover:text-emerald-400"
          )}
        >
          <ThumbsUp className="h-4 w-4" />
          Yes
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFeedback(feedback === "thumbs-down" ? null : "thumbs-down")}
          className={cn(
            "gap-2 transition-colors",
            feedback === "thumbs-down" && "bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-400"
          )}
        >
          <ThumbsDown className="h-4 w-4" />
          No
        </Button>
      </div>
    </div>
  )
}
