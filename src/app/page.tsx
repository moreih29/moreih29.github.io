import Link from 'next/link'
import { posts } from '#content'
import { FeaturePost } from '@/components/feature-post'
import { PostCard } from '@/components/category-filter'

export default function Home() {
  const published = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const featurePost = published[0]
  const latestPosts = published.slice(1, 5)

  // 시리즈 그룹핑
  const seriesMap = new Map<string, { posts: typeof published; latest: (typeof published)[0] }>()
  for (const post of published) {
    if (!post.series) continue
    const entry = seriesMap.get(post.series)
    if (!entry) {
      seriesMap.set(post.series, { posts: [post], latest: post })
    } else {
      entry.posts.push(post)
      if (new Date(post.date) > new Date(entry.latest.date)) {
        entry.latest = post
      }
    }
  }
  const seriesList = Array.from(seriesMap.entries()).map(([name, { posts: sp, latest }]) => ({
    name,
    count: sp.length,
    latest,
  }))

  // 태그 집계 (상위 12개)
  const tagCounts = new Map<string, number>()
  for (const post of published) {
    for (const tag of post.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)
    }
  }
  const topTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 12)
    .map(([tag]) => tag)

  return (
    <div>
      {featurePost && <FeaturePost post={featurePost} />}

      {/* 최신 포스트 섹션 */}
      <section className="py-14">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">최신 글</h2>
          <Link
            href="/posts"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {latestPosts.map((post) => {
            const seriesCount = post.series
              ? published.filter((p) => p.series === post.series).length
              : undefined
            return <PostCard key={post.slug} post={post} seriesTotal={seriesCount} />
          })}
        </div>
      </section>

      {/* 시리즈 프리뷰 섹션 */}
      {seriesList.length > 0 && (
        <section className="py-14">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">시리즈</h2>
            <Link
              href="/series"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              시리즈 보기 →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {seriesList.map(({ name, count, latest }) => (
              <Link
                key={name}
                href={`/posts/${latest.slug}`}
                className="group block rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md hover:bg-card-hover"
              >
                <p className="mb-1 text-xs text-muted">{count}편</p>
                <h3 className="mb-2 text-base font-semibold group-hover:text-primary transition-colors line-clamp-1">
                  {name}
                </h3>
                <p className="text-xs text-muted line-clamp-1">최신: {latest.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 인기 태그 섹션 */}
      {topTags.length > 0 && (
        <section className="py-14">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">태그</h2>
            <Link
              href="/tags"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              전체 태그 →
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {topTags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="rounded-md bg-tag-bg px-3 py-1.5 text-sm text-tag-text hover:bg-primary/10 hover:text-primary transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
