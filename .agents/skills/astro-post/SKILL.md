---
name: astro-post
description: Create, edit, or reorganize blog posts in this Astro project. Follows the project's POST_CONVENTIONS.md for directory structure, frontmatter fields, Chinese heading conventions, image handling, and more. Use this whenever the user asks to create a new post, import a markdown file, fix post formatting, or adjust frontmatter.
---

# Astro Blog Post Skill

When activated, follow the conventions documented in the project's `POST_CONVENTIONS.md` at the project root.

## Step 1: Load the conventions

Read `POST_CONVENTIONS.md` from the project root to understand the full rules. The key rules are summarized below, but the canonical document should always be consulted for details.

## Step 2: Key conventions at a glance

### Directory structure

Every post lives in its own folder under `src/content/posts/<slug>/` with:

- `index.mdx` — the article body
- `cover.png` / `cover.webp` — cover image (optional)
- Other images alongside

### Frontmatter

**Required fields** (always fill these):

- `title` — article title (in quotes)
- `pubDate` — publish date. **Must use the actual current date from `date +%Y-%m-%d`. Never hardcode a date.** If the user explicitly says a different date, use that.
- `author` — author name (default: `"Fayoo"`)
- `description` — summary for cards/list pages
- `tags` — array of 3-6 tags

**Optional fields** (only add when needed/requested):

- `cover` — `"./cover.png"` if cover image exists
- `ogImage`, `updatedDate`, `recommend`, `pinned`, `draft`, `license`, `postType`, `coverLayout`

### Body formatting

- **No H1** in body — the title comes from frontmatter
- Chapters use Chinese numbering: `## 一、标题`, `## 二、标题`
- Sub-chapters (H3) use digits: `### 1.1 子标题`
- Image references use relative paths: `![alt](./image-name.png)`
- Code blocks, tables, quotes — keep as-is

### Common scenarios

**Scenario A**: Single `.mdx` file, no images → create folder, move + rename to `index.mdx`, fill frontmatter, remove H1, convert English numbering to Chinese.

**Scenario B**: `.mdx` + cover image → same as A + rename cover to `cover.png`, add `cover: "./cover.png"`.

**Scenario C**: `.mdx` + cover + multiple images → same as B + fix image paths to `./xxx.png`.

**Scenario D**: Folder already exists → rename `.mdx` to `index.mdx`, normalize cover name, fill frontmatter.

**Scenario E**: Special requests (recommend, draft, postType) → add those fields only when explicitly requested.

## Step 3: Auto-actions (do without asking)

- Create folder structure and move files
- Fill required frontmatter fields
  - **pubDate**: Always run `date +%Y-%m-%d` to get today's date. Do not copy a hardcoded date string from previous scripts.
- Remove H1 from body
- Convert English `## 1.` → Chinese `## 一、`
- Detect cover images and add `cover` field
- Fix image reference paths

## Step 4: Do NOT modify

- Code blocks, tables, blockquotes, lists — keep exactly as-is
- Custom HTML / MDX components
- Content that the user intentionally wrote

## Step 5: Do NOT add unless requested

- `recommend`, `pinned`, `draft`, `license`
- `postType`, `coverLayout`
- `updatedDate`, `ogImage`
