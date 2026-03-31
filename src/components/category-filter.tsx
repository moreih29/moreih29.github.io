'use client'

import { useState } from 'react'
import Link from 'next/link'
import { categoryColors } from '@/lib/constants'
import type { Post } from '@/lib/types'
import { formatDate, getCategoryColor } from '@/lib/utils'
import { Pagination } from '@/components/pagination'

export { categoryColors }

export function PostCard({ post, seriesTotal }: { post: Post; seriesTotal?: number }) {
  const color = getCategoryColor(post.category)
  const displayTags = post.tags.slice(0, 2)
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className={`card-interactive h-full overflow-hidden rounded-xl border border-border bg-card${!post.cover ? ' hover:bg-card-hover' : ''}`}>
        {post.cover && (
          <div className="overflow-hidden">
            <img
              src={post.cover}
              alt={post.title}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-col p-6">
          <span className={`mb-3 w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${color.bg} ${color.text} ${color.darkBg} ${color.darkText}`}>
            {post.category}
          </span>
          <h2 className="mb-1 text-lg font-semibold group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="mb-3 text-xs text-muted">
            {post.series && seriesTotal && (
              <span className="text-purple-600 dark:text-purple-400">{post.seriesOrder}/{seriesTotal}편 · </span>
            )}
            {formatDate(post.date)}
          </p>
          <p className="mb-4 flex-1 text-sm text-muted line-clamp-2">
            {post.description}
          </p>
          {displayTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {displayTags.map((tag) => (
                <span key={tag} className="rounded-md bg-tag-bg px-2 py-0.5 text-xs text-tag-text">
                  {tag}
                </span>
              ))}
              {post.tags.length > 2 && (
                <span className="text-xs text-muted">+{post.tags.length - 2}</span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}

const POSTS_PER_PAGE = 9

export function CategoryFilter({ posts }: { posts: Post[] }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showAllTags, setShowAllTags] = useState(false)
  const [page, setPage] = useState(1)

  const categories = Array.from(new Set(posts.map((p) => p.category))).sort()

  const categoryFiltered =
    selectedCategories.length === 0
      ? posts
      : posts.filter((p) => selectedCategories.includes(p.category))

  const TAG_LIMIT = 10
  const tagCounts = new Map<string, number>()
  for (const p of categoryFiltered) {
    for (const t of p.tags) {
      tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)
    }
  }
  const availableTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag)
  const topTags = availableTags.slice(0, TAG_LIMIT)
  const visibleTags = showAllTags
    ? availableTags
    : Array.from(new Set([...topTags, ...selectedTags.filter((t) => availableTags.includes(t))]))
  const hasMoreTags = availableTags.length > TAG_LIMIT

  const filtered =
    selectedTags.length === 0
      ? categoryFiltered
      : categoryFiltered.filter((p) => selectedTags.some((t) => p.tags.includes(t)))

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
  const paged = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
    setSelectedTags([])
    setPage(1)
  }

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
    setPage(1)
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <label
            key={cat}
            className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
              selectedCategories.includes(cat)
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted hover:border-foreground hover:text-foreground'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="hidden"
            />
            {cat}
          </label>
        ))}
      </div>
      {availableTags.length > 0 && (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {visibleTags.map((tag) => (
            <label
              key={tag}
              className={`flex cursor-pointer items-center rounded-md border px-2 py-0.5 text-xs transition-colors ${
                selectedTags.includes(tag)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted hover:border-foreground hover:text-foreground'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => toggleTag(tag)}
                className="hidden"
              />
              {tag}
            </label>
          ))}
          {hasMoreTags && (
            <button
              onClick={() => setShowAllTags((prev) => !prev)}
              className="rounded-md px-2 py-0.5 text-xs text-primary hover:bg-primary/10 transition-colors"
            >
              {showAllTags ? '접기' : `+${availableTags.length - TAG_LIMIT}개 더보기`}
            </button>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paged.map((post) => {
          const seriesCount = post.series
            ? posts.filter((p) => p.series === post.series).length
            : undefined
          return <PostCard key={post.slug} post={post} seriesTotal={seriesCount} />
        })}
      </div>
      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted">해당 조건에 맞는 글이 없습니다.</p>
      )}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  )
}
