import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import {
  lightSemanticColors,
  darkSemanticColors,
  type SemanticColorTheme,
} from '@laddhaanshul/color-tokens';

// ─── Types ──────────────────────────────────────────────────

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  /** Current resolved theme ('light' or 'dark') */
  resolvedTheme: 'light' | 'dark';
  /** User preference setting ('light', 'dark', or 'system') */
  themeMode: ThemeMode;
  /** Semantic color tokens for the resolved theme */
  colors: SemanticColorTheme;
  /** Toggle between light and dark (skips 'system') */
  toggleTheme: () => void;
  /** Set an explicit theme mode */
  setThemeMode: (mode: ThemeMode) => void;
  /** Whether the current resolved theme is dark */
  isDark: boolean;
}

// ─── Context ────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ─── Provider ───────────────────────────────────────────────

interface ThemeProviderProps {
  children: React.ReactNode;
  /** Override the initial theme mode (default: 'system') */
  initialMode?: ThemeMode;
}

export function ThemeProvider({ children, initialMode = 'system' }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme() ?? 'light';
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialMode);

  const resolvedTheme: 'light' | 'dark' =
    themeMode === 'system' ? systemColorScheme : themeMode;

  const colors: SemanticColorTheme = useMemo(
    () => (resolvedTheme === 'dark' ? darkSemanticColors : lightSemanticColors),
    [resolvedTheme],
  );

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = useCallback(() => {
    setThemeMode((prev) => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'dark';
      // 'system' → resolve and toggle
      return systemColorScheme === 'dark' ? 'light' : 'dark';
    });
  }, [systemColorScheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      resolvedTheme,
      themeMode,
      colors,
      toggleTheme,
      setThemeMode,
      isDark,
    }),
    [resolvedTheme, themeMode, colors, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ─── Hook ───────────────────────────────────────────────────

/**
 * Access the current theme context.
 *
 * @example
 * ```tsx
 * const { colors, isDark, toggleTheme } = useTheme();
 *
 * return (
 *   <View style={{ backgroundColor: colors.background.primary }}>
 *     <Text style={{ color: colors.foreground.primary }}>
 *       {isDark ? 'Dark' : 'Light'} mode
 *     </Text>
 *   </View>
 * );
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a <ThemeProvider>.');
  }
  return context;
}
