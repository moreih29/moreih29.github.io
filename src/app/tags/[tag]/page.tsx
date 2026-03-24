import { posts } from '#content'
import { PostCard } from '@/components/category-filter'

export function generateStaticParams() {
  const tags = Array.from(
    new Set(
      posts
        .filter((p) => p.published)
        .flatMap((p) => p.tags)
    )
  )
  return tags.map((tag) => ({ tag: encodeURIComponent(tag) }))
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  return {
    title: `#${decoded} — moreih29 blog`,
    description: `${decoded} 태그가 포함된 포스트 목록`,
  }
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)

  const tagPosts = posts
    .filter((p) => p.published && p.tags.includes(decoded))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div>
      <header className="mb-10">
        <p className="text-sm text-muted mb-1">태그</p>
        <h1 className="text-3xl font-bold">#{decoded}</h1>
        <p className="mt-2 text-sm text-muted">{tagPosts.length}개의 포스트</p>
      </header>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tagPosts.map((post) => {
          const seriesTotal = post.series
            ? posts.filter((p) => p.published && p.series === post.series).length
            : undefined
          return <PostCard key={post.slug} post={post} seriesTotal={seriesTotal} />
        })}
      </div>
      {tagPosts.length === 0 && (
        <p className="py-12 text-center text-muted">해당 태그의 글이 없습니다.</p>
      )}
    </div>
  )
}
