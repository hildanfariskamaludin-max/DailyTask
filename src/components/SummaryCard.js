import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, globalStyles, radius, spacing } from '../styles/globalStyles';


export default function SummaryCard({
  label,
  value,
  color = colors.primary,
  icon = 'ellipse-outline',
  style,
}) {
  return (
    <View style={[globalStyles.card, styles.card, style]}>
      {/* Light tint of the accent color: #RRGGBB + 1A (10% opacity). */}
      <View style={[styles.iconWrapper, { backgroundColor: `${color}1A` }]}>
        <Ionicons name={icon} size={16} color={color} />
      </View>

      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  label: {
    marginTop: spacing.xs,
    fontSize: 12,
    color: colors.textSecondary,
  },
});
