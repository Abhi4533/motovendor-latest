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
}

export default function LocalInput({
  label,
  value,
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

  const labelStyle = {
    position: 'absolute' as const,
    left: spacing.md,
    backgroundColor: '#fff',
    paddingHorizontal: 4,

    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -8],
    }),

    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 11],
    }),

    color: isFocused ? colors.primary : '#999',
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          { borderColor: isFocused ? colors.primary : '#E0E0E0' },
        ]}
      >
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
    paddingTop: spacing.md,
    position: 'relative',
    backgroundColor: '#fff',
  },

  input: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontWeight: '600',
  },
});
