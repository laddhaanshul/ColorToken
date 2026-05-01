/**
 * Semantic Color Tokens
 *
 * Meaningful color aliases that map to primitive values.
 * Use these tokens in your components for consistency and easy theming.
 *
 * Every token has light and dark mode variants.
 */

import { primitiveColors } from './primitive';

export const lightSemanticColors = {
  // ─── Backgrounds ─────────────────────────────────────────
  background: {
    primary: primitiveColors.white,
    secondary: primitiveColors.gray[50],
    tertiary: primitiveColors.gray[100],
    inverse: primitiveColors.gray[900],
    canvas: primitiveColors.slate[50],
    overlay: primitiveColors.black + 'CC', // 80% opacity
    subtle: primitiveColors.blue[50],
  },

  // ─── Foreground / Text ──────────────────────────────────
  foreground: {
    primary: primitiveColors.gray[900],
    secondary: primitiveColors.gray[600],
    tertiary: primitiveColors.gray[400],
    inverse: primitiveColors.white,
    onPrimary: primitiveColors.white,
    onDark: primitiveColors.gray[100],
    disabled: primitiveColors.gray[300],
    hint: primitiveColors.gray[400],
  },

  // ─── Borders ─────────────────────────────────────────────
  border: {
    default: primitiveColors.gray[200],
    strong: primitiveColors.gray[300],
    subtle: primitiveColors.gray[100],
    inverse: primitiveColors.gray[700],
    focus: primitiveColors.blue[500],
    disabled: primitiveColors.gray[200],
  },

  // ─── Brand / Primary ─────────────────────────────────────
  brand: {
    primary: primitiveColors.blue[600],
    primaryHover: primitiveColors.blue[700],
    primaryActive: primitiveColors.blue[800],
    primarySubtle: primitiveColors.blue[50],
    secondary: primitiveColors.indigo[500],
    secondaryHover: primitiveColors.indigo[600],
    secondaryActive: primitiveColors.indigo[700],
    secondarySubtle: primitiveColors.indigo[50],
    accent: primitiveColors.purple[500],
    accentHover: primitiveColors.purple[600],
    accentActive: primitiveColors.purple[700],
    accentSubtle: primitiveColors.purple[50],
  },

  // ─── Semantic Status ────────────────────────────────────
  status: {
    success: primitiveColors.green[600],
    successHover: primitiveColors.green[700],
    successActive: primitiveColors.green[800],
    successSubtle: primitiveColors.green[50],
    successBorder: primitiveColors.green[200],
    successText: primitiveColors.green[800],

    warning: primitiveColors.yellow[500],
    warningHover: primitiveColors.yellow[600],
    warningActive: primitiveColors.yellow[700],
    warningSubtle: primitiveColors.yellow[50],
    warningBorder: primitiveColors.yellow[200],
    warningText: primitiveColors.yellow[800],

    error: primitiveColors.red[600],
    errorHover: primitiveColors.red[700],
    errorActive: primitiveColors.red[800],
    errorSubtle: primitiveColors.red[50],
    errorBorder: primitiveColors.red[200],
    errorText: primitiveColors.red[800],

    info: primitiveColors.blue[600],
    infoHover: primitiveColors.blue[700],
    infoActive: primitiveColors.blue[800],
    infoSubtle: primitiveColors.blue[50],
    infoBorder: primitiveColors.blue[200],
    infoText: primitiveColors.blue[800],
  },

  // ─── Surfaces / Cards ───────────────────────────────────
  surface: {
    default: primitiveColors.white,
    raised: primitiveColors.white,
    overlay: primitiveColors.white,
    sunken: primitiveColors.gray[50],
    muted: primitiveColors.gray[100],
    elevated: primitiveColors.white,
    backdrop: primitiveColors.black + '80', // 50% opacity
  },

  // ─── Interactive ─────────────────────────────────────────
  interactive: {
    default: primitiveColors.blue[600],
    hover: primitiveColors.blue[700],
    active: primitiveColors.blue[800],
    disabled: primitiveColors.gray[300],
    disabledText: primitiveColors.gray[400],
    focusRing: primitiveColors.blue[400],
    selected: primitiveColors.blue[100],
    selectedText: primitiveColors.blue[800],
  },

  // ─── Navigation ──────────────────────────────────────────
  nav: {
    background: primitiveColors.gray[900],
    text: primitiveColors.gray[100],
    textMuted: primitiveColors.gray[400],
    activeItem: primitiveColors.blue[400],
    hoverItem: primitiveColors.gray[800],
    border: primitiveColors.gray[700],
    badge: primitiveColors.red[500],
  },

  // ─── Data Visualization ──────────────────────────────────
  chart: {
    series1: primitiveColors.blue[500],
    series2: primitiveColors.purple[500],
    series3: primitiveColors.green[500],
    series4: primitiveColors.orange[500],
    series5: primitiveColors.pink[500],
    series6: primitiveColors.teal[500],
    series7: primitiveColors.yellow[500],
    series8: primitiveColors.indigo[500],
    grid: primitiveColors.gray[200],
    axis: primitiveColors.gray[400],
    background: primitiveColors.gray[50],
  },

  // ─── Shadows ─────────────────────────────────────────────
  shadow: {
    subtle: primitiveColors.black + '08',
    default: primitiveColors.black + '14',
    medium: primitiveColors.black + '26',
    strong: primitiveColors.black + '3D',
    glow: primitiveColors.blue[400] + '40',
  },
} as const;

