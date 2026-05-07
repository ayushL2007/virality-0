import { NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

interface AnalyzeRequest {
  mediaUrl: string | null
  mediaType: "image" | "video" | null
  caption: string
}

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

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      response_format: { type: "json_object" },
    })

    const responseText = completion.choices[0]?.message?.content
    if (!responseText) {
      throw new Error("No response from AI")
    }

    const result = JSON.parse(responseText)

    // Validate and normalize the response
    const normalizedResult = {
      score: clamp(result.score ?? 50, 0, 100),
      breakdown: {
        hookStrength: clamp(result.breakdown?.hookStrength ?? 50, 0, 100),
        emotionalAppeal: clamp(result.breakdown?.emotionalAppeal ?? 50, 0, 100),
        trendAlignment: clamp(result.breakdown?.trendAlignment ?? 50, 0, 100),
        timing: clamp(result.breakdown?.timing ?? 50, 0, 100),
        visualImpact: clamp(result.breakdown?.visualImpact ?? 50, 0, 100),
      },
      suggestions: Array.isArray(result.suggestions) ? result.suggestions.slice(0, 5) : [],
      rewrittenCaptions: Array.isArray(result.rewrittenCaptions)
        ? result.rewrittenCaptions.slice(0, 3)
        : [],
      benchmarkComparison: {
        category: result.benchmarkComparison?.category ?? "General",
        averageScore: clamp(result.benchmarkComparison?.averageScore ?? 45, 0, 100),
        topPerformerScore: clamp(result.benchmarkComparison?.topPerformerScore ?? 85, 0, 100),
      },
    }

    return NextResponse.json(normalizedResult)
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

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}
