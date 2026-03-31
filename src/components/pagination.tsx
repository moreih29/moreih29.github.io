'use client'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

type PageItem = number | '...'

function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  const visible = new Set<number>()

  // 항상 표시: 처음 2개, 끝 2개
  visible.add(1)
  visible.add(2)
  visible.add(totalPages - 1)
  visible.add(totalPages)

  // 항상 표시: 현재 페이지 주변 1개씩
  visible.add(currentPage - 1)
  visible.add(currentPage)
  visible.add(currentPage + 1)

  const sorted = Array.from(visible)
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b)

  const items: PageItem[] = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      items.push('...')
    }
    items.push(sorted[i])
  }
  return items
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const items = getPageItems(currentPage, totalPages)

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg border border-border px-3 py-1.5 text-sm transition-colors hover:bg-card-hover disabled:opacity-30 disabled:cursor-not-allowed"
      >
        이전
      </button>
      {items.map((item, idx) =>
        item === '...' ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-1 py-1.5 text-sm text-muted-foreground select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
              item === currentPage
                ? 'bg-primary text-white'
                : 'border border-border hover:bg-card-hover'
            }`}
          >
            {item}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-border px-3 py-1.5 text-sm transition-colors hover:bg-card-hover disabled:opacity-30 disabled:cursor-not-allowed"
      >
        다음
      </button>
    </div>
  )
}
