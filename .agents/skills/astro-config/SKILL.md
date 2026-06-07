---
name: astro-config
description: Modify the project's site configuration in src/config.ts. Use this when the user asks to change site info, toggle features (GitHub, comments, skills), adjust social links, modify page layouts, or update navigation menus.
---

# Astro Config Skill

When the user asks to modify site configuration, read and edit `src/config.ts` in the project root. All config objects and their fields are type-checked against `src/types.ts`.

## Key config objects and what they control

### `SITE` — Site identity

| Field | Effect |
|-------|--------|
| `title` | Browser tab title, OG title, header |
| `description` | Meta description, OG description |
| `website` | Canonical URL, used for RSS/sitemap |
| `lang` | HTML lang attribute |
| `base` | Base path (usually `"/"`) |
| `author` | Default author name |
| `ogImage` | Fallback social share image |
| `transition` | Astro view transitions (true/false) |
| `themeAnimation` | Theme toggle animation (true/false) |

### `HEADER_LINKS` / `FOOTER_LINKS` — Navigation

Array of `{ name, url }`. Common operations:

- Add a link: push `{ name: "About", url: "/about" }`
- Remove a link: delete the object from the array
- Rename: change the `name` field

### `SOCIAL_LINKS` — Social icons in footer

Array of `{ name, url, icon, count? }`. Icons use Iconify format: `icon-[ri--github-fill]`.

Find icons at https://icon-sets.iconify.design/

### `SKILLSSHOWCASE_CONFIG` — Homepage skills marquee

| Field | Effect |
|-------|--------|
| `SKILLS_ENABLED` | `true` → show, `false` → hide |
| `SKILLS_DATA` | Array of `{ direction, skills[] }` where each skill has `{ name, icon, url? }` |

### `GITHUB_CONFIG` — Homepage GitHub contributions

| Field | Effect |
|-------|--------|
| `ENABLED` | Show/hide the GitHub graph |
| `GITHUB_USERNAME` | Which GitHub user to pull data for |
| `TOOLTIP_ENABLED` | Hover tooltips on contribution cells |

### `POSTS_CONFIG` — Blog post display

| Field | Effect |
|-------|--------|
| `title` / `description` / `introduce` | Page headings |
| `author` | Default post author |
| `homePageConfig` | How posts appear on homepage: `{ size, type, coverLayout? }` |
| `postPageConfig` | How posts appear on /posts page: `{ size, type, coverLayout? }` |
| `tagsPageConfig` | How posts appear on /tags page: `{ size, type }` |
| `postType` | Global default post layout: `"metaOnly"` / `"coverSplit"` / `"coverTop"` |
| `ogImageUseCover` | Use post cover as OG image |
| `imageDarkenInDark` | Darken images in dark mode |

Card types: `"compact"`, `"image"`, `"time-line"`, `"minimal"`, `"cover"`

### `COMMENT_CONFIG` — Comment system

| Field | Effect |
|-------|--------|
| `enabled` | Master switch |
| `system` | `"gitalk"` / `"artalk"` / `"waline"` / `"none"` |
| `gitalk` | Gitalk-specific config (clientID, repo, owner, etc.) |

### `TAGS_CONFIG`, `PROJECTS_CONFIG`, `PHOTOS_CONFIG` — Page metadata

Each has: `title`, `description`, `introduce`

### `ANALYTICS_CONFIG` — Analytics

Three providers: `vercount`, `umami`, `google`. Each has an `enabled` toggle.

## How to make changes

1. Read `src/config.ts` to see current values
2. Locate the config object using the field reference above
3. Use `edit_file` to make the change
4. Only change what the user asked — don't touch unrelated configs
5. After editing, run `npx astro check` to validate types

## Common user requests → action mapping

| User says | Action |
|-----------|--------|
| "关掉 GitHub 贡献图" | Set `GITHUB_CONFIG.ENABLED = false` |
| "开启评论" | Set `COMMENT_CONFIG.enabled = true` |
| "把文章列表改成时间线" | Set `POSTS_CONFIG.postPageConfig.type = "time-line"` |
| "首页每页显示 5 篇" | Set `POSTS_CONFIG.homePageConfig.size = 5` |
| "把作者名改成 XXX" | Set `SITE.author = "XXX"` and `POSTS_CONFIG.author = "XXX"` |
| "关掉技能展示" | Set `SKILLSSHOWCASE_CONFIG.SKILLS_ENABLED = false` |
| "Header 加一个 About" | Add `{ name: "About", url: "/about" }` to `HEADER_LINKS` |
| "把 Twitter 图标换成 Mastodon" | Replace the twitter entry in `SOCIAL_LINKS` |
