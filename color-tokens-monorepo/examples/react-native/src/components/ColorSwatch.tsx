import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

// ─── Types ──────────────────────────────────────────────────

interface ColorSwatchProps {
  /** Display label for the swatch (e.g. "Blue 500") */
  name: string;
  /** Hex color string (e.g. "#3B82F6") */
  color: string;
  /** Optional — size of the swatch (default: responsive) */
  size?: number;
}

// ─── Helpers ────────────────────────────────────────────────

const screenWidth = Dimensions.get('window').width;

/**
 * Determines whether white or black text has better contrast
 * against the given background hex color.
 */
function getContrastTextColor(hex: string): string {
  const clean = hex.replace('#', '');
  if (clean.length < 6) return '#000000';

  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);

  // Relative luminance (simplified)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#111827' : '#FFFFFF';
}

// ─── Component ──────────────────────────────────────────────

export function ColorSwatch({ name, color, size }: ColorSwatchProps) {
  const swatchSize = size ?? Math.floor((screenWidth - 80) / 4);
  const textColor = getContrastTextColor(color);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => {
        // In a real app you might copy the color to clipboard here
        console.log(`[ColorSwatch] ${name}: ${color}`);
      }}
    >
      <View
        style={[
          styles.swatch,
          {
            backgroundColor: color,
            width: swatchSize,
            height: swatchSize,
          },
        ]}
      >
        {/* Show hex value inside the swatch */}
        <Text style={[styles.swatchLabel, { color: textColor }]}>
          {color}
        </Text>
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

// ─── FlatList-compatible row ────────────────────────────────

interface ColorSwatchRowProps {
  /** Array of [name, color] tuples to render in a row */
  swatches: Array<{ name: string; color: string }>;
}

export function ColorSwatchRow({ swatches }: ColorSwatchRowProps) {
  return (
    <View style={styles.row}>
      {swatches.map((swatch) => (
        <ColorSwatch key={swatch.name} {...swatch} />
      ))}
    </View>
  );
}

// ─── Styles ─────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 4,
  },
  swatch: {
    borderRadius: 8,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 4,
    borderWidth: 1,
    borderColor: '#00000015',
  },
  swatchLabel: {
    fontSize: 8,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  name: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
    color: '#6B7280',
    width: 80,
  },
});
