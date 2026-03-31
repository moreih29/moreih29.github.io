'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'

export interface SearchPost {
  title: string
  slug: string
  description: string
  tags: string[]
  category: string
  date: string
}

interface SearchModalProps {
  posts: SearchPost[]
  open: boolean
  onClose: () => void
}

export function SearchModal({ posts, open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchPost[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const router = useRouter()

  const fuse = useRef(
    new Fuse(posts, {
      keys: ['title', 'description', 'tags'],
      threshold: 0.4,
      includeScore: true,
    })
  )

  useEffect(() => {
    fuse.current = new Fuse(posts, {
      keys: ['title', 'description', 'tags'],
      threshold: 0.4,
      includeScore: true,
    })
  }, [posts])

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults([])
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setActiveIndex(0)
      return
    }
    const hits = fuse.current.search(query).map((r) => r.item)
    setResults(hits.slice(0, 8))
    setActiveIndex(0)
  }, [query])

  const handleSelect = useCallback(
    (slug: string) => {
      router.push(`/posts/${slug}`)
      onClose()
    },
    [router, onClose]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (results.length === 0) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => (i + 1) % results.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => (i - 1 + results.length) % results.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        handleSelect(results[activeIndex].slug)
      }
    },
    [results, activeIndex, handleSelect, onClose]
  )

  useEffect(() => {
    if (listRef.current && results.length > 0) {
      const item = listRef.current.children[activeIndex] as HTMLElement
      item?.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex, results])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="검색"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
        {/* 입력 필드 */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <svg
            className="h-4 w-4 shrink-0 text-muted"
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
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="검색..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            aria-label="검색어 입력"
            autoComplete="off"
          />
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-xs text-muted sm:inline">
            ESC
          </kbd>
        </div>

        {/* 결과 목록 */}
        {query.trim() && (
          <div className="max-h-80 overflow-y-auto">
            {results.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-muted">결과 없음</p>
            ) : (
              <ul ref={listRef} role="listbox">
                {results.map((post, i) => (
                  <li
                    key={post.slug}
                    role="option"
                    aria-selected={i === activeIndex}
                  >
                    <button
                      className={`w-full px-4 py-3 text-left transition-colors ${
                        i === activeIndex ? 'bg-slate-100 dark:bg-slate-800' : 'hover:bg-slate-50 dark:hover:bg-slate-900'
                      }`}
                      onClick={() => handleSelect(post.slug)}
                      onMouseEnter={() => setActiveIndex(i)}
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {post.category}
                        </span>
                        <span className="truncate text-sm font-medium">{post.title}</span>
                      </div>
                      {post.description && (
                        <p className="truncate text-xs text-muted pl-0.5">{post.description}</p>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
