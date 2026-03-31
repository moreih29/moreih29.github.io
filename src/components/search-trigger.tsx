'use client'

import { useEffect, useState } from 'react'
import { SearchModal, type SearchPost } from '@/components/search-modal'

export type { SearchPost }

export function SearchTrigger({ posts }: { posts: SearchPost[] }) {
  const [open, setOpen] = useState(false)
  const [isMac, setIsMac] = useState(true)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes('MAC'))
  }, [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground"
        aria-label="검색 열기"
      >
        <svg
          className="h-3.5 w-3.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span className="hidden sm:inline">검색</span>
        <kbd className="hidden rounded bg-muted/20 px-1 py-0.5 text-xs sm:inline">{isMac ? '⌘K' : 'Ctrl+K'}</kbd>
      </button>

      <SearchModal posts={posts} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
