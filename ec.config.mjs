import { defineEcConfig } from 'astro-expressive-code'
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

const warmLatte = {
  name: 'warm-latte',
  type: 'light',
  colors: {
    // 编辑器基础
    'editor.background': '#f7f3f3', // hsl(0 20% 97%)
    'editor.foreground': '#3d3333', // hsl(0 8% 25%)
    'editorLineNumber.foreground': '#b8aeae', // hsl(0 8% 70%)
    'editorLineNumber.activeForeground': '#8a7676', // hsl(0 8% 50%)
    // 选中/高亮
    'editor.selectionBackground': '#e8d8d8', // hsl(0 20% 88%)
    'editor.lineHighlightBackground': '#f2ecec', // hsl(0 15% 95%)
    // 边框/滚动条
    'editorWidget.border': '#e0d4d4', // hsl(0 12% 88%)
    'scrollbarSlider.background': '#d4c4c4', // hsl(0 12% 80%)
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#9e9494' }, // hsl(0 5% 58%)
    },
    {
      scope: ['keyword', 'keyword.control', 'keyword.operator.new', 'storage.type.function', 'keyword.other'],
      settings: { foreground: '#a83232' }, // hsl(0 48% 42%) 关键字主红
    },
    {
      scope: [
        'storage.type',
        'storage.modifier', // const let var
        'keyword.operator.expression',
      ],
      settings: { foreground: '#7040a0' }, // hsl(280 40% 44%) 声明词紫
    },
    {
      scope: ['string', 'string.quoted', 'string.template'],
      settings: { foreground: '#3a7a36' }, // hsl(120 35% 35%) 字符串绿
    },
    {
      scope: ['entity.name.function', 'support.function', 'meta.function-call entity.name.function'],
      settings: { foreground: '#b05a10' }, // hsl(25 70% 38%) 函数名暖橙
    },
    {
      scope: ['variable.parameter', 'variable.other.property', 'support.variable', 'meta.object-literal.key'],
      settings: { foreground: '#2e6e8a' }, // hsl(200 50% 36%) 参数/属性蓝
    },
    {
      scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'],
      settings: { foreground: '#8a6610' }, // hsl(40 65% 30%) 类型暖黄
    },
    {
      scope: ['constant.numeric', 'constant.language'],
      settings: { foreground: '#a83232' }, // 同关键字红
    },
    {
      scope: ['variable', 'variable.other'],
      settings: { foreground: '#3d3333' }, // 同前景
    },
    {
      scope: ['punctuation', 'meta.brace'],
      settings: { foreground: '#8a7676' }, // hsl(0 8% 50%)
    },
  ],
}

const warmNoir = {
  name: 'warm-noir',
  type: 'dark',
  colors: {
    'editor.background': '#161010', // hsl(0 8% 8%)
    'editor.foreground': '#d1cbcb', // hsl(0 5% 82%)
    'editorLineNumber.foreground': '#5a5252', // hsl(0 5% 33%)
    'editorLineNumber.activeForeground': '#8a8080', // hsl(0 5% 52%)
    'editor.selectionBackground': '#2e2424', // hsl(0 12% 16%)
    'editor.lineHighlightBackground': '#1e1818', // hsl(0 8% 11%)
    'editorWidget.border': '#2e2424', // hsl(0 8% 16%)
    'scrollbarSlider.background': '#3a2e2e', // hsl(0 12% 20%)
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#6e6464' }, // hsl(0 5% 42%)
    },
    {
      scope: ['keyword', 'keyword.control', 'keyword.operator.new', 'storage.type.function', 'keyword.other'],
      settings: { foreground: '#d47070' }, // hsl(0 55% 63%) 关键字亮红
    },
    {
      scope: ['storage.type', 'storage.modifier', 'keyword.operator.expression'],
      settings: { foreground: '#b08acc' }, // hsl(275 38% 66%) 声明词亮紫
    },
    {
      scope: ['string', 'string.quoted', 'string.template'],
      settings: { foreground: '#7ab87a' }, // hsl(130 30% 58%) 字符串亮绿
    },
    {
      scope: ['entity.name.function', 'support.function', 'meta.function-call entity.name.function'],
      settings: { foreground: '#d4884a' }, // hsl(28 75% 56%) 函数名亮橙
    },
    {
      scope: ['variable.parameter', 'variable.other.property', 'support.variable', 'meta.object-literal.key'],
      settings: { foreground: '#70a8cc' }, // hsl(205 50% 62%) 参数/属性亮蓝
    },
    {
      scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'],
      settings: { foreground: '#ccaa52' }, // hsl(42 60% 56%) 类型亮黄
    },
    {
      scope: ['constant.numeric', 'constant.language'],
      settings: { foreground: '#d47070' }, // 同关键字红
    },
    {
      scope: ['variable', 'variable.other'],
      settings: { foreground: '#d1cbcb' }, // 同前景
    },
    {
      scope: ['punctuation', 'meta.brace'],
      settings: { foreground: '#8a8080' }, // hsl(0 5% 52%)
    },
  ],
}

export default defineEcConfig({
  defaultLocale: 'zh-CN',
  defaultProps: {
    wrap: false,
    collapseStyle: 'collapsible-auto',
    showLineNumbers: false,
    preserveIndent: true,
  },
  minSyntaxHighlightingColorContrast: 0,

  styleOverrides: {
    uiFontFamily: 'var(--font-sans)',
    uiFontSize: '1em',
    codeFontFamily: 'var(--font-mono)',
    codeFontSize: '0.85rem',
    codeLineHeight: '1.4',
    borderRadius: '0',
    codePaddingBlock: '0.8571429em',
    codePaddingInline: '1.1428571em',
    borderColor: ({ theme }) => (theme.type === 'dark' ? '#2e2424' : '#e0d4d4'),

    frames: {
      frameBoxShadowCssValue: false,
      inlineButtonBackgroundActiveOpacity: '0.2',
      inlineButtonBackgroundHoverOrFocusOpacity: '0.1',
    },
    textMarkers: {
      backgroundOpacity: '0.2',
      borderOpacity: '0.4',
    },
  },

  plugins: [
    pluginCollapsibleSections({
      defaultCollapsed: false,
    }),
    pluginLineNumbers(),
  ],

  themes: [warmNoir, warmLatte],
  themeCssSelector: (theme) => (theme.name === 'warm-noir' ? '.dark' : ':root:not(.dark)'),
  useDarkModeMediaQuery: false,
  emitExternalStylesheet: false,
})
