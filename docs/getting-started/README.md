# Getting Started with @color-tokens/core

Welcome to the getting started guide for `@color-tokens/core`. This document walks you through the installation process, basic usage patterns, and project setup for both React web and React Native applications.

## Prerequisites

Before installing `@color-tokens/core`, ensure you have the following prerequisites in place:

- **Node.js** 16 or higher installed on your system
- **npm** 7 or higher, **yarn** 1.22 or higher, or **pnpm** 6 or higher as your package manager
- A **React** (16.8+) or **React Native** (0.60+) project set up and ready

## Installation

You can install `@color-tokens/core` using any of the major package managers. Open your terminal, navigate to your project root, and run one of the following commands:

```bash
# Using npm
npm install @color-tokens/core

# Using yarn
yarn add @color-tokens/core

# Using pnpm
pnpm add @color-tokens/core
```

Since `@color-tokens/core` has zero runtime dependencies, the installation process is fast and lightweight. The package ships with TypeScript type definitions bundled, so no separate `@types` package is needed.

### Installing from the monorepo (development)

If you are working in the color-tokens monorepo, the package is available via npm workspaces. Install everything from the repository root:

```bash
cd color-tokens-monorepo
npm install              # installs all workspace packages at once
cd packages/color-tokens && npm run build
```

## Verifying the Installation

After installation, you can verify that the package is correctly installed by checking your `package.json` file. You should see `@color-tokens/core` listed under `dependencies` with the installed version number. Additionally, you can create a quick test file to confirm the imports work as expected:

```tsx
import { primitiveColors, lightSemanticColors, withOpacity } from '@color-tokens/core';

console.log(primitiveColors.blue[500]); // '#3B82F6'
console.log(lightSemanticColors.brand.primary); // '#2563EB'
console.log(withOpacity('#3B82F6', 0.5)); // 'rgba(59, 130, 246, 0.5)'
```

## Basic Usage — React Web

In a React web application, the most common pattern is to apply color tokens as CSS custom properties. This allows you to use the same tokens in both your JavaScript/TypeScript code and your CSS stylesheets, creating a single source of truth for all colors in your application. The `tokensToCssVars` utility function handles the conversion from nested token objects to flat CSS variable declarations:

```tsx
import { useEffect } from 'react';
import { lightSemanticColors, tokensToCssVars } from '@color-tokens/core';

function App() {
  useEffect(() => {
    const vars = tokensToCssVars(lightSemanticColors, 'app');
    Object.entries(vars).forEach(([name, value]) => {
      document.documentElement.style.setProperty(`--${name}`, value);
    });
  }, []);

  return (
    <div style={{
      backgroundColor: 'var(--app-background-primary)',
      color: 'var(--app-foreground-primary)',
      minHeight: '100vh',
      padding: '2rem',
    }}>
      <h1>Hello, Color Tokens!</h1>
    </div>
  );
}
```

## Basic Usage — React Native

> **Monorepo note:** When running the React Native example inside the monorepo, make sure you run `npm install` from the repository root first. The `metro.config.js` in the example project ensures Metro can resolve `@color-tokens/core` from the monorepo's `packages/` directory.

React Native applications use `StyleSheet.create()`: for styling, which means CSS custom properties are not available. Instead, you apply the token values directly as style properties. The tokens are plain string values (hex colors), so they work perfectly with React Native's style system:

```tsx
import { StyleSheet, View, Text } from 'react-native';
import { lightSemanticColors } from '@color-tokens/core';

export default function App() {
  const colors = lightSemanticColors;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, Color Tokens!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightSemanticColors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: lightSemanticColors.foreground.primary,
  },
});
```

## Choosing Between Primitive and Semantic Tokens

The package provides two layers of color tokens: **primitive** and **semantic**. Understanding the difference is key to using the system effectively. Primitive tokens are raw color values organized in scales (50 through 950) for each hue family. They represent the complete palette of available colors and are intended for internal reference only. Semantic tokens, on the other hand, are meaningful aliases that map to primitive values. They express the *purpose* of a color in your UI, such as "brand primary" or "error text", and include separate light and dark mode variants. As a general rule, always prefer semantic tokens in your components and reserve primitive tokens for creating custom extensions or special cases.

## Next Steps

Now that you have the basics set up, explore these guides to go deeper:

- **[API Reference](../api/README.md)** — Complete documentation of all exported functions and types
- **[Theming Guide](../theming/README.md)** — Implementing light/dark mode switching in your application
- **[React Native Guide](../react-native/README.md)** — Advanced patterns for React Native and Expo projects
