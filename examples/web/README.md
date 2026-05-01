# Web Example — React + Vite + TypeScript

A complete example project demonstrating how to use `@laddhaanshul/color-tokens` in a React web application built with Vite.

## Features Demonstrated

- **Primitive Color Swatches** — All 14 color scales rendered as interactive swatches
- **Semantic Palette** — Full semantic token display across all categories
- **CSS Variable Integration** — Tokens applied as CSS custom properties using `tokensToCssVars()`
- **Light/Dark Mode Toggle** — Runtime theme switching with smooth transitions
- **Status Colors** — Success, warning, error, and info color showcases
- **Brand Colors** — Interactive brand color cards with hover/active states
- **Chart Visualization** — Bar chart using chart series colors

## Getting Started

### Prerequisites

- Node.js 16+ and npm 7+
- The core package must be built first

### Installation

```bash
# From the repository root
cd packages/color-tokens
npm install
npm run build

cd ../../examples/web
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
web/
├── index.html          # Vite entry HTML
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite build configuration
└── src/
    ├── main.tsx        # React DOM render entry
    ├── App.tsx         # Main showcase component
    └── App.css         # Styles using CSS variables
```

## How It Works

1. `App.tsx` imports `lightSemanticColors` and `darkSemanticColors` from `@laddhaanshul/color-tokens`
2. A `useTheme` hook manages the current theme state (light or dark)
3. `tokensToCssVars()` converts the active token set to CSS custom properties
4. A `useEffect` applies these variables to `document.documentElement`
5. `App.css` references these variables using `var(--ct-*)` syntax
6. CSS `transition` properties create smooth theme-switching animations
