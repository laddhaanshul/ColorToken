/* ================================================================== */
/*  @laddhaanshul/color-tokens — Web Example App                                */
/*  Demonstrates EVERY export from the package                          */
/* ================================================================== */

import { useState, useEffect, useMemo, type CSSProperties } from 'react';

// ─── ALL exports from @laddhaanshul/color-tokens ────────────────────────────
// Tokens
import {
  primitiveColors,
  lightSemanticColors,
  darkSemanticColors,
  type PrimitiveColorScale,
  type ColorShade,
  type SemanticColorTheme,
  type SemanticColorCategory,
} from '@laddhaanshul/color-tokens';

// Utility Functions
import {
  hexToRgb,
  hexToRgba,
  withOpacity,
  darken,
  lighten,
  tokensToCssVars,
  tokensToReactNativeStyles,
  isHexColor,
  getLuminance,
  getContrastRatio,
  meetsWcagAA,
} from '@laddhaanshul/color-tokens';

// Configuration
import {
  defaultConfig,
  resolveConfig,
  type ColorTokensConfig,
} from '@laddhaanshul/color-tokens';

// Provider & Hooks
import {
  ColorProvider,
  useTheme,
  useColorTokens,
  usePrimitiveColors,
  useColorConfig,
  useToken,
  createTheme,
  type ColorProviderProps,
  type ThemeContextValue,
} from '@laddhaanshul/color-tokens';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ShadeEntry {
  shade: string;
  value: string;
}

interface ColorScale {
  name: string;
  shades: ShadeEntry[];
}

