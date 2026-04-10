import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Animated,
  TextInputProps,
} from 'react-native';
import { colors } from '@utils/colors';
import spacing from '@utils/spacing';

interface LocalInputProps extends TextInputProps {
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

export default function LocalInput({
  label,
  value,
  error,
  errorMessage,
  ...props
}: LocalInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);
  const borderColor = error
    ? colors.error
    : isFocused
    ? colors.primary
    : '#E0E0E0';

  const labelColor = error ? colors.error : isFocused ? colors.primary : '#999';
  const labelStyle = {
    position: 'absolute' as const,
    left: spacing.md,
    zIndex: 2, // 👈 VERY IMPORTANT

    backgroundColor: '#fff',
    paddingHorizontal: 6, // 👈 more padding to cover border

    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -8], // 👈 fine-tuned
    }),

    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 11],
    }),

    fontWeight: '600',
    color: labelColor,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { borderColor }]}>
        {label && <Animated.Text style={labelStyle}>{label}</Animated.Text>}

        <TextInput
          {...props}
          value={value}
          style={styles.input}
          placeholder={!isFocused ? props.placeholder : ''}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>

      {error && errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: spacing.sm,
    height: 56,
    paddingHorizontal: spacing.md,
    backgroundColor: '#fff',
    justifyContent: 'center',
    overflow: 'visible', // 👈 IMPORTANT (prevents clipping)
  },

  input: {
    fontWeight: '600',
    padding: 0,
    margin: 0,
    zIndex: 1, // 👈 keeps input below label
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});
