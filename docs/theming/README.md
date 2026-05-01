# Theming Guide

This guide covers how to implement light and dark mode theming in your React and React Native applications using `@color-tokens/core`.

## Understanding Light and Dark Modes

`@color-tokens/core` provides two complete semantic token sets: `lightSemanticColors` and `darkSemanticColors`. Each set contains identical key structures but with values tuned for their respective background luminance. Dark mode tokens use lighter colors for elements that need to stand out, and darker colors for surfaces and backgrounds. The two sets are designed so you can swap between them instantly without changing any component logic.

## React Web — CSS Variables Approach

> **Monorepo setup:** When developing inside the color-tokens monorepo, install dependencies from the repository root using `npm install`. This uses npm workspaces to link all packages together.

The recommended approach for web applications is to use CSS custom properties. This method allows your theme to propagate through both JavaScript-controlled styles and pure CSS stylesheets, providing maximum flexibility. The pattern involves converting your token set to CSS variables and applying them to the root element:

```tsx
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  lightSemanticColors,
  darkSemanticColors,
  tokensToCssVars,
  type SemanticColorTheme,
} from '@color-tokens/core';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  colors: SemanticColorTheme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  colors: lightSemanticColors,
  toggleTheme: () => {},
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme;
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const colors = theme === 'light' ? lightSemanticColors : darkSemanticColors;

  useEffect(() => {
    const cssVars = tokensToCssVars(colors, 'app');
    const root = document.documentElement;

    Object.entries(cssVars).forEach(([name, value]) => {
      root.style.setProperty(`--${name}`, value);
    });

    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme, colors]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const value = useMemo(() => ({ theme, colors, toggleTheme, setTheme }), [theme, colors, toggleTheme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
```

## React Web — CSS Stylesheet Integration

Once the CSS variables are applied to the root element, you can reference them in your CSS files using the `var()` function. This approach works particularly well when you have a mix of JavaScript-driven components and pure CSS styles:

```css
/* Your global styles or component CSS */
:root {
  --transition-speed: 0.2s;
  transition: background-color var(--transition-speed) ease,
              color var(--transition-speed) ease;
}

.card {
  background-color: var(--app-surface-default);
  border: 1px solid var(--app-border-default);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px var(--app-shadow-default);
}

.card:hover {
  box-shadow: 0 4px 6px var(--app-shadow-medium);
  border-color: var(--app-border-strong);
}

.btn-primary {
  background-color: var(--app-brand-primary);
  color: var(--app-foreground-onPrimary);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--app-brand-primaryHover);
}

.alert-error {
  background-color: var(--app-status-errorSubtle);
  border-left: 4px solid var(--app-status-error);
  color: var(--app-status-errorText);
  padding: 1rem;
  border-radius: 4px;
}
```

## React Native — Context-Based Theming

React Native does not support CSS custom properties, so theming is implemented through React Context. Each component accesses the current theme through a custom hook, and the theme provider manages the active token set. Here is a complete implementation pattern:

```tsx
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  Appearance,
} from 'react';
import {
  lightSemanticColors,
  darkSemanticColors,
  type SemanticColorTheme,
} from '@color-tokens/core';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  isDark: boolean;
  colors: SemanticColorTheme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  isDark: false,
  colors: lightSemanticColors,
  themeMode: 'system',
  setThemeMode: () => {},
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');

  const resolvedTheme: 'light' | 'dark' = useMemo(() => {
    if (themeMode !== 'system') return themeMode;
    return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
  }, [themeMode]);

  const isDark = resolvedTheme === 'dark';
  const colors = isDark ? darkSemanticColors : lightSemanticColors;

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeModeState((prev) => {
      if (prev === 'system') {
        return isDark ? 'light' : 'dark';
      }
      return prev === 'light' ? 'dark' : 'light';
    });
  }, [isDark]);

  const value = useMemo(
    () => ({ isDark, colors, themeMode, setThemeMode, toggleTheme }),
    [isDark, colors, themeMode, setThemeMode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
```

## System Theme Detection

For applications that want to respect the user's operating system preference, both web and React Native provide APIs for detecting the current color scheme. On the web, use `window.matchMedia('(prefers-color-scheme: dark)')` combined with a change event listener. In React Native, use the `Appearance` API from `react-native`. Both approaches allow your application to automatically switch between light and dark mode when the user changes their system settings, providing a seamless experience.

## Best Practices

When implementing theming in your application, follow these guidelines for the best developer and user experience. First, always use semantic tokens rather than primitive tokens in your components. This ensures that your UI responds correctly to theme changes without any per-component logic. Second, store the user's theme preference in persistent storage (localStorage on web, AsyncStorage on React Native) so it survives page reloads and app restarts. Third, default to the system theme preference when no explicit choice has been made. Fourth, avoid hardcoding color values anywhere in your components — always reference the token system. Fifth, use CSS transitions on web to create smooth visual transitions when switching between light and dark modes.
