import { categoryColors } from '@/lib/constants'

export function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

export function getCategoryColor(category: string) {
  return categoryColors[category] ?? categoryColors['General']
}
