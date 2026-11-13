import { StyleSheet } from 'react-native';

/**
 * Shared design tokens for DailyTask.
 * All screens and components take colors, spacing and radius from here
 * so the UI stays consistent.
 */
export const colors = {
  background: '#F5F7FB',
  surface: '#FFFFFF',
  border: '#E5E9F0',
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  primary: '#2563EB',
  primarySoft: '#DBEAFE',
  success: '#16A34A',
  successSoft: '#DCFCE7',
  warning: '#B45309',
  warningSoft: '#FEF3C7',
  danger: '#DC2626',
  dangerSoft: '#FEE2E2',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
};

/**
 * Colors for the three priority labels used across the app.
 */
export const priorityColors = {
  Tinggi: { text: colors.danger, background: colors.dangerSoft },
  Sedang: { text: colors.warning, background: colors.warningSoft },
  Rendah: { text: colors.success, background: colors.successSoft },
};

/**
 * Reusable styles shared by screens and components.
 */
export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  caption: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default globalStyles;
