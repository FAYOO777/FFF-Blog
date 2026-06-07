---
name: astro-component
description: Create new Astro or React components in this project. Follows the project's directory structure and coding conventions for .astro and .tsx files. Use this when the user asks to create a new component, add a UI element, or scaffold a new interactive feature.
---

# Astro Component Skill

When the user asks to create a new component, scaffold it following the project's established patterns.

## Step 1: Determine component type and location

### Directory structure

```
src/components/
├── base/          # Shared UI: links, pagination, SEO head, tooltips, images
├── posts/         # Post-related: cards, layouts, TOC
│   ├── base/
│   ├── card/
│   ├── layouts/
│   └── toc/
├── photos/        # Photo gallery components
└── theme/         # Theme toggle, header gradient
```

Placement rules:

| If the component is... | Put it in... |
|------------------------|--------------|
| A shared UI element (button, link, modal) | `src/components/base/` |
| Specifically for blog posts (card, TOC, layout) | `src/components/posts/<subfolder>/` |
| Photo gallery related | `src/components/photos/` |
| Theme-related (dark mode, colors) | `src/components/theme/` |

### File extension

- **`.astro`** — Static content or minimal interactivity. Use when you don't need React state/effects.
- **`.tsx`** — Interactive components needing React state, effects, event handlers, or third-party React libraries.

## Step 2: Astro component template (`.astro`)

```astro
---
import { cn } from '~/lib/utils'

type Props = {
  // Define props here
  class?: string
  [key: string]: any
}

const { class: className, ...props }: Props = Astro.props
---

<!-- Template goes here -->
```

Key conventions:

- Always import `cn` from `~/lib/utils` for class merging
- Accept `class?: string` and spread `...props` for flexibility
- Use Tailwind CSS classes (Tailwind v4 syntax)
- Icons use Iconify via Tailwind: `class="icon-[tabler--icon-name]"`
- Import from `~/config` for config values, `~/stores/*` for state
- Use `Astro.props`, `Astro.url`, `Astro.site` for server-side values

## Step 3: React component template (`.tsx`)

```tsx
import { cn } from '~/lib/utils'

type Props = {
  className?: string
}

const ComponentName = ({ className }: Props) => {
  return (
    <div className={cn('', className)}>
      {/* content */}
    </div>
  )
}

export default ComponentName
```

Key conventions:

- Use `cn` for className merging (same as Astro)
- Use `motion/react` for animations: `import { motion } from 'motion/react'`
- Use `@nanostores/react` for global state: `import { useStore } from '@nanostores/react'`
- Use `@floating-ui/react` for tooltips/popovers
- Export as default export

## Step 4: Naming conventions

| Item | Convention | Example |
|------|------------|---------|
| File name | PascalCase | `ThemeToggle.tsx`, `FooterLink.astro` |
| Export name | Same as file | `export default ThemeToggle` |
| Props type | `Props` | `type Props = { ... }` |
| CSS class props | `class` (Astro) / `className` (React) | Destructure and pass to `cn()` |

## Step 5: Common imports reference

```ts
// Astro components
import { cn } from '~/lib/utils'
import { SITE, HEADER_LINKS, /* ... */ } from '~/config'

// React components
import { cn } from '~/lib/utils'
import { motion } from 'motion/react'
import { useStore } from '@nanostores/react'
import { themeStore } from '~/stores/theme'

// Images in Astro
import type { ImageMetadata } from 'astro'
```

## Step 6: After creating

- If the component is used in a page, import and use it there
- No need to register or export from an index file — direct imports work
- Run `npx astro check` to verify no type errors
