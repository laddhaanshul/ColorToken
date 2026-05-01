/**
 * ColorProvider — Web (React) Implementation
 *
 * Provides a React context for managing color themes across your application.
 * Supports light/dark mode, system preference detection, CSS variable injection,
 * custom token overrides, and convenient hooks for accessing tokens in components.
 *
 * @example
 * ```tsx
 * import { ColorProvider, useTheme, useColorTokens } from '@color-tokens/core';
 *
 * function App() {
 *   return (
 *     <ColorProvider defaultTheme="system" config={{ injectCssVars: true }}>
 *       <MyComponent />
 *     </ColorProvider>
 *   );
 * }
 *
 * function MyComponent() {
 *   const { theme, toggleTheme, isDark } = useTheme();
 *   const tokens = useColorTokens();
 *   return (
 *     <div style={{ backgroundColor: tokens.background.primary, color: tokens.foreground.primary }}>
 *       <h1>Current theme: {theme}</h1>
 *       <button onClick={toggleTheme}>Toggle ({isDark ? 'Dark' : 'Light'})</button>
 *     </div>
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
  useRef,
} from 'react';

import { primitiveColors, lightSemanticColors, darkSemanticColors } from '../tokens';
import type { SemanticColorTheme, SemanticColorCategory } from '../tokens';
import { resolveConfig, defaultConfig } from '../config';
import type { ColorTokensConfig } from '../config';
import { tokensToCssVars } from '../utils';

import type { ColorProviderProps, ThemeContextValue } from './types';

export type { ColorProviderProps, ThemeContextValue } from './types';

// ─── Context ──────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ─── Helper: Get System Preference (Web) ──────────────────────────────────

function getSystemPreference(): 'light' | 'dark' {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return 'light';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

// ─── Helper: Inject CSS Variables ─────────────────────────────────────────

/**
 * Inject CSS custom properties onto the document root element.
 * Each token becomes `--{prefix}-{category}-{key}`.
 *
 * @param tokens - The semantic color theme to inject
 * @param prefix - Variable name prefix (from config.cssVarPrefix)
 */
function injectCssVariables(tokens: SemanticColorTheme, prefix: string): void {
  if (typeof document === 'undefined') return;

  const vars = tokensToCssVars(tokens, prefix);
  const root = document.documentElement;

  for (const [varName, value] of Object.entries(vars)) {
    root.style.setProperty(`--${varName}`, value);
  }
}

/**
 * Remove all CSS custom properties matching the given prefix.
 *
 * @param prefix - The prefix to match and remove
 */
function removeCssVariables(prefix: string): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const style = root.style;
  const propsToRemove: string[] = [];

  for (let i = 0; i < style.length; i++) {
    const propName = style[i];
    if (propName.startsWith(`--${prefix}`)) {
      propsToRemove.push(propName);
    }
  }

  propsToRemove.forEach((prop) => root.style.removeProperty(prop));
}

// ─── Helper: Deep Merge Tokens ────────────────────────────────────────────

/**
 * Deep-merge custom overrides onto the base semantic tokens.
 * Only merges at the leaf level (string values).
 */
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

// ─── ColorProvider Component ──────────────────────────────────────────────

/**
 * Theme provider component that wraps your application (or a subtree)
 * and provides color tokens and theme management via React context.
 *
 * **Features:**
 * - Light/dark/system theme modes
 * - System preference detection with live updates
 * - CSS custom property injection for web
 * - Custom token overrides via config
 * - SSR-safe (defaults to 'light' on server)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ColorProvider>
 *   <App />
 * </ColorProvider>
 *
 * // With dark mode default
 * <ColorProvider defaultTheme="dark">
 *   <App />
 * </ColorProvider>
 *
 * // With CSS variables and custom brand color
 * <ColorProvider config={{
 *   injectCssVars: true,
 *   cssVarPrefix: 'app',
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
    getSystemPreference
  );

  const [userTheme, setUserTheme] = useState<'light' | 'dark' | undefined>(
    undefined
  );

  const prevVarsPrefix = useRef<string | null>(null);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handler = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
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

  // Inject / update CSS variables
  useEffect(() => {
    if (!config.injectCssVars) return;

    // Remove old variables if prefix changed
    if (prevVarsPrefix.current && prevVarsPrefix.current !== config.cssVarPrefix) {
      removeCssVariables(prevVarsPrefix.current);
    }
    prevVarsPrefix.current = config.cssVarPrefix;

    injectCssVariables(tokens, config.cssVarPrefix);

    return () => {
      removeCssVariables(config.cssVarPrefix);
      prevVarsPrefix.current = null;
    };
  }, [tokens, config.injectCssVars, config.cssVarPrefix]);

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

// ─── Hooks ────────────────────────────────────────────────────────────────

/**
 * Access the current theme state and control functions.
 *
 * **Must be used inside a `<ColorProvider>`.**
 *
 * @returns The full theme context value
 * @throws Error if used outside a ColorProvider
 *
 * @example
 * ```tsx
 * function Header() {
 *   const { theme, toggleTheme, isDark, tokens } = useTheme();
 *   return (
 *     <header
 *       style={{
 *         background: tokens.background.primary,
 *         color: tokens.foreground.primary,
 *       }}
 *     >
 *       <button onClick={toggleTheme}>
 *         {isDark ? 'Light' : 'Dark'}
 *       </button>
 *     </header>
 *   );
 * }
 * ```
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
 *
 * A convenience wrapper around `useTheme().tokens`.
 *
 * **Must be used inside a `<ColorProvider>`.**
 *
 * @returns Semantic color tokens for the active theme
 *
 * @example
 * ```tsx
 * function Card() {
 *   const tokens = useColorTokens();
 *   return (
 *     <div style={{
 *       background: tokens.surface.default,
 *       border: `1px solid ${tokens.border.default}`,
 *       padding: 16,
 *     }}>
 *       <h2 style={{ color: tokens.foreground.primary }}>Card Title</h2>
 *     </div>
 *   );
 * }
 * ```
 */
