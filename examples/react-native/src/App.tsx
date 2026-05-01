/**
 * @laddhaanshul/color-tokens — React Native (Expo) Example
 *
 * Demonstrates EVERY export from @laddhaanshul/color-tokens.
 * Uses the native ColorProvider (Appearance API) instead of a local ThemeProvider.
 */

import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

// ─── ALL exports from @laddhaanshul/color-tokens ────────────────────────
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

/* ================================================================== */
/*  Constants                                                          */
/* ================================================================== */

const SHADES: ColorShade[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const SCALE_NAMES = Object.keys(primitiveColors) as PrimitiveColorScale[];

/* ================================================================== */
/*  Helpers                                                            */
/* ================================================================== */

/** Get the text color with best contrast against a background. */
function contrastText(hex: string): string {
  if (!hex || typeof hex !== 'string') return '#111827';
  if (!isHexColor(hex)) return '#111827';
  const clean = hex?.replace('#', '');
  if (clean.length < 6) return '#111827';
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.45 ? '#111827' : '#FFFFFF';
}

/* ================================================================== */
/*  Section: Provider & Hooks Info                                      */
/* ================================================================== */

function HooksPanel() {
  // useTheme() → theme, setTheme, toggleTheme, isDark, isLight, systemPreference, tokens, primitives, config
  const { theme, isDark, isLight, systemPreference } = useTheme();

  // useColorConfig() → Required<ColorTokensConfig>
  const colorConfig = useColorConfig();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: useToken('foreground', 'primary') }]}>Provider & Hooks</Text>
      <Text style={[styles.sectionDesc, { color: useToken('foreground', 'secondary') }]}>
        Uses ColorProvider from the package. All hooks retrieve live theme data.
      </Text>

      {/* useTheme values */}
      <Text style={styles.subHeading}>useTheme()</Text>
      <View style={styles.chipRow}>
        <InfoChip label="theme" value={theme} />
        <InfoChip label="isDark" value={String(isDark)} />
        <InfoChip label="isLight" value={String(isLight)} />
        <InfoChip label="systemPref" value={systemPreference} />
      </View>

      {/* useColorConfig values */}
      <Text style={styles.subHeading}>useColorConfig()</Text>
      <View style={styles.chipRow}>
        <InfoChip label="defaultTheme" value={colorConfig.defaultTheme} />
        <InfoChip label="cssVarPrefix" value={colorConfig.cssVarPrefix} />
        <InfoChip label="injectCssVars" value={String(colorConfig.injectCssVars)} />
      </View>

      {/* useToken examples */}
      <Text style={styles.subHeading}>useToken()</Text>
      <View style={styles.chipRow}>
        <InfoChip label="brand.primary" value={useToken('brand', 'primary')} />
        <InfoChip label="status.success" value={useToken('status', 'success')} />
        <InfoChip label="bg.primary" value={useToken('background', 'primary')} />
        <InfoChip label="fg.primary" value={useToken('foreground', 'primary')} />
        <InfoChip label="border.default" value={useToken('border', 'default')} />
      </View>
    </View>
  );
}

/* ================================================================== */
/*  Section: Utility Functions                                          */
/* ================================================================== */

