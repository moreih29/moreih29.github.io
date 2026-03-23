'use client'

import { useState } from 'react'
import Link from 'next/link'
import { categoryColors } from '@/lib/constants'
import type { Post } from '@/lib/types'
import { formatDate, getCategoryColor } from '@/lib/utils'
import { Pagination } from '@/components/pagination'

export { categoryColors }

function PostCard({ post, seriesTotal }: { post: Post; seriesTotal?: number }) {
  const color = getCategoryColor(post.category)
  const displayTags = post.tags.slice(0, 2)
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className={`h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:shadow-lg${!post.cover ? ' hover:bg-card-hover' : ''}`}>
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
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(1)

  const categories = Array.from(new Set(posts.map((p) => p.category))).sort()

  const filtered = selected.length === 0 ? posts : posts.filter((p) => selected.includes(p.category))

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
  const paged = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <label
            key={cat}
            className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
              selected.includes(cat)
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted hover:border-foreground hover:text-foreground'
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(cat)}
              onChange={() => {
                setSelected(prev =>
                  prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                )
                setPage(1)
              }}
              className="hidden"
            />
            {cat}
          </label>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paged.map((post) => {
          const seriesCount = post.series
            ? posts.filter(p => p.series === post.series).length
            : undefined
          return (
            <PostCard key={post.slug} post={post} seriesTotal={seriesCount} />
          )
        })}
      </div>
      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted">해당 카테고리에 글이 없습니다.</p>
      )}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  )
}
