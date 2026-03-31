'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import type { Post } from '@/lib/types'
import { formatDate, getCategoryColor } from '@/lib/utils'

export function HeroSlider({ posts }: { posts: Post[] }) {
  const [current, setCurrent] = useState(0)
  const total = posts.length

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total)
  }, [total])

  useEffect(() => {
    if (total <= 1) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next, total, current])

  if (posts.length === 0) return null

  const post = posts[current]
  const color = getCategoryColor(post.category)

  return (
    <div className="relative mb-12 overflow-hidden rounded-2xl border border-border bg-card">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="flex h-[280px] flex-col justify-end px-16 py-8 md:px-20 md:py-12">
          <div className="mb-3 flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${color.bg} ${color.text} ${color.darkBg} ${color.darkText}`}>
              {post.category}
            </span>
            {post.series && (
              <span className="text-xs text-purple-600 dark:text-purple-400">
                {post.series}
              </span>
            )}
          </div>
          <h2 className="mb-2 text-2xl font-bold md:text-3xl line-clamp-2">
            {post.title}
          </h2>
          <p className="mb-3 max-w-2xl text-sm text-muted line-clamp-2 min-h-[2.5rem]">
            {post.description}
          </p>
          <p className="text-xs text-muted">{formatDate(post.date)}</p>
        </div>
      </Link>

      {total > 1 && (
        <>
          <button
            onClick={(e) => { e.preventDefault(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
            aria-label="이전"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.preventDefault(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
            aria-label="다음"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); setCurrent(i) }}
                className={`h-2 rounded-full transition-all ${
                  i === current ? 'w-6 bg-primary' : 'w-2 bg-foreground/30'
                }`}
                aria-label={`슬라이드 ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
