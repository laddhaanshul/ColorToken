/**
 * Shared Provider Types
 *
 * Common type definitions used by both the web (ColorProvider) and
 * React Native (ColorProvider.native) implementations.
 *
 * Kept in a separate, DOM-free file so the native build can reference
 * these types without pulling in window/document-dependent code.
 */

import type React from 'react';
import type { SemanticColorTheme } from '../tokens';
import { primitiveColors } from '../tokens';
import type { ColorTokensConfig } from '../config';

/**
 * Props for the `<ColorProvider>` component.
 * Shared between web and React Native implementations.
 */
export interface ColorProviderProps {
  /** React elements that will have access to the color theme context */
  children: React.ReactNode;

  /**
   * Force a specific theme mode, overriding the config's `defaultTheme`.
   * When set, the user cannot toggle the theme (it stays locked to this value).
   *
   * @example `<ColorProvider theme="dark">` — always dark, ignores system pref
   */
  theme?: 'light' | 'dark';

  /**
   * Default theme when no `theme` prop is provided.
   * Accepts `'light'`, `'dark'`, or `'system'` (follows OS preference).
   *
   * @default 'system'
   */
  defaultTheme?: 'light' | 'dark' | 'system';

  /**
   * Configuration object for advanced customization.
   * See {@link ColorTokensConfig} for all available options.
   */
  config?: ColorTokensConfig;
}

/**
 * The value provided by the ColorProvider context.
 * Contains the current theme state, tokens, and control functions.
 * Shared between web and React Native implementations.
 */
export interface ThemeContextValue {
  /** Current active theme: `'light'` or `'dark'` */
  theme: 'light' | 'dark';

  /**
   * Programmatically set the theme.
   * When `theme` prop is forcing a mode, this is a no-op.
   */
  setTheme: (theme: 'light' | 'dark') => void;

  /**
   * Toggle between light and dark themes.
   * When `theme` prop is forcing a mode, this is a no-op.
   */
  toggleTheme: () => void;

  /** `true` if the current theme is `'dark'` */
  isDark: boolean;

  /** `true` if the current theme is `'light'` */
  isLight: boolean;

  /** The operating system / browser preferred color scheme */
  systemPreference: 'light' | 'dark';

  /**
   * Semantic color tokens for the current active theme.
   * Use these in your components instead of primitive colors.
   */
  tokens: SemanticColorTheme;

  /** The full primitive color palette (all 22 scales) */
  primitives: typeof primitiveColors;

  /** The resolved configuration (with defaults applied) */
  config: Required<ColorTokensConfig>;
}