export function useColorTokens(): SemanticColorTheme {
  return useTheme().tokens;
}

/**
 * Get the full primitive color palette (all 22 color scales x 11 shades).
 *
 * A convenience wrapper around `useTheme().primitives`.
 *
 * **Must be used inside a `<ColorProvider>`.**
 *
 * @returns All primitive color scales
 *
 * @example
 * ```tsx
 * function ColorSwatch({ name, shade }: { name: string; shade: number }) {
 *   const primitives = usePrimitiveColors();
 *   const scale = primitives[name as keyof typeof primitives];
 *   const color = scale && typeof scale === 'object' ? scale[shade as 50] : '#ccc';
 *   return <div style={{ background: color, width: 48, height: 48 }} />;
 * }
 * ```
 */
export function usePrimitiveColors(): typeof primitiveColors {
  return useTheme().primitives;
}

/**
 * Get the resolved configuration object.
 *
 * A convenience wrapper around `useTheme().config`.
 *
 * **Must be used inside a `<ColorProvider>`.**
 *
 * @returns The resolved ColorTokensConfig with defaults applied
 *
 * @example
 * ```tsx
 * function ThemeInfo() {
 *   const config = useColorConfig();
 *   return <span>CSS prefix: {config.cssVarPrefix}</span>;
 * }
 * ```
 */
export function useColorConfig(): Required<ColorTokensConfig> {
  return useTheme().config;
}

/**
 * Get a single semantic token value by category and key path.
 *
 * **Must be used inside a `<ColorProvider>`.**
 *
 * @param category - The semantic category (e.g., `'brand'`, `'status'`, `'border'`)
 * @param key - The key within the category (e.g., `'primary'`, `'error'`, `'default'`)
 * @returns The hex color string for the requested token
 *
 * @example
 * ```tsx
 * function Badge() {
 *   const bgColor = useToken('status', 'successSubtle');
 *   const textColor = useToken('status', 'successText');
 *   return (
 *     <span style={{ background: bgColor, color: textColor }}>Active</span>
 *   );
 * }
 * ```
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
 * Useful for generating themed variants or for pre-computing tokens
 * outside of the provider context.
 *
 * @param overrides - Partial overrides for light and/or dark themes
 * @returns Resolved light and dark theme objects
 *
 * @example
 * ```tsx
 * import { createTheme, lightSemanticColors, darkSemanticColors } from '@color-tokens/core';
 *
 * const { light, dark } = createTheme({
 *   light: { brand: { primary: '#0066FF' } },
 *   dark: { brand: { primary: '#3388FF' } },
 * });
 *
 * // light.brand.primary === '#0066FF'
 * // light.brand.primaryHover === '...' (unchanged from default)
 * ```
 */
export function createTheme(overrides: {
  light?: Partial<SemanticColorTheme>;
  dark?: Partial<SemanticColorTheme>;
}): { light: SemanticColorTheme; dark: SemanticColorTheme } {
  function mergeTokens(
    base: SemanticColorTheme,
    partial: Partial<SemanticColorTheme>
  ): SemanticColorTheme {
    const result = { ...base };
    for (const category of Object.keys(partial) as (keyof SemanticColorTheme)[]) {
      const overrideCat = partial[category];
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

  return {
    light: mergeTokens(lightSemanticColors, overrides.light ?? {}),
    dark: mergeTokens(darkSemanticColors, overrides.dark ?? {}),
  };
}
