/**
 * @laddhaanshul/color-tokens — Universal Color Token System (Web Entry)
 *
 * The main entry point for web (React) projects.
 * Exports all tokens, utility functions, provider, hooks, and config.
 *
 * @example
 * ```tsx
 * // Using tokens directly (no provider needed)
 * import { lightSemanticColors, withOpacity } from '@laddhaanshul/color-tokens';
 * const bg = withOpacity(lightSemanticColors.brand.primary, 0.1);
 *
 * // Using the provider + hooks
 * import { ColorProvider, useTheme, useToken } from '@laddhaanshul/color-tokens';
 *
 * function App() {
 *   return (
 *     <ColorProvider defaultTheme="system">
 *       <Dashboard />
 *     </ColorProvider>
 *   );
 * }
 *
 * function Dashboard() {
 *   const { theme, toggleTheme } = useTheme();
 *   const brandColor = useToken('brand', 'primary');
 *   return <button style={{ background: brandColor }} onClick={toggleTheme}>{theme}</button>;
 * }
 * ```
 */

// ─── Color Tokens ──────────────────────────────────────────
export { primitiveColors, type PrimitiveColorScale, type ColorShade } from './tokens/primitive';
export {
  lightSemanticColors,
  darkSemanticColors,
  type SemanticColorTheme,
  type SemanticColorCategory,
} from './tokens/semantic';

// ─── Utility Functions ─────────────────────────────────────
export {
  hexToRgb,
  hexToRgba,
  withOpacity,
  darken,
  lighten,
  tokensToCssVars,
  tokensToReactNativeStyles,
  isHexColor,
  getLuminance,
  getContrastRatio,
  meetsWcagAA,
} from './utils';

// ─── Configuration ─────────────────────────────────────────
export {
  defaultConfig,
  resolveConfig,
  type ColorTokensConfig,
} from './config';

// ─── Provider & Hooks ──────────────────────────────────────
export {
  ColorProvider,
  useTheme,
  useColorTokens,
  usePrimitiveColors,
  useColorConfig,
  useToken,
  createTheme,
  type ColorProviderProps,
  type ThemeContextValue,
} from './providers';
