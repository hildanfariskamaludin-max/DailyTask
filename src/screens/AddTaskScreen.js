import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import { colors, globalStyles, spacing } from '../styles/globalStyles';


export default function AddTaskScreen({ onAddTask, navigation }) {
  const handleSubmit = (task) => {
    onAddTask(task);
    navigation.navigate('Tugas');
  };

  return (
    <View style={globalStyles.screen}>
      <Header
        eyebrow="DailyTask"
        title="Tambah Tugas"
        subtitle="Isi detail tugas baru kamu di bawah ini."
      />

      <ScrollView
        contentContainerStyle={globalStyles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TaskForm onSubmit={handleSubmit} />

        <Text style={styles.note}>
          Tugas yang disimpan akan langsung muncul di tab Tugas dan Dashboard.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  note: {
    marginTop: spacing.xs,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
