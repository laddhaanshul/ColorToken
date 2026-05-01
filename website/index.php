<?php declare(strict_types=1);
/**
 * @laddhaanshul/color-tokens — Promotional Website
 * Main landing page
 */

$baseUrl = '.';
$pageTitle = '@laddhaanshul/color-tokens — Universal Color Token System for React & React Native';

require_once __DIR__ . '/includes/header.php';
?>

<!-- ─── Hero Section ────────────────────────────────────────── -->
<section class="hero" id="hero">
  <div class="container">
    <div class="hero-badge">
      <span class="badge-dot"></span>
      v1.0.0 &middot; MIT License &middot; Zero Dependencies
    </div>

    <h1>
      Beautiful Color Tokens<br>
      for <span class="gradient-text">React &amp; React Native</span>
    </h1>

    <p class="hero-subtitle">
      A universal, type-safe color token system with primitive &amp; semantic scales,
      full light/dark mode support, and built-in accessibility utilities.
    </p>

    <div class="hero-actions">
      <div class="install-block">
        <code>$ npm install @laddhaanshul/color-tokens</code>
        <button class="copy-btn" aria-label="Copy install command">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          Copy
        </button>
      </div>
    </div>

    <div class="hero-stats">
      <div class="stat">
        <span class="stat-value">14</span>
        <span class="stat-label">Color Scales</span>
      </div>
      <div class="stat">
        <span class="stat-value">154+</span>
        <span class="stat-label">Primitive Colors</span>
      </div>
      <div class="stat">
        <span class="stat-value">80+</span>
        <span class="stat-label">Semantic Tokens</span>
      </div>
      <div class="stat">
        <span class="stat-value">0</span>
        <span class="stat-label">Dependencies</span>
      </div>
    </div>
  </div>
</section>

<!-- ─── Features Section ────────────────────────────────────── -->
<section class="features" id="features">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Why @laddhaanshul/color-tokens?</h2>
      <p class="section-subtitle">
        Everything you need for consistent, accessible color systems across web and mobile.
      </p>
    </div>

    <div class="features-grid">
      <!-- Feature 1 -->
      <div class="feature-card">
        <div class="feature-icon blue" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        </div>
        <h3>Cross-Platform Tokens</h3>
        <p>
          One token set for React (web) and React Native (mobile). The package ships separate entry points
          for each platform with zero runtime platform detection.
        </p>
      </div>

      <!-- Feature 2 -->
      <div class="feature-card">
        <div class="feature-icon purple" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7E22CE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </div>
        <h3>Light &amp; Dark Mode</h3>
        <p>
          Complete semantic token sets for both light and dark themes.
          Swap themes instantly by selecting the right token set &mdash; no color calculation at runtime.
        </p>
      </div>

      <!-- Feature 3 -->
      <div class="feature-card">
        <div class="feature-icon green" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
        <h3>WCAG Accessibility</h3>
        <p>
          Built-in <code>meetsWcagAA()</code>, <code>getContrastRatio()</code>, and <code>getLuminance()</code>
          utilities ensure your color choices are accessible to everyone.
        </p>
      </div>

      <!-- Feature 4 -->
      <div class="feature-card">
        <div class="feature-icon orange" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C2410C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
          </svg>
        </div>
        <h3>Full TypeScript</h3>
        <p>
          100% TypeScript with exported types for <code>PrimitiveColorScale</code>,
          <code>ColorShade</code>, <code>SemanticColorTheme</code>, and every utility function.
        </p>
      </div>

      <!-- Feature 5 -->
      <div class="feature-card">
        <div class="feature-icon red" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="21" x2="9" y2="9"/>
          </svg>
        </div>
        <h3>Zero Dependencies</h3>
        <p>
          No runtime dependencies at all. The entire package is pure TypeScript that compiles
          to minimal JavaScript &mdash; just color values and utility functions.
        </p>
      </div>

      <!-- Feature 6 -->
      <div class="feature-card">
        <div class="feature-icon indigo" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4338CA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3v18"/>
            <rect x="4" y="8" width="16" height="8" rx="1"/>
          </svg>
        </div>
        <h3>CSS &amp; RN Style Generators</h3>
        <p>
          Use <code>tokensToCssVars()</code> to generate CSS custom properties, or
          <code>tokensToReactNativeStyles()</code> for StyleSheet-compatible objects.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ─── Color Palette Section ───────────────────────────────── -->
<?php require_once __DIR__ . '/includes/color-grid.php'; ?>

