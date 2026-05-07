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
import { Sparkles, RotateCcw, TrendingUp, AlertCircle, Download, Zap, BarChart3, MessageSquare } from "lucide-react"
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
      <header className="sticky top-0 z-50 border-b border-border glass">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/50 to-chart-2/50 opacity-75 blur" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-border">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-foreground">Viral Predictor</h1>
              <p className="text-xs text-muted-foreground">AI-powered content analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/chat-log.txt"
              download
              className={cn(
                "flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3",
                "text-xs font-medium text-muted-foreground transition-all duration-200",
                "hover:bg-secondary hover:text-foreground hover:border-primary/20"
              )}
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Chat Log</span>
            </a>
            {result && (
              <Button variant="outline" size="sm" onClick={reset} className="gap-2 border-border hover:border-primary/20">
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline">New Analysis</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {!result ? (
          /* Input State */
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Powered by Gemini AI
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
                Predict your content&apos;s <span className="text-gradient">viral potential</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-balance">
                Upload your media and caption to get instant AI-powered analysis with actionable insights to maximize engagement.
              </p>
            </div>

            {/* Main Input Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Media Upload */}
              <MediaUploader media={media} onMediaChange={setMedia} disabled={isAnalyzing} />

              {/* Caption Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="caption"
                    className="text-sm font-medium text-foreground"
                  >
                    Caption
                  </label>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {caption.length} characters
                  </span>
                </div>
                <Textarea
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Enter your caption here... (optional if media is uploaded)"
                  className="min-h-[180px] resize-none bg-card border-border transition-all duration-200 focus:border-primary/30 focus:ring-primary/20"
                  disabled={isAnalyzing}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Analyze Button */}
            <div className="flex justify-center pt-2">
              <Button
                onClick={analyze}
                disabled={!canAnalyze}
                className="h-12 px-8 text-base font-medium gap-2.5 glow-sm hover:glow-primary transition-all duration-300"
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
            </div>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-3 gap-4 pt-6">
              <div className="rounded-xl border border-border bg-card p-5 card-hover">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Instant Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Get detailed virality predictions in seconds with AI-powered insights.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 card-hover">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10 mb-4">
                  <BarChart3 className="h-5 w-5 text-chart-2" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Detailed Metrics</h3>
                <p className="text-sm text-muted-foreground">
                  Hook strength, emotional appeal, trend alignment, and more.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 card-hover">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10 mb-4">
                  <MessageSquare className="h-5 w-5 text-chart-4" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Caption Rewriter</h3>
                <p className="text-sm text-muted-foreground">
                  Get AI-optimized caption variations to boost engagement.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Results State */
          <div className="space-y-8">
            {/* Results Header */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Analysis Complete</h2>
              <p className="text-muted-foreground">Here&apos;s how your content is predicted to perform</p>
            </div>

            {/* Score Display */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-2/5" />
              <div className="relative flex flex-col items-center gap-6">
                <ViralityScore score={result.score} size="lg" />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Based on AI analysis of your content
                  </p>
                </div>
              </div>
            </div>

            {/* Two Column Layout for Results */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Breakdown */}
              <AnalysisCard breakdown={result.breakdown} />

              {/* Benchmark */}
              <BenchmarkChart
                yourScore={result.score}
                category={result.benchmarkComparison.category}
                averageScore={result.benchmarkComparison.averageScore}
                topPerformerScore={result.benchmarkComparison.topPerformerScore}
              />
            </div>

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
            <div className="flex justify-center pt-4">
              <Button variant="outline" onClick={reset} className="gap-2 h-11 px-6 border-border hover:border-primary/20">
                <RotateCcw className="h-4 w-4" />
                Analyze New Content
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>Viral Predictor</span>
            </div>
            <p>Powered by Gemini 2.5 Flash Lite</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
