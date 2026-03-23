import { posts } from '#content'
import { CategoryFilter } from '@/components/category-filter'
import { HeroSlider } from '@/components/hero-slider'

export default function Home() {
  const published = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const heroPosts = published.slice(0, 3)

  return (
    <div>
      <HeroSlider posts={heroPosts} />
      <h2 className="mb-8 text-2xl font-bold">전체 아티클</h2>
      <CategoryFilter posts={published} />
    </div>
  )
}
