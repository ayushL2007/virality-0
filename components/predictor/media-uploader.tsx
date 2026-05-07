"use client"

import { useCallback, useRef } from "react"
import { Upload, X, Image as ImageIcon, Video, CloudUpload } from "lucide-react"
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
      <div className="relative overflow-hidden rounded-xl border border-border bg-card card-hover">
        <div className="relative aspect-video w-full bg-secondary/50">
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
              "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full",
              "bg-background/90 backdrop-blur-sm border border-border",
              "transition-all duration-200 hover:bg-destructive hover:border-destructive hover:text-destructive-foreground",
              disabled && "pointer-events-none opacity-50"
            )}
            aria-label="Remove media"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-3 border-t border-border px-4 py-3.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            {media.type === "video" ? (
              <Video className="h-4 w-4 text-primary" />
            ) : (
              <ImageIcon className="h-4 w-4 text-primary" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{media.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{media.type} uploaded</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={cn(
        "group relative flex cursor-pointer flex-col items-center justify-center gap-5",
        "rounded-xl border-2 border-dashed border-border bg-card/50 min-h-[220px]",
        "transition-all duration-300",
        "hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/5",
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
      
      {/* Animated upload icon */}
      <div className="relative">
        <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-primary/20 to-chart-2/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-chart-2/10 border border-primary/10 transition-transform duration-300 group-hover:scale-110">
          <CloudUpload className="h-8 w-8 text-primary transition-transform duration-300 group-hover:-translate-y-0.5" />
        </div>
      </div>
      
      <div className="text-center space-y-1.5">
        <p className="font-semibold text-foreground">Upload media</p>
        <p className="text-sm text-muted-foreground">
          Drag and drop or <span className="text-primary">browse</span>
        </p>
        <p className="text-xs text-muted-foreground/70">
          PNG, JPG, GIF, MP4 up to 50MB
        </p>
      </div>
    </div>
  )
}
