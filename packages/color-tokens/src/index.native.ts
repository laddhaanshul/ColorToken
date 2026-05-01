/**
 * @color-tokens/core — React Native Entry Point
 *
 * This file serves as the React Native (Expo) specific entry point.
 * It exports all the same APIs as the web entry, but uses the native
 * ColorProvider that leverages the Appearance API for system theme
 * detection instead of `window.matchMedia`.
 *
 * Metro bundler automatically picks up this file via the `"react-native"`
 * field in package.json.
 *
 * @example
 * ```tsx
 * import { ColorProvider, useTheme, useColorTokens } from '@color-tokens/core';
 *
 * function App() {
 *   return (
 *     <ColorProvider defaultTheme="system">
 *       <HomeScreen />
 *     </ColorProvider>
 *   );
 * }
 *
 * function HomeScreen() {
 *   const { theme, toggleTheme, isDark } = useTheme();
 *   const tokens = useColorTokens();
 *
 *   const styles = StyleSheet.create({
 *     container: { flex: 1, backgroundColor: tokens.background.primary },
 *     text: { color: tokens.foreground.primary },
 *   });
 *
 *   return (
 *     <View style={styles.container}>
 *       <Text style={styles.text}>Theme: {theme}</Text>
 *       <Button title="Toggle" onPress={toggleTheme} />
 *     </View>
 *   );
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

// ─── Provider & Hooks (Native) ─────────────────────────────
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
} from './providers/ColorProvider.native';
