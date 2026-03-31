'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatDate, getCategoryColor } from '@/lib/utils'
import { Pagination } from '@/components/pagination'
import type { Post } from '@/lib/types'

const POSTS_PER_PAGE = 15

const ALL_CATEGORIES = ['All', 'AI', 'Web', 'MLOps', 'DevOps', 'General']

interface PostListProps {
  posts: Post[]
  seriesCounts: Record<string, number>
}

export function PostList({ posts, seriesCounts }: PostListProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory
    const q = query.toLowerCase()
    const matchesQuery =
      q === '' ||
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q)
    return matchesCategory && matchesQuery
  })

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
  const paged = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  function handleCategory(cat: string) {
    setSelectedCategory(cat)
    setPage(1)
  }

  function handleQuery(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
    setPage(1)
  }

  return (
    <div>
      {/* 상단 필터 영역 */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`rounded-full px-3 py-1 text-sm transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary text-white'
                  : 'border border-border text-muted-foreground hover:border-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={query}
          onChange={handleQuery}
          placeholder="제목, 설명 검색..."
          className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary sm:w-56"
        />
      </div>

      {/* 리스트 */}
      <div className="divide-y divide-border">
        {paged.map((post) => {
          const color = getCategoryColor(post.category)
          const seriesTotal = post.series ? seriesCounts[post.series] : undefined
          return (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group flex items-start gap-3 py-3 transition-colors hover:bg-card px-2 -mx-2 rounded-md"
            >
              <span className="w-24 shrink-0 pt-0.5 text-xs text-muted-foreground tabular-nums">
                {formatDate(post.date)}
              </span>
              <span
                className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${color.bg} ${color.text} ${color.darkBg} ${color.darkText}`}
              >
                {post.category}
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-baseline gap-2 font-semibold leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                  {seriesTotal && post.seriesOrder && (
                    <span className="shrink-0 text-xs font-normal text-purple-500 dark:text-purple-400">
                      {post.seriesOrder}/{seriesTotal}편
                    </span>
                  )}
                </p>
                <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                  {post.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          해당 조건에 맞는 글이 없습니다.
        </p>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  )
}
