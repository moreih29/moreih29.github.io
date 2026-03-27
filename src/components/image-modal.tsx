"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface ClickableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  alt?: string
}

export function ClickableImage({ src, alt, className, ...props }: ClickableImageProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`cursor-zoom-in ${className ?? ""}`}
        onClick={() => setIsOpen(true)}
        {...props}
      />
      {isOpen && <ImageModal src={src} alt={alt} onClose={() => setIsOpen(false)} />}
    </>
  )
}

interface ImageModalProps {
  src?: string
  alt?: string
  onClose: () => void
}

function ImageModal({ src, alt, onClose }: ImageModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-w-[90vw] max-h-[90vh] object-contain cursor-zoom-out"
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body
  )
}