function UtilityFunctionsSection() {
  const tokens = useColorTokens();
  const brand = tokens.brand.primary;

  // All utility function calls
  const rgb = hexToRgb(brand);
  const rgba50 = hexToRgba(brand, 0.5);
  const opac40 = withOpacity(brand, 0.4);
  const darkened = darken(brand, 30);
  const lightened = lighten(brand, 30);
  const validHex = isHexColor(brand);
  const invalidHex = isHexColor('not-a-color');
  const lum = getLuminance(brand);
  const contrastWhite = getContrastRatio(brand, '#FFFFFF');
  const contrastBlack = getContrastRatio(brand, '#000000');
  const aaNormal = meetsWcagAA(brand, '#FFFFFF', false);
  const aaLarge = meetsWcagAA(brand, '#FFFFFF', true);

  // tokensToReactNativeStyles
  const rnStyles = useMemo(() => {
    const all = tokensToReactNativeStyles(tokens);
    const entries = Object.entries(all).slice(0, 8);
    const result: Record<string, string> = {};
    for (const [k, v] of entries) { if (v !== undefined) result[k] = v; }
    return result;
  }, [tokens]);

  // tokensToCssVars (works in JS, but output is for web — still demonstrates the function)
  const cssVars = useMemo(() => {
    const all = tokensToCssVars(tokens, 'ct');
    const entries = Object.entries(all).slice(0, 8);
    const result: Record<string, string> = {};
    for (const [k, v] of entries) result[k] = v;
    return result;
  }, [tokens]);

  const rows: { fn: string; out: string }[] = [
    { fn: 'hexToRgb()', out: JSON.stringify(rgb) },
    { fn: 'hexToRgba(x, 0.5)', out: rgba50 },
    { fn: 'withOpacity(x, 0.4)', out: opac40 },
    { fn: 'darken(x, 30)', out: darkened },
    { fn: 'lighten(x, 30)', out: lightened },
    { fn: 'isHexColor(x)', out: String(validHex) },
    { fn: 'isHexColor("bad")', out: String(invalidHex) },
    { fn: 'getLuminance(x)', out: lum.toFixed(4) },
    { fn: 'contrastRatio(x, #FFF)', out: contrastWhite.toFixed(2) + ':1' },
    { fn: 'contrastRatio(x, #000)', out: contrastBlack.toFixed(2) + ':1' },
    { fn: 'meetsWcagAA(x, #FFF)', out: String(aaNormal) },
    { fn: 'meetsWcagAA(x, #FFF, large)', out: String(aaLarge) },
  ];

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: useToken('foreground', 'primary') }]}>Color Utility Functions</Text>
      <Text style={[styles.sectionDesc, { color: useToken('foreground', 'secondary') }]}>
        All 11 utility functions demonstrated with live values.
      </Text>

      {/* Transformation swatches */}
      <View style={styles.utilSwatchRow}>
        <View style={[styles.utilSwatch, { backgroundColor: brand }]}><Text style={[styles.utilSwatchLabel, { color: contrastText(brand) }]}>Original{'\n'}{brand}</Text></View>
        <View style={[styles.utilSwatch, { backgroundColor: darkened }]}><Text style={[styles.utilSwatchLabel, { color: contrastText(darkened) }]}>darken(x, 30){'\n'}{darkened}</Text></View>
        <View style={[styles.utilSwatch, { backgroundColor: lightened }]}><Text style={[styles.utilSwatchLabel, { color: contrastText(lightened) }]}>lighten(x, 30){'\n'}{lightened}</Text></View>
        <View style={[styles.utilSwatch, { backgroundColor: rgba50 }]}><Text style={[styles.utilSwatchLabel, { color: contrastText(brand) }]}>rgba(x, 0.5){'\n'}{rgba50}</Text></View>
        <View style={[styles.utilSwatch, { backgroundColor: opac40 }]}><Text style={[styles.utilSwatchLabel, { color: contrastText(brand) }]}>opacity 40%{'\n'}{opac40}</Text></View>
      </View>

      {/* Results table */}
      <View style={styles.tableWrapper}>
        {rows.map((r) => (
          <View key={r.fn} style={styles.tableRow}>
            <Text style={[styles.tableFn, { color: useToken('foreground', 'primary') }]}>{r.fn}</Text>
            <Text style={[styles.tableOut, { color: useToken('foreground', 'secondary') }]} numberOfLines={1}>{r.out}</Text>
          </View>
        ))}
      </View>

      {/* tokensToReactNativeStyles output */}
      <Text style={styles.subHeading}>tokensToReactNativeStyles()</Text>
      <View style={styles.codeBlock}>
        {Object.entries(rnStyles).map(([key, val]) => (
          <Text key={key} style={styles.codeLine} numberOfLines={1}>{key}: {val}</Text>
        ))}
      </View>

      {/* tokensToCssVars output (for reference; web-only in practice) */}
      <Text style={styles.subHeading}>tokensToCssVars()</Text>
      <View style={styles.codeBlock}>
        {Object.entries(cssVars).map(([key, val]) => (
          <Text key={key} style={styles.codeLine} numberOfLines={1}>{key}: {val}</Text>
        ))}
      </View>
    </View>
  );
}

/* ================================================================== */
/*  Section: Primitive Color Scales                                      */
/* ================================================================== */

