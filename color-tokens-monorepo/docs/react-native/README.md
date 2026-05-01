# React Native Guide

Advanced patterns and best practices for using `@color-tokens/core` in React Native and Expo projects.

## How the react-native Entry Point Works

When Metro bundler resolves imports for `@color-tokens/core`, it checks the `"react-native"` field in `package.json` before the `"main"` and `"module"` fields. This field points to `dist/index.native.js`, which is built without DOM-specific types (no `"DOM"` in the `lib` compiler option). This prevents potential issues with Metro's module resolution and ensures type compatibility. The native build re-exports everything from the main build, so the API is identical between platforms.

## Expo Setup

Using `@color-tokens/core` with Expo in the monorepo requires no special configuration beyond installing dependencies from the repository root and building the core package. The included `metro.config.js` handles module resolution automatically:

```bash
# From the monorepo root
npm install                              # install all workspaces
cd packages/color-tokens && npm run build && cd ../..
cd examples/react-native && npx expo start
```

The `metro.config.js` configures Metro with:
- `watchFolders` pointing to the monorepo root so HMR picks up changes
- `nodeModulesPaths` for both the example's and root's `node_modules`
- `extraNodeModules` mapping `@color-tokens/core` to `packages/color-tokens`

## Platform-Specific Considerations

React Native uses a subset of CSS color formats. The following formats are supported:

- **Hex:** `#RRGGBB` and `#RGB` — fully supported and recommended
- **RGBA:** `rgba(r, g, b, a)` — fully supported, returned by `withOpacity()` and `hexToRgba()`
- **Named colors:** `'red'`, `'blue'`, `'transparent'` — fully supported
- **HSL/HSLA:** Not natively supported in React Native styles (avoid)

The `primitiveColors` and semantic color tokens use exclusively hex and hex-with-alpha formats, ensuring full compatibility. The utility functions `withOpacity()` and `hexToRgba()` return RGBA strings which are also fully supported.

## StyleSheet Integration

The recommended pattern for using color tokens with React Native's `StyleSheet.create()` is to define your styles at the module level and reference tokens directly. Since token values are static strings, they work perfectly as style property values:

```tsx
import { StyleSheet } from 'react-native';
import { lightSemanticColors, withOpacity } from '@color-tokens/core';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: lightSemanticColors.background.primary,
    flex: 1,
  },
  card: {
    backgroundColor: lightSemanticColors.surface.default,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: lightSemanticColors.border.default,
    padding: 16,
    shadowColor: lightSemanticColors.shadow.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    color: lightSemanticColors.foreground.primary,
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    backgroundColor: lightSemanticColors.brand.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonPressed: {
    backgroundColor: lightSemanticColors.brand.primaryActive,
  },
  badge: {
    backgroundColor: withOpacity(lightSemanticColors.status.error, 0.1),
    borderColor: lightSemanticColors.status.errorBorder,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: lightSemanticColors.status.errorText,
    fontSize: 12,
  },
});
```

## Dynamic Theming with UseTheme Hook

For applications that need to switch between light and dark mode at runtime, create a custom hook that wraps the theme context. The hook should return the current color set and helper functions for toggling the theme. Components can then call `useTheme()` and reference `colors.brand.primary` instead of hardcoded `lightSemanticColors.brand.primary`, enabling automatic theme updates:

```tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from './theme/ThemeContext';

function ThemedCard({ title, description }: { title: string; description: string }) {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface.default, borderColor: colors.border.default }]}>
      <Text style={[styles.title, { color: colors.foreground.primary }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.foreground.secondary }]}>{description}</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.brand.primary }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.buttonText, { color: colors.foreground.onPrimary }]}>
          Switch to {isDark ? 'Light' : 'Dark'} Mode
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

## Accessibility in React Native

React Native provides built-in accessibility props that work with color tokens. When building accessible components, use the `accessibilityLabel` prop alongside proper color contrast. The `meetsWcagAA()` utility can help you verify that your text-to-background contrast ratios meet accessibility standards:

```tsx
import { View, Text } from 'react-native';
import { lightSemanticColors, meetsWcagAA } from '@color-tokens/core';

function InfoBanner() {
  const textColor = lightSemanticColors.status.infoText;
  const bgColor = lightSemanticColors.status.infoSubtle;
  const isAccessible = meetsWcagAA(textColor, bgColor);

  return (
    <View
      style={{ backgroundColor: bgColor, padding: 12 }}
      accessibilityLabel={isAccessible ? 'Information banner' : 'Low contrast information banner'}
    >
      <Text style={{ color: textColor }}>This is an informational message.</Text>
    </View>
  );
}
```

## Performance Tips

When using color tokens in React Native, keep these performance considerations in mind. Token objects are created at module load time, so importing them does not create new objects on each render. You can safely use token values directly in `StyleSheet.create()` without memoization concerns. However, if you are creating a theme context that switches between light and dark tokens, wrap the context value in `useMemo` to prevent unnecessary re-renders of consuming components. Avoid creating inline style objects that reference `useTheme()` on every render — instead, use a `useStyles` hook that memoizes the returned styles object.
