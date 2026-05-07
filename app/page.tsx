"use client"

import { useViralPredictor } from "@/hooks/use-viral-predictor"
import { MediaUploader } from "@/components/predictor/media-uploader"
import { ViralityScore } from "@/components/predictor/virality-score"
import { AnalysisCard } from "@/components/predictor/analysis-card"
import { CaptionRewriter } from "@/components/predictor/caption-rewriter"
import { BenchmarkChart } from "@/components/predictor/benchmark-chart"
import { FeedbackButtons } from "@/components/predictor/feedback-buttons"
import { SuggestionsList } from "@/components/predictor/suggestions-list"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, RotateCcw, TrendingUp, AlertCircle, Download } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ViralPredictorPage() {
  const {
    media,
    caption,
    isAnalyzing,
    result,
    feedback,
    error,
    setMedia,
    setCaption,
    setFeedback,
    analyze,
    reset,
  } = useViralPredictor()

  const canAnalyze = (media || caption.trim()) && !isAnalyzing

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Viral Predictor</h1>
              <p className="text-xs text-muted-foreground">AI-powered content analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/chat-log.txt"
              download
              className={cn(
                "flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3",
                "text-xs font-medium text-muted-foreground transition-colors",
                "hover:bg-secondary hover:text-foreground"
              )}
            >
              <Download className="h-3.5 w-3.5" />
              Chat Log
            </a>
            {result && (
              <Button variant="ghost" size="sm" onClick={reset} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                New Analysis
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-8">
        {!result ? (
          /* Input State */
          <div className="space-y-6">
            {/* Media Upload */}
            <MediaUploader media={media} onMediaChange={setMedia} disabled={isAnalyzing} />

            {/* Caption Input */}
            <div className="space-y-2">
              <label
                htmlFor="caption"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Caption
              </label>
              <Textarea
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Enter your caption here... (optional if media is uploaded)"
                className="min-h-32 resize-none bg-card"
                disabled={isAnalyzing}
              />
              <p className="text-xs text-muted-foreground">
                {caption.length} characters
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Analyze Button */}
            <Button
              onClick={analyze}
              disabled={!canAnalyze}
              className="w-full gap-2"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Analyze Viral Potential
                </>
              )}
            </Button>

            {/* Info Card */}
            <div className="rounded-xl border border-border bg-card/50 p-5">
              <h3 className="mb-3 text-sm font-semibold text-foreground">How it works</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Upload your image or video content
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Add your caption (or let AI suggest one)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Get instant AI-powered virality analysis
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Receive optimized caption suggestions
                </li>
              </ul>
            </div>
          </div>
        ) : (
          /* Results State */
          <div className="space-y-6">
            {/* Score Display */}
            <div className="flex flex-col items-center gap-6 rounded-xl border border-border bg-card p-8">
              <ViralityScore score={result.score} size="lg" />
              <div className="text-center">
                <h2 className="text-lg font-bold text-foreground">
                  Your Virality Score
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Based on AI analysis of your content
                </p>
              </div>
            </div>

            {/* Breakdown */}
            <AnalysisCard breakdown={result.breakdown} />

            {/* Benchmark */}
            <BenchmarkChart
              yourScore={result.score}
              category={result.benchmarkComparison.category}
              averageScore={result.benchmarkComparison.averageScore}
              topPerformerScore={result.benchmarkComparison.topPerformerScore}
            />

            {/* Suggestions */}
            <SuggestionsList suggestions={result.suggestions} />

            {/* Caption Rewriter */}
            <CaptionRewriter
              originalCaption={caption}
              rewrittenCaptions={result.rewrittenCaptions}
            />

            {/* Feedback */}
            <FeedbackButtons feedback={feedback} onFeedback={setFeedback} />

            {/* Analyze Again */}
            <Button variant="outline" onClick={reset} className="w-full gap-2">
              <RotateCcw className="h-4 w-4" />
              Analyze New Content
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
