/**
 * Color Utility Functions
 *
 * Helper functions for working with color tokens,
 * including conversion, opacity manipulation, and theme resolution.
 */

/**
 * Convert a hex color string to RGB components.
 * Handles both 3-char (#FFF) and 6-char (#FFFFFF) hex values.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.replace('#', '');

  if (cleaned.length === 3) {
    const r = parseInt(cleaned[0] + cleaned[0], 16);
    const g = parseInt(cleaned[1] + cleaned[1], 16);
    const b = parseInt(cleaned[2] + cleaned[2], 16);
    return { r, g, b };
  }

  if (cleaned.length === 6) {
    const r = parseInt(cleaned.substring(0, 2), 16);
    const g = parseInt(cleaned.substring(2, 4), 16);
    const b = parseInt(cleaned.substring(4, 6), 16);
    return { r, g, b };
  }

  return null;
}

/**
 * Convert a hex color string to RGBA format.
 * Accepts an optional alpha value between 0 and 1 (default 1).
 */
export function hexToRgba(hex: string, alpha: number = 1): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

/**
 * Apply opacity to a hex color string.
 * Returns an RGBA string with the given opacity (0-1).
 */
export function withOpacity(hex: string, opacity: number): string {
  return hexToRgba(hex, opacity);
}

/**
 * Darken a hex color by a given amount (0-100).
 * Returns a new hex color string.
 */
export function darken(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const factor = 1 - amount / 100;
  const r = Math.round(Math.max(0, rgb.r * factor));
  const g = Math.round(Math.max(0, rgb.g * factor));
  const b = Math.round(Math.max(0, rgb.b * factor));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Lighten a hex color by a given amount (0-100).
 * Returns a new hex color string.
 */
export function lighten(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const factor = amount / 100;
  const r = Math.round(Math.min(255, rgb.r + (255 - rgb.r) * factor));
  const g = Math.round(Math.min(255, rgb.g + (255 - rgb.g) * factor));
  const b = Math.round(Math.min(255, rgb.b + (255 - rgb.b) * factor));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Generate a flat color palette (CSS custom properties format) from the given tokens.
 * Useful for applying all tokens as CSS variables on a root element.
 */
export function tokensToCssVars(
  tokens: Record<string, unknown>,
  prefix: string = 'color'
): Record<string, string> {
  const vars: Record<string, string> = {};
  const separator = '-';

  function flatten(obj: Record<string, unknown>, parentKey: string = '') {
    for (const [key, value] of Object.entries(obj)) {
      const varName = parentKey ? `${prefix}${separator}${parentKey}${separator}${key}` : `${prefix}${separator}${key}`;
      if (typeof value === 'string') {
        vars[varName] = value;
      } else if (typeof value === 'object' && value !== null) {
        flatten(value as Record<string, unknown>, parentKey ? `${parentKey}${separator}${key}` : key);
      }
    }
  }

  flatten(tokens);
  return vars;
}

/**
 * Create a React-native-compatible style object from a set of color tokens.
 * Converts camelCase keys to flat dot-notation for StyleSheet usage.
 */
export function tokensToReactNativeStyles(
  tokens: Record<string, unknown>
): Record<string, string> {
  const styles: Record<string, string> = {};

  function flatten(obj: Record<string, unknown>, parentKey: string = '') {
    for (const [key, value] of Object.entries(obj)) {
      const styleKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof value === 'string') {
        styles[styleKey] = value;
      } else if (typeof value === 'object' && value !== null) {
        flatten(value as Record<string, unknown>, styleKey);
      }
    }
  }

  flatten(tokens);
  return styles;
}

/**
 * Check if a string is a valid hex color.
 */
export function isHexColor(value: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(value);
}

/**
 * Get the relative luminance of a color (WCAG 2.0 calculation).
 * Useful for determining contrast ratios for accessibility.
 */
export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [rs, gs, bs] = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate the contrast ratio between two hex colors (WCAG 2.0).
 * Returns a value between 1:1 and 21:1.
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if text in `textColor` on `backgroundColor` meets WCAG AA standards.
 * `isLargeText` reduces the required contrast ratio from 4.5:1 to 3:1.
 */
export function meetsWcagAA(
  textColor: string,
  backgroundColor: string,
  isLargeText: boolean = false
): boolean {
  const ratio = getContrastRatio(textColor, backgroundColor);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}
