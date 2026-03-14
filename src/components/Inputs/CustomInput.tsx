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

interface Props extends TextInputProps {
  name: string;
  label: string;
}

export default function CustomInput({ name, label, ...rest }: Props) {
  const [field, meta, helpers] = useField(name);
  const [isFocused, setIsFocused] = useState(false);

  // Animated value for label position
  const animatedLabel = useRef(new Animated.Value(field.value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || field.value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, field.value]);

  // Interpolated styles for floating label
  const labelStyle = {
    position: 'absolute',
    left: 12,
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -8], // moves from inside input to above border
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color:
      meta.error && meta.touched
        ? colors.error
        : isFocused
        ? colors.primary
        : '#999',
    backgroundColor: '#fff',
    paddingHorizontal: 4,
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
    marginBottom: 18,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 16, // give space for label
    paddingBottom: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    padding: 0,
    margin: 0,
    color: colors.text,
  },
  focusBorder: {
    borderColor: colors.primary,
  },
  errorBorder: {
    borderColor: colors.error,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
    marginLeft: 2,
  },
});
