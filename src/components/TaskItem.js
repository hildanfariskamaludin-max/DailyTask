import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  colors,
  globalStyles,
  priorityColors,
  radius,
  spacing,
} from '../styles/globalStyles';


export default function TaskItem({
  title,
  description,
  priority = 'Sedang',
  completed = false,
  onToggle,
  onDelete,
  style,
}) {
  const badge = priorityColors[priority] ?? priorityColors.Sedang;

  return (
    <View style={[globalStyles.card, styles.card, style]}>
      <Pressable
        onPress={onToggle}
        disabled={!onToggle}
        hitSlop={8}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: completed }}
        accessibilityLabel={
          completed
            ? `Tandai ${title} sebagai belum selesai`
            : `Tandai ${title} sebagai selesai`
        }
        style={[styles.statusIcon, completed && styles.statusIconDone]}
      >
        {completed ? (
          <Ionicons name="checkmark" size={14} color={colors.surface} />
        ) : null}
      </Pressable>

      <View style={styles.body}>
        <Text
          numberOfLines={2}
          style={[styles.title, completed && styles.titleDone]}
        >
          {title}
        </Text>

        {description ? (
          <Text numberOfLines={2} style={styles.description}>
            {description}
          </Text>
        ) : null}

        <View style={styles.footer}>
          <View style={[styles.badge, { backgroundColor: badge.background }]}>
            <Text style={[styles.badgeText, { color: badge.text }]}>
              {priority}
            </Text>
          </View>

          {onDelete ? (
            <Pressable
              onPress={onDelete}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={`Hapus tugas ${title}`}
              style={({ pressed }) => [
                styles.deleteButton,
                pressed && styles.deleteButtonPressed,
              ]}
            >
              <Ionicons name="trash-outline" size={17} color={colors.danger} />
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  statusIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  statusIconDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  body: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
    color: colors.textPrimary,
  },
  titleDone: {
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  description: {
    marginTop: spacing.xs,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  deleteButton: {
    padding: spacing.xs,
    borderRadius: radius.sm,
  },
  deleteButtonPressed: {
    backgroundColor: colors.dangerSoft,
  },
});