export const darkSemanticColors = {
  // ─── Backgrounds ─────────────────────────────────────────
  background: {
    primary: primitiveColors.gray[950],
    secondary: primitiveColors.gray[900],
    tertiary: primitiveColors.gray[800],
    inverse: primitiveColors.gray[50],
    canvas: primitiveColors.slate[950],
    overlay: primitiveColors.black + 'CC',
    subtle: primitiveColors.blue[950],
  },

  // ─── Foreground / Text ──────────────────────────────────
  foreground: {
    primary: primitiveColors.gray[50],
    secondary: primitiveColors.gray[300],
    tertiary: primitiveColors.gray[500],
    inverse: primitiveColors.gray[900],
    onPrimary: primitiveColors.white,
    onDark: primitiveColors.gray[100],
    disabled: primitiveColors.gray[600],
    hint: primitiveColors.gray[500],
  },

  // ─── Borders ─────────────────────────────────────────────
  border: {
    default: primitiveColors.gray[700],
    strong: primitiveColors.gray[600],
    subtle: primitiveColors.gray[800],
    inverse: primitiveColors.gray[200],
    focus: primitiveColors.blue[400],
    disabled: primitiveColors.gray[700],
  },

  // ─── Brand / Primary ─────────────────────────────────────
  brand: {
    primary: primitiveColors.blue[400],
    primaryHover: primitiveColors.blue[300],
    primaryActive: primitiveColors.blue[500],
    primarySubtle: primitiveColors.blue[950],
    secondary: primitiveColors.indigo[400],
    secondaryHover: primitiveColors.indigo[300],
    secondaryActive: primitiveColors.indigo[500],
    secondarySubtle: primitiveColors.indigo[950],
    accent: primitiveColors.purple[400],
    accentHover: primitiveColors.purple[300],
    accentActive: primitiveColors.purple[500],
    accentSubtle: primitiveColors.purple[950],
  },

  // ─── Semantic Status ────────────────────────────────────
  status: {
    success: primitiveColors.green[400],
    successHover: primitiveColors.green[300],
    successActive: primitiveColors.green[500],
    successSubtle: primitiveColors.green[950],
    successBorder: primitiveColors.green[800],
    successText: primitiveColors.green[300],

    warning: primitiveColors.yellow[400],
    warningHover: primitiveColors.yellow[300],
    warningActive: primitiveColors.yellow[500],
    warningSubtle: primitiveColors.yellow[950],
    warningBorder: primitiveColors.yellow[800],
    warningText: primitiveColors.yellow[300],

    error: primitiveColors.red[400],
    errorHover: primitiveColors.red[300],
    errorActive: primitiveColors.red[500],
    errorSubtle: primitiveColors.red[950],
    errorBorder: primitiveColors.red[800],
    errorText: primitiveColors.red[300],

    info: primitiveColors.blue[400],
    infoHover: primitiveColors.blue[300],
    infoActive: primitiveColors.blue[500],
    infoSubtle: primitiveColors.blue[950],
    infoBorder: primitiveColors.blue[800],
    infoText: primitiveColors.blue[300],
  },

  // ─── Surfaces / Cards ───────────────────────────────────
  surface: {
    default: primitiveColors.gray[900],
    raised: primitiveColors.gray[800],
    overlay: primitiveColors.gray[800],
    sunken: primitiveColors.gray[950],
    muted: primitiveColors.gray[800],
    elevated: primitiveColors.gray[800],
    backdrop: primitiveColors.black + '80',
  },

  // ─── Interactive ─────────────────────────────────────────
  interactive: {
    default: primitiveColors.blue[400],
    hover: primitiveColors.blue[300],
    active: primitiveColors.blue[500],
    disabled: primitiveColors.gray[600],
    disabledText: primitiveColors.gray[500],
    focusRing: primitiveColors.blue[500],
    selected: primitiveColors.blue[900],
    selectedText: primitiveColors.blue[300],
  },

  // ─── Navigation ──────────────────────────────────────────
  nav: {
    background: primitiveColors.gray[950],
    text: primitiveColors.gray[200],
    textMuted: primitiveColors.gray[500],
    activeItem: primitiveColors.blue[400],
    hoverItem: primitiveColors.gray[800],
    border: primitiveColors.gray[700],
    badge: primitiveColors.red[400],
  },

  // ─── Data Visualization ──────────────────────────────────
  chart: {
    series1: primitiveColors.blue[400],
    series2: primitiveColors.purple[400],
    series3: primitiveColors.green[400],
    series4: primitiveColors.orange[400],
    series5: primitiveColors.pink[400],
    series6: primitiveColors.teal[400],
    series7: primitiveColors.yellow[400],
    series8: primitiveColors.indigo[400],
    grid: primitiveColors.gray[700],
    axis: primitiveColors.gray[500],
    background: primitiveColors.gray[900],
  },

  // ─── Shadows ─────────────────────────────────────────────
  shadow: {
    subtle: primitiveColors.black + '20',
    default: primitiveColors.black + '40',
    medium: primitiveColors.black + '60',
    strong: primitiveColors.black + '80',
    glow: primitiveColors.blue[500] + '30',
  },
} as const;

/**
 * Semantic color theme type.
 * Widens all leaf values to `string` so both light and dark semantic
 * token objects (which carry different literal hex values) satisfy this type.
 */
export type SemanticColorTheme = {
  [K in keyof typeof lightSemanticColors]: {
    [J in keyof typeof lightSemanticColors[K]]: string;
  };
};
export type SemanticColorCategory = keyof SemanticColorTheme;
