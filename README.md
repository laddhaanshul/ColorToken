# @color-tokens/core

<p align="center">
  <strong>Universal Color Token System for React &amp; React Native</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@color-tokens/core"><img src="https://img.shields.io/npm/v/@color-tokens/core.svg?style=flat-square" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@color-tokens/core"><img src="https://img.shields.io/npm/dm/@color-tokens/core.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://github.com/laddhaanshul/ColorToken/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@color-tokens/core.svg?style=flat-square" alt="license"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.3+-blue.svg?style=flat-square" alt="TypeScript"></a>
  <a href="https://colortokens.anshulladdha.in"><img src="https://img.shields.io/badge/Website-Live-brightgreen.svg?style=flat-square" alt="Website"></a>
</p>

---

## Overview

`@color-tokens/core` is a zero-dependency, TypeScript-first color token system that works seamlessly across **React (web)** and **React Native (Expo)** projects. It provides a comprehensive set of primitive color scales, semantic tokens with light/dark mode support, and utility functions for color manipulation.

The project is organized as an **npm workspaces monorepo** containing the core package, a Vite web example, an Expo React Native example, a PHP promotional website, and full documentation.

### Key Features

- **Dual Platform** — Single package works for both React web and React Native via the `"react-native"` package.json field
- **Primitive Tokens** — 22 color scales (gray, slate, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose) with 11 shades each + white/black/transparent = **245 total values**
- **Semantic Tokens** — 10 meaningful categories (background, foreground, border, brand, status, surface, interactive, nav, chart, shadow) with full light and dark mode variants
- **Zero Dependencies** — No runtime dependencies, pure TypeScript/JavaScript
- **Full TypeScript Support** — Complete type definitions with `as const` assertions
- **11 Utility Functions** — `hexToRgb`, `hexToRgba`, `withOpacity`, `darken`, `lighten`, `tokensToCssVars`, `tokensToReactNativeStyles`, `isHexColor`, `getLuminance`, `getContrastRatio`, `meetsWcagAA`
- **Accessibility** — Built-in WCAG contrast ratio utilities
- **CSS Variable Integration** — Convert any token set to CSS custom properties with automatic injection via `ColorProvider`
- **React Context Provider** — `ColorProvider` with `useTheme()`, `useColorTokens()`, `usePrimitiveColors()`, `useColorConfig()`, `useToken()` hooks
- **React Native Optimized** — Dedicated `react-native` entry point using the Appearance API for Metro bundler compatibility

## Monorepo Structure

```
color-tokens-monorepo/
├── package.json                     # Root workspace config (npm workspaces)
├── .gitignore                       # Root ignore rules
├── packages/
│   └── color-tokens/                # @color-tokens/core npm package
│       ├── src/
│       │   ├── index.ts             # Web entry point
│       │   ├── index.native.ts      # React Native entry point
│       │   ├── tokens/              # Primitive &amp; semantic token definitions
│       │   ├── utils/               # Color utility functions
│       │   ├── config.ts            # Default configuration
│       │   └── providers/           # ColorProvider (web + native)
│       ├── dist/                    # Build output
│       │   ├── index.js             # CommonJS (web)
│       │   ├── esm/index.js         # ESM (web bundlers)
│       │   ├── index.native.js      # CommonJS (React Native)
│       │   └── index.d.ts           # TypeScript declarations
│       └── package.json
├── examples/
│   ├── web/                         # Vite + React + TypeScript example
│   │   ├── src/App.tsx
│   │   ├── vite.config.ts
│   │   └── package.json
│   └── react-native/                # Expo + TypeScript example
│       ├── src/App.tsx
│       ├── metro.config.js          # Metro resolver for monorepo
│       └── package.json
├── website/                         # PHP promotional website
├── docs/                            # Documentation
│   ├── getting-started/README.md
│   ├── api/README.md
│   ├── theming/README.md
│   ├── react-native/README.md
│   └── contributing/README.md
└── .github/workflows/
    └── publish.yml                  # CI/CD: validate → build → publish → verify
```

## Installation

### From npm (published package)

```bash
# npm
npm install @color-tokens/core

# yarn
yarn add @color-tokens/core

# pnpm
pnpm add @color-tokens/core
```

### From this monorepo (development)

The monorepo uses **npm workspaces**. Install everything from the root:

```bash
cd color-tokens-monorepo

# Install all workspace packages
npm install

# Build the core package
cd packages/color-tokens && npm run build && cd ../..

# Web example
cd examples/web && npm run dev

# React Native example
cd examples/react-native && npx expo start
```

## Quick Start

### React (Web)

```tsx
import {
  lightSemanticColors,
  darkSemanticColors,
  tokensToCssVars,
  withOpacity,
} from '@color-tokens/core';

function App() {
  const isDark = false; // your dark mode state

  const tokens = isDark ? darkSemanticColors : lightSemanticColors;

  // Apply as CSS custom properties
  const cssVars = tokensToCssVars(tokens, 'app');
  Object.entries(cssVars).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}`, value);
  });

  return (
    <div style={{
      backgroundColor: tokens.background.primary,
      color: tokens.foreground.primary,
      padding: '16px',
    }}>
      <button style={{
        backgroundColor: tokens.brand.primary,
        color: tokens.foreground.onPrimary,
      }}>
        Get Started
      </button>
    </div>
  );
}
```

### React Native (Expo)

```tsx
import { StyleSheet } from 'react-native';
import { lightSemanticColors, withOpacity } from '@color-tokens/core';

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightSemanticColors.background.primary,
    flex: 1,
    padding: 16,
  },
  button: {
    backgroundColor: lightSemanticColors.brand.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonHover: {
    backgroundColor: withOpacity(lightSemanticColors.brand.primary, 0.9),
  },
});
```

### With ColorProvider (Recommended)

```tsx
import { ColorProvider, useTheme, useToken } from '@color-tokens/core';

