# FFF-Blog 文章规范（AI + 人类共用）

> 本文档既是**人类写文章**的参考手册，也是 **AI 调整文章**的操作清单。
> 遵循统一规范，让每篇文章零摩擦地融入博客。

---

## 一、目录结构

每篇文章独立一个文件夹，放在 `src/content/posts/` 下。

```
src/content/posts/
├── article-slug/          # 文章文件夹（kebab-case）
│   ├── index.mdx          # 文章正文
│   ├── cover.png          # 封面图（可选，建议 .png 或 .webp）
│   └── image-xxx.png      # 文中插图（可选）
├── another-post/
│   ├── index.mdx
│   └── ...
└── ...
```

### 命名建议

| 项 | 规范 | 示例 |
|---|---|---|
| 文件夹名 | kebab-case，与文章主题相关 | `shellgpt-deepseek` |
| 封面图 | `cover.png` 或 `cover.webp` | `cover.png` |
| 文中插图 | 有意义的英文名，kebab-case | `arch-diagram.png` |

---

## 二、Frontmatter 字段速查

### 必填字段

| 字段 | 类型 | 说明 | 示例 |
|---|---|---|---|
| `title` | `string` | 文章标题（双引号包裹） | `"ShellGPT × DeepSeek 部署指南"` |
| `pubDate` | `Date` | 发布日期 | `2026-05-04` |
| `author` | `string` | 作者名 | `"Fayoo"` |
| `description`| `string` | 文章摘要，显示在卡片和列表页 | `"在 Debian/Ubuntu 上使用 DeepSeek API 驱动 ShellGPT"` |
| `tags` | `string[]` | 标签列表 | `["ShellGPT", "DeepSeek", "Linux"]` |

### 可选字段（按需添加）

| 字段 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `cover` | `image` | — | 封面图路径，指向 `./cover.png`。**有此字段才会展示封面布局** |
| `ogImage` | `image` | — | 社交分享图。不设则用站点默认 og-image |
| `updatedDate`| `Date` | — | 最后更新日期 |
| `recommend` | `boolean` | `false` | 是否显示"推荐"标记 |
| `pinned` | `boolean` | `false` | 是否置顶 |
| `draft` | `boolean` | `false` | 草稿（`true` 时不发布） |
| `license` | `string` | — | 版权声明文本，如 `"CC BY-NC-SA 4.0"` |
| `postType` | `"metaOnly"` \| `"coverSplit"` \| `"coverTop"` | `"metaOnly"`（全局配置） | 文章页布局类型 |
| `coverLayout`| `"left"` \| `"right"` | `"right"` | 封面图位置（仅 `coverSplit` 生效） |

### 三种布局对比

| `postType` | 效果 | 适合场景 |
|---|---|---|
| `metaOnly` | 纯文字，无封面图区域 | 无图或图不多的文章 |
| `coverSplit` | 左文右图（或左图右文） | 有封面图，图文并排 |
| `coverTop` | 上图下文，封面作为 banner | 有高质量封面图，视觉冲击 |

> **默认策略**：不写 `postType`，让全局配置决定（当前为 `metaOnly`）。如需特殊布局，手动指定。

---

## 三、正文格式规范

### 3.1 标题层级

- **不要在正文中写 H1**（`# 标题`）。文章标题已通过 frontmatter 的 `title` 渲染。
- 正文从 H2（`##`）开始，用作章节标题。

### 3.2 章节编号

使用中文序号：

```mdx
## 一、安装

### 1.1 子标题

## 二、配置

## 三、验证
```

子章节（H3）使用数字编号或描述性短标题均可。

### 3.3 代码块、表格、引用

原样保留，不作修改。代码块带语言标注：

```mdx
```bash
apt install pipx -y
```
```

### 3.4 文中插图

使用相对路径引用同目录下的图片：

```mdx
![架构图](./arch-diagram.png)
```

---

## 四、常见上传场景 → AI 调整清单

以下场景中，"原始状态"是你上传到 `posts/` 后的样子，"操作步骤"是 AI 应执行的调整。

---

### 场景 A：单个 `.mdx` 文件，无图

**原始状态**：
```
src/content/posts/my-article.mdx
```

**操作步骤**：
1. 创建同名文件夹 `my-article/`
2. 将 `.mdx` 移入并重命名为 `index.mdx`
3. 补充 frontmatter：`title`、`pubDate`（当天日期）、`author`、`description`、`tags`（根据内容推断）
4. 移除正文中的 H1 标题（`# xxx`）
5. 将英文序号 `## 1.` / `## 2.` 改为中文 `## 一、` / `## 二、`
6. 正文内容原样保留

