'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export function ProgressBar() {
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prevPathname = useRef(pathname)

  useEffect(() => {
    if (pathname === prevPathname.current) return
    prevPathname.current = pathname

    // 이전 타이머 정리
    if (timerRef.current) clearTimeout(timerRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)

    // 바 시작
    setProgress(0)
    setVisible(true)

    // 0 → 80% 빠르게
    let current = 0
    intervalRef.current = setInterval(() => {
      current += current < 60 ? 15 : current < 75 ? 5 : 1
      if (current >= 80) {
        current = 80
        clearInterval(intervalRef.current!)
      }
      setProgress(current)
    }, 50)

    // 완료: 100%로 채운 뒤 페이드 아웃
    timerRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setProgress(100)
      timerRef.current = setTimeout(() => {
        setVisible(false)
        setProgress(0)
      }, 300)
    }, 400)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [pathname])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: '2px',
        backgroundColor: '#94a3b8',
        zIndex: 9999,
        transition: progress === 100 ? 'width 0.2s ease, opacity 0.3s ease' : 'width 0.15s ease',
        opacity: progress === 100 ? 0 : 1,
        pointerEvents: 'none',
      }}
    />
  )
}
