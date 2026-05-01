# @laddhaanshul/color-tokens — Promotional Website

A professional, modern PHP website promoting the [`@laddhaanshul/color-tokens`](https://www.npmjs.com/package/@laddhaanshul/color-tokens) npm package — a universal color token system for React and React Native.

## Quick Start

Start the built-in PHP development server:

```bash
cd website
php -S localhost:8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

## Features

### Sections

| Section | Description |
|---------|-------------|
| **Hero** | Package name, tagline, install command with copy-to-clipboard, key stats |
| **Features** | 6 feature cards: cross-platform, light/dark mode, accessibility, TypeScript, zero deps, CSS/RN generators |
| **Color Palette** | Live preview of all 154+ primitive colors across 14 scales, filterable by color family, click-to-copy hex values |
| **Code Examples** | Tabbed code blocks showing React (web), React Native, and utility function usage |
| **Installation Guide** | Step-by-step guide to install and start using the package |

### Interactive Features

- **Theme toggle** — Switch between light and dark mode (persists via `localStorage`, respects system preference)
- **Copy to clipboard** — Click any color swatch or install command to copy
- **Palette filter** — Filter the color palette by color family
- **Tabbed code examples** — Switch between React, React Native, and utility examples
- **Smooth scrolling** — Navigation links scroll smoothly to sections
- **Mobile hamburger menu** — Responsive navigation for small screens
- **Active nav state** — Nav highlights the current section while scrolling

## File Structure

```
website/
├── index.php                # Main landing page
├── README.md                # This file
├── css/
│   └── style.css            # Modern responsive CSS with light/dark theming
├── js/
│   └── main.js              # Theme toggle, copy, smooth scroll, menu, filters
└── includes/
    ├── header.php           # Reusable HTML `<head>` + fixed header + nav
    ├── footer.php           # Reusable footer with links grid
    └── color-grid.php       # PHP color palette grid with all primitive tokens
```

## Customization

### Change package metadata

Edit `index.php` to update:
- Hero title and subtitle text
- Stats numbers
- Code examples
- Installation guide steps
- Footer links

### Change colors

The color palette in `includes/color-grid.php` contains hardcoded PHP arrays matching the `primitiveColors` from the npm package. To update colors, edit the `$primitiveColors` array.

### Change theme

CSS custom properties in `css/style.css` under `:root` (light) and `[data-theme="dark"]` (dark) control the website's own theme colors — separate from the npm package tokens displayed in the palette.

### Change GitHub / npm URLs

Search and replace `https://github.com/laddhaanshul/ColorToken` across all files with your actual repository URL.

### Add new pages

1. Create a new PHP file (e.g., `docs.php`)
2. Include `includes/header.php` at the top and `includes/footer.php` at the bottom
3. Pass a custom `$pageTitle` before the header include:

```php
<?php
$pageTitle = 'Documentation — @laddhaanshul/color-tokens';
require_once __DIR__ . '/includes/header.php';
?>
<!-- Your content here -->
<?php require_once __DIR__ . '/includes/footer.php'; ?>
```

## Requirements

- **PHP 7.4+** (uses `declare(strict_types=1)`)
- No database, no frameworks, no build step
- Works with PHP's built-in development server (`php -S`)

## License

MIT
