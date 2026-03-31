<!-- tags: citation, MDX, rehype-citation, footnotes, sidenotes, source-credibility, accessibility, UX -->
# Blog Citation System Research

**Date searched**: 2026-03-31

## Key Sources

### Implementation
- **rehype-citation**: https://github.com/timlrx/rehype-citation — rehype plugin for BibTeX/CSL-JSON citations in MDX. Supports hover tooltips, linked citations, multiple CSL styles. Per-post frontmatter control in v2.1.1+.
- **remark-gfm**: https://github.com/remarkjs/remark-gfm — GFM footnotes (`[^1]` syntax). Supersedes deprecated `remark-footnotes`. Must run before rehype-citation.
- **Distill citation system**: https://rstudio.github.io/distill/citations.html — tippy.js hover tooltips on numbered citations, auto-generated bibliography appendix, BibTeX input. Gold standard for web-native academic citation UX.

### UX Patterns
- **Tufte CSS sidenotes**: https://edwardtufte.github.io/tufte-css/ — HTML: label+checkbox+span pattern. CSS-only. Collapses to toggle on mobile.
- **Gwern.net sidenotes analysis**: https://gwern.net/sidenote — trade-off analysis: CSS-only (Tufte) good for moderate density; JS needed for heavy annotation to handle overlaps.
- **Wikipedia Reference Tooltips**: https://www.mediawiki.org/wiki/Reference_Tooltips — default hover preview on citation numbers; no scroll required.

### Accessibility
- **DubBot footnote accessibility guide**: https://dubbot.com/dubblog/2024/a-footnote-on-footnotes-they-need-to-be-accessible.html — requires bidirectional anchor links, aria-describedby, keyboard/focus trigger for tooltips (not hover-only), tab order inclusion.

### Source Credibility Tiers
- **Oregon State four-tier framework**: https://open.oregonstate.education/goodargument/chapter/four-tiers-of-sources/ — T1: peer-reviewed; T2: credible non-academic (govt, major journalism); T3: short news items; T4: Wikipedia/web. Blog's 3-tier system is a reasonable compression.

## Key Findings Summary

1. **rehype-citation is the practical choice** for Velite/Next.js MDX blogs — BibTeX in, formatted citations + bibliography out. No direct Velite integration example found, but API is compatible.
2. **Hover tooltip pattern** (Distill/Wikipedia style) is the established web-native pattern for inline citation previews. Must be focus-accessible, not hover-only.
3. **Sidenotes** offer the best reading UX for heavy annotation but require layout budget (wide viewport margin). Tufte CSS implementation is CSS-only.
4. **No standard for visual credibility tier indicators** exists in web publications. Color/icon coding would be novel. Scite.ai classifies citation type (supporting/contrasting), not source tier.
5. **3-tier source system** aligns with Oregon State's T1-T3; their T4 (agenda-driven) is worth noting as a disqualifier, not a separate display tier.

## Null Results (saved effort)
- Papers with Code: no citation UX documentation found
- ACM Queue: no citation interaction documentation found
- Velite + rehype-citation working example: not documented; inferred from API compatibility
- Standard color-coding for citation tiers: no established convention
