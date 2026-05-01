# React Native Example — Expo + TypeScript

A complete example project demonstrating how to use `@color-tokens/core` in a React Native application built with Expo.

## Features Demonstrated

- **Primitive Color Swatches** — All 22 color scales displayed in scrollable rows
- **Semantic Palette** — Themed cards showing semantic token categories
- **Theme Context** — Custom `ThemeProvider` and `useTheme()` hook for runtime theming
- **Light/Dark Mode** — Toggle between light and dark semantic tokens
- **Status Showcase** — Alert-style components using status colors
- **Brand Buttons** — Interactive buttons demonstrating brand color variants
- **Utility Functions** — `withOpacity`, `darken`, and `lighten` in action

## Getting Started

### Prerequisites

- Node.js 16+ and npm 7+
- Expo CLI (`npx expo`)
- The core package must be built first

### Installation

The monorepo uses npm workspaces. Install everything from the repository root:

```bash
# From the repository root
npm install                              # installs all workspace packages
cd packages/color-tokens && npm run build && cd ../..
```

### Running the App

```bash
npx expo start
```

This opens the Expo DevTools. Press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with the Expo Go app on your physical device.

### Building for Production

```bash
# Android
npx expo run:android

# iOS
npx expo run:ios
```

## Project Structure

```
react-native/
├── index.js                        # Metro entry point
├── package.json                    # Dependencies and Expo scripts
├── tsconfig.json                   # TypeScript configuration
├── metro.config.js                 # Metro resolver for monorepo
├── app.json                        # Expo app configuration
├── babel.config.js                 # Babel preset for Expo
└── src/
    ├── App.tsx                     # Main app component
    ├── theme/
    │   └── ThemeContext.tsx         # Theme provider and useTheme hook
    └── components/
        ├── ColorSwatch.tsx         # Reusable color swatch component
        ├── SemanticPalette.tsx     # Semantic token display cards
        └── StatusShowcase.tsx      # Status alert components
```

## How It Works

1. `App.tsx` wraps everything in `<ThemeProvider>` from `src/theme/ThemeContext.tsx`
2. `ThemeProvider` manages the active theme using React Context and React state
3. Components call `useTheme()` to access the current `colors` object and `isDark` flag
4. Color tokens are used directly as style property values in `StyleSheet.create()`
5. The `toggleTheme()` function swaps between `lightSemanticColors` and `darkSemanticColors`

## Notes on the react-native Package Field

The `package.json` of `@color-tokens/core` includes a `"react-native"` field that points to a dedicated native build (`dist/index.native.js`). Metro bundler automatically resolves this field before `"main"` and `"module"`, ensuring compatibility with React Native's module system. The native build excludes DOM-specific types to prevent type errors.

In the monorepo, `metro.config.js` configures Metro to resolve `@color-tokens/core` from the `packages/color-tokens` directory via `watchFolders` and `extraNodeModules`. This means you can import from `@color-tokens/core` exactly the same way in both web and React Native projects — the bundler handles platform-specific resolution transparently.