<!-- ─── Code Examples Section ───────────────────────────────── -->
<section class="examples" id="examples">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Code Examples</h2>
      <p class="section-subtitle">
        Simple, type-safe API that works the same on web and mobile.
      </p>
    </div>

    <div class="example-tabs">
      <button class="example-tab active" data-target="example-react">React (Web)</button>
      <button class="example-tab" data-target="example-rn">React Native</button>
      <button class="example-tab" data-target="example-utils">Utilities</button>
    </div>

    <!-- React Web Example -->
    <div class="example-panel active" id="example-react">
      <div class="code-block">
        <div class="code-block-header">
          <span class="code-block-lang">tsx</span>
          <button class="code-copy-btn" aria-label="Copy code">Copy</button>
        </div>
        <pre><span class="hl-kw">import</span> {
  lightSemanticColors,
  darkSemanticColors,
  primitiveColors,
  withOpacity,
  tokensToCssVars
} <span class="hl-kw">from</span> <span class="hl-str">'@laddhaanshul/color-tokens'</span>;

<span class="hl-cm">// Apply semantic tokens as CSS custom properties</span>
<span class="hl-kw">const</span> <span class="hl-const">cssVars</span> = <span class="hl-fn">tokensToCssVars</span>(lightSemanticColors, <span class="hl-str">'ct'</span>);
<span class="hl-cm">// → { 'ct-background-primary': '#FFFFFF', ... }</span>

<span class="hl-cm">// Use in your component</span>
<span class="hl-kw">function</span> <span class="hl-fn">App</span>({ theme }) {
  <span class="hl-kw">const</span> colors = theme === <span class="hl-str">'dark'</span> ? darkSemanticColors : lightSemanticColors;

  <span class="hl-kw">return</span> (
    <span class="hl-tag">&lt;div</span> <span class="hl-attr">style</span>={<span class="hl-const">{</span>
      backgroundColor: colors.background.primary,
      color: colors.foreground.primary,
    <span class="hl-const">}}</span><span class="hl-tag">&gt;</span>
      <span class="hl-tag">&lt;button</span> <span class="hl-attr">style</span>={<span class="hl-const">{</span>
        backgroundColor: colors.brand.primary,
        color: colors.foreground.onPrimary,
        boxShadow: <span class="hl-str">`0 0 0 3px ${<span class="hl-fn">withOpacity</span>(colors.brand.primary, <span class="hl-num">0.3</span>)}`</span>,
      <span class="hl-const">}}</span><span class="hl-tag">&gt;</span>
        Get Started
      <span class="hl-tag">&lt;/button&gt;</span>
      <span class="hl-tag">&lt;span</span> <span class="hl-attr">style</span>={<span class="hl-const">{</span> color: colors.status.success <span class="hl-const">}}</span><span class="hl-tag">&gt;</span>
        All systems operational
      <span class="hl-tag">&lt;/span&gt;</span>
    <span class="hl-tag">&lt;/div&gt;</span>
  );
}</pre>
      </div>
    </div>

    <!-- React Native Example -->
    <div class="example-panel" id="example-rn">
      <div class="code-block">
        <div class="code-block-header">
          <span class="code-block-lang">tsx</span>
          <button class="code-copy-btn" aria-label="Copy code">Copy</button>
        </div>
        <pre><span class="hl-kw">import</span> {
  lightSemanticColors,
  darkSemanticColors,
  withOpacity,
  tokensToReactNativeStyles,
  meetsWcagAA
} <span class="hl-kw">from</span> <span class="hl-str">'@laddhaanshul/color-tokens'</span>;

<span class="hl-cm">// Convert tokens to flat RN-compatible styles</span>
<span class="hl-kw">const</span> <span class="hl-const">rnStyles</span> = <span class="hl-fn">tokensToReactNativeStyles</span>(lightSemanticColors);
<span class="hl-cm">// → { 'background.primary': '#FFFFFF', ... }</span>

<span class="hl-cm">// Verify accessibility before rendering</span>
<span class="hl-kw">const</span> <span class="hl-const">isAccessible</span> = <span class="hl-fn">meetsWcagAA</span>(
  lightSemanticColors.status.errorText,
  lightSemanticColors.status.errorSubtle
);
<span class="hl-cm">// → true</span>

<span class="hl-kw">function</span> <span class="hl-fn">AlertBanner</span>({ message }) {
  <span class="hl-kw">return</span> (
    <span class="hl-tag">&lt;View</span> <span class="hl-attr">style</span>={<span class="hl-const">{</span>
      backgroundColor: lightSemanticColors.status.errorSubtle,
      borderColor: lightSemanticColors.status.errorBorder,
      borderWidth: <span class="hl-num">1</span>,
      borderRadius: <span class="hl-num">8</span>,
      padding: <span class="hl-num">12</span>,
    <span class="hl-const">}}</span><span class="hl-tag">&gt;</span>
      <span class="hl-tag">&lt;Text</span> <span class="hl-attr">style</span>={<span class="hl-const">{</span>
        color: lightSemanticColors.status.errorText,
        fontSize: <span class="hl-num">14</span>,
      <span class="hl-const">}}</span><span class="hl-tag">&gt;</span>
        {message}
      <span class="hl-tag">&lt;/Text&gt;</span>
    <span class="hl-tag">&lt;/View&gt;</span>
  );
}</pre>
      </div>
    </div>

    <!-- Utilities Example -->
    <div class="example-panel" id="example-utils">
      <div class="code-block">
        <div class="code-block-header">
          <span class="code-block-lang">ts</span>
          <button class="code-copy-btn" aria-label="Copy code">Copy</button>
        </div>
        <pre><span class="hl-kw">import</span> {
  hexToRgb,
  hexToRgba,
  withOpacity,
  darken,
  lighten,
  isHexColor,
  getLuminance,
  getContrastRatio,
  meetsWcagAA
} <span class="hl-kw">from</span> <span class="hl-str">'@laddhaanshul/color-tokens'</span>;

