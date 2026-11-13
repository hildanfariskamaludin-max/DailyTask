import { useMemo } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import EmptyState from '../components/EmptyState';
import Header from '../components/Header';
import TaskItem from '../components/TaskItem';
import { globalStyles, spacing } from '../styles/globalStyles';

/**
 * Task list: pending and completed tasks from the shared task state.
 *
 * Props:
 * - tasks (array, required)      : all tasks from App
 * - stats (object, required)     : { total, completed, pending } from App
 * - onToggleTask (function)      : toggles a task by id
 * - onDeleteTask (function)      : deletes a task by id
 */
export default function TaskListScreen({
  tasks,
  stats,
  onToggleTask,
  onDeleteTask,
}) {
  // Split the list once per task change instead of filtering it twice.
  const { pendingTasks, completedTasks } = useMemo(() => {
    const pending = [];
    const completed = [];

    tasks.forEach((task) => {
      if (task.completed) {
        completed.push(task);
      } else {
        pending.push(task);
      }
    });

    return { pendingTasks: pending, completedTasks: completed };
  }, [tasks]);

  // Ask for confirmation before deleting. Alert.alert is a no-op on
  // react-native-web, so the browser confirm dialog is used there instead.
  const requestDelete = (task) => {
    const message = `Hapus tugas "${task.title}"?`;

    if (Platform.OS === 'web') {
      if (window.confirm(message)) {
        onDeleteTask(task.id);
      }
      return;
    }

    Alert.alert('Hapus Tugas', message, [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => onDeleteTask(task.id),
      },
    ]);
  };

  return (
    <View style={globalStyles.screen}>
      <Header
        eyebrow="DailyTask"
        title="Daftar Tugas"
        subtitle={
          stats.total === 0
            ? 'Belum ada tugas tersimpan'
            : `${stats.total} tugas, ${stats.completed} selesai`
        }
      />

      <ScrollView
        contentContainerStyle={globalStyles.content}
        showsVerticalScrollIndicator={false}
      >
        {tasks.length === 0 ? (
          <EmptyState
            icon="clipboard-outline"
            title="Belum ada tugas"
            description="Tambahkan tugas pertama kamu lewat tab Tambah."
          />
        ) : (
          <>
            {pendingTasks.length > 0 ? (
              <>
                <View style={globalStyles.sectionHeaderRow}>
                  <Text style={globalStyles.sectionTitle}>Belum Selesai</Text>
                  <Text style={globalStyles.caption}>
                    {pendingTasks.length} tugas
                  </Text>
                </View>

                {pendingTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    priority={task.priority}
                    completed={task.completed}
                    onToggle={() => onToggleTask(task.id)}
                    onDelete={() => requestDelete(task)}
                  />
                ))}
              </>
            ) : (
              <EmptyState
                icon="checkmark-done-outline"
                title="Semua tugas selesai"
                description="Kerja bagus! Tidak ada tugas yang tersisa."
              />
            )}

            {completedTasks.length > 0 ? (
              <View style={styles.completedSection}>
                <View style={globalStyles.sectionHeaderRow}>
                  <Text style={globalStyles.sectionTitle}>Selesai</Text>
                  <Text style={globalStyles.caption}>
                    {completedTasks.length} tugas
                  </Text>
                </View>

                {completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    priority={task.priority}
                    completed={task.completed}
                    onToggle={() => onToggleTask(task.id)}
                    onDelete={() => requestDelete(task)}
                  />
                ))}
              </View>
            ) : null}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  completedSection: {
    marginTop: spacing.sm,
    gap: spacing.md,
  },
});
