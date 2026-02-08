# PRD: Custom Docusaurus Theme

## 1. Overview

### 1.1 Purpose
Define a custom Docusaurus theme to replace `@docusaurus/theme-classic` with a fully branded, custom-styled documentation experience.

### 1.2 Goals
- Unique visual identity aligned with brand guidelines
- Improved user experience for documentation readers
- Maintainable, component-based architecture
- Full dark/light mode support
- Mobile-responsive design

---

## 2. Theme Architecture

### 2.1 Package Structure
```
packages/theme-custom/
├── src/
│   ├── theme/
│   │   ├── Navbar/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── Footer/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── Layout/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── DocItem/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── DocSidebar/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── TOC/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── CodeBlock/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── Admonition/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   └── index.ts          # Export all components
│   ├── css/
│   │   ├── variables.css     # CSS custom properties
│   │   ├── global.css        # Global styles
│   │   └── utilities.css     # Utility classes
│   └── index.ts              # Theme entry point
├── package.json
└── tsconfig.json
```

---

## 3. Design System

### 3.1 Color Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--color-primary` | `#6366F1` | `#818CF8` | Primary actions, links |
| `--color-secondary` | `#10B981` | `#34D399` | Secondary actions |
| `--color-background` | `#FFFFFF` | `#0F172A` | Page background |
| `--color-surface` | `#F8FAFC` | `#1E293B` | Cards, sidebars |
| `--color-text-primary` | `#1E293B` | `#F1F5F9` | Main text |
| `--color-text-secondary` | `#64748B` | `#94A3B8` | Secondary text |
| `--color-border` | `#E2E8F0` | `#334155` | Borders, dividers |
| `--color-success` | `#22C55E` | `#4ADE80` | Success states |
| `--color-warning` | `#F59E0B` | `#FBBF24` | Warning states |
| `--color-error` | `#EF4444` | `#F87171` | Error states |
| `--color-info` | `#3B82F6` | `#60A5FA` | Info states |

### 3.2 Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--font-family-base` | `'Inter', sans-serif` | Body text |
| `--font-family-heading` | `'Inter', sans-serif` | Headings |
| `--font-family-mono` | `'JetBrains Mono', monospace` | Code |
| `--font-size-xs` | `0.75rem` (12px) | Small labels |
| `--font-size-sm` | `0.875rem` (14px) | Secondary text |
| `--font-size-base` | `1rem` (16px) | Body text |
| `--font-size-lg` | `1.125rem` (18px) | Lead text |
| `--font-size-xl` | `1.25rem` (20px) | H4 |
| `--font-size-2xl` | `1.5rem` (24px) | H3 |
| `--font-size-3xl` | `1.875rem` (30px) | H2 |
| `--font-size-4xl` | `2.25rem` (36px) | H1 |
| `--line-height-tight` | `1.25` | Headings |
| `--line-height-base` | `1.6` | Body text |
| `--line-height-relaxed` | `1.75` | Long-form content |

### 3.3 Spacing Scale

| Token | Value |
|-------|-------|
| `--space-1` | `0.25rem` (4px) |
| `--space-2` | `0.5rem` (8px) |
| `--space-3` | `0.75rem` (12px) |
| `--space-4` | `1rem` (16px) |
| `--space-6` | `1.5rem` (24px) |
| `--space-8` | `2rem` (32px) |
| `--space-12` | `3rem` (48px) |
| `--space-16` | `4rem` (64px) |

### 3.4 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `0.25rem` | Small elements |
| `--radius-md` | `0.5rem` | Buttons, inputs |
| `--radius-lg` | `0.75rem` | Cards |
| `--radius-xl` | `1rem` | Large cards, modals |
| `--radius-full` | `9999px` | Pills, avatars |

### 3.5 Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Modals |

---

## 4. Layout Specifications

### 4.1 Page Layouts

