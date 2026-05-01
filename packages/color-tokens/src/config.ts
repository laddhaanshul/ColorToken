/**
 * Color Tokens Configuration
 *
 * Provides types, defaults, and helper functions for customizing
 * the color token system. Use the config to override primitive
 * colors, semantic tokens, and control theming behavior.
 *
 * @example
 * ```tsx
 * import { ColorProvider, defaultConfig } from '@laddhaanshul/color-tokens';
 *
 * <ColorProvider config={{
 *   ...defaultConfig,
 *   defaultTheme: 'dark',
 *   cssVarPrefix: 'app',
 *   injectCssVars: true,
 * }}>
 *   <App />
 * </ColorProvider>
 * ```
 */

import type { PrimitiveColorScale, SemanticColorTheme } from './tokens';

/**
 * Configuration interface for the ColorProvider.
 * All fields are optional — sensible defaults are provided.
 */
export interface ColorTokensConfig {
  /**
   * Default theme when none is forced via the `theme` prop.
   * - `'system'` — follows OS preference (default)
   * - `'light'` — always starts in light mode
   * - `'dark'` — always starts in dark mode
   *
   * @default 'system'
   */
  defaultTheme?: 'light' | 'dark' | 'system';

  /**
   * CSS custom property prefix used when injecting variables.
   * Tokens are injected as `--{prefix}-{category}-{key}`.
   *
   * @example 'ct' → `--ct-background-primary`, `--ct-brand-primary`
   * @default 'ct'
   */
  cssVarPrefix?: string;

  /**
   * Whether to automatically inject semantic color tokens as
   * CSS custom properties on `:root` when the theme changes.
   * Only applicable on web platforms; ignored on React Native.
   *
   * @default false
   */
  injectCssVars?: boolean;

  /**
   * Custom overrides for primitive color scales.
   * Provide partial overrides for any of the 22 color families.
   * Missing families fall back to the built-in defaults.
   *
   * @example
   * ```tsx
   * customPrimitives: {
   *   blue: { 500: '#0066FF', 600: '#0055DD' },
   * }
   * ```
   */
  customPrimitives?: Partial<Record<PrimitiveColorScale, Record<number, string>>>;

  /**
   * Custom overrides for light mode semantic tokens.
   * Provide partial overrides for any semantic category.
   * Missing categories or keys fall back to the built-in defaults.
   *
   * @example
   * ```tsx
   * customLightSemantic: {
   *   brand: { primary: '#0066FF' },
   * }
   * ```
   */
  customLightSemantic?: Partial<SemanticColorTheme>;

  /**
   * Custom overrides for dark mode semantic tokens.
   * Same structure as `customLightSemantic`.
   *
   * @example
   * ```tsx
   * customDarkSemantic: {
   *   background: { primary: '#0A0A0A' },
   * }
   * ```
   */
  customDarkSemantic?: Partial<SemanticColorTheme>;
}

/**
 * Default configuration values.
 * Use as a base when creating custom configs.
 */
export const defaultConfig: Required<ColorTokensConfig> = {
  defaultTheme: 'system',
  cssVarPrefix: 'ct',
  injectCssVars: false,
  customPrimitives: {},
  customLightSemantic: {},
  customDarkSemantic: {},
};

/**
 * Merge a user-supplied config with the defaults.
 * Returns a complete config object with no undefined values.
 *
 * @param userConfig - Partial config from the user
 * @returns Fully resolved config with defaults applied
 *
 * @example
 * ```tsx
 * const config = resolveConfig({ defaultTheme: 'dark' });
 * // config.cssVarPrefix === 'ct' (from defaults)
 * // config.defaultTheme === 'dark' (from user)
 * ```
 */
export function resolveConfig(
  userConfig?: ColorTokensConfig
): Required<ColorTokensConfig> {
  if (!userConfig) return { ...defaultConfig };
  return {
    defaultTheme: userConfig.defaultTheme ?? defaultConfig.defaultTheme,
    cssVarPrefix: userConfig.cssVarPrefix ?? defaultConfig.cssVarPrefix,
    injectCssVars: userConfig.injectCssVars ?? defaultConfig.injectCssVars,
    customPrimitives: {
      ...defaultConfig.customPrimitives,
      ...userConfig.customPrimitives,
    },
    customLightSemantic: {
      ...defaultConfig.customLightSemantic,
      ...userConfig.customLightSemantic,
    } as Required<ColorTokensConfig>['customLightSemantic'],
    customDarkSemantic: {
      ...defaultConfig.customDarkSemantic,
      ...userConfig.customDarkSemantic,
    } as Required<ColorTokensConfig>['customDarkSemantic'],
  };
}
