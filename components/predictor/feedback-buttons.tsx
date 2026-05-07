"use client"

import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FeedbackButtonsProps {
  feedback: "thumbs-up" | "thumbs-down" | null
  onFeedback: (feedback: "thumbs-up" | "thumbs-down" | null) => void
}

export function FeedbackButtons({ feedback, onFeedback }: FeedbackButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 card-hover">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
          <MessageCircle className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Was this analysis helpful?</p>
          <p className="text-xs text-muted-foreground">Your feedback helps us improve</p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onFeedback(feedback === "thumbs-up" ? null : "thumbs-up")}
          className={cn(
            "gap-2 min-w-[80px] transition-all duration-200 border-border",
            feedback === "thumbs-up" && "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/40"
          )}
        >
          <ThumbsUp className={cn("h-4 w-4", feedback === "thumbs-up" && "fill-current")} />
          Yes
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onFeedback(feedback === "thumbs-down" ? null : "thumbs-down")}
          className={cn(
            "gap-2 min-w-[80px] transition-all duration-200 border-border",
            feedback === "thumbs-down" && "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40"
          )}
        >
          <ThumbsDown className={cn("h-4 w-4", feedback === "thumbs-down" && "fill-current")} />
          No
        </Button>
      </div>
    </div>
  )
}