function App() {
  return (
    <ColorProvider defaultTheme="system">
      <Header />
      <MainContent />
    </ColorProvider>
  );
}

function Header() {
  const { theme, toggleTheme, isDark } = useTheme();
  const bgColor = useToken('background', 'primary');
  const textColor = useToken('foreground', 'primary');

  return (
    <header style={{ background: bgColor, color: textColor, padding: 16 }}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {isDark ? 'Light' : 'Dark'}
      </button>
    </header>
  );
}
```

## API Reference

### Tokens

| Export | Description |
|--------|-------------|
| `primitiveColors` | 22 color scales with 11 shades (50-950) + white/black/transparent |
| `lightSemanticColors` | Semantic tokens for light mode themes |
| `darkSemanticColors` | Semantic tokens for dark mode themes |

### Provider &amp; Hooks

| Export | Description |
|--------|-------------|
| `ColorProvider` | React context provider with theme, config, CSS var injection |
| `useTheme()` | Returns full theme state: `theme`, `isDark`, `toggleTheme()`, `tokens`, `primitives`, `config` |
| `useColorTokens()` | Returns semantic tokens for the active theme |
| `usePrimitiveColors()` | Returns all 22 primitive color scales |
| `useColorConfig()` | Returns resolved configuration |
| `useToken(category, key)` | Returns a single semantic token value |

### Utility Functions

| Function | Description |
|----------|-------------|
| `hexToRgb(hex)` | Convert hex to `{ r, g, b }` |
| `hexToRgba(hex, alpha)` | Convert hex to `rgba()` string |
| `withOpacity(hex, opacity)` | Apply opacity to a hex color |
| `darken(hex, amount)` | Darken a hex color by amount (0-100) |
| `lighten(hex, amount)` | Lighten a hex color by amount (0-100) |
| `tokensToCssVars(tokens, prefix?)` | Flatten tokens to CSS custom properties |
| `tokensToReactNativeStyles(tokens)` | Flatten tokens to RN-compatible dot-notation styles |
| `isHexColor(value)` | Validate a hex color string |
| `getLuminance(hex)` | Calculate WCAG relative luminance |
| `getContrastRatio(hex1, hex2)` | Calculate WCAG contrast ratio |
| `meetsWcagAA(text, bg, isLarge?)` | Check WCAG AA compliance |

### Config &amp; Factory

| Export | Description |
|--------|-------------|
| `defaultConfig` | Default configuration object |
| `resolveConfig(config)` | Merge user config with defaults |
| `createTheme(overrides)` | Create custom light/dark semantic themes |

## Semantic Token Categories

| Category | Includes |
|----------|----------|
| `background` | primary, secondary, tertiary, inverse, canvas, overlay, subtle |
| `foreground` | primary, secondary, tertiary, inverse, onPrimary, onDark, disabled, hint |
| `border` | default, strong, subtle, inverse, focus, disabled |
| `brand` | primary/secondary/accent with hover, active, and subtle variants |
| `status` | success, warning, error, info with full variant sets |
| `surface` | default, raised, overlay, sunken, muted, elevated, backdrop |
| `interactive` | default, hover, active, disabled, disabledText, focusRing, selected, selectedText |
| `nav` | background, text, textMuted, activeItem, hoverItem, border, badge |
| `chart` | 8 series colors, grid, axis, background |
| `shadow` | subtle, default, medium, strong, glow |

## Build Outputs

| File | Format | Platform | Used By |
|------|--------|----------|---------|
| `dist/index.js` | CommonJS | Web / Node | `require()` |
| `dist/esm/index.js` | ESM | Web bundlers | `import` |
| `dist/index.native.js` | CommonJS | React Native | Metro bundler |
| `dist/index.d.ts` | Declarations | TypeScript | IDE intellisense |

## Publishing

This package uses GitHub Actions for automated publishing. When you create a **GitHub Release** from the Releases page:

1. The CI pipeline triggers automatically on `release` events
2. It validates (typecheck + lint + test), builds all 4 formats
3. Extracts the version from the release tag (e.g., `v1.2.3` becomes `1.2.3`)
4. Updates `package.json` version before publishing
5. Publishes to npm with provenance (`--provenance`)
6. Verifies the package is available on the npm registry

### Manual Release

```bash
# From the repository root
cd packages/color-tokens
npm version patch   # or minor, major
git push origin main --follow-tags

# Then create a GitHub Release on the repo's Releases page
# The workflow will pick it up automatically
```

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `NPM_TOKEN` | npm publish token (from npmjs.com settings) |

## License

MIT License. See [LICENSE](LICENSE) for details.
