# @laddhaanshul/color-tokens

> Universal color token system for **React** and **React Native** with 22 primitive color scales, 10 semantic token categories, light/dark theme management, CSS variable injection, and 11 utility functions — all from a single npm package.

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [ColorProvider](#colorprovider)
  - [Props](#colorprovider-props)
  - [Configuration](#configuration)
- [Hooks](#hooks)
  - [`useTheme()`](#usetheme)
  - [`useColorTokens()`](#usecolortokens)
  - [`usePrimitiveColors()`](#useprimitivecolors)
  - [`useColorConfig()`](#usecolorconfig)
  - [`useToken(category, key)`](#usetokencategory-key)
- [Primitive Colors](#primitive-colors)
- [Semantic Colors](#semantic-colors)
- [Utility Functions](#utility-functions)
- [`createTheme()`](#createtheme)
- [CSS Variable Injection](#css-variable-injection)
- [React Native Usage](#react-native-usage)
- [Without Provider (Direct Imports)](#without-provider-direct-imports)
- [TypeScript Types](#typescript-types)
- [Build & Development](#build--development)
- [License](#license)

---

## Installation

```bash
# npm
npm install @laddhaanshul/color-tokens

# yarn
yarn add @laddhaanshul/color-tokens

# pnpm
pnpm add @laddhaanshul/color-tokens
```

**Peer dependency:** `react >= 16.8.0` (hooks support required).

---

## Quick Start

### With Provider (Recommended)

```tsx
import { ColorProvider, useTheme, useToken } from '@laddhaanshul/color-tokens';

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

function MainContent() {
  const tokens = useColorTokens();

  return (
    <main style={{ background: tokens.background.secondary }}>
      <div style={{ borderLeft: `4px solid ${tokens.status.success}` }}>
        Operation completed successfully
      </div>
    </main>
  );
}
```

### Without Provider (Direct Imports)

```tsx
import { lightSemanticColors, darkSemanticColors, withOpacity } from '@laddhaanshul/color-tokens';

const buttonStyle = {
  backgroundColor: lightSemanticColors.brand.primary,
  hover: withOpacity(lightSemanticColors.brand.primary, 0.9),
  color: lightSemanticColors.foreground.onPrimary,
};
```

---

## ColorProvider

The `<ColorProvider>` wraps your app (or a subtree) and provides color theme state via React context. It supports light/dark/system modes, live system preference detection, custom token overrides, and automatic CSS variable injection.

```tsx
import { ColorProvider } from '@laddhaanshul/color-tokens';

<ColorProvider
  defaultTheme="system"          // 'light' | 'dark' | 'system'
  config={{
    injectCssVars: true,         // Auto-inject CSS custom properties
    cssVarPrefix: 'app',         // Prefix: --app-background-primary
    customLightSemantic: {       // Override light tokens
      brand: { primary: '#0066FF' },
    },
    customDarkSemantic: {        // Override dark tokens
      brand: { primary: '#3388FF' },
    },
  }}
>
  <App />
</ColorProvider>
```

### ColorProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | *required* | Your application or component tree |
| `theme` | `'light' \| 'dark'` | `undefined` | Force a specific theme. When set, `toggleTheme()` and `setTheme()` are no-ops |
| `defaultTheme` | `'light' \| 'dark' \| 'system'` | `'system'` | Initial theme mode. `'system'` follows OS preference |
| `config` | [`ColorTokensConfig`](#configuration) | `{}` | Advanced customization options |

### Configuration

The `config` prop accepts a `ColorTokensConfig` object:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `defaultTheme` | `'light' \| 'dark' \| 'system'` | `'system'` | Default theme when no `theme` prop is set |
| `cssVarPrefix` | `string` | `'ct'` | Prefix for injected CSS custom properties |
| `injectCssVars` | `boolean` | `false` | Automatically inject tokens as CSS variables on `:root` (web only) |
| `customPrimitives` | `Partial<Record<PrimitiveColorScale, Record<number, string>>>` | `{}` | Override specific primitive color values |
| `customLightSemantic` | `Partial<SemanticColorTheme>` | `{}` | Override specific light mode semantic tokens |
| `customDarkSemantic` | `Partial<SemanticColorTheme>` | `{}` | Override specific dark mode semantic tokens |

#### Config Example

```tsx
import { ColorProvider, defaultConfig } from '@laddhaanshul/color-tokens';

<ColorProvider
  config={{
    ...defaultConfig,
    injectCssVars: true,
    cssVarPrefix: 'myapp',
    customPrimitives: {
      blue: { 500: '#0066FF', 600: '#0055DD' },
    },
    customLightSemantic: {
      brand: {
        primary: '#0066FF',
        primaryHover: '#0055DD',
      },
      background: {
        primary: '#FAFBFF', // Slight blue tint
      },
    },
    customDarkSemantic: {
      brand: {
        primary: '#3399FF',
        primarySubtle: '#001133',
      },
    },
  }}
>
  <App />
</ColorProvider>
```

---

## Hooks

All hooks **must** be used inside a `<ColorProvider>`. Using them outside will throw an error.

### `useTheme()`

Returns the full theme context value with state and control functions.

**Returns:** [`ThemeContextValue`](#typescript-types)

```tsx
function useTheme(): ThemeContextValue
```

| Property | Type | Description |
|----------|------|-------------|
| `theme` | `'light' \| 'dark'` | Currently active theme |
| `setTheme(theme)` | `function` | Set theme to `'light'` or `'dark'` |
| `toggleTheme()` | `function` | Toggle between light and dark |
| `isDark` | `boolean` | `true` when current theme is `'dark'` |
| `isLight` | `boolean` | `true` when current theme is `'light'` |
| `systemPreference` | `'light' \| 'dark'` | OS/browser preferred color scheme |
| `tokens` | `SemanticColorTheme` | Semantic tokens for the active theme |
| `primitives` | `typeof primitiveColors` | All 22 primitive color scales |
| `config` | `Required<ColorTokensConfig>` | Resolved configuration with defaults |

```tsx
function ThemeSwitcher() {
  const { theme, toggleTheme, isDark, systemPreference } = useTheme();

  return (
    <div>
      <p>Active: {theme}</p>
      <p>System prefers: {systemPreference}</p>
      <button onClick={toggleTheme}>
        Currently {isDark ? 'dark' : 'light'} — click to toggle
      </button>
    </div>
  );
}
```

### `useColorTokens()`

Convenience hook that returns the semantic tokens for the current active theme. Equivalent to `useTheme().tokens`.

**Returns:** `SemanticColorTheme`

```tsx
function Card() {
  const t = useColorTokens();

  return (
    <div style={{
      background: t.surface.default,
      border: `1px solid ${t.border.default}`,
      color: t.foreground.primary,
      borderRadius: 8,
      padding: 16,
    }}>
      <h2 style={{ color: t.brand.primary }}>Card Title</h2>
      <p style={{ color: t.foreground.secondary }}>Card description text</p>
    </div>
  );
}
```

### `usePrimitiveColors()`

Returns the full primitive color palette (all 22 scales x 11 shades). Equivalent to `useTheme().primitives`.

**Returns:** `typeof primitiveColors`

```tsx
function ColorPalette() {
  const primitives = usePrimitiveColors();

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
        <div
          key={shade}
          style={{
            background: primitives.blue[shade as keyof typeof primitives.blue],
            width: 40,
            height: 40,
            borderRadius: 4,
          }}
          title={`Blue ${shade}: ${primitives.blue[shade as keyof typeof primitives.blue]}`}
        />
      ))}
    </div>
  );
}
```

### `useColorConfig()`

Returns the resolved configuration object with all defaults applied. Equivalent to `useTheme().config`.

**Returns:** `Required<ColorTokensConfig>`

```tsx
function DebugPanel() {
  const config = useColorConfig();
  return <pre>{JSON.stringify(config, null, 2)}</pre>;
}
```

### `useToken(category, key)`

Returns a single semantic token value by category and key path. Logs a warning if the token path doesn't exist.

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | [`SemanticColorCategory`](#semantic-colors) | The semantic category name |
| `key` | `string` | The token key within the category |

**Returns:** `string` (hex color or rgba)

```tsx
function StatusBadge({ type }: { type: 'success' | 'warning' | 'error' | 'info' }) {
  const bgColor = useToken('status', `${type}Subtle`);
  const textColor = useToken('status', `${type}Text`);
  const borderColor = useToken('status', `${type}Border`);

  return (
    <span style={{
      background: bgColor,
      color: textColor,
      border: `1px solid ${borderColor}`,
      padding: '4px 12px',
      borderRadius: 9999,
      fontSize: 13,
    }}>
      {type}
    </span>
  );
}
```

---

## Primitive Colors

22 color scales with 11 shades each (50–950), plus white, black, and transparent — **245 total color values**. These are the Tailwind CSS color palette.

### Color Scales

| Scale | Usage | 50 (lightest) | 500 (mid) | 950 (darkest) |
|-------|-------|---------------|-----------|---------------|
| `gray` | Neutral grays | `#F9FAFB` | `#6B7280` | `#030712` |
| `slate` | Cool blue-gray | `#F8FAFC` | `#64748B` | `#020617` |
| `zinc` | Neutral warm gray | `#FAFAFA` | `#71717A` | `#09090B` |
| `neutral` | True neutral gray | `#FAFAFA` | `#737373` | `#0A0A0A` |
| `stone` | Warm brown-gray | `#FAFAF9` | `#78716C` | `#0C0A09` |
| `red` | Errors, destructive | `#FEF2F2` | `#EF4444` | `#450A0A` |
| `orange` | Warnings, accents | `#FFF7ED` | `#F97316` | `#431407` |
| `amber` | Alerts, highlights | `#FFFBEB` | `#F59E0B` | `#451A03` |
| `yellow` | Cautions, stars | `#FEFCE8` | `#EAB308` | `#422006` |
| `lime` | Nature, fresh | `#F7FEE7` | `#84CC16` | `#1A2E05` |
| `green` | Success, positive | `#F0FDF4` | `#22C55E` | `#052E16` |
| `emerald` | Teal-green | `#ECFDF5` | `#10B981` | `#022C22` |
| `teal` | Cyan-teal | `#F0FDFA` | `#14B8A6` | `#042F2E` |
| `cyan` | Sky blue | `#ECFEFF` | `#06B6D4` | `#083344` |
| `sky` | Light blue | `#F0F9FF` | `#0EA5E9` | `#082F49` |
| `blue` | Primary, info | `#EFF6FF` | `#3B82F6` | `#172554` |
| `indigo` | Deep blue | `#EEF2FF` | `#6366F1` | `#1E1B4B` |
| `violet` | Purple-blue | `#F5F3FF` | `#8B5CF6` | `#2E1065` |
| `purple` | Purple | `#FAF5FF` | `#A855F7` | `#3B0764` |
| `fuchsia` | Magenta | `#FDF4FF` | `#D946EF` | `#4A044E` |
| `pink` | Pink | `#FDF2F8` | `#EC4899` | `#500724` |
| `rose` | Red-pink | `#FFF1F2` | `#F43F5E` | `#4C0519` |

### Standalone Colors

| Key | Value |
|-----|-------|
| `white` | `#FFFFFF` |
| `black` | `#000000` |
| `transparent` | `transparent` |

### Usage

```tsx
import { primitiveColors } from '@laddhaanshul/color-tokens';

const blue500 = primitiveColors.blue[500];      // '#3B82F6'
const red100 = primitiveColors.red[100];         // '#FEE2E2'
const allBlueShades = primitiveColors.blue;      // { 50: '...', 100: '...', ... 950: '...' }
const white = primitiveColors.white;             // '#FFFFFF'
```

### TypeScript Types

```tsx
type PrimitiveColorScale = keyof typeof primitiveColors;
// 'gray' | 'slate' | 'zinc' | 'neutral' | 'stone' | 'red' | 'orange' | 'amber' |
// 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' |
// 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose' | 'white' | 'black' | 'transparent'

type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
```

---

## Semantic Colors

Meaningful color aliases mapped to primitive values. Available in both **light** and **dark** variants. Use these in your components for consistency and easy theming.

### 10 Semantic Categories

#### 1. `background`
Application and page background colors.

| Key | Light | Dark |
|-----|-------|------|
| `primary` | `#FFFFFF` | `#030712` (gray-950) |
| `secondary` | `#F9FAFB` (gray-50) | `#111827` (gray-900) |
| `tertiary` | `#F3F4F6` (gray-100) | `#1F2937` (gray-800) |
| `inverse` | `#111827` (gray-900) | `#F9FAFB` (gray-50) |
| `canvas` | `#F8FAFC` (slate-50) | `#020617` (slate-950) |
| `overlay` | `#000000CC` (80% black) | `#000000CC` (80% black) |
| `subtle` | `#EFF6FF` (blue-50) | `#172554` (blue-950) |

#### 2. `foreground`
Text and icon foreground colors.

| Key | Light | Dark |
|-----|-------|------|
| `primary` | `#111827` (gray-900) | `#F9FAFB` (gray-50) |
| `secondary` | `#4B5563` (gray-600) | `#D1D5DB` (gray-300) |
| `tertiary` | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) |
| `inverse` | `#FFFFFF` | `#111827` (gray-900) |
| `onPrimary` | `#FFFFFF` | `#FFFFFF` |
| `onDark` | `#F3F4F6` (gray-100) | `#F3F4F6` (gray-100) |
| `disabled` | `#D1D5DB` (gray-300) | `#4B5563` (gray-600) |
| `hint` | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) |

#### 3. `border`
Border and divider colors.

| Key | Light | Dark |
|-----|-------|------|
| `default` | `#E5E7EB` (gray-200) | `#374151` (gray-700) |
| `strong` | `#D1D5DB` (gray-300) | `#4B5563` (gray-600) |
| `subtle` | `#F3F4F6` (gray-100) | `#1F2937` (gray-800) |
| `inverse` | `#374151` (gray-700) | `#E5E7EB` (gray-200) |
| `focus` | `#3B82F6` (blue-500) | `#60A5FA` (blue-400) |
| `disabled` | `#E5E7EB` (gray-200) | `#374151` (gray-700) |

#### 4. `brand`
Primary brand identity colors.

| Key | Light | Dark |
|-----|-------|------|
| `primary` | `#2563EB` (blue-600) | `#60A5FA` (blue-400) |
| `primaryHover` | `#1D4ED8` (blue-700) | `#93C5FD` (blue-300) |
| `primaryActive` | `#1E40AF` (blue-800) | `#3B82F6` (blue-500) |
| `primarySubtle` | `#EFF6FF` (blue-50) | `#172554` (blue-950) |
| `secondary` | `#6366F1` (indigo-500) | `#818CF8` (indigo-400) |
| `secondaryHover` | `#4F46E5` (indigo-600) | `#A5B4FC` (indigo-300) |
| `secondaryActive` | `#4338CA` (indigo-700) | `#6366F1` (indigo-500) |
| `secondarySubtle` | `#EEF2FF` (indigo-50) | `#1E1B4B` (indigo-950) |
| `accent` | `#A855F7` (purple-500) | `#C084FC` (purple-400) |
| `accentHover` | `#9333EA` (purple-600) | `#D8B4FE` (purple-300) |
| `accentActive` | `#7E22CE` (purple-700) | `#A855F7` (purple-500) |
| `accentSubtle` | `#FAF5FF` (purple-50) | `#3B0764` (purple-950) |

#### 5. `status`
Feedback and state indication colors (success, warning, error, info).

Each status has 6 sub-tokens:

| Sub-token | Description |
|-----------|-------------|
| `success` | Main status color |
| `successHover` | Hover state |
| `successActive` | Active/pressed state |
| `successSubtle` | Light background tint |
| `successBorder` | Border color for status cards |
| `successText` | Text color for status messages |

Same pattern for `warning`, `error`, and `info`.

**Light mode:** `success=#16A34A, warning=#EAB308, error=#DC2626, info=#2563EB`
**Dark mode:** `success=#4ADE80, warning=#FACC15, error=#F87171, info=#60A5FA`

#### 6. `surface`
Card, modal, and elevated surface colors.

| Key | Light | Dark |
|-----|-------|------|
| `default` | `#FFFFFF` | `#111827` (gray-900) |
| `raised` | `#FFFFFF` | `#1F2937` (gray-800) |
| `overlay` | `#FFFFFF` | `#1F2937` (gray-800) |
| `sunken` | `#F9FAFB` (gray-50) | `#030712` (gray-950) |
| `muted` | `#F3F4F6` (gray-100) | `#1F2937` (gray-800) |
| `elevated` | `#FFFFFF` | `#1F2937` (gray-800) |
| `backdrop` | `#00000080` (50% black) | `#00000080` (50% black) |

#### 7. `interactive`
Interactive element states (buttons, links, form controls).

| Key | Light | Dark |
|-----|-------|------|
| `default` | `#2563EB` (blue-600) | `#60A5FA` (blue-400) |
| `hover` | `#1D4ED8` (blue-700) | `#93C5FD` (blue-300) |
| `active` | `#1E40AF` (blue-800) | `#3B82F6` (blue-500) |
| `disabled` | `#D1D5DB` (gray-300) | `#4B5563` (gray-600) |
| `disabledText` | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) |
| `focusRing` | `#60A5FA` (blue-400) | `#3B82F6` (blue-500) |
| `selected` | `#DBEAFE` (blue-100) | `#1E3A8A` (blue-900) |
| `selectedText` | `#1E40AF` (blue-800) | `#93C5FD` (blue-300) |

#### 8. `nav`
Navigation bars, sidebars, and menus.

| Key | Light | Dark |
|-----|-------|------|
| `background` | `#111827` (gray-900) | `#030712` (gray-950) |
| `text` | `#F3F4F6` (gray-100) | `#E5E7EB` (gray-200) |
| `textMuted` | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) |
| `activeItem` | `#60A5FA` (blue-400) | `#60A5FA` (blue-400) |
| `hoverItem` | `#1F2937` (gray-800) | `#1F2937` (gray-800) |
| `border` | `#374151` (gray-700) | `#374151` (gray-700) |
| `badge` | `#EF4444` (red-500) | `#F87171` (red-400) |

#### 9. `chart`
Data visualization colors.

| Key | Light | Dark |
|-----|-------|------|
| `series1` | `#3B82F6` (blue-500) | `#60A5FA` (blue-400) |
| `series2` | `#A855F7` (purple-500) | `#C084FC` (purple-400) |
| `series3` | `#22C55E` (green-500) | `#4ADE80` (green-400) |
| `series4` | `#F97316` (orange-500) | `#FB923C` (orange-400) |
| `series5` | `#EC4899` (pink-500) | `#F472B6` (pink-400) |
| `series6` | `#14B8A6` (teal-500) | `#2DD4BF` (teal-400) |
| `series7` | `#EAB308` (yellow-500) | `#FACC15` (yellow-400) |
| `series8` | `#6366F1` (indigo-500) | `#818CF8` (indigo-400) |
| `grid` | `#E5E7EB` (gray-200) | `#374151` (gray-700) |
| `axis` | `#9CA3AF` (gray-400) | `#6B7280` (gray-500) |
| `background` | `#F9FAFB` (gray-50) | `#111827` (gray-900) |

#### 10. `shadow`
Shadow and glow colors.

| Key | Light | Dark |
|-----|-------|------|
| `subtle` | `#00000008` | `#00000020` |
| `default` | `#00000014` | `#00000040` |
| `medium` | `#00000026` | `#00000060` |
| `strong` | `#0000003D` | `#00000080` |
| `glow` | `#60A5FA40` | `#3B82F630` |

### Usage

```tsx
import { lightSemanticColors, darkSemanticColors } from '@laddhaanshul/color-tokens';

// Access any token
lightSemanticColors.brand.primary;          // '#2563EB'
darkSemanticColors.status.errorSubtle;      // '#450A0A'
lightSemanticColors.foreground.disabled;    // '#D1D5DB'
lightSemanticColors.background.overlay;     // '#000000CC'
darkSemanticColors.nav.badge;               // '#F87171'

// In a provider, tokens auto-switch with theme
const tokens = useColorTokens();
tokens.brand.primary;  // '#2563EB' in light, '#60A5FA' in dark
```

### TypeScript Types

```tsx
type SemanticColorTheme = {
  [K in keyof typeof lightSemanticColors]: {
    [J in keyof typeof lightSemanticColors[K]]: string;
  };
};
type SemanticColorCategory = keyof SemanticColorTheme;
// 'background' | 'foreground' | 'border' | 'brand' | 'status' |
// 'surface' | 'interactive' | 'nav' | 'chart' | 'shadow'
```

---

## Utility Functions

11 utility functions for color manipulation, conversion, and accessibility.

### `hexToRgb(hex: string): { r: number; g: number; b: number } | null`

Convert a hex color to RGB components. Supports 3-char (`#FFF`) and 6-char (`#FFFFFF`) formats.

```tsx
hexToRgb('#3B82F6');   // { r: 59, g: 130, b: 246 }
hexToRgb('#FFF');       // { r: 255, g: 255, b: 255 }
hexToRgb('invalid');    // null
```

### `hexToRgba(hex: string, alpha?: number): string`

Convert a hex color to an `rgba()` string.

```tsx
hexToRgba('#3B82F6');         // 'rgba(59, 130, 246, 1)'
hexToRgba('#3B82F6', 0.5);    // 'rgba(59, 130, 246, 0.5)'
hexToRgba('invalid');          // 'invalid' (passthrough)
```

### `withOpacity(hex: string, opacity: number): string`

Apply opacity to a hex color. Alias for `hexToRgba`.

```tsx
withOpacity('#3B82F6', 0.1);   // 'rgba(59, 130, 246, 0.1)'
withOpacity('#000000', 0.8);   // 'rgba(0, 0, 0, 0.8)'
```

### `darken(hex: string, amount: number): string`

Darken a hex color by a percentage (0–100).

```tsx
darken('#3B82F6', 20);   // '#2f69c4' (darker blue)
darken('#FFFFFF', 50);   // '#808080'
```

### `lighten(hex: string, amount: number): string`

Lighten a hex color by a percentage (0–100).

```tsx
lighten('#3B82F6', 20);   // '#6d9df8' (lighter blue)
lighten('#000000', 50);   // '#808080'
```

### `tokensToCssVars(tokens: Record<string, unknown>, prefix?: string): Record<string, string>`

Flatten a nested token object into CSS custom property key-value pairs.

```tsx
tokensToCssVars(lightSemanticColors.brand, 'ct');
// { 'ct-primary': '#2563EB', 'ct-primaryHover': '#1D4ED8', ... }

tokensToCssVars(lightSemanticColors, 'app');
// { 'app-background-primary': '#FFFFFF', 'app-foreground-primary': '#111827', ... }
```

### `tokensToReactNativeStyles(tokens: Record<string, unknown>): Record<string, string>`

Flatten a nested token object into dot-notation keys for React Native StyleSheet usage.

```tsx
tokensToReactNativeStyles(lightSemanticColors);
// { 'background.primary': '#FFFFFF', 'foreground.primary': '#111827', ... }
```

### `isHexColor(value: string): boolean`

Check if a string is a valid hex color.

```tsx
isHexColor('#3B82F6');     // true
isHexColor('#FFF');        // true
isHexColor('rgba(...)');   // false
isHexColor('red');         // false
```

### `getLuminance(hex: string): number`

Get the relative luminance of a color (WCAG 2.0). Returns a value between 0 (black) and 1 (white).

```tsx
getLuminance('#000000');   // 0
getLuminance('#FFFFFF');   // 1
getLuminance('#3B82F6');   // ~0.232
```

### `getContrastRatio(hex1: string, hex2: string): number`

Calculate the contrast ratio between two colors (WCAG 2.0). Returns 1:1 to 21:1.

```tsx
getContrastRatio('#000000', '#FFFFFF');   // 21
getContrastRatio('#3B82F6', '#FFFFFF');   // ~4.55
getContrastRatio('#3B82F6', '#000000');   // ~4.61
```

### `meetsWcagAA(textColor: string, bgColor: string, isLargeText?: boolean): boolean`

Check if text meets WCAG AA contrast requirements. Requires 4.5:1 for normal text and 3:1 for large text.

```tsx
meetsWcagAA('#000000', '#FFFFFF');          // true (21:1 > 4.5:1)
meetsWcagAA('#999999', '#FFFFFF');          // false (2.85:1 < 4.5:1)
meetsWcagAA('#999999', '#FFFFFF', true);    // true (2.85:1 > 3:1 for large text)
```

---

## `createTheme()`

Create custom semantic themes with partial overrides. Works outside the provider — useful for generating themed stylesheets or computing tokens at build time.

```tsx
import { createTheme } from '@laddhaanshul/color-tokens';

const { light, dark } = createTheme({
  light: {
    brand: { primary: '#0066FF', primaryHover: '#0055DD' },
    background: { primary: '#FAFBFF' },
  },
  dark: {
    brand: { primary: '#3399FF', primarySubtle: '#001133' },
  },
});

// light.brand.primary === '#0066FF' (overridden)
// light.brand.primaryActive === '#1E40AF' (default preserved)
// dark.background.primary === '#030712' (default preserved)
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `overrides.light` | `Partial<SemanticColorTheme>` | Partial overrides for light mode |
| `overrides.dark` | `Partial<SemanticColorTheme>` | Partial overrides for dark mode |

**Returns:** `{ light: SemanticColorTheme, dark: SemanticColorTheme }`

---

## CSS Variable Injection

Enable automatic CSS custom property injection with `injectCssVars: true` in the config:

```tsx
<ColorProvider config={{ injectCssVars: true, cssVarPrefix: 'app' }}>
  <App />
</ColorProvider>
```

This automatically sets CSS variables on `:root`:

```css
:root {
  --app-background-primary: #FFFFFF;
  --app-background-secondary: #F9FAFB;
  --app-foreground-primary: #111827;
  --app-brand-primary: #2563EB;
  --app-status-success: #16A34A;
  /* ... all 100+ semantic tokens */
}
```

Use them in CSS or styled-components:

```css
.my-button {
  background: var(--app-brand-primary);
  color: var(--app-foreground-on-primary);
}

.my-button:hover {
  background: var(--app-brand-primaryHover);
}
```

```tsx
// Tailwind CSS integration
import { tokensToCssVars, lightSemanticColors } from '@laddhaanshul/color-tokens';

// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        // Access tokens as Tailwind colors
        brand: 'var(--app-brand-primary)',
      },
    },
  },
};
```

When the theme changes, all CSS variables update automatically.

---

## React Native Usage

The package automatically detects React Native environments via the `"react-native"` field in `package.json`. Metro bundler loads the native entry point which uses the `Appearance` API for system theme detection.

```tsx
import { ColorProvider, useTheme, useColorTokens, useToken } from '@laddhaanshul/color-tokens';
import { View, Text, StyleSheet, Button, Appearance } from 'react-native';

function App() {
  return (
    <ColorProvider defaultTheme="system">
      <HomeScreen />
    </ColorProvider>
  );
}

function HomeScreen() {
  const { theme, toggleTheme, isDark } = useTheme();
  const tokens = useColorTokens();
  const brandColor = useToken('brand', 'primary');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.background.primary,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: tokens.foreground.primary,
    },
    subtitle: {
      fontSize: 14,
      color: tokens.foreground.secondary,
      marginTop: 4,
    },
    card: {
      backgroundColor: tokens.surface.default,
      borderWidth: 1,
      borderColor: tokens.border.default,
      borderRadius: 12,
      padding: 16,
      marginTop: 16,
    },
    successBanner: {
      backgroundColor: tokens.status.successSubtle,
      borderWidth: 1,
      borderColor: tokens.status.successBorder,
      borderRadius: 8,
      padding: 12,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Theme: {theme}</Text>
      <Text style={styles.subtitle}>Brand color: {brandColor}</Text>
      <Button
        title={isDark ? 'Switch to Light' : 'Switch to Dark'}
        onPress={toggleTheme}
      />

      <View style={styles.card}>
        <Text style={{ color: tokens.foreground.primary }}>Card content</Text>
      </View>

      <View style={styles.successBanner}>
        <Text style={{ color: tokens.status.successText }}>
          All systems operational
        </Text>
      </View>
    </View>
  );
}
```

**Note:** `injectCssVars` is silently ignored on React Native (no DOM).

---

## Without Provider (Direct Imports)

Tokens and utility functions can be used without the ColorProvider — they are plain objects and functions with zero React dependencies:

```tsx
import {
  primitiveColors,
  lightSemanticColors,
  darkSemanticColors,
  hexToRgb,
  withOpacity,
  darken,
  lighten,
  getContrastRatio,
  meetsWcagAA,
  tokensToCssVars,
  tokensToReactNativeStyles,
  isHexColor,
  getLuminance,
  createTheme,
  defaultConfig,
  resolveConfig,
} from '@laddhaanshul/color-tokens';

// Direct token access
const primary = lightSemanticColors.brand.primary;

// Utility functions
const transparent = withOpacity(primary, 0.1);
const darker = darken(primary, 15);

// Accessibility check
if (!meetsWcagAA(textColor, bgColor)) {
  console.warn('Insufficient contrast ratio');
}

// Generate CSS variables
const vars = tokensToCssVars(lightSemanticColors, 'color');
```

---

## TypeScript Types

All types are exported and fully documented:

```tsx
// Primitive types
type PrimitiveColorScale = keyof typeof primitiveColors;
type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

// Semantic types
type SemanticColorTheme = {
  [K in keyof typeof lightSemanticColors]: {
    [J in keyof typeof lightSemanticColors[K]]: string;
  };
};
type SemanticColorCategory = 'background' | 'foreground' | 'border' | 'brand' | 'status' | 'surface' | 'interactive' | 'nav' | 'chart' | 'shadow';

// Config types
interface ColorTokensConfig {
  defaultTheme?: 'light' | 'dark' | 'system';
  cssVarPrefix?: string;
  injectCssVars?: boolean;
  customPrimitives?: Partial<Record<PrimitiveColorScale, Record<number, string>>>;
  customLightSemantic?: Partial<SemanticColorTheme>;
  customDarkSemantic?: Partial<SemanticColorTheme>;
}

// Provider types
interface ColorProviderProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
  defaultTheme?: 'light' | 'dark' | 'system';
  config?: ColorTokensConfig;
}

interface ThemeContextValue {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
  systemPreference: 'light' | 'dark';
  tokens: SemanticColorTheme;
  primitives: typeof primitiveColors;
  config: Required<ColorTokensConfig>;
}

// Utility types
type RGB = { r: number; g: number; b: number };
```

---

## Build & Development

```bash
# Build all formats
npm run build

# Individual builds
npm run build:cjs       # CommonJS (Node / older bundlers)
npm run build:esm       # ESM (Webpack, Vite, modern bundlers)
npm run build:native    # CommonJS for React Native (Metro)
npm run build:types     # TypeScript declaration files

# Development
npm run dev             # Watch mode (ESM only)
npm run test            # Run tests (Vitest)
npm run lint            # ESLint
npm run typecheck       # TypeScript type checking
npm run clean           # Remove dist/
```

### Build Outputs

| File | Format | Platform | Used By |
|------|--------|----------|---------|
| `dist/index.js` | CommonJS | Web / Node | `require()` |
| `dist/esm/index.js` | ESM | Web bundlers | `import` |
| `dist/index.native.js` | CommonJS | React Native | Metro bundler |
| `dist/index.d.ts` | Declarations | TypeScript | IDE intellisense |

### Package.json Resolution Fields

| Field | Value | Purpose |
|-------|-------|---------|
| `"main"` | `dist/index.js` | Node.js / CommonJS entry |
| `"module"` | `dist/esm/index.js` | Bundler ESM entry |
| `"types"` | `dist/index.d.ts` | TypeScript declarations |
| `"react-native"` | `dist/index.native.js` | Metro bundler entry |
| `"exports"` | Conditional | Modern package exports with `react-native` condition |

---

## License

MIT
