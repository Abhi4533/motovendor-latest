import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TextInputProps,
} from 'react-native';
import { useField } from 'formik';
import { colors } from '@utils/colors';
import { moderateScale, normalizeFont } from '@utils/responsive';
import spacing from '@utils/spacing';

interface Props extends TextInputProps {
  name: string;
  label: string;
  status?: 'idle' | 'loading' | 'success' | 'error';
  customError?: string;
}

export default function CustomInput({
  name,
  label,
  status,
  customError,
  ...rest
}: Props) {
  const [field, meta, helpers] = useField(name);
  const [isFocused, setIsFocused] = useState(false);

  const animatedLabel = useRef(new Animated.Value(field.value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || field.value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, field.value]);

  const labelColor =
    status === 'error' || (meta.error && meta.touched)
      ? colors.error
      : status === 'success'
      ? 'green'
      : isFocused
      ? colors.primary
      : '#999';
  const labelStyle = {
    position: 'absolute',
    left: spacing.sm,
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [moderateScale(18), moderateScale(-8)],
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [normalizeFont(14), normalizeFont(11)],
    }),
    fontWeight: '600',
    color: labelColor,
    backgroundColor: '#fff',
    paddingHorizontal: spacing.xs,
  };
  const borderColor =
    status === 'error' || (meta.error && meta.touched)
      ? colors.error
      : status === 'success'
      ? 'green'
      : isFocused
      ? colors.primary
      : '#ccc';

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { borderColor }]}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>

        <TextInput
          style={styles.input}
          value={field.value || ''}
          onChangeText={value => helpers.setValue(value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            helpers.setTouched(true);
          }}
          placeholder={!isFocused ? rest.placeholder : ''}
          {...rest}
        />
      </View>

      {/* ✅ Show ONLY ONE error */}
      {(customError || (meta.error && meta.touched)) && (
        <Text style={styles.errorText}>{customError || meta.error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
    width: '100%',
  },

  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(8),
    height: moderateScale(56),
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
    justifyContent: 'center', // ✅ center content
  },

  input: {
    fontSize: normalizeFont(14),
    padding: 0,
    margin: 0,
    color: colors.text,
    fontWeight: '800',
    width: '100%',
  },

  focusBorder: {
    borderColor: colors.primary,
  },

  errorBorder: {
    borderColor: colors.error,
  },

  errorText: {
    fontSize: normalizeFont(11),
    color: colors.error,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});