#### Documentation Page Layout
```
┌────────────────────────────────────────────────────────────────┐
│                         NAVBAR (64px)                          │
├────────────┬───────────────────────────────────┬───────────────┤
│  SIDEBAR   │         MAIN CONTENT              │     TOC       │
│  (280px)   │         (flex: 1)                 │   (200px)     │
│            │                                   │               │
│  - Docs    │  # Page Title                     │  On this page │
│  - Nested  │                                   │  - Section 1  │
│  - Links   │  Content here...                  │  - Section 2  │
│            │                                   │  - Section 3  │
│            │  ┌─────────────────────────────┐  │               │
│            │  │      CODE BLOCK             │  │               │
│            │  └─────────────────────────────┘  │               │
│            │                                   │               │
│            │  ┌─────────────────────────────┐  │               │
│            │  │ ◀ Prev          Next ▶      │  │               │
│            │  └─────────────────────────────┘  │               │
├────────────┴───────────────────────────────────┴───────────────┤
│                           FOOTER                               │
└────────────────────────────────────────────────────────────────┘
```

#### Landing Page Layout
```
┌────────────────────────────────────────────────────────────────┐
│                         NAVBAR (64px)                          │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                       HERO SECTION                             │
│              (Full width, centered content)                    │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                     FEATURES GRID                              │
│              ┌────────┐ ┌────────┐ ┌────────┐                  │
│              │ Card 1 │ │ Card 2 │ │ Card 3 │                  │
│              └────────┘ └────────┘ └────────┘                  │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                           FOOTER                               │
└────────────────────────────────────────────────────────────────┘
```

### 4.2 Responsive Breakpoints

| Breakpoint | Min Width | Behavior |
|------------|-----------|----------|
| `mobile` | 0px | Single column, hamburger menu, no TOC |
| `tablet` | 768px | Collapsible sidebar, no TOC |
| `desktop` | 1024px | Full sidebar, TOC visible |
| `wide` | 1440px | Max-width container, centered |

---

## 5. UI Component Specifications

### 5.1 Navbar

**Structure:**
```
┌──────────────────────────────────────────────────────────────┐
│  [Logo]    Link1   Link2   Link3   [Search]  [Theme] [GitHub]│
└──────────────────────────────────────────────────────────────┘
```

**Requirements:**
- Fixed position at top
- Height: 64px
- Background: `--color-surface` with subtle backdrop blur
- Border-bottom: 1px `--color-border`
- Logo: max-height 32px
- Links: `--font-size-sm`, `--color-text-primary`
- Active link: `--color-primary` with underline
- Mobile: hamburger menu with slide-out drawer

### 5.2 Sidebar

**Requirements:**
- Width: 280px (desktop), full-width drawer (mobile)
- Background: `--color-surface`
- Sticky position (scrolls with content area)
- Collapsible categories with chevron icons
- Active item: `--color-primary` background tint
- Nested items: 16px left indent per level
- Scrollable with custom scrollbar styling

### 5.3 Footer

**Structure:**
```
┌──────────────────────────────────────────────────────────────┐
│  Column 1     Column 2     Column 3     Column 4             │
│  - Link       - Link       - Link       - Link               │
│  - Link       - Link       - Link       - Link               │
├──────────────────────────────────────────────────────────────┤
│  © 2026 Company Name. All rights reserved.     [Social Icons]│
└──────────────────────────────────────────────────────────────┘
```

**Requirements:**
- Background: `--color-surface`
- Padding: `--space-12` vertical
- 4-column grid on desktop, stacked on mobile
- Copyright and social icons in bottom row

### 5.4 CodeBlock

**Requirements:**
- Syntax highlighting (Prism or Shiki)
- Background: darker than `--color-surface`
- Border-radius: `--radius-lg`
- Language label in top-right
- Copy button on hover
- Line numbers (optional, configurable)
- Line highlighting support
- Font: `--font-family-mono`, `--font-size-sm`

### 5.5 Admonition (Callouts)

**Types:**
| Type | Icon | Border Color |
|------|------|--------------|
| `note` | 📝 | `--color-info` |
| `tip` | 💡 | `--color-success` |
| `warning` | ⚠️ | `--color-warning` |
| `danger` | 🚨 | `--color-error` |
| `info` | ℹ️ | `--color-info` |

**Requirements:**
- Left border: 4px solid (type color)
- Background: type color at 10% opacity
- Icon + title in header
- Padding: `--space-4`
- Border-radius: `--radius-md`

