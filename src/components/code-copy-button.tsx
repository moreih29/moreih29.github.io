"use client"

import { useEffect } from "react"

const ClipboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="2" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export function CodeCopyButton() {
  useEffect(() => {
    const preElements = document.querySelectorAll<HTMLPreElement>("pre")

    const cleanups: (() => void)[] = []

    preElements.forEach((pre) => {
      if (pre.querySelector("[data-copy-btn]")) return

      pre.style.position = "relative"

      const button = document.createElement("button")
      button.setAttribute("data-copy-btn", "true")
      button.setAttribute("aria-label", "코드 복사")
      button.style.cssText = `
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border: none;
        border-radius: 0.375rem;
        background: rgba(100, 116, 139, 0.25);
        color: #94a3b8;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.15s, background 0.15s;
        z-index: 10;
      `

      const renderIcon = (copied: boolean) => {
        if (copied) {
          button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`
        } else {
          button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="2" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`
        }
      }

      renderIcon(false)

      let timeout: ReturnType<typeof setTimeout> | null = null

      const handleClick = async () => {
        const code = pre.querySelector("code")
        const text = code?.innerText ?? pre.innerText
        try {
          await navigator.clipboard.writeText(text)
          renderIcon(true)
          button.style.background = "rgba(100, 116, 139, 0.4)"
          if (timeout) clearTimeout(timeout)
          timeout = setTimeout(() => {
            renderIcon(false)
            button.style.background = "rgba(100, 116, 139, 0.25)"
          }, 2000)
        } catch {
          // clipboard 접근 실패 시 무시
        }
      }

      const handleMouseEnter = () => {
        button.style.opacity = "1"
        button.style.background = "rgba(100, 116, 139, 0.4)"
      }
      const handleMouseLeave = () => {
        button.style.opacity = "0"
        button.style.background = "rgba(100, 116, 139, 0.25)"
      }

      button.addEventListener("click", handleClick)
      pre.addEventListener("mouseenter", () => { button.style.opacity = "1" })
      pre.addEventListener("mouseleave", handleMouseLeave)
      button.addEventListener("mouseenter", handleMouseEnter)
      button.addEventListener("mouseleave", handleMouseLeave)

      pre.appendChild(button)

      cleanups.push(() => {
        if (timeout) clearTimeout(timeout)
        button.remove()
        pre.style.position = ""
      })
    })

    return () => {
      cleanups.forEach((fn) => fn())
    }
  }, [])

  return null
}
