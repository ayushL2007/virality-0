import { NextResponse } from "next/server"
import { generateObject } from "ai"
import { gateway } from "@ai-sdk/gateway"
import { z } from "zod"

interface AnalyzeRequest {
  mediaUrl: string | null
  mediaType: "image" | "video" | null
  caption: string
}

const analysisSchema = z.object({
  score: z.number().min(0).max(100),
  breakdown: z.object({
    hookStrength: z.number().min(0).max(100),
    emotionalAppeal: z.number().min(0).max(100),
    trendAlignment: z.number().min(0).max(100),
    timing: z.number().min(0).max(100),
    visualImpact: z.number().min(0).max(100),
  }),
  suggestions: z.array(z.string()).max(5),
  rewrittenCaptions: z.array(z.string()).max(3),
  benchmarkComparison: z.object({
    category: z.string(),
    averageScore: z.number().min(0).max(100),
    topPerformerScore: z.number().min(0).max(100),
  }),
})

const SYSTEM_PROMPT = `You are an expert social media virality analyst. Analyze content for its viral potential and provide detailed, actionable feedback.

You MUST respond with valid JSON only, no additional text. Use this exact structure:
{
  "score": <number 0-100>,
  "breakdown": {
    "hookStrength": <number 0-100>,
    "emotionalAppeal": <number 0-100>,
    "trendAlignment": <number 0-100>,
    "timing": <number 0-100>,
    "visualImpact": <number 0-100>
  },
  "suggestions": [<3-5 specific improvement suggestions as strings>],
  "rewrittenCaptions": [<3 improved caption variations as strings>],
  "benchmarkComparison": {
    "category": "<content category>",
    "averageScore": <typical score for this category>,
    "topPerformerScore": <top 10% score for this category>
  }
}

Scoring criteria:
- hookStrength: How attention-grabbing is the opening? Does it stop the scroll?
- emotionalAppeal: Does it evoke strong emotions (joy, surprise, inspiration, nostalgia)?
- trendAlignment: Does it tap into current trends, sounds, or formats?
- timing: Is this relevant to current events, seasons, or cultural moments?
- visualImpact: How visually striking and shareable is the content?

Be brutally honest but constructive. Provide specific, actionable suggestions.`

export async function POST(request: Request) {
  try {
    const body: AnalyzeRequest = await request.json()
    const { caption, mediaType } = body

    if (!caption?.trim() && !mediaType) {
      return NextResponse.json(
        { error: "Please provide a caption or media to analyze" },
        { status: 400 }
      )
    }

    const userPrompt = buildUserPrompt(caption, mediaType)

    const { object: result } = await generateObject({
      model: gateway("google/gemini-2.0-flash"),
      schema: analysisSchema,
      prompt: userPrompt,
      system: SYSTEM_PROMPT,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("[Analyze API Error]", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Analysis failed" },
      { status: 500 }
    )
  }
}

function buildUserPrompt(caption: string, mediaType: "image" | "video" | null): string {
  const parts: string[] = []

  if (mediaType) {
    parts.push(`Content type: ${mediaType}`)
    parts.push(
      mediaType === "video"
        ? "Note: This is a video post. Consider pacing, audio hooks, and visual transitions."
        : "Note: This is an image post. Consider composition, text overlay potential, and shareability."
    )
  }

  if (caption?.trim()) {
    parts.push(`\nCaption to analyze:\n"${caption}"`)
  } else {
    parts.push("\nNo caption provided - analyze based on content type and suggest optimal captions.")
  }

  parts.push("\nAnalyze this content for viral potential and provide your assessment in JSON format.")

  return parts.join("\n")
}


