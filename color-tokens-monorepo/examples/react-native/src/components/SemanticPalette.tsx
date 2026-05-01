import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

// ─── Helpers ────────────────────────────────────────────────

/**
 * Flat keys of a category like "background", "foreground", etc.
 * Each value is itself an object of token-name → hex-string.
 */
type CategoryMap = Record<string, string>;

function flattenCategory(
  obj: Record<string, unknown>,
  prefix: string = '',
): Array<{ label: string; color: string }> {
  const entries: Array<{ label: string; color: string }> = [];

  for (const [key, value] of Object.entries(obj)) {
    const label = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      entries.push({ label, color: value });
    } else if (typeof value === 'object' && value !== null) {
      entries.push(...flattenCategory(value as Record<string, unknown>, label));
    }
  }

  return entries;
}

// ─── Sub-component: Category Card ───────────────────────────

interface CategoryCardProps {
  title: string;
  tokens: CategoryMap;
}

function CategoryCard({ title, tokens }: CategoryCardProps) {
  const { colors } = useTheme();
  const flat = flattenCategory(tokens);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface.raised,
          borderColor: colors.border.default,
        },
      ]}
    >
      <Text
        style={[
          styles.cardTitle,
          { color: colors.foreground.primary },
        ]}
      >
        {title}
      </Text>

      <View style={styles.tokenList}>
        {flat.map(({ label, color }) => (
          <View key={label} style={styles.tokenRow}>
            <View
              style={[styles.tokenDot, { backgroundColor: color }]}
            />
            <Text
              style={[
                styles.tokenLabel,
                { color: colors.foreground.secondary },
              ]}
              numberOfLines={1}
            >
              {label}
            </Text>
            <Text
              style={[
                styles.tokenValue,
                { color: colors.foreground.tertiary },
              ]}
              numberOfLines={1}
            >
              {color}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Main SemanticPalette ───────────────────────────────────

export function SemanticPalette() {
  const { colors } = useTheme();

  // Pick representative categories to display (not every single one)
  const categories = [
    { title: 'Background', tokens: colors.background as unknown as CategoryMap },
    { title: 'Foreground', tokens: colors.foreground as unknown as CategoryMap },
    { title: 'Border', tokens: colors.border as unknown as CategoryMap },
    { title: 'Surface', tokens: colors.surface as unknown as CategoryMap },
    { title: 'Interactive', tokens: colors.interactive as unknown as CategoryMap },
    { title: 'Navigation', tokens: colors.nav as unknown as CategoryMap },
  ];

  return (
    <View>
      <Text
        style={[styles.sectionTitle, { color: colors.foreground.primary }]}
      >
        Semantic Colors
      </Text>
      <Text
        style={[styles.sectionSubtitle, { color: colors.foreground.secondary }]}
      >
        Meaningful tokens that adapt to the current theme
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollRow}
      >
        {categories.map(({ title, tokens }) => (
          <CategoryCard key={title} title={title} tokens={tokens} />
        ))}
      </ScrollView>
    </View>
  );
}

// ─── Styles ─────────────────────────────────────────────────

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    marginBottom: 12,
  },
  scrollRow: {
    paddingRight: 16,
  },
  card: {
    width: 220,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  tokenList: {
    gap: 8,
  },
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tokenDot: {
    width: 14,
    height: 14,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#00000020',
  },
  tokenLabel: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  tokenValue: {
    fontSize: 10,
    fontFamily: 'monospace',
  },
});
