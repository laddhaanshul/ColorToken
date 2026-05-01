/**
 * ColorProvider — React Native Implementation
 *
 * React Native variant of the ColorProvider that uses the `Appearance`
 * API for system theme detection instead of `window.matchMedia`.
 *
 * CSS variable injection is not supported on React Native (no DOM).
 * The `injectCssVars` config option is silently ignored.
 *
 * @example
 * ```tsx
 * import { ColorProvider, useTheme, useColorTokens } from '@laddhaanshul/color-tokens';
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
 *   return (
 *     <View style={[styles.container, { backgroundColor: tokens.background.primary }]}>
 *       <Text style={{ color: tokens.foreground.primary }}>
 *         Current theme: {theme}
 *       </Text>
 *       <Button title={isDark ? 'Switch to Light' : 'Switch to Dark'} onPress={toggleTheme} />
 *     </View>
 *   );
 * }
 * ```
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { Appearance, type ColorSchemeName } from 'react-native';

import { primitiveColors, lightSemanticColors, darkSemanticColors } from '../tokens';
import type { SemanticColorTheme, SemanticColorCategory } from '../tokens';
import { resolveConfig, defaultConfig } from '../config';
import type { ColorTokensConfig } from '../config';
import type { ColorProviderProps, ThemeContextValue } from './types';

export type { ColorProviderProps, ThemeContextValue } from './types';

// ─── Context ──────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ─── Helper: Deep Merge Tokens ────────────────────────────────────────────

function mergeTokens(
  base: SemanticColorTheme,
  overrides: Partial<SemanticColorTheme>
): SemanticColorTheme {
  const result = { ...base };

  for (const category of Object.keys(overrides) as (keyof SemanticColorTheme)[]) {
    const overrideCat = overrides[category];
    const baseCat = base[category];

    if (
      overrideCat &&
      typeof overrideCat === 'object' &&
      typeof baseCat === 'object'
    ) {
      (result as Record<string, unknown>)[category] = {
        ...(baseCat as Record<string, unknown>),
        ...(overrideCat as Record<string, unknown>),
      };
    }
  }

  return result;
}

// ─── ColorProvider Component (RN) ─────────────────────────────────────────

/**
 * React Native theme provider using the Appearance API.
 *
 * Supports light/dark/system theme modes with live system preference updates.
 * CSS variable injection (`injectCssVars`) is not supported on React Native
 * and is silently ignored.
 *
 * @example
 * ```tsx
 * <ColorProvider defaultTheme="system">
 *   <App />
 * </ColorProvider>
 *
 * // With custom overrides
 * <ColorProvider config={{
 *   customLightSemantic: { brand: { primary: '#0066FF' } },
 * }}>
 *   <App />
 * </ColorProvider>
 * ```
 */
