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
}

export default function CustomInput({ name, label, ...rest }: Props) {
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
    color:
      meta.error && meta.touched
        ? colors.error
        : isFocused
        ? colors.primary
        : '#000',
    backgroundColor: '#fff',
    paddingHorizontal: spacing.xs,
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          meta.error && meta.touched ? styles.errorBorder : null,
          isFocused ? styles.focusBorder : null,
        ]}
      >
        <Animated.Text style={labelStyle}>{label}</Animated.Text>

        <TextInput
          style={styles.input}
          value={field.value}
          onChangeText={value => helpers.setValue(value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            helpers.setTouched(true);
          }}
          {...rest}
        />
      </View>

      {meta.error && meta.touched && (
        <Text style={styles.errorText}>{meta.error}</Text>
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  input: {
    fontSize: normalizeFont(14),
    padding: 0,
    margin: 0,
    color: colors.text,
    fontWeight: '600',
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
