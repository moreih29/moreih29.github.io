'use client'

import { useState } from 'react'
import Link from 'next/link'
import { categoryColors } from '@/lib/constants'

export { categoryColors }

interface Post {
  title: string
  slug: string
  date: string
  description: string
  category: string
  tags: string[]
  published: boolean
  series?: string
  seriesOrder?: number
}


function getCategoryColor(category: string) {
  return categoryColors[category] ?? categoryColors['General']
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

function PostCard({ post, seriesTotal }: { post: Post; seriesTotal?: number }) {
  const color = getCategoryColor(post.category)
  const displayTags = post.tags.slice(0, 2)
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:bg-card-hover hover:shadow-lg">
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
      </article>
    </Link>
  )
}

export function CategoryFilter({ posts }: { posts: Post[] }) {
  const [selected, setSelected] = useState('All')

  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category))).sort()]

  const filtered = selected === 'All' ? posts : posts.filter((p) => p.category === selected)

  return (
    <div>
      <div className="mb-8 flex gap-1 overflow-x-auto border-b border-border">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors ${
              selected === cat
                ? 'category-tab-active'
                : 'text-muted hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => {
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
    </div>
  )
}
