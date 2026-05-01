/**
 * Providers Index — Web Entry
 *
 * Re-exports everything from the web ColorProvider.
 * Used by the main `index.ts` entry point.
 */

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
} from './ColorProvider';
