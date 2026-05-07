"use client"

import { useState } from "react"
import { Copy, Check, Sparkles, PenLine } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CaptionRewriterProps {
  originalCaption: string
  rewrittenCaptions: string[]
}

export function CaptionRewriter({ originalCaption, rewrittenCaptions }: CaptionRewriterProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  if (rewrittenCaptions.length === 0) {
    return null
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 card-hover">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            AI-Optimized Captions
          </h3>
        </div>
        <span className="text-xs text-muted-foreground">{rewrittenCaptions.length} variations</span>
      </div>

      {originalCaption && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <PenLine className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Original</span>
          </div>
          <p className="rounded-lg bg-secondary/50 border border-border px-4 py-3 text-sm text-muted-foreground">
            {originalCaption}
          </p>
        </div>
      )}

      <div className="space-y-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Optimized Versions</span>
        {rewrittenCaptions.map((caption, index) => (
          <div
            key={index}
            className={cn(
              "group relative rounded-lg border border-primary/20 bg-gradient-to-r from-primary/5 to-chart-2/5 px-4 py-4",
              "transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/20 text-[10px] font-bold text-primary">
                {index + 1}
              </span>
              <span className="text-xs text-primary font-medium">Variation {index + 1}</span>
            </div>
            <p className="pr-10 text-sm text-foreground leading-relaxed">{caption}</p>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-3 top-3 h-8 w-8 rounded-lg border border-transparent",
                "opacity-0 transition-all duration-200 group-hover:opacity-100",
                "hover:border-primary/20 hover:bg-primary/10",
                copiedIndex === index && "opacity-100 bg-emerald-500/10 border-emerald-500/20"
              )}
              onClick={() => handleCopy(caption, index)}
            >
              {copiedIndex === index ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