interface StatusRow {
  label: string;
  token: string;
  subtle: string;
  border: string;
  text: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers (use isHexColor export for validation)                     */
/* ------------------------------------------------------------------ */

function isLightColor(hex: string): boolean {
  if (!isHexColor(hex)) return true;
  const h = hex.replace('#', '');
  if (h.length < 6) return true;
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.45;
}

function hexLabel(hex: string): string {
  const upper = hex.toUpperCase();
  if (upper.length === 9) return `${upper.slice(0, 7)}${upper.slice(7)}`;
  return upper;
}

function getPrimitiveScales(): ColorScale[] {
  const scales: ColorScale[] = [];
  for (const [name, scale] of Object.entries(primitiveColors)) {
    if (typeof scale === 'string') {
      scales.push({ name, shades: [{ shade: '-', value: scale }] });
    } else {
      scales.push({
        name,
        shades: Object.entries(scale).map(([shade, value]) => ({
          shade,
          value: value as string,
        })),
      });
    }
  }
  return scales;
}

function getStatusRows(theme: SemanticColorTheme): StatusRow[] {
  const s = theme.status;
  return [
    { label: 'Success', token: s.success, subtle: s.successSubtle, border: s.successBorder, text: s.successText },
    { label: 'Warning', token: s.warning, subtle: s.warningSubtle, border: s.warningBorder, text: s.warningText },
    { label: 'Error', token: s.error, subtle: s.errorSubtle, border: s.errorBorder, text: s.errorText },
    { label: 'Info', token: s.info, subtle: s.infoSubtle, border: s.infoBorder, text: s.infoText },
  ];
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="section-title">{children}</h2>;
}

function Code({ children }: { children: React.ReactNode }) {
  return <code>{children}</code>;
}

function Swatch({ color, label, size = 'sm' }: { color: string; label: string; size?: 'sm' | 'lg' }) {
  const isLit = color.length > 4 && isLightColor(color);
  return (
    <div className={`swatch swatch--${size}`} style={{ backgroundColor: color }}>
      <span className="swatch__label" style={{ color: isLit ? '#111827' : '#FFFFFF' }}>
        {label}
      </span>
    </div>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
      <span className="theme-toggle__icon">{theme === 'light' ? '\uD83C\uDF19' : '\u2600\uFE0F'}</span>
      <span className="theme-toggle__text">
        {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
      </span>
    </button>
  );
}

function StatusCard({ row }: { row: StatusRow }) {
  return (
    <div className="status-card" style={{ backgroundColor: row.subtle, borderColor: row.border }}>
      <span className="status-card__dot" style={{ backgroundColor: row.token }} />
      <span className="status-card__label" style={{ color: row.text }}>{row.label}</span>
      <code className="status-card__hex" style={{ color: row.token }}>{hexLabel(row.token)}</code>
    </div>
  );
}

function BrandCard({ label, color, hover, subtle, active }: {
  label: string; color: string; hover: string; subtle: string; active: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const bg = pressed ? active : hovered ? hover : color;
  const isLit = isLightColor(bg);
  return (
    <button
      className="brand-card"
      style={{ backgroundColor: bg, color: isLit ? '#111827' : '#FFFFFF' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      <span className="brand-card__name">{label}</span>
      <code className="brand-card__hex">{hexLabel(color)}</code>
      <div className="brand-card__swatch-row">
        <span className="brand-card__mini" style={{ backgroundColor: color }} title="Default" />
        <span className="brand-card__mini" style={{ backgroundColor: hover }} title="Hover" />
        <span className="brand-card__mini" style={{ backgroundColor: active }} title="Active" />
        <span className="brand-card__mini" style={{ backgroundColor: subtle }} title="Subtle" />
      </div>
    </button>
  );
}

function JsonBlock({ data, label }: { data: Record<string, unknown>; label: string }) {
  return (
    <div className="json-block">
      <div className="json-block__label">{label}</div>
      <pre className="json-block__code">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

/* ================================================================== */
/*  AppInner — uses all hooks (must be inside ColorProvider)            */
/* ================================================================== */

function AppInner() {
  /* ──────────────────────────────────────────────────────────────────
   *  HOOKS DEMO: useTheme, useColorTokens, usePrimitiveColors,
   *             useColorConfig, useToken, createTheme
   * ────────────────────────────────────────────────────────────────── */

  // useTheme() → { theme, setTheme, toggleTheme, isDark, isLight, systemPreference, tokens, primitives, config }
  const {
    theme,
    toggleTheme,
    isDark,
    isLight,
    systemPreference,
  } = useTheme();

  // useColorTokens() → SemanticColorTheme (current theme's semantic tokens)
  const tokens = useColorTokens();

  // usePrimitiveColors() → typeof primitiveColors (all 22 color scales)
  const primitives = usePrimitiveColors();

  // useColorConfig() → Required<ColorTokensConfig> (resolved config with defaults)
  const colorConfig = useColorConfig();

  // useToken(category, key) → string (individual token lookup)
  const brandPrimary = useToken('brand', 'primary');
  const statusSuccess = useToken('status', 'success');
  const bgPrimary = useToken('background', 'primary');
  const fgPrimary = useToken('foreground', 'primary');
  const borderDefault = useToken('border', 'default');

  // createTheme() → { light, dark } — custom theme generation (demonstrated in section below)
  const customTheme = useMemo(() => createTheme({
    light: { brand: { primary: '#0066FF' } } as Partial<SemanticColorTheme>,
    dark: { brand: { primary: '#3388FF' } } as Partial<SemanticColorTheme>,
  }), []);

  /* ──────────────────────────────────────────────────────────────────
   *  CSS VARIABLES via tokensToCssVars() (also auto-injected by provider)
   * ────────────────────────────────────────────────────────────────── */
  const cssVars = useMemo(() => tokensToCssVars(tokens, 'ct'), [tokens]);

  useEffect(() => {
    const root = document.documentElement;
    for (const [prop, value] of Object.entries(cssVars)) {
      root.style.setProperty(`--${prop}`, value);
    }
    root.setAttribute('data-theme', theme);
  }, [cssVars, theme]);

  /* ──────────────────────────────────────────────────────────────────
   *  UTILITY FUNCTIONS DEMO
   *  hexToRgb, hexToRgba, withOpacity, darken, lighten,
   *  tokensToReactNativeStyles, isHexColor, getLuminance, getContrastRatio, meetsWcagAA
   * ────────────────────────────────────────────────────────────────── */

  const brandColor = tokens.brand.primary;

  // hexToRgb(brandColor) → { r, g, b } | null
  const rgb = hexToRgb(brandColor);

  // hexToRgba(brandColor, alpha) → "rgba(r, g, b, alpha)"
  const rgba50 = hexToRgba(brandColor, 0.5);
  const rgba25 = hexToRgba(brandColor, 0.25);

  // withOpacity(brandColor, opacity) → rgba string
  const opac90 = withOpacity(brandColor, 0.9);
  const opac30 = withOpacity(brandColor, 0.3);

  // darken(brandColor, amount) → hex string
  const darkened = darken(brandColor, 30);

  // lighten(brandColor, amount) → hex string
  const lightened = lighten(brandColor, 30);

  // tokensToReactNativeStyles(tokens) → Record<string, string> (dot-notation keys)
  const rnStyles = useMemo(() => tokensToReactNativeStyles(tokens), [tokens]);

  // isHexColor() → boolean
  const isValidHex = isHexColor(brandColor);
  const isInvalidHex = isHexColor('not-a-color');

  // getLuminance() → number (0–1)
  const luminance = getLuminance(brandColor);

  // getContrastRatio(color1, color2) → number (1:1–21:1)
  const contrastWithWhite = getContrastRatio(brandColor, '#FFFFFF');
  const contrastWithBlack = getContrastRatio(brandColor, '#000000');

  // meetsWcagAA(textColor, bgColor, isLargeText?) → boolean
  const aaNormal = meetsWcagAA(brandColor, '#FFFFFF', false);
  const aaLarge = meetsWcagAA(brandColor, '#FFFFFF', true);

  /* ──────────────────────────────────────────────────────────────────
   *  CONFIG DEMO: defaultConfig, resolveConfig, ColorTokensConfig type
   * ────────────────────────────────────────────────────────────────── */
  const resolvedCustomConfig = useMemo(
    () => resolveConfig({ defaultTheme: 'dark', cssVarPrefix: 'demo' }),
    []
  );

  /* ──────────────────────────────────────────────────────────────────
   *  TYPE USAGE DEMO: PrimitiveColorScale, ColorShade, SemanticColorCategory
   * ────────────────────────────────────────────────────────────────── */
  const allScaleNames = Object.keys(primitives) as PrimitiveColorScale[];
  const sampleShades: ColorShade[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const allCategories: SemanticColorCategory[] = Object.keys(tokens) as SemanticColorCategory[];

  /* ──────────────────────────────────────────────────────────────────
   *  Derived data
   * ────────────────────────────────────────────────────────────────── */
  const primitiveScales = useMemo(() => getPrimitiveScales(), []);
  const statusRows = useMemo(() => getStatusRows(tokens), [tokens]);

  const utilityDemos: { fn: string; input: string; output: string }[] = [
    { fn: 'hexToRgb()', input: brandColor, output: JSON.stringify(rgb) },
    { fn: 'hexToRgba(x, 0.5)', input: brandColor, output: rgba50 },
    { fn: 'withOpacity(x, 0.3)', input: brandColor, output: opac30 },
    { fn: 'darken(x, 30)', input: brandColor, output: darkened },
    { fn: 'lighten(x, 30)', input: brandColor, output: lightened },
    { fn: 'isHexColor(x)', input: brandColor, output: String(isValidHex) },
    { fn: 'isHexColor("bad")', input: '"not-a-color"', output: String(isInvalidHex) },
    { fn: 'getLuminance(x)', input: brandColor, output: luminance.toFixed(4) },
    { fn: 'getContrastRatio(x, #FFF)', input: brandColor, output: contrastWithWhite.toFixed(2) + ':1' },
    { fn: 'getContrastRatio(x, #000)', input: brandColor, output: contrastWithBlack.toFixed(2) + ':1' },
    { fn: 'meetsWcagAA(x, #FFF)', input: brandColor, output: String(aaNormal) },
    { fn: 'meetsWcagAA(x, #FFF, large)', input: brandColor, output: String(aaLarge) },
  ];

  const rnStylePreview = useMemo(() => {
    const keys = Object.keys(rnStyles).slice(0, 20);
    const result: Record<string, string> = {};
    for (const k of keys) { const v = rnStyles[k]; if (v !== undefined) result[k] = v; }
    return result;
  }, [rnStyles]);

  /* ──────────────────────────────────────────────────────────────────
   *  RENDER
   * ────────────────────────────────────────────────────────────────── */
  return (
    <div className="app">
      {/* ===== Header ===== */}
      <header className="header">
        <div className="header__inner">
          <div className="header__brand">
            <span className="header__logo">{'\uD83C\uDFA8'}</span>
            <h1 className="header__title">Color Tokens</h1>
            <span className="header__badge">Web Example</span>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <main className="main">

        {/* ============================================================
         *  SECTION 1: Provider & Hooks
         *  Exports used: ColorProvider, useTheme, useColorConfig
         *  Types used: ColorProviderProps, ThemeContextValue
         * ============================================================ */}
        <section className="section">
          <SectionTitle>Provider & Hooks</SectionTitle>
          <p className="section__desc">
            The entire app is wrapped in <Code>ColorProvider</Code> (see <Code>App()</Code> component below all sections).
            Inside, every hook retrieves live theme data from context.
          </p>
          <div className="hooks-panel">
            <div className="hooks-panel__group">
              <h4 className="hooks-panel__heading">useTheme()</h4>
              <div className="hooks-panel__grid">
                <HookChip label="theme" value={theme} color={brandPrimary} />
                <HookChip label="isDark" value={String(isDark)} color={isDark ? '#1E293B' : '#F9FAFB'} />
                <HookChip label="isLight" value={String(isLight)} color={isLight ? '#F9FAFB' : '#1E293B'} />
                <HookChip label="systemPreference" value={systemPreference} color={systemPreference === 'dark' ? '#1E293B' : '#F9FAFB'} />
              </div>
            </div>
            <div className="hooks-panel__group">
              <h4 className="hooks-panel__heading">useColorConfig()</h4>
              <div className="hooks-panel__grid">
                <HookChip label="defaultTheme" value={colorConfig.defaultTheme} />
                <HookChip label="cssVarPrefix" value={colorConfig.cssVarPrefix} />
                <HookChip label="injectCssVars" value={String(colorConfig.injectCssVars)} />
              </div>
            </div>
            <div className="hooks-panel__group">
              <h4 className="hooks-panel__heading">useToken()</h4>
              <div className="hooks-panel__grid">
                <HookChip label="brand.primary" value={brandPrimary} color={brandPrimary} />
                <HookChip label="status.success" value={statusSuccess} color={statusSuccess} />
                <HookChip label="background.primary" value={bgPrimary} color={bgPrimary} />
                <HookChip label="foreground.primary" value={fgPrimary} color={fgPrimary} />
                <HookChip label="border.default" value={borderDefault} color={borderDefault} />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
         *  SECTION 2: CSS Variables
         *  Exports used: tokensToCssVars
         * ============================================================ */}
        <section className="section">
          <SectionTitle>CSS Variable Integration</SectionTitle>
          <p className="section__desc">
            <Code>tokensToCssVars(tokens, prefix)</Code> flattens semantic tokens into CSS custom properties
            injected as <Code>--ct-*</Code> on <Code>&lt;html&gt;</Code>. The provider also auto-injects these when
            <Code>config.injectCssVars</Code> is true.
          </p>
          <div className="css-vars-demo">
            <div className="css-vars-demo__card" style={{ backgroundColor: 'var(--ct-background-primary, #fff)' }}>
              <h3 className="css-vars-demo__heading" style={{ color: 'var(--ct-foreground-primary, #111)' }}>
                Themed Card
              </h3>
              <p className="css-vars-demo__body">
                All colors use <Code>--ct-*</Code> CSS variables derived from{' '}
                <Code>tokensToCssVars()</Code>. Toggle the theme to see them update in real time.
              </p>
              <div className="css-vars-demo__actions">
                <button
                  className="btn btn--primary"
                  style={{ backgroundColor: 'var(--ct-interactive-default)', color: '#FFF' }}
                >
                  Primary Action
                </button>
                <button
                  className="btn btn--ghost"
                  style={{
                    borderColor: 'var(--ct-border-default)',
                    color: 'var(--ct-foreground-primary)',
                    backgroundColor: 'var(--ct-background-secondary)',
                  }}
                >
                  Secondary
                </button>
              </div>
            </div>
            <div className="css-vars-demo__opacity" style={{ backgroundColor: 'var(--ct-background-secondary, #f9fafb)' }}>
              <h3 className="css-vars-demo__heading" style={{ color: 'var(--ct-foreground-primary, #111)' }}>
                <Code>withOpacity()</Code> Demo
              </h3>
              <div className="opacity-strip">
                {[1.0, 0.8, 0.6, 0.4, 0.2, 0.1].map((opacity) => (
                  <div
                    key={opacity}
                    className="opacity-strip__item"
                    style={{ backgroundColor: withOpacity(tokens.brand.primary, opacity) }}
                  >
                    <span>{(opacity * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
         *  SECTION 3: Utility Functions
         *  Exports used: hexToRgb, hexToRgba, withOpacity, darken,
         *               lighten, isHexColor, getLuminance,
         *               getContrastRatio, meetsWcagAA
         * ============================================================ */}
        <section className="section">
          <SectionTitle>Color Utility Functions</SectionTitle>
          <p className="section__desc">
            All 11 utility functions demonstrated with live values. These work on any hex color string.
          </p>

          {/* Color transformation swatches */}
          <div className="util-swatches">
            <div className="util-swatch">
              <div className="util-swatch__color" style={{ backgroundColor: brandColor }} />
              <div className="util-swatch__info">
                <span className="util-swatch__label">Original</span>
                <code>{brandColor}</code>
              </div>
            </div>
            <div className="util-swatch">
              <div className="util-swatch__color" style={{ backgroundColor: darkened }} />
              <div className="util-swatch__info">
                <span className="util-swatch__label">darken(x, 30)</span>
                <code>{darkened}</code>
              </div>
            </div>
            <div className="util-swatch">
              <div className="util-swatch__color" style={{ backgroundColor: lightened }} />
              <div className="util-swatch__info">
                <span className="util-swatch__label">lighten(x, 30)</span>
                <code>{lightened}</code>
              </div>
            </div>
            <div className="util-swatch">
              <div className="util-swatch__color" style={{ backgroundColor: rgba50 }} />
              <div className="util-swatch__info">
                <span className="util-swatch__label">hexToRgba(x, 0.5)</span>
                <code>{rgba50}</code>
              </div>
            </div>
            <div className="util-swatch">
              <div className="util-swatch__color" style={{ backgroundColor: opac30 }} />
              <div className="util-swatch__info">
                <span className="util-swatch__label">withOpacity(x, 0.3)</span>
                <code>{opac30}</code>
              </div>
            </div>
          </div>

          {/* Results table */}
          <div className="util-table-wrapper">
            <table className="util-table">
              <thead>
                <tr>
                  <th>Function</th>
                  <th>Input</th>
                  <th>Output</th>
                </tr>
              </thead>
              <tbody>
                {utilityDemos.map((row) => (
                  <tr key={row.fn}>
                    <td><code>{row.fn}</code></td>
                    <td><code>{row.input}</code></td>
                    <td><code>{row.output}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ============================================================
         *  SECTION 4: React Native Styles (tokensToReactNativeStyles)
         * ============================================================ */}
        <section className="section">
          <SectionTitle>tokensToReactNativeStyles()</SectionTitle>
          <p className="section__desc">
            Converts semantic tokens to flat dot-notation keys for React Native{' '}
            <Code>StyleSheet</Code> usage. Same data, different format.
          </p>
          <JsonBlock label="Output (first 20 keys)" data={rnStylePreview} />
        </section>

        {/* ============================================================
         *  SECTION 5: Primitive Color Scales
         *  Exports used: primitiveColors, usePrimitiveColors,
         *               type PrimitiveColorScale, type ColorShade
         * ============================================================ */}
        <section className="section">
          <SectionTitle>Primitive Color Scales</SectionTitle>
          <p className="section__desc">
            All 22 color scales from <Code>primitiveColors</Code> via the{' '}
            <Code>usePrimitiveColors()</Code> hook. Types:{' '}
            <Code>PrimitiveColorScale</Code> ({allScaleNames.length} scales),{' '}
            <Code>ColorShade</Code> ({sampleShades.length} shades).
          </p>
          <div className="scales-grid">
            {primitiveScales.map((scale) => (
              <div key={scale.name} className="scale-row">
                <span className="scale-row__name">{scale.name}</span>
                <div className="scale-row__swatches">
                  {scale.shades.map((s) => (
                    <Swatch key={s.shade} color={s.value} label={s.shade === '-' ? s.value : s.shade} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
         *  SECTION 6: Status Colors
         *  Exports used: useToken, SemanticColorTheme
         * ============================================================ */}
        <section className="section">
          <SectionTitle>Status Colors</SectionTitle>
          <p className="section__desc">
            Semantic status tokens with subtle, border, and text variants.
            Retrieved via <Code>useColorTokens()</Code> hook.
            Categories: <Code>{allCategories.join(', ')}</Code>.
          </p>
          <div className="status-grid">
            {statusRows.map((row) => (
              <StatusCard key={row.label} row={row} />
            ))}
          </div>
        </section>

        {/* ============================================================
         *  SECTION 7: Brand Colors
         *  Exports used: useToken
         * ============================================================ */}
        <section className="section">
          <SectionTitle>Brand Colors</SectionTitle>
          <p className="section__desc">
            Brand tokens include primary, secondary, and accent variants with
            hover, active, and subtle states. Colors from <Code>useToken()</Code> hook.
          </p>
          <div className="brand-grid">
            <BrandCard label="Primary" color={tokens.brand.primary} hover={tokens.brand.primaryHover}
              active={tokens.brand.primaryActive} subtle={tokens.brand.primarySubtle} />
            <BrandCard label="Secondary" color={tokens.brand.secondary} hover={tokens.brand.secondaryHover}
              active={tokens.brand.secondaryActive} subtle={tokens.brand.secondarySubtle} />
            <BrandCard label="Accent" color={tokens.brand.accent} hover={tokens.brand.accentHover}
              active={tokens.brand.accentActive} subtle={tokens.brand.accentSubtle} />
          </div>
        </section>

        {/* ============================================================
         *  SECTION 8: Semantic Palette
         *  Exports used: useColorTokens, lightSemanticColors,
         *               darkSemanticColors, type SemanticColorCategory
         * ============================================================ */}
        <section className="section">
          <SectionTitle>Semantic Palette &mdash; {theme === 'light' ? 'Light' : 'Dark'} Theme</SectionTitle>
          <p className="section__desc">
            Full overview of every semantic category from <Code>useColorTokens()</Code>.
            The same data is available directly as <Code>lightSemanticColors</Code> /{' '}
            <Code>darkSemanticColors</Code> without the provider.
            Type: <Code>SemanticColorCategory</Code> = <Code>{allCategories.join(' | ')}</Code>.
          </p>
          <div className="semantic-grid">
            {(Object.entries(tokens) as [string, Record<string, string>][]).map(([category, values]) => (
              <div key={category} className="semantic-category">
                <h4 className="semantic-category__title">{category}</h4>
                <div className="semantic-category__items">
                  {Object.entries(values).map(([name, value]) => (
                    <div
                      key={name}
                      className="semantic-chip"
                      style={{
                        backgroundColor: isHexColor(value) ? value : 'var(--ct-surface-muted)',
                        color: isLightColor(isHexColor(value) ? value : '#999999') ? '#111827' : '#FFFFFF',
                      }}
                      title={`${category}.${name}: ${value}`}
                    >
                      <span className="semantic-chip__name">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
         *  SECTION 9: Chart & Visualization Colors
         *  Exports used: useColorTokens (chart category)
         * ============================================================ */}
        <section className="section">
          <SectionTitle>Chart &amp; Visualization</SectionTitle>
          <p className="section__desc">
            Data-visualization tokens provide a harmonious palette for charts and graphs.
          </p>
          <div className="chart-demo" style={{ backgroundColor: tokens.chart.background }}>
            <div className="chart-demo__bars">
              {Array.from({ length: 8 }, (_, i) => {
                const key = `series${i + 1}` as keyof typeof tokens.chart;
                const color = tokens.chart[key] as string;
                const height = 30 + Math.random() * 70;
                return (
                  <div
                    key={key}
                    className="chart-demo__bar"
                    style={{
                      height: `${height}%`,
                      backgroundColor: color,
                      color: isLightColor(color) ? '#111827' : '#FFFFFF',
                    }}
                  >
                    <span>{key}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
         *  SECTION 10: createTheme
         *  Exports used: createTheme
         * ============================================================ */}
        <section className="section">
          <SectionTitle>createTheme()</SectionTitle>
          <p className="section__desc">
            <Code>createTheme({'{ light?: ..., dark?: ... }'})</Code> generates custom semantic themes
            with partial overrides. Useful for themed variants or pre-computing tokens outside the provider.
          </p>
          <div className="create-theme-demo">
            <div className="create-theme-demo__col">
              <h4>Custom Light</h4>
              <div className="create-theme-demo__swatches">
                <Swatch color={customTheme.light.brand.primary} label="brand.primary" />
                <Swatch color={customTheme.light.background.primary} label="bg.primary" />
                <Swatch color={customTheme.light.foreground.primary} label="fg.primary" />
                <Swatch color={customTheme.light.status.success} label="status" />
              </div>
              <code className="create-theme-demo__code">
                brand.primary: {customTheme.light.brand.primary}
              </code>
            </div>
            <div className="create-theme-demo__col">
              <h4>Custom Dark</h4>
              <div className="create-theme-demo__swatches">
                <Swatch color={customTheme.dark.brand.primary} label="brand.primary" />
                <Swatch color={customTheme.dark.background.primary} label="bg.primary" />
                <Swatch color={customTheme.dark.foreground.primary} label="fg.primary" />
                <Swatch color={customTheme.dark.status.success} label="status" />
              </div>
              <code className="create-theme-demo__code">
                brand.primary: {customTheme.dark.brand.primary}
              </code>
            </div>
          </div>
        </section>

        {/* ============================================================
         *  SECTION 11: Config
         *  Exports used: defaultConfig, resolveConfig,
         *               type ColorTokensConfig
         * ============================================================ */}
        <section className="section">
          <SectionTitle>Configuration</SectionTitle>
          <p className="section__desc">
            <Code>defaultConfig</Code> provides sensible defaults. <Code>resolveConfig(partial?)</Code> merges
            user values with defaults. Type: <Code>ColorTokensConfig</Code>.
          </p>
          <div className="config-grid">
            <JsonBlock label="defaultConfig" data={defaultConfig as unknown as Record<string, unknown>} />
            <JsonBlock label="resolveConfig({{ defaultTheme: 'dark', cssVarPrefix: 'demo' }})"
              data={resolvedCustomConfig as unknown as Record<string, unknown>} />
          </div>
        </section>

      </main>

      {/* ===== Footer ===== */}
      <footer className="footer" style={{
        backgroundColor: 'var(--ct-background-tertiary)',
        borderColor: 'var(--ct-border-default)',
        color: 'var(--ct-foreground-secondary)',
      }}>
        Built with <strong>@laddhaanshul/color-tokens</strong> &middot; Vite + React + TypeScript
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HookChip — used in the Provider & Hooks section                    */
/* ------------------------------------------------------------------ */

function HookChip({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="hook-chip" style={color ? { borderColor: color } : undefined}>
      <span className="hook-chip__label">{label}</span>
      <code className="hook-chip__value">{value}</code>
    </div>
  );
}

/* ================================================================== */
/*  App — wraps AppInner in ColorProvider (uses ColorProviderProps)    */
/* ================================================================== */

export default function App() {
  // ColorProviderProps demonstration:
  //   theme?: 'light' | 'dark'      — force a specific mode
  //   defaultTheme?: 'light' | 'dark' | 'system' — initial theme
  //   config?: ColorTokensConfig     — advanced customization
  // ColorProviderProps type demonstration — config matches the type shape
  const providerConfig: Omit<ColorProviderProps, 'children'> = {
    defaultTheme: 'system' as const,
    config: {
      cssVarPrefix: 'ct',
      injectCssVars: false,
    },
  };

  return (
    <ColorProvider {...providerConfig}>
      <AppInner />
    </ColorProvider>
  );
}
