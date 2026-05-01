# API Reference

Complete API documentation for all exports from `@color-tokens/core`.

## Token Exports

### `primitiveColors`

The foundational color palette containing 22 color scales with 11 shades each (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950), plus standalone `white`, `black`, and `transparent` values.

**Available Color Scales:** gray, slate, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose

```ts
import { primitiveColors } from '@color-tokens/core';

const blue500 = primitiveColors.blue[500];  // '#3B82F6'
const gray900 = primitiveColors.gray[900];  // '#111827'
const white = primitiveColors.white;        // '#FFFFFF'
```

### `lightSemanticColors`

Semantic color tokens optimized for light backgrounds. All values are hex strings or hex-with-alpha strings (e.g., `'#000000CC'`).

**Categories:** background, foreground, border, brand, status, surface, interactive, nav, chart, shadow

```ts
import { lightSemanticColors } from '@color-tokens/core';

lightSemanticColors.brand.primary;     // '#2563EB'
lightSemanticColors.status.success;    // '#16A34A'
lightSemanticColors.surface.default;   // '#FFFFFF'
```

### `darkSemanticColors`

Semantic color tokens optimized for dark backgrounds. Same category structure as light mode, but with adjusted values for proper contrast and visual hierarchy.

```ts
import { darkSemanticColors } from '@color-tokens/core';

darkSemanticColors.brand.primary;      // '#60A5FA'
darkSemanticColors.background.primary; // '#030712'
darkSemanticColors.foreground.primary; // '#F9FAFB'
```

## Utility Functions

### `hexToRgb(hex: string): { r: number; g: number; b: number } | null`

Converts a hex color string to an RGB object. Supports both 3-character (`#FFF`) and 6-character (`#FFFFFF`) formats. Returns `null` if the input is not a valid hex color string.

```ts
hexToRgb('#3B82F6');  // { r: 59, g: 130, b: 246 }
hexToRgb('#FFF');      // { r: 255, g: 255, b: 255 }
hexToRgb('invalid');   // null
```

### `hexToRgba(hex: string, alpha?: number): string`

Converts a hex color to an `rgba()` CSS string. The `alpha` parameter defaults to 1 and must be between 0 and 1.

```ts
hexToRgba('#3B82F6', 0.5);  // 'rgba(59, 130, 246, 0.5)'
hexToRgba('#3B82F6');        // 'rgba(59, 130, 246, 1)'
```

### `withOpacity(hex: string, opacity: number): string`

Alias for `hexToRgba`. Applies the specified opacity (0–1) to a hex color and returns an RGBA string.

```ts
withOpacity('#2563EB', 0.8);  // 'rgba(37, 99, 235, 0.8)'
```

### `darken(hex: string, amount: number): string`

Darkens a hex color by the specified percentage (0–100). Returns a new hex string. The function preserves the hex format and ensures RGB values stay within the 0–255 range.

```ts
darken('#3B82F6', 20);  // '#2F69C4' (approximate)
darken('#FFFFFF', 50);  // '#808080' (approximate)
```

### `lighten(hex: string, amount: number): string`

Lightens a hex color by blending it toward white by the specified percentage (0–100). Returns a new hex string.

```ts
lighten('#3B82F6', 20);  // '#6E9EF8' (approximate)
lighten('#000000', 50);  // '#808080' (approximate)
```

### `tokensToCssVars(tokens: Record<string, unknown>, prefix?: string): Record<string, string>`

Flattens a nested token object into a flat map of CSS variable names to values. The `prefix` parameter (default: `"color"`) is prepended to each variable name. Nested objects are joined with hyphens.

```ts
const vars = tokensToCssVars(lightSemanticColors.brand, 'brand');
// {
//   'brand-primary': '#2563EB',
//   'brand-primaryHover': '#1D4ED8',
//   'brand-primaryActive': '#1E40AF',
//   ...
// }
```

### `tokensToReactNativeStyles(tokens: Record<string, unknown>): Record<string, string>`

Flattens tokens into dot-notation keys suitable for creating flat style reference objects in React Native projects.

```ts
const styles = tokensToReactNativeStyles(lightSemanticColors);
// { 'brand.primary': '#2563EB', 'status.success': '#16A34A', ... }
```

### `isHexColor(value: string): boolean`

Validates whether a string is a properly formatted hex color (3, 6, or 8 character hex with `#` prefix).

```ts
isHexColor('#3B82F6');   // true
isHexColor('#FFF');      // true
isHexColor('3B82F6');    // false (missing #)
isHexColor('invalid');   // false
```

### `getLuminance(hex: string): number`

Calculates the relative luminance of a color according to the WCAG 2.0 specification. Returns a value between 0 (black) and 1 (white). This is useful for programmatically determining whether text should be light or dark on a given background.

```ts
getLuminance('#000000');  // 0
getLuminance('#FFFFFF');  // 1
getLuminance('#3B82F6');  // ~0.23
```

### `getContrastRatio(hex1: string, hex2: string): number`

Calculates the WCAG 2.0 contrast ratio between two colors. Returns a value between 1:1 (no contrast) and 21:1 (maximum contrast). The order of parameters does not matter — the function automatically uses the lighter color as the numerator.

```ts
getContrastRatio('#000000', '#FFFFFF');  // 21
getContrastRatio('#3B82F6', '#FFFFFF');  // ~3.8
```

### `meetsWcagAA(textColor: string, bgColor: string, isLargeText?: boolean): boolean`

Checks whether text on a background meets WCAG AA contrast requirements. For normal text, the ratio must be at least 4.5:1. For large text (14pt bold or 18pt+), the ratio must be at least 3:1. The `isLargeText` parameter defaults to `false`.

```ts
meetsWcagAA('#000000', '#FFFFFF');           // true (21:1 > 4.5:1)
meetsWcagAA('#3B82F6', '#FFFFFF');           // false (~3.8 < 4.5:1)
meetsWcagAA('#3B82F6', '#FFFFFF', true);     // true (~3.8 > 3:1)
```

## TypeScript Types

```ts
type PrimitiveColorScale = 'gray' | 'slate' | 'zinc' | 'neutral' | 'stone' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose';

type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

type SemanticColorTheme = Record<string, Record<string, string>>;

type SemanticColorCategory = keyof SemanticColorTheme;
// 'background' | 'foreground' | 'border' | 'brand' | 'status' | 'surface' | 'interactive' | 'nav' | 'chart' | 'shadow'
```