<span class="hl-cm">// Color conversion</span>
<span class="hl-fn">hexToRgb</span>(<span class="hl-str">'#3B82F6'</span>);
<span class="hl-cm">// → { r: 59, g: 130, b: 246 }</span>

<span class="hl-fn">hexToRgba</span>(<span class="hl-str">'#3B82F6'</span>, <span class="hl-num">0.5</span>);
<span class="hl-cm">// → 'rgba(59, 130, 246, 0.5)'</span>

<span class="hl-cm">// Color manipulation</span>
<span class="hl-fn">withOpacity</span>(<span class="hl-str">'#EF4444'</span>, <span class="hl-num">0.15</span>);
<span class="hl-cm">// → 'rgba(239, 68, 68, 0.15)'</span>

<span class="hl-fn">darken</span>(<span class="hl-str">'#3B82F6'</span>, <span class="hl-num">20</span>);
<span class="hl-cm">// → '#2e69c4'</span>

<span class="hl-fn">lighten</span>(<span class="hl-str">'#3B82F6'</span>, <span class="hl-num">20</span>);
<span class="hl-cm">// → '#7aa5f8'</span>

<span class="hl-cm">// Validation</span>
<span class="hl-fn">isHexColor</span>(<span class="hl-str">'#3B82F6'</span>);
<span class="hl-cm">// → true</span>

<span class="hl-cm">// Accessibility</span>
<span class="hl-fn">getContrastRatio</span>(<span class="hl-str">'#000000'</span>, <span class="hl-str">'#FFFFFF'</span>);
<span class="hl-cm">// → 21</span>

<span class="hl-fn">meetsWcagAA</span>(<span class="hl-str">'#111827'</span>, <span class="hl-str">'#FFFFFF'</span>);
<span class="hl-cm">// → true (contrast ratio: 17.4)</span>

<span class="hl-fn">meetsWcagAA</span>(<span class="hl-str">'#6B7280'</span>, <span class="hl-str">'#FFFFFF'</span>);
<span class="hl-cm">// → false (contrast ratio: 3.95, needs 4.5)</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- ─── Installation Guide ──────────────────────────────────── -->
<section class="install-section" id="install">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Get Started</h2>
      <p class="section-subtitle">
        Install and start using color tokens in under a minute.
      </p>
    </div>

    <div class="install-guide">
      <!-- Step 1 -->
      <div class="install-step">
        <div class="step-number">1</div>
        <div class="step-content">
          <h3>Install the package</h3>
          <p>Use npm, yarn, or pnpm &mdash; whatever your project uses.</p>
          <pre><code>npm install @laddhaanshul/color-tokens
# or
yarn add @laddhaanshul/color-tokens
# or
pnpm add @laddhaanshul/color-tokens</code></pre>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="install-step">
        <div class="step-number">2</div>
        <div class="step-content">
          <h3>Import tokens</h3>
          <p>
            Import what you need. The package tree-shakes cleanly so you only
            ship the tokens and utilities you actually use.
          </p>
          <pre><code>import {
  primitiveColors,
  lightSemanticColors,
  darkSemanticColors
} from '@laddhaanshul/color-tokens';</code></pre>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="install-step">
        <div class="step-number">3</div>
        <div class="step-content">
          <h3>Use in your components</h3>
          <p>
            Apply tokens directly in your styles. Switch between light and dark
            themes by swapping the semantic token set.
          </p>
          <pre><code>const styles = {
  container: {
    backgroundColor: lightSemanticColors.background.primary,
    color: lightSemanticColors.foreground.primary,
    borderColor: lightSemanticColors.border.default,
  },
  button: {
    backgroundColor: lightSemanticColors.brand.primary,
    color: lightSemanticColors.foreground.onPrimary,
  },
};</code></pre>
        </div>
      </div>

      <!-- Step 4 -->
      <div class="install-step">
        <div class="step-number">4</div>
        <div class="step-content">
          <h3>That's it!</h3>
          <p>
            For React Native, the same import works &mdash; the package automatically resolves the
            native entry point. Check the
            <a href="https://github.com/laddhaanshul/ColorToken" target="_blank" rel="noopener noreferrer">
              GitHub repository
            </a>
            for advanced usage patterns, theme switching, and more.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