export function ColorProvider({
  children,
  theme: forcedTheme,
  defaultTheme: propDefault,
  config: userConfig,
}: ColorProviderProps): React.ReactElement {
  const config = useMemo(
    () => resolveConfig(userConfig),
    [userConfig]
  );

  const effectiveDefault = propDefault ?? config.defaultTheme;

  const [systemPreference, setSystemPreference] = useState<'light' | 'dark'>(
    () => {
      const scheme = Appearance.getColorScheme();
      return scheme === 'dark' ? 'dark' : 'light';
    }
  );

  const [userTheme, setUserTheme] = useState<'light' | 'dark' | undefined>(
    undefined
  );

  // Listen for Appearance changes (React Native)
  useEffect(() => {
    const subscription = Appearance.addChangeListener((
      preferences: { colorScheme: ColorSchemeName }
    ) => {
      setSystemPreference(preferences.colorScheme === 'dark' ? 'dark' : 'light');
    });

    return () => subscription.remove();
  }, []);

  // Resolve the active theme
  const theme: 'light' | 'dark' = useMemo(() => {
    if (forcedTheme) return forcedTheme;
    if (userTheme) return userTheme;
    if (effectiveDefault === 'system') return systemPreference;
    return effectiveDefault;
  }, [forcedTheme, userTheme, effectiveDefault, systemPreference]);

  // Compute tokens with overrides
  const tokens: SemanticColorTheme = useMemo(() => {
    const base = theme === 'dark' ? darkSemanticColors : lightSemanticColors;
    const overrides =
      theme === 'dark'
        ? config.customDarkSemantic
        : config.customLightSemantic;
    return mergeTokens(base, overrides);
  }, [theme, config.customLightSemantic, config.customDarkSemantic]);

  // Compute primitives with overrides
  const primitives = useMemo(() => {
    if (
      !config.customPrimitives ||
      Object.keys(config.customPrimitives).length === 0
    ) {
      return primitiveColors;
    }

    const result = { ...primitiveColors };
    for (const [scale, shades] of Object.entries(config.customPrimitives)) {
      if (shades && typeof shades === 'object') {
        (result as unknown as Record<string, Record<string, string>>)[scale] = {
          ...((primitiveColors as unknown as Record<string, Record<string, string>>)[scale] ?? {}),
          ...shades,
        };
      }
    }
    return result;
  }, [config.customPrimitives]);

  // Theme control functions
  const setTheme = useCallback(
    (newTheme: 'light' | 'dark') => {
      if (!forcedTheme) {
        setUserTheme(newTheme);
      }
    },
    [forcedTheme]
  );

  const toggleTheme = useCallback(() => {
    if (!forcedTheme) {
      setUserTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }
  }, [forcedTheme]);

  // Context value
  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      isDark: theme === 'dark',
      isLight: theme === 'light',
      systemPreference,
      tokens,
      primitives,
      config,
    }),
    [
      theme,
      setTheme,
      toggleTheme,
      systemPreference,
      tokens,
      primitives,
      config,
    ]
  );

  return React.createElement(
    ThemeContext.Provider,
    { value: contextValue },
    children
  );
}

// ─── Hooks (RN) ───────────────────────────────────────────────────────────

/**
 * Access the current theme state and control functions.
 * **Must be used inside a `<ColorProvider>`.**
 *
 * @returns The full theme context value
 * @throws Error if used outside a ColorProvider
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useTheme() must be used within a <ColorProvider>. ' +
        'Wrap your component tree with <ColorProvider> to access theme context.'
    );
  }
  return context;
}

/**
 * Get the semantic color tokens for the current active theme.
 * **Must be used inside a `<ColorProvider>`.**
 */
export function useColorTokens(): SemanticColorTheme {
  return useTheme().tokens;
}

/**
 * Get the full primitive color palette.
 * **Must be used inside a `<ColorProvider>`.**
 */
export function usePrimitiveColors(): typeof primitiveColors {
  return useTheme().primitives;
}

/**
 * Get the resolved configuration object.
 * **Must be used inside a `<ColorProvider>`.**
 */
export function useColorConfig(): Required<ColorTokensConfig> {
  return useTheme().config;
}

/**
 * Get a single semantic token value by category and key path.
 * **Must be used inside a `<ColorProvider>`.**
 */
export function useToken(
  category: SemanticColorCategory,
  key: string
): string {
  const tokens = useColorTokens();
  const cat = tokens[category] as Record<string, string> | undefined;
  if (!cat || !(key in cat)) {
    console.warn(
      `[color-tokens] Token not found: ${category}.${key}. ` +
        `Available keys in "${category}": ${Object.keys(cat || {}).join(', ')}`
    );
    return '#000000';
  }
  return cat[key];
}

/**
 * Create a custom semantic theme with partial overrides.
 * Works the same on both web and React Native.
 */
export function createTheme(overrides: {
  light?: Partial<SemanticColorTheme>;
  dark?: Partial<SemanticColorTheme>;
}): { light: SemanticColorTheme; dark: SemanticColorTheme } {
  return {
    light: mergeTokens(lightSemanticColors, overrides.light ?? {}),
    dark: mergeTokens(darkSemanticColors, overrides.dark ?? {}),
  };
}
