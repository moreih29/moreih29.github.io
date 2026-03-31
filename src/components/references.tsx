'use client'

import React, { useState, useRef, useEffect } from 'react'

interface TooltipData {
  tier: string
  title: string
  source: string
}

interface RefProps {
  id: number
}

export function Ref({ id }: RefProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const [visible, setVisible] = useState(false)
  const supRef = useRef<HTMLElement>(null)

  const readTooltipData = (): TooltipData | null => {
    const el = document.getElementById('ref-' + id)
    if (!el) return null
    return {
      tier: el.dataset.tier ?? '',
      title: el.dataset.title ?? '',
      source: el.dataset.source ?? '',
    }
  }

  const handleMouseEnter = () => {
    const data = readTooltipData()
    if (data) {
      setTooltip(data)
      setVisible(true)
    }
  }

  const handleMouseLeave = () => {
    setVisible(false)
  }

  const handleFocus = () => {
    const data = readTooltipData()
    if (data) {
      setTooltip(data)
      setVisible(true)
    }
  }

  const handleBlur = () => {
    setVisible(false)
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.getElementById('ref-' + id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const tierColors: Record<string, string> = {
    T1: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    T2: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    T3: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  }

  return (
    <span className="relative inline-flex items-baseline ml-[0.1em]" ref={supRef as React.Ref<HTMLSpanElement>}>
      <sup style={{ fontSize: '0.7em', fontWeight: 500 }}>
        <a
          href={`#ref-${id}`}
          id={`ref-back-${id}`}
          className="text-primary no-underline hover:underline"
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label={`참고 자료 ${id}로 이동`}
        >
          {id}
        </a>
      </sup>
      {visible && tooltip && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
          style={{ maxWidth: '320px', width: 'max-content' }}
        >
          <span
            className="flex flex-col gap-1 rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-overlay"
          >
            <span className="flex items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${tierColors[tooltip.tier] ?? ''}`}
              >
                {tooltip.tier}
              </span>
              <span className="font-medium text-foreground leading-tight">{tooltip.title}</span>
            </span>
            <span className="text-muted leading-tight">{tooltip.source}</span>
          </span>
        </span>
      )}
    </span>
  )
}

interface RefItemProps {
  id: number
  tier: 'T1' | 'T2' | 'T3'
  title: string
  source: string
  url?: string
}

export function RefItem({ id, tier, title, source, url }: RefItemProps) {
  const tierColors: Record<string, string> = {
    T1: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    T2: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    T3: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  }

  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.getElementById('ref-back-' + id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div
      id={`ref-${id}`}
      className="ref-item flex items-start gap-3 py-1.5"
      style={{ scrollMarginTop: '6rem' }}
      data-tier={tier}
      data-title={title}
      data-source={source}
    >
      <span className="min-w-[1.5rem] text-right font-mono text-sm text-muted shrink-0 pt-px">
        {id}
      </span>
      <span
        className={`mt-0.5 inline-flex shrink-0 items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${tierColors[tier]}`}
      >
        {tier}
      </span>
      <span className="flex flex-wrap items-baseline gap-x-1 text-sm leading-relaxed min-w-0">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline decoration-transparent underline-offset-2 transition-colors hover:decoration-current"
          >
            {title}
          </a>
        ) : (
          <span className="font-medium text-foreground">{title}</span>
        )}
        <span className="text-muted">— {source}</span>
        <a
          href={`#ref-back-${id}`}
          onClick={handleBackClick}
          className="ml-1 text-muted no-underline hover:text-foreground transition-colors"
          aria-label="본문으로 돌아가기"
        >
          ↩
        </a>
      </span>
    </div>
  )
}

interface ReferencesProps {
  children: React.ReactNode
}

export function References({ children }: ReferencesProps) {
  const tierOrder: Array<'T1' | 'T2' | 'T3'> = ['T1', 'T2', 'T3']
  const tierHeaders: Record<string, string> = {
    T1: 'T1 — 1차 출처 (논문·공식 기술 보고서)',
    T2: 'T2 — 2차 출처 (공식 블로그·주요 매체)',
    T3: 'T3 — 커뮤니티 출처',
  }
  const tierBorderColors: Record<string, string> = {
    T1: 'border-blue-400 dark:border-blue-600',
    T2: 'border-green-400 dark:border-green-600',
    T3: 'border-amber-400 dark:border-amber-600',
  }

  const grouped: Record<string, React.ReactNode[]> = { T1: [], T2: [], T3: [] }

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const tier = (child.props as RefItemProps).tier
      if (tier && grouped[tier]) {
        grouped[tier].push(child)
      }
    }
  })

  return (
    <div className="mt-12 rounded-xl border border-border bg-card p-6">
      <p className="text-base font-semibold mb-4">참고 자료</p>
      {tierOrder.map((tier) => {
        const items = grouped[tier]
        if (!items || items.length === 0) return null
        return (
          <div key={tier} className="mb-4 last:mb-0">
            <p
              className={`text-sm font-semibold mb-2 pl-3 border-l-2 ${tierBorderColors[tier]}`}
            >
              {tierHeaders[tier]}
            </p>
            <div className="space-y-0.5">{items}</div>
          </div>
        )
      })}
    </div>
  )
}
