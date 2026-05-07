"use client"

import { useState } from "react"
import { Copy, Check, Sparkles } from "lucide-react"
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
    <div className="space-y-4 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          AI-Optimized Captions
        </h3>
      </div>

      {originalCaption && (
        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground">Original</span>
          <p className="rounded-lg bg-secondary/50 px-4 py-3 text-sm text-muted-foreground">
            {originalCaption}
          </p>
        </div>
      )}

      <div className="space-y-3">
        <span className="text-xs font-medium text-muted-foreground">Suggestions</span>
        {rewrittenCaptions.map((caption, index) => (
          <div
            key={index}
            className={cn(
              "group relative rounded-lg border border-primary/20 bg-primary/5 px-4 py-3",
              "transition-colors hover:border-primary/40 hover:bg-primary/10"
            )}
          >
            <p className="pr-10 text-sm text-foreground">{caption}</p>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
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