---

### 场景 B：单个 `.mdx` + 一张封面图

**原始状态**：
```
src/content/posts/my-article.mdx
src/content/posts/cover.png          （或其他名字）
```

**操作步骤**：
1. 创建同名文件夹 `my-article/`
2. 将 `.mdx` 移入并重命名为 `index.mdx`
3. 将封面图移入文件夹，若名称不是 `cover.*` 则**重命名为 `cover.png`**（保留原扩展名）
4. 补充 frontmatter（同场景 A），额外添加 `cover: "./cover.png"`
5. 其余同场景 A

---

### 场景 C：单个 `.mdx` + 封面图 + 文中多图

**原始状态**：
```
src/content/posts/my-article.mdx
src/content/posts/cover.png
src/content/posts/diagram.png
src/content/posts/screenshot.png
```

**操作步骤**：
1. 创建同名文件夹 `my-article/`
2. 将 `.mdx` 移入并重命名为 `index.mdx`
3. 封面图重命名为 `cover.png`（如果不是），其余图片保持原名移入文件夹
4. 修正正文中所有图片引用路径为 `./原文件名.png`
5. 补充 frontmatter（同场景 B）
6. 其余同场景 A

---

### 场景 D：整个文件夹拖入（含 `.mdx` + 图片）

**原始状态**：
```
src/content/posts/my-article/
├── my-article.mdx         （或其他名字）
├── cover.png
└── image-1.png
```

**操作步骤**：
1. 将 `.mdx` 文件重命名为 `index.mdx`
2. 若封面图名不是 `cover.*`，重命名为 `cover.png`
3. 补充 frontmatter（若缺失）
4. 修正正文中的图片引用为 `./xxx.png`
5. 其余同场景 A

---

### 场景 E：特殊需求（`recommend` / `draft` / 特殊 `postType`）

**操作步骤**：

- 用户指定"这篇要推荐" → 添加 `recommend: true`
- 用户指定"这篇是草稿" → 添加 `draft: true`
- 用户指定"用 coverTop 布局" → 添加 `postType: "coverTop"`（必须同时有 `cover` 字段）
- 用户指定"用 coverSplit 布局" → 添加 `postType: "coverSplit"` + 可选 `coverLayout: "left"`

> 这些字段默认不写。仅在用户明确要求或文章内容明显需要时添加。

---

## 五、AI 行为准则

### 5.1 自动处理（无需询问）

| 事项 | 处理方式 |
|---|---|
| 文件夹结构 | 自动创建 + 移动文件 |
| 补充 frontmatter | 自动添加 title / pubDate（当天） / author / description / tags |
| 移除 H1 | 自动去掉正文中的 `# 标题` |
| 英文序号 → 中文序号 | 自动转换 `## 1.` → `## 一、` |
| 封面图检测 | 若文件夹内有 `cover.png`，自动添加 `cover: "./cover.png"` |
| 图片路径修正 | 自动将正文中的图片引用改为 `./xxx.png` 格式 |

### 5.2 需要推断的字段

| 字段 | 推断策略 |
|---|---|
| `title` | 从正文 H1 提取；若无则从文件名推断 |
| `description` | 从正文第一段或 blockquote 提取摘要 |
| `tags` | 根据文章内容关键词自动生成 3-6 个 |
| `author` | 默认 `"Fayoo"`，参考已有文章 |

### 5.3 不动的内容

- 代码块、表格、引用、列表等正文内容——**原样保留**
- 用户特意写的自定义 HTML / MDX 组件

### 5.4 不自动添加的字段

以下字段除非用户明确要求，**不自动添加**：

- `recommend`、`pinned`、`draft`、`license`
- `postType`、`coverLayout`（留空走全局默认）
- `updatedDate`、`ogImage`

---

## 六、快速参考：一份完整 frontmatter 示例

```yaml
---
title: "文章标题"
pubDate: 2026-05-04
author: "Fayoo"
description: "一段简洁的摘要，会显示在文章卡片上。"
tags: ["TagA", "TagB", "TagC"]
cover: "./cover.png"
recommend: true
---
```

> 大多数文章只需要上面 6 行。其他字段按需添加。

---

*本规范基于项目源码 `src/content.config.ts` + `src/types.ts` + 实际文章格式制定，如有新增字段或布局变更请同步更新本文档。*
