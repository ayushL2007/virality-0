"use client"

import { useCallback, useRef } from "react"
import { Upload, X, Image as ImageIcon, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MediaAsset } from "@/hooks/use-viral-predictor"

interface MediaUploaderProps {
  media: MediaAsset | null
  onMediaChange: (media: MediaAsset | null) => void
  disabled?: boolean
}

export function MediaUploader({ media, onMediaChange, disabled }: MediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      const type = file.type.startsWith("video/") ? "video" : "image"
      const uri = URL.createObjectURL(file)

      onMediaChange({
        uri,
        type,
        name: file.name,
      })

      // Reset input so the same file can be selected again
      if (inputRef.current) {
        inputRef.current.value = ""
      }
    },
    [onMediaChange]
  )

  const handleRemove = useCallback(() => {
    if (media?.uri) {
      URL.revokeObjectURL(media.uri)
    }
    onMediaChange(null)
  }, [media, onMediaChange])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (disabled) return

      const file = e.dataTransfer.files[0]
      if (!file) return

      const isMedia = file.type.startsWith("image/") || file.type.startsWith("video/")
      if (!isMedia) return

      const type = file.type.startsWith("video/") ? "video" : "image"
      const uri = URL.createObjectURL(file)

      onMediaChange({
        uri,
        type,
        name: file.name,
      })
    },
    [disabled, onMediaChange]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  if (media) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-border bg-card">
        <div className="relative aspect-video w-full">
          {media.type === "video" ? (
            <video
              src={media.uri}
              className="h-full w-full object-cover"
              controls
              muted
            />
          ) : (
            <img
              src={media.uri}
              alt="Uploaded media"
              className="h-full w-full object-cover"
            />
          )}
          <button
            onClick={handleRemove}
            disabled={disabled}
            className={cn(
              "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full",
              "bg-background/80 backdrop-blur-sm transition-colors hover:bg-background",
              disabled && "pointer-events-none opacity-50"
            )}
            aria-label="Remove media"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-2 border-t border-border px-4 py-3">
          {media.type === "video" ? (
            <Video className="h-4 w-4 text-primary" />
          ) : (
            <ImageIcon className="h-4 w-4 text-primary" />
          )}
          <span className="truncate text-sm text-muted-foreground">{media.name}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={cn(
        "group relative flex cursor-pointer flex-col items-center justify-center gap-4",
        "rounded-xl border-2 border-dashed border-border bg-card/50 p-8",
        "transition-colors hover:border-primary/50 hover:bg-card",
        disabled && "pointer-events-none opacity-50"
      )}
      onClick={() => !disabled && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
        <Upload className="h-7 w-7" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-foreground">Upload media</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Drag and drop or click to select
        </p>
        <p className="mt-1 text-xs text-muted-foreground/70">
          Supports images and videos
        </p>
      </div>
    </div>
  )
}
