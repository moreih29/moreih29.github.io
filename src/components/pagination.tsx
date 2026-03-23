'use client'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg border border-border px-3 py-1.5 text-sm transition-colors hover:bg-card-hover disabled:opacity-30 disabled:cursor-not-allowed"
      >
        이전
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
            page === currentPage
              ? 'bg-primary text-white'
              : 'border border-border hover:bg-card-hover'
          }`}
        >
          {page}
        </button>
      ))}
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
