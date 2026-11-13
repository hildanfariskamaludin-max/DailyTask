import { ScrollView, StyleSheet, Text, View } from 'react-native';

import EmptyState from '../components/EmptyState';
import Header from '../components/Header';
import SummaryCard from '../components/SummaryCard';
import TaskItem from '../components/TaskItem';
import { colors, globalStyles, spacing } from '../styles/globalStyles';

const RECENT_TASK_LIMIT = 3;

/**
 * Dashboard: task statistics and the most recent tasks.
 * All numbers come from the shared task state via the stats prop, so the
 * dashboard always matches the Task List screen.
 *
 * Props:
 * - tasks (array, required)      : all tasks from App
 * - stats (object, required)     : { total, completed, pending } from App
 * - onToggleTask (function)      : toggles a task by id
 */
export default function DashboardScreen({ tasks, stats, onToggleTask }) {
  const recentTasks = tasks.slice(0, RECENT_TASK_LIMIT);

  const summaryData = [
    {
      id: 'total',
      label: 'Total',
      value: stats.total,
      color: colors.primary,
      icon: 'layers-outline',
    },
    {
      id: 'done',
      label: 'Selesai',
      value: stats.completed,
      color: colors.success,
      icon: 'checkmark-done-outline',
    },
    {
      id: 'pending',
      label: 'Belum',
      value: stats.pending,
      color: colors.warning,
      icon: 'time-outline',
    },
  ];

  return (
    <View style={globalStyles.screen}>
      <Header
        eyebrow="DailyTask"
        title="Halo, Selamat Datang"
        subtitle="Berikut ringkasan tugas kamu hari ini."
      />

      <ScrollView
        contentContainerStyle={globalStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryRow}>
          {summaryData.map((item) => (
            <SummaryCard
              key={item.id}
              label={item.label}
              value={item.value}
              color={item.color}
              icon={item.icon}
              style={styles.summaryItem}
            />
          ))}
        </View>

        <View style={globalStyles.sectionHeaderRow}>
          <Text style={globalStyles.sectionTitle}>Tugas Terbaru</Text>
          <Text style={globalStyles.caption}>
            {recentTasks.length} tugas
          </Text>
        </View>

        {recentTasks.length === 0 ? (
          <EmptyState
            icon="sparkles-outline"
            title="Belum ada tugas"
            description="Tugas yang kamu tambahkan akan muncul di sini."
          />
        ) : (
          recentTasks.map((task) => (
            <TaskItem
              key={task.id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              completed={task.completed}
              onToggle={() => onToggleTask(task.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  summaryItem: {
    flex: 1,
  },
});
