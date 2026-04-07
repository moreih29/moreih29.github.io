"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

interface ClickableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  alt?: string
}

export function ClickableImage({ src, alt, className, ...props }: ClickableImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isSvg = src?.endsWith(".svg")

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`cursor-zoom-in ${isSvg ? "dark:bg-slate-100 dark:rounded-xl dark:p-4 dark:shadow-sm" : ""} ${className ?? ""}`}
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
  const isSvg = src?.endsWith(".svg")
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
        return
      }
      if (e.key === "Tab") {
        const modal = modalRef.current
        if (!modal) return
        const focusable = modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last?.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first?.focus()
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = originalOverflow
      previouslyFocused?.focus()
    }
  }, [onClose])

  return createPortal(
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="이미지 확대"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        onClick={onClose}
        aria-label="닫기"
        className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`max-w-[90vw] max-h-[90vh] object-contain cursor-zoom-out ${isSvg ? "bg-slate-100 rounded-xl p-4" : ""}`}
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body
  )
}
