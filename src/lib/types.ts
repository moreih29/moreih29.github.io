export interface Post {
  title: string
  slug: string
  date: string
  description: string
  category: string
  tags: string[]
  published: boolean
  series?: string
  seriesOrder?: number
  cover?: string
}
