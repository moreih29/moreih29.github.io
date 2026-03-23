import { posts } from '#content'
import type { Metadata } from 'next'
import { SeriesView } from '@/components/series-view'

export const metadata: Metadata = {
  title: 'Series - moreih29 blog',
  description: '시리즈 글 목록',
}

export default function SeriesPage() {
  const published = posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Series</h1>
      <SeriesView posts={published} />
    </div>
  )
}
