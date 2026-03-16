import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TextInputProps,
} from 'react-native';
import { colors } from '@utils/colors';
import spacing from '@utils/spacing';

interface LocalInputProps extends TextInputProps {
  label?: string;
}

export default function LocalInput({ label, ...props }: LocalInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={styles.input}
        placeholderTextColor="#2A2A2A"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },

  label: {
    marginBottom: spacing.xs,
    color: colors.primary,
    fontWeight: '500',
  },

  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: spacing.sm,
    fontWeight: '600',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#fff',
  },
});