function PrimitiveScalesSection() {
  const primitives = usePrimitiveColors();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: useToken('foreground', 'primary') }]}>Primitive Color Scales</Text>
      <Text style={[styles.sectionDesc, { color: useToken('foreground', 'secondary') }]}>
        All 22 scales via usePrimitiveColors(). Types: PrimitiveColorScale ({SCALE_NAMES.length}), ColorShade ({SHADES.length}).
      </Text>
      {SCALE_NAMES.map((name) => {
        const scale = primitives[name];
        if (typeof scale === 'string') return null;
        return (
          <View key={name} style={styles.scaleRow}>
            <Text style={[styles.scaleName, { color: useToken('foreground', 'secondary') }]}>{name}</Text>
            <View style={styles.shadesRow}>
              {SHADES.map((shade) => {
                const color = (scale as Record<number | string, string>)[shade];
                return (
                  <View
                    key={shade}
                    style={[styles.shadeChip, { backgroundColor: color }]}
                  >
                    <Text style={[styles.shadeChipText, { color: contrastText(color) }]}>{shade}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
}

/* ================================================================== */
/*  Section: Status Colors                                                */
/* ================================================================== */

function StatusSection() {
  const tokens = useColorTokens();
  const { status } = tokens;
  const statusDefs = [
    { key: 'success', label: 'Success', bar: status.success, bg: status.successSubtle, text: status.successText, border: status.successBorder },
    { key: 'warning', label: 'Warning', bar: status.warning, bg: status.warningSubtle, text: status.warningText, border: status.warningBorder },
    { key: 'error', label: 'Error', bar: status.error, bg: status.errorSubtle, text: status.errorText, border: status.errorBorder },
    { key: 'info', label: 'Info', bar: status.info, bg: status.infoSubtle, text: status.infoText, border: status.infoBorder },
  ];

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: useToken('foreground', 'primary') }]}>Status Colors</Text>
      <Text style={[styles.sectionDesc, { color: useToken('foreground', 'secondary') }]}>
        Semantic status tokens. Retrieved via useToken() and useColorTokens().
      </Text>
      <View style={styles.badgeRow}>
        {statusDefs.map((s) => (
          <View key={s.key} style={[styles.badge, { backgroundColor: s.bg, borderColor: s.border }]}>
            <Text style={[styles.badgeText, { color: s.text }]}>{s.label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.alertList}>
        {statusDefs.map((s) => {
          const ratio = getContrastRatio(s.text, s.bg);
          return (
            <View key={s.key} style={[styles.alertCard, { backgroundColor: s.bg, borderColor: s.border, borderLeftColor: s.bar }]}>
              <View style={styles.alertHeader}>
                <View style={[styles.alertDot, { backgroundColor: s.bar }]} />
                <Text style={[styles.alertLabel, { color: s.text }]}>{s.label}</Text>
                <Text style={styles.contrastBadge}>{ratio.toFixed(1)}:1</Text>
              </View>
              <Text style={[styles.alertMessage, { color: s.text }]}>
                Sample {s.key.toLowerCase()} alert message.
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

/* ================================================================== */
/*  Section: Brand Colors                                                 */
/* ================================================================== */

function BrandSection() {
  const tokens = useColorTokens();
  const brandDefs = [
    { label: 'Primary', color: tokens.brand.primary, hover: tokens.brand.primaryHover, active: tokens.brand.primaryActive, subtle: tokens.brand.primarySubtle },
    { label: 'Secondary', color: tokens.brand.secondary, hover: tokens.brand.secondaryHover, active: tokens.brand.secondaryActive, subtle: tokens.brand.secondarySubtle },
    { label: 'Accent', color: tokens.brand.accent, hover: tokens.brand.accentHover, active: tokens.brand.accentActive, subtle: tokens.brand.accentSubtle },
  ];

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: useToken('foreground', 'primary') }]}>Brand Colors</Text>
      <Text style={[styles.sectionDesc, { color: useToken('foreground', 'secondary') }]}>
        Primary, secondary, accent with hover/active/subtle states.
      </Text>
      {/* Solid buttons */}
      <View style={styles.buttonGroup}>
        {brandDefs.map((b) => (
          <TouchableOpacity key={b.label} activeOpacity={0.8} style={[styles.brandButton, { backgroundColor: b.color }]}>
            <Text style={styles.brandButtonText}>{b.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Subtle/outline buttons */}
      <View style={styles.buttonGroup}>
        {brandDefs.map((b) => (
          <TouchableOpacity key={`${b.label}-subtle`} activeOpacity={0.8}
            style={[styles.outlineButton, { backgroundColor: b.subtle, borderColor: b.color }]}>
            <Text style={[styles.outlineButtonText, { color: b.color }]}>{b.label} Subtle</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Utility variant buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity activeOpacity={0.8} style={[styles.brandButton, { backgroundColor: withOpacity(tokens.brand.primary, 0.6) }]}>
          <Text style={styles.brandButtonText}>60% Opacity</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={[styles.brandButton, { backgroundColor: lighten(tokens.brand.primary, 20) }]}>
          <Text style={styles.brandButtonText}>Lightened +20%</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={[styles.brandButton, { backgroundColor: darken(tokens.brand.primary, 20) }]}>
          <Text style={styles.brandButtonText}>Darkened +20%</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ================================================================== */
/*  Section: Semantic Palette (useColorTokens)                             */
/* ================================================================== */

function SemanticPaletteSection() {
  const tokens = useColorTokens();
  const allCategories: SemanticColorCategory[] = Object.keys(tokens) as SemanticColorCategory[];

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: useToken('foreground', 'primary') }]}>
        Semantic Palette — {useTheme().theme === 'light' ? 'Light' : 'Dark'} Theme
      </Text>
      <Text style={[styles.sectionDesc, { color: useToken('foreground', 'secondary') }]}>
        Full overview via useColorTokens(). Same data as lightSemanticColors / darkSemanticColors.
        Categories: {allCategories.join(', ')}.
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollRow}>
        {allCategories.map((cat) => {
          const categoryObj = tokens[cat] as Record<string, string>;
          const entries = Object.entries(categoryObj);
          return (
            <View key={cat} style={[styles.semanticCard, { backgroundColor: useToken('surface', 'raised'), borderColor: useToken('border', 'subtle') }]}>
              <Text style={[styles.semanticCardTitle, { color: useToken('foreground', 'primary') }]}>{cat}</Text>
              <View style={styles.semanticChips}>
                {entries.map(([name, value]) => (
                  <View
                    key={name}
                    style={[styles.semanticChip, {
                      backgroundColor: isHexColor(value) ? value : useToken('background', 'tertiary'),
                    }]}
                  >
                    <Text style={[styles.semanticChipText, { color: contrastText(isHexColor(value) ? value : '#999') }]} numberOfLines={1}>
                      {name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

/* ================================================================== */
/*  Section: Chart Colors                                                 */
/* ================================================================== */

function ChartSection() {
  const tokens = useColorTokens();
  const chartKeys = ['series1', 'series2', 'series3', 'series4', 'series5', 'series6', 'series7', 'series8'] as const;

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: useToken('foreground', 'primary') }]}>Chart & Visualization</Text>
      <Text style={[styles.sectionDesc, { color: useToken('foreground', 'secondary') }]}>
        Harmonious palette for charts. Background: chart.background.
      </Text>
      <View style={[styles.chartCard, { backgroundColor: tokens.chart.background, borderColor: useToken('border', 'subtle') }]}>
        <View style={styles.chartRow}>
          {chartKeys.map((key) => {
            const color = tokens.chart[key] as string;
            return (
              <View key={key} style={[styles.chartChip, { backgroundColor: color }]}>
                <Text style={[styles.chartChipText, { color: contrastText(color) }]}>{key}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

/* ================================================================== */
/*  Section: createTheme                                                */
/* ================================================================== */

function CreateThemeSection() {
  // createTheme() — generates custom themes with partial overrides
  const customTheme = useMemo(() => createTheme({
    light: { brand: { primary: '#0066FF' } } as Partial<SemanticColorTheme>,
    dark: { brand: { primary: '#3388FF' } } as Partial<SemanticColorTheme>,
  }), []);

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: useToken('foreground', 'primary') }]}>createTheme()</Text>
      <Text style={[styles.sectionDesc, { color: useToken('foreground', 'secondary') }]}>
        Generates custom themes with partial overrides. Useful for themed variants.
      </Text>
      {/* Light custom */}
      <Text style={styles.subHeading}>Custom Light</Text>
      <View style={styles.chipRow}>
        <InfoChip label="brand.primary" value={customTheme.light.brand.primary} />
        <InfoChip label="bg.primary" value={customTheme.light.background.primary} />
        <InfoChip label="fg.primary" value={customTheme.light.foreground.primary} />
        <InfoChip label="status" value={customTheme.light.status.success} />
      </View>
      {/* Dark custom */}
      <Text style={styles.subHeading}>Custom Dark</Text>
      <View style={styles.chipRow}>
        <InfoChip label="brand.primary" value={customTheme.dark.brand.primary} />
        <InfoChip label="bg.primary" value={customTheme.dark.background.primary} />
        <InfoChip label="fg.primary" value={customTheme.dark.foreground.primary} />
        <InfoChip label="status" value={customTheme.dark.status.success} />
      </View>
    </View>
  );
}

/* ================================================================== */
/*  Section: Configuration                                             */
/* ================================================================== */

function ConfigSection() {
  const resolvedConfig = useMemo(
    () => resolveConfig({ defaultTheme: 'dark', cssVarPrefix: 'demo' }),
    [],
  );

  const formatConfig = (obj: Record<string, unknown>): string =>
    Object.entries(obj).map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`).join('\n');

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: useToken('foreground', 'primary') }]}>Configuration</Text>
      <Text style={[styles.sectionDesc, { color: useToken('foreground', 'secondary') }]}>
        defaultConfig provides defaults. resolveConfig() merges user values. Type: ColorTokensConfig.
      </Text>
      <Text style={styles.subHeading}>defaultConfig</Text>
      <View style={styles.codeBlock}>
        <Text style={styles.codeLine}>{formatConfig(defaultConfig as unknown as Record<string, unknown>)}</Text>
      </View>
      <Text style={styles.subHeading}>{'resolveConfig({ defaultTheme: "dark" })'}</Text>
      <View style={styles.codeBlock}>
        <Text style={styles.codeLine}>{formatConfig(resolvedConfig as unknown as Record<string, unknown>)}</Text>
      </View>
    </View>
  );
}

/* ================================================================== */
/*  Sub-components                                                     */
/* ================================================================== */

function InfoChip({ label, value }: { label: string; value: string }) {
  const textColor = useToken('foreground', 'primary');
  const bgColor = useToken('background', 'primary');
  const borderColor = useToken('border', 'default');
  return (
    <View style={[styles.infoChip, { borderColor, backgroundColor: bgColor }]}>
      <Text style={[styles.infoChipLabel, { color: useToken('foreground', 'tertiary') }]}>{label}</Text>
      <Text style={[styles.infoChipValue, { color: useToken('foreground', 'tertiary') }]} numberOfLines={1}>{value}</Text>
    </View>
  );
}

function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme();
  const brandColor = useToken('brand', 'primary');

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.toggleButton, { backgroundColor: brandColor }]}
      onPress={toggleTheme}
    >
      <Text style={styles.toggleButtonText}>
        {isDark ? '\u2600\uFE0F  Light Mode' : '\uD83C\uDF19  Dark Mode'}
      </Text>
    </TouchableOpacity>
  );
}

/* ================================================================== */
/*  AppInner — must be inside ColorProvider                           */
/* ================================================================== */

function AppInner() {
  const tokens = useColorTokens();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: tokens.background.primary }]}>
      <StatusBar
        barStyle={useTheme().isDark ? 'light-content' : 'dark-content'}
        backgroundColor={tokens.background.primary}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={[styles.header, { backgroundColor: tokens.surface.default, borderColor: tokens.border.default }]}>
          <Text style={[styles.title, { color: tokens.foreground.primary }]}>@laddhaanshul/color-tokens</Text>
          <Text style={[styles.subtitle, { color: tokens.foreground.secondary }]}>React Native (Expo) Example</Text>
          <Text style={[styles.badge, { color: '#FFFFFF', backgroundColor: tokens.brand.primary }]}>
            All {SCALE_NAMES.length} exports
          </Text>
          <ThemeToggle />
        </View>

        {/* All sections */}
        <HooksPanel />
        <UtilityFunctionsSection />
        <PrimitiveScalesSection />
        <StatusSection />
        <BrandSection />
        <SemanticPaletteSection />
        <ChartSection />
        <CreateThemeSection />
        <ConfigSection />

        {/* Footer */}
        <View style={styles.footerSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================================================================== */
/*  App — root component, wraps in ColorProvider                          */
/* ================================================================== */

export default function App() {
  // ColorProviderProps: defaultTheme, theme, config
  const providerConfig: Omit<ColorProviderProps, 'children'> = {
    defaultTheme: 'system',
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

/* ================================================================== */
/*  Styles                                                             */
/* ================================================================== */

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 40 },

  // Header
  header: { paddingTop: 16, paddingBottom: 20, paddingHorizontal: 16, borderRadius: 14, borderWidth: 1, marginBottom: 24, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '800', letterSpacing: -0.5, marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 8 },
  badge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999, fontSize: 12, fontWeight: '700', marginBottom: 12 },

  // Sections
  section: { marginBottom: 28 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  sectionDesc: { fontSize: 13, marginBottom: 12, lineHeight: 18 },
  subHeading: { fontSize: 15, fontWeight: '700', marginBottom: 8, color: '#374151' },

  // Toggle
  toggleButton: { paddingHorizontal: 24, paddingVertical: 10, borderRadius: 999, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 3, alignSelf: 'center' },
  toggleButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },

  // Info chips
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  infoChip: { flex: 1, minWidth: 120, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, marginBottom: 2 },
  infoChipLabel: { fontSize: 10, fontWeight: '600', color: '#6B7280', marginBottom: 2 },
  infoChipValue: { fontSize: 12, fontWeight: '600' },

  // Utility swatches
  utilSwatchRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  utilSwatch: { width: 64, height: 64, borderRadius: 10, justifyContent: 'flex-end', alignItems: 'center', padding: 4 },
  utilSwatchLabel: { fontSize: 8, fontWeight: '600', textAlign: 'center' },

  // Table
  tableWrapper: { borderRadius: 10, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#F9FAFB', overflow: 'hidden' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingVertical: 8, paddingHorizontal: 10 },
  tableFn: { fontSize: 11, fontWeight: '700', width: 130, color: '#374151' },
  tableOut: { fontSize: 11, flex: 1, color: '#4B5563' },

  // Code blocks
  codeBlock: { backgroundColor: '#1E293B', borderRadius: 10, padding: 12, marginBottom: 12 },
  codeLine: { fontSize: 10, color: '#93C5FD', lineHeight: 16 },

  // Scale rows
  scaleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  scaleName: { width: 56, fontSize: 10, fontWeight: '600', textTransform: 'capitalize', textAlign: 'right', marginRight: 4 },
  shadesRow: { flexDirection: 'row', flexWrap: 'wrap', flex: 1, gap: 3 },
  shadeChip: { width: 28, height: 28, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  shadeChipText: { fontSize: 7, fontWeight: '700' },

  // Status
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, borderWidth: 1 },
  badgeText: { fontSize: 13, fontWeight: '600' },
  alertList: { gap: 10 },
  alertCard: { borderRadius: 10, borderWidth: 1, borderLeftWidth: 4, padding: 14 },
  alertHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  alertDot: { width: 10, height: 10, borderRadius: 5 },
  alertLabel: { fontSize: 14, fontWeight: '700' },
  contrastBadge: { fontSize: 9, backgroundColor: 'rgba(0,0,0,0.08)', color: '#333', paddingHorizontal: 4, paddingVertical: 1, borderRadius: 4, marginLeft: 'auto', fontFamily: 'monospace' },
  alertMessage: { fontSize: 13, lineHeight: 18 },

  // Brand buttons
  buttonGroup: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 12 },
  brandButton: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.12, shadowRadius: 3, elevation: 2 },
  brandButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
  outlineButton: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10, borderWidth: 1.5 },
  outlineButtonText: { fontSize: 13, fontWeight: '600' },

  // Semantic palette
  scrollRow: { paddingRight: 16 },
  semanticCard: { width: 220, borderRadius: 12, borderWidth: 1, padding: 14, marginRight: 12, },
  semanticCardTitle: { fontSize: 15, fontWeight: '700', marginBottom: 10, textTransform: 'capitalize' },
  semanticChips: { gap: 6 },
  semanticChip: { width: 50, height: 50, borderRadius: 8 },
  semanticChipText: { fontSize: 7, fontWeight: '700' },

  // Chart
  chartCard: { borderRadius: 14, borderWidth: 1, padding: 16 },
  chartRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chartChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  chartChipText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },

  footerSpacer: { height: 20 },
});