### 5.6 Table of Contents (TOC)

**Requirements:**
- Width: 200px
- Position: sticky (follows scroll)
- Heading: "On this page"
- Links: `--font-size-sm`
- Active section: `--color-primary` with left border indicator
- Smooth scroll on click
- Hidden on mobile/tablet

### 5.7 Pagination

**Structure:**
```
┌─────────────────────────────────────────────────────────────┐
│  ◀ Previous                                      Next ▶     │
│  Previous Page Title                     Next Page Title    │
└─────────────────────────────────────────────────────────────┘
```

**Requirements:**
- Full-width container
- Two-column layout (prev left, next right)
- Hover: subtle background color change
- Arrow icons + page titles

---

## 6. Interactions & Animations

### 6.1 Transitions
- Default duration: 150ms
- Easing: `ease-in-out`
- Properties: color, background-color, border-color, transform, opacity

### 6.2 Hover States
- Links: color change to `--color-primary`
- Buttons: slight scale (1.02) + shadow increase
- Cards: shadow increase + subtle translateY(-2px)
- Sidebar items: background tint

### 6.3 Focus States
- Outline: 2px solid `--color-primary`
- Outline-offset: 2px
- Never remove focus indicators

### 6.4 Dark Mode Toggle
- Smooth transition (200ms) for all color changes
- Icon animation (sun ↔ moon rotation)
- Persist preference in localStorage

---

## 7. Accessibility Requirements

- [ ] WCAG 2.1 AA compliance
- [ ] Color contrast ratio ≥ 4.5:1 for text
- [ ] All interactive elements keyboard accessible
- [ ] Skip-to-content link
- [ ] ARIA labels for icons/buttons without text
- [ ] Focus indicators visible
- [ ] Reduced motion support (`prefers-reduced-motion`)
- [ ] Screen reader friendly navigation

---

## 8. Performance Requirements

- [ ] Lighthouse score ≥ 90 (all categories)
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] CSS bundle < 50KB (gzipped)
- [ ] JS bundle < 100KB (gzipped)
- [ ] No layout shifts (CLS < 0.1)

---

## 9. Required Theme Exports

The theme must export these components for Docusaurus compatibility:

```typescript
// src/theme/index.ts

export { default as Navbar } from './Navbar';
export { default as Footer } from './Footer';
export { default as Layout } from './Layout';
export { default as DocItem } from './DocItem';
export { default as DocSidebar } from './DocSidebar';
export { default as DocPage } from './DocPage';
export { default as TOC } from './TOC';
export { default as CodeBlock } from './CodeBlock';
export { default as Admonition } from './Admonition';
export { default as MDXComponents } from './MDXComponents';
export { default as SearchBar } from './SearchBar';
export { default as Pagination } from './Pagination';
export { default as NotFound } from './NotFound';
export { default as Root } from './Root';
```

---

## 10. Implementation Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Package setup and configuration
- [ ] Design tokens (CSS variables)
- [ ] Global styles and typography
- [ ] Layout component
- [ ] Navbar component
- [ ] Footer component

### Phase 2: Documentation Components (Week 3-4)
- [ ] DocSidebar component
- [ ] DocItem component
- [ ] TOC component
- [ ] Pagination component
- [ ] Breadcrumbs component

### Phase 3: Content Components (Week 5-6)
- [ ] CodeBlock with syntax highlighting
- [ ] Admonition components
- [ ] MDXComponents (headings, tables, etc.)
- [ ] Tabs component
- [ ] Cards component

### Phase 4: Polish & Testing (Week 7-8)
- [ ] Dark mode implementation
- [ ] Responsive testing
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Documentation

---

## 11. Acceptance Criteria

- [ ] All components render correctly in light/dark mode
- [ ] Fully responsive across all breakpoints
- [ ] Passes accessibility audit
- [ ] Meets performance benchmarks
- [ ] Works with Docusaurus plugins (docs, blog, pages)
- [ ] Theme is configurable via `docusaurus.config.js`
- [ ] Documentation for theme usage and customization