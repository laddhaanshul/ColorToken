import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { hexToRgb, getContrastRatio } from '@laddhaanshul/color-tokens';

// ─── Status definitions ─────────────────────────────────────

interface StatusItem {
  key: string;
  label: string;
  message: string;
  colorKey: 'success' | 'warning' | 'error' | 'info';
}

const statuses: StatusItem[] = [
  {
    key: 'success',
    label: 'Success',
    message: 'Changes saved successfully!',
    colorKey: 'success',
  },
  {
    key: 'warning',
    label: 'Warning',
    message: 'Your session will expire in 5 minutes.',
    colorKey: 'warning',
  },
  {
    key: 'error',
    label: 'Error',
    message: 'Unable to connect to the server.',
    colorKey: 'error',
  },
  {
    key: 'info',
    label: 'Info',
    message: 'A new version is available for download.',
    colorKey: 'info',
  },
];

// ─── StatusBadge ────────────────────────────────────────────

interface StatusBadgeProps {
  label: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

function StatusBadge({ label, backgroundColor, textColor, borderColor }: StatusBadgeProps) {
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor,
          borderColor,
        },
      ]}
    >
      <Text style={[styles.badgeText, { color: textColor }]}>{label}</Text>
    </View>
  );
}

// ─── StatusShowcase ─────────────────────────────────────────

export function StatusShowcase() {
  const { colors } = useTheme();
  const { status } = colors;

  const statusStyles = {
    success: {
      bg: status.successSubtle,
      text: status.successText,
      border: status.successBorder,
      bar: status.success,
    },
    warning: {
      bg: status.warningSubtle,
      text: status.warningText,
      border: status.warningBorder,
      bar: status.warning,
    },
    error: {
      bg: status.errorSubtle,
      text: status.statusText,
      border: status.errorBorder,
      bar: status.error,
    },
    info: {
      bg: status.infoSubtle,
      text: status.infoText,
      border: status.infoBorder,
      bar: status.info,
    },
  };

  return (
    <View>
      <Text
        style={[styles.sectionTitle, { color: colors.foreground.primary }]}
      >
        Status Colors
      </Text>
      <Text
        style={[styles.sectionSubtitle, { color: colors.foreground.secondary }]}
      >
        Semantic status tokens for alerts, badges, and feedback
      </Text>

      {/* Badges row */}
      <View style={styles.badgeRow}>
        {statuses.map(({ key, label }) => {
          const s = statusStyles[key];
          return (
            <StatusBadge
              key={key}
              label={label}
              backgroundColor={s.bg}
              textColor={s.text}
              borderColor={s.border}
            />
          );
        })}
      </View>

      {/* Alert cards */}
      <View style={styles.alertList}>
        {statuses.map(({ key, label, message }) => {
          const s = statusStyles[key];
          const baseColor = s.bar;
          const rgb = hexToRgb(baseColor);

          return (
            <View
              key={key}
              style={[
                styles.alertCard,
                {
                  backgroundColor: s.bg,
                  borderLeftColor: s.bar,
                  borderColor: s.border,
                },
              ]}
            >
              <View style={styles.alertHeader}>
                <View
                  style={[
                    styles.alertDot,
                    { backgroundColor: s.bar },
                  ]}
                />
                <Text style={[styles.alertLabel, { color: s.text }]}>
                  {label}
                </Text>
                {rgb && (
                  <Text style={styles.contrastBadge}>
                    {getContrastRatio(s.text, s.bg).toFixed(1)}:1
                  </Text>
                )}
              </View>
              <Text style={[styles.alertMessage, { color: s.text }]}>
                {message}
              </Text>
            </View>
          );
        })}
      </View>
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
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  alertList: {
    gap: 10,
  },
  alertCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderLeftWidth: 4,
    padding: 14,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  alertDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  alertLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  contrastBadge: {
    fontSize: 9,
    backgroundColor: '#00000015',
    color: '#333',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    marginLeft: 'auto',
    fontFamily: 'monospace',
  },
  alertMessage: {
    fontSize: 13,
    lineHeight: 18,
  },
});
