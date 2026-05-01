<?php declare(strict_types=1);
/**
 * @laddhaanshul/color-tokens — Reusable Header Component
 */
?>
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= $pageTitle ?? '@laddhaanshul/color-tokens — Universal Color Token System' ?></title>
  <meta name="description" content="Universal color token system for React and React Native. Primitive and semantic tokens with full light/dark mode support, zero dependencies.">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>">
  <link rel="stylesheet" href="<?= $baseUrl ?? '.' ?>/css/style.css">
  <?php if (isset($extraCss)): ?>
    <style><?= $extraCss ?></style>
  <?php endif; ?>
</head>
<body>

  <!-- ─── Header / Navigation ──────────────────────────────── -->
  <header class="site-header" id="site-header">
    <div class="container header-inner">
      <a href="<?= $baseUrl ?? '.' ?>" class="logo" aria-label="color-tokens home">
        <span class="logo-icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="5" fill="#3B82F6"/>
            <circle cx="24" cy="8" r="5" fill="#A855F7"/>
            <circle cx="8" cy="24" r="5" fill="#22C55E"/>
            <circle cx="24" cy="24" r="5" fill="#F97316"/>
          </svg>
        </span>
        <span class="logo-text">@laddhaanshul/color-tokens</span>
      </a>

      <nav class="main-nav" id="main-nav" aria-label="Main navigation">
        <ul class="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#palette">Palette</a></li>
          <li><a href="#examples">Examples</a></li>
          <li><a href="#install">Install</a></li>
        </ul>
      </nav>

      <div class="header-actions">
        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">
          <svg class="icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg class="icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>

        <a href="https://github.com/laddhaanshul/ColorToken" class="github-link" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>

        <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <main>
