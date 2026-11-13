import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import {
  colors,
  globalStyles,
  priorityColors,
  radius,
  spacing,
} from '../styles/globalStyles';

const PRIORITY_OPTIONS = ['Tinggi', 'Sedang', 'Rendah'];


export default function TaskForm({ onSubmit, submitLabel = 'Simpan Tugas' }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Sedang');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTitleChange = (value) => {
    setTitle(value);

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setErrorMessage('Judul tugas tidak boleh kosong.');
      return;
    }

    onSubmit({
      title: trimmedTitle,
      description: description.trim(),
      priority,
    });


    setTitle('');
    setDescription('');
    setPriority('Sedang');
    setErrorMessage('');
  };

  return (
    <View style={[globalStyles.card, styles.card]}>
      <View style={styles.field}>
        <Text style={styles.label}>Judul Tugas</Text>
        <TextInput
          style={[styles.input, errorMessage ? styles.inputError : null]}
          value={title}
          onChangeText={handleTitleChange}
          placeholder="Contoh: Mengerjakan laporan UTS"
          placeholderTextColor={colors.textMuted}
          selectionColor={colors.primary}
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Deskripsi</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={description}
          onChangeText={setDescription}
          placeholder="Tambahkan detail tugas (opsional)"
          placeholderTextColor={colors.textMuted}
          selectionColor={colors.primary}
          multiline
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Prioritas</Text>
        <View style={styles.priorityRow}>
          {PRIORITY_OPTIONS.map((option) => {
            const isSelected = priority === option;
            const badge = priorityColors[option];

            return (
              <Pressable
                key={option}
                onPress={() => setPriority(option)}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                style={[
                  styles.priorityOption,
                  isSelected && {
                    backgroundColor: badge.background,
                    borderColor: badge.text,
                  },
                ]}
              >
                <View
                  style={[
                    styles.priorityDot,
                    { backgroundColor: isSelected ? badge.text : colors.textMuted },
                  ]}
                />
                <Text
                  style={[
                    styles.priorityText,
                    isSelected && { color: badge.text },
                  ]}
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Pressable
        onPress={handleSubmit}
        accessibilityRole="button"
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Ionicons name="save-outline" size={18} color={colors.surface} />
        <Text style={styles.buttonText}>{submitLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.lg,
  },
  field: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 15,
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    fontSize: 12,
    color: colors.danger,
  },
  multilineInput: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  priorityOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm + 2,
    backgroundColor: colors.surface,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md + 2,
    marginTop: spacing.xs,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.surface,
  },
});
