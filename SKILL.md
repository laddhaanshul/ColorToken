# Skill Configuration

## Skill: color-tokens-assistant

### Overview

The `color-tokens-assistant` skill enables AI assistants to work effectively with the `@laddhaanshul/color-tokens` package. It provides specialized knowledge about the token system, including all available tokens, utility functions, platform-specific patterns, and best practices.

### Skill Definition

```yaml
skill:
  name: color-tokens-assistant
  version: 1.0.0
  description: >
    Provides comprehensive knowledge about @laddhaanshul/color-tokens for both
    React and React Native platforms. Covers primitive and semantic tokens,
    utility functions, theming patterns, and accessibility guidelines.
  triggers:
    - "color token"
    - "design token"
    - "theme color"
    - "brand color"
    - "dark mode color"
    - "color palette"
    - "WCAG color"
    - "contrast ratio"
  platforms:
    - react
    - react-native
    - expo
  dependencies:
    - @laddhaanshul/color-tokens
```

### Knowledge Base

#### Token Categories

The skill has knowledge of the following token categories and their keys:

1. **Primitive Colors** — 14 scales (gray, blue, red, green, yellow, purple, orange, pink, teal, indigo, cyan, slate, zinc, stone) each with 11 shades (50–950), plus white, black, and transparent.

2. **Semantic Colors (Light/Dark)** — background, foreground, border, brand, status, surface, interactive, nav, chart, shadow.

#### Utility Functions Reference

| Function | Signature | Platform |
|----------|-----------|----------|
| `hexToRgb` | `(hex: string) => { r, g, b } \| null` | Both |
| `hexToRgba` | `(hex: string, alpha?: number) => string` | Both |
| `withOpacity` | `(hex: string, opacity: number) => string` | Both |
| `darken` | `(hex: string, amount: number) => string` | Both |
| `lighten` | `(hex: string, amount: number) => string` | Both |
| `tokensToCssVars` | `(tokens, prefix?) => Record<string, string>` | Web |
| `tokensToReactNativeStyles` | `(tokens) => Record<string, string>` | RN |
| `isHexColor` | `(value: string) => boolean` | Both |
| `getLuminance` | `(hex: string) => number` | Both |
| `getContrastRatio` | `(hex1, hex2) => number` | Both |
| `meetsWcagAA` | `(text, bg, isLarge?) => boolean` | Both |

### Skill Behaviors

#### When the user asks about color tokens...

1. **Identify the platform** — Determine whether the user is working with React web or React Native
2. **Recommend semantic tokens** — Always suggest semantic tokens over primitive tokens for component styling
3. **Provide code examples** — Generate platform-appropriate code snippets showing proper token usage
4. **Check accessibility** — When suggesting text/background combinations, verify WCAG compliance
5. **Consider theming** — Remind users about light/dark mode support when relevant

#### When the user asks about theming...

1. Explain the two-token-set approach (light + dark semantic colors)
2. Provide the appropriate pattern for the target platform (CSS variables for web, Context API for RN)
3. Include system preference detection in the solution
4. Recommend persistent storage for user preference

#### When the user asks about accessibility...

1. Calculate the exact contrast ratio using the WCAG 2.0 formula
2. Compare against AA (4.5:1 / 3:1) and AAA (7:1 / 4.5:1) thresholds
3. Suggest alternative color combinations if the current pair fails
4. Distinguish between normal text and large text requirements

### Code Templates

The skill maintains ready-to-use code templates for:

- **React ThemeProvider** — Complete implementation with CSS variable injection, localStorage persistence, and system preference detection
- **React Native ThemeProvider** — Complete implementation with React Context, Appearance API integration, and AsyncStorage persistence
- **CSS Variable Stylesheet** — Pre-configured CSS file with all semantic token CSS variables applied
- **Styled Component Wrapper** — Utility for creating styled components that automatically use theme tokens
- **Storybook Theme** — Storybook decorator for previewing components in both light and dark themes

### Evaluation Metrics

The skill is evaluated on:

- **Accuracy** — Correct token values and function signatures
- **Platform Relevance** — Appropriate code patterns for the target platform
- **Accessibility** — Proactive WCAG compliance checking
- **Completeness** — Full code examples that are ready to copy-paste
- **Best Practices** — Adherence to documented theming patterns and conventions
