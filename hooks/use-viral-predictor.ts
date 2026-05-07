"use client"

import { useState, useCallback } from "react"

export interface ViralityBreakdown {
  hookStrength: number
  emotionalAppeal: number
  trendAlignment: number
  timing: number
  visualImpact: number
}

export interface ViralityResult {
  score: number
  breakdown: ViralityBreakdown
  suggestions: string[]
  rewrittenCaptions: string[]
  benchmarkComparison: {
    category: string
    averageScore: number
    topPerformerScore: number
  }
}

export interface MediaAsset {
  uri: string
  type: "image" | "video"
  name: string
}

interface PredictorState {
  media: MediaAsset | null
  caption: string
  isAnalyzing: boolean
  result: ViralityResult | null
  feedback: "thumbs-up" | "thumbs-down" | null
  error: string | null
}

export function useViralPredictor() {
  const [state, setState] = useState<PredictorState>({
    media: null,
    caption: "",
    isAnalyzing: false,
    result: null,
    feedback: null,
    error: null,
  })

  const setMedia = useCallback((media: MediaAsset | null) => {
    setState((prev) => ({ ...prev, media, result: null, feedback: null, error: null }))
  }, [])

  const setCaption = useCallback((caption: string) => {
    setState((prev) => ({ ...prev, caption }))
  }, [])

  const setFeedback = useCallback((feedback: "thumbs-up" | "thumbs-down" | null) => {
    setState((prev) => ({ ...prev, feedback }))
  }, [])

  const analyze = useCallback(async () => {
    if (!state.media && !state.caption.trim()) {
      setState((prev) => ({ ...prev, error: "Please add media or a caption to analyze" }))
      return
    }

    setState((prev) => ({ ...prev, isAnalyzing: true, error: null, result: null }))

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mediaUrl: state.media?.uri ?? null,
          mediaType: state.media?.type ?? null,
          caption: state.caption,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Analysis failed")
      }

      const result: ViralityResult = await response.json()
      setState((prev) => ({ ...prev, result, isAnalyzing: false }))
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isAnalyzing: false,
        error: err instanceof Error ? err.message : "Analysis failed",
      }))
    }
  }, [state.media, state.caption])

  const reset = useCallback(() => {
    setState({
      media: null,
      caption: "",
      isAnalyzing: false,
      result: null,
      feedback: null,
      error: null,
    })
  }, [])

  return {
    ...state,
    setMedia,
    setCaption,
    setFeedback,
    analyze,
    reset,
  }
}
